const express = require('express');
const router = express.Router();
const db = require('../data/db');

router.get('/',(req,res) => {
   

    db.query('SELECT * FROM urun_tbl', (err,result) => {
        const data ={
            queryResult :result
        }

        res.render("index",data);
    })
})




module.exports = router;