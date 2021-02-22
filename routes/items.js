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


// GET item by type


// POST a new item
router.post("/", async function(req,res,next) {
    let item = req.body;
    let genres = item.genres.map(g => g.name);
    //console.log(item);
    let sql = `INSERT INTO items (media_type,title,genres,overview,release_date,item_length,api_id,userid)
    VALUES ('${item.type}','${item.original_title}','${genres.join(',')}','${item.overview}','${item.release_date}',${item.runtime},${item.id},1)
    `;
    try {
        await db(sql);
        let results = await db("SELECT * FROM items");
        res.status(201).send(results.data);
    } catch(err) {
        res.status(500).send({error:err.message})
    }
})


module.exports = router;