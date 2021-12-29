var express = require('express');
var router = express.Router();
var db = require('../database');
const bcrypt = require("bcrypt")


router.post('/',  function (req, res, next) {
    inputData = {
        name: req.body.name,
        email_address: req.body.signupemail,
        password: req.body.signuppassword,
        created_at: req.body.created_at
    }

    // check unique email address
    var sql = 'SELECT * FROM registration WHERE email_address =?';
    db.query(sql, [inputData.email_address], function (err, rows, fields) {
        if (rows.length > 0) {
            var msg = inputData.email_address + "was already exist";
            res.statusMessage = 'failed';
            res.sendStatus(200);
            console.log(msg);
            console.log(rows);
        }
        else {

            // save users data into database
            var sql = 'INSERT INTO registration SET ?';
            db.query(sql, inputData, function (err, rows) {
                if (!err) {
                    res.statusMessage = 'Success';
                    res.sendStatus(200);
                    console.log(rows);
                    console.log(res.statusMessage);
                }
                else {
                    res.statusMessage = 'Invalid';
                }
            });

        }
    })

});
module.exports = router;