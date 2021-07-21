var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const db = require("../model/helper");
const fetch = require('node-fetch');
const API_KEY = process.env.MOVIEDB_API_KEY;

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

// fetch the movie item

const getItem = (id) => {
    console.log(id);
    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
    return fetch(url)
    .then(response => response.json())
    .then(data => { 
        return data 
    })
    .catch(err => console.log(err));
}

// POST a new item
router.post("/", async function(req,res,next) {
    let data = req.body;
    console.log(data);
    let item = await getItem(data.item.id);
    let type = data.type;
    let genres = item.genres.map(g => g.name);
    //console.log(item);
    //do a case/switch with item.type and amend sql statement accordingly
    let overview = item.overview.split("'").join("")
    let sql = `INSERT INTO items (media_type,title,genres,overview,release_date,item_length,api_id,userid)
    VALUES ('${type}','${item.original_title}','${genres.join(',')}','${overview}','${item.release_date}',${item.runtime},${item.id},1)
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