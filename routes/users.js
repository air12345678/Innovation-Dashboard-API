var express = require('express');
var router = express.Router();
var db=require('../database');

// router.get('/users',(req,res)=>{
//     res.send('Users')
// })

router.get('/users', (req, res) => {
    db.query('SELECT * from user', (err, rows) => {
        if (!err) {
            res.send(rows);
            res.statusMessage = 'Ok'
            console.log(rows)
        }
        else
            console.log(err);
    });
});

module.exports = router;