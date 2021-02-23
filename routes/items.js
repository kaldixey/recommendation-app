var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");

router.use(bodyParser.json());

// GET all items
router.get("/", function(req, res, next) {
    db("SELECT * FROM items;")
        .then(results => {
            res.send(results.data);
        })
        .catch(err => res.status(500).send({error: err.message}));
});

// GET item by id
router.get("/:id", async function(req,res,next) {
    let id = req.params.id;
    try {
        let results = await db(`SELECT * FROM items WHERE id = ${id}`);
        if (results.data.length === 1) {
            res.send(results.data)
        } else {
            res.status(404).send({error: "Not Found"});
        }
    } catch (err) {
        res.status(500).send({err: err.message})
    }
});

// GET item by type


// POST a new item
router.post("/", async function(req,res,next) {
    let item = req.body;
    let genres = item.genres.map(g => g.name);
    //console.log(item);
    //do a case/switch with item.type and amend sql statement accordingly
    let overview = item.overview.split("'").join("")
    let sql = `INSERT INTO items (media_type,title,genres,overview,release_date,item_length,api_id,userid)
    VALUES ('${item.type}','${item.original_title}','${genres.join(',')}','${overview}','${item.release_date}',${item.runtime},${item.id},1)
    `;
    try {
        await db(sql);
        let results = await db("SELECT * FROM items");
        res.status(201).send(results.data);
    } catch(err) {
        res.status(500).send({error:err.message})
    }
});

// DELETE item
router.delete("/:id", async function(req, res, next) {
    let id = req.params.id;
    try {
      let results = await db(`SELECT * FROM items WHERE id = ${id}`);
      if (results.data.length === 1) {
        await db(`DELETE FROM items WHERE id = ${id}`);
        let results = await db('SELECT * FROM items')
        res.send(results.data);
      } else {
        res.status(404).send({error:'Not Found'});
      }
    } catch(err) {
      res.status(500).send({error: err.message});
    }
  });

module.exports = router;