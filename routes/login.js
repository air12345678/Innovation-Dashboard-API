var express = require('express');
var router = express.Router();
var db = require('../database');

router.post('/', function(req, res, next) {
      
    var email = req.body.email;
    var password = req.body.password;
        db.query('SELECT * FROM registration WHERE  email_address = ? AND password = ? COLLATE utf8_bin', [email, password], function(err, rows, fields) {
            if(err) throw err
            
            // if user not found
            if (rows.length <= 0) {
                // req.flash('error', 'Please correct enter email and Password!')
                // res.redirect('/login')
                res.statusMessage ='failed'
                res.sendStatus(200);
                
                console.log(res.statusMessage);
            }
            else { // if user found
                res.statusMessage ='Success'
                // res.sendStatus(200);
                console.log(rows);
                res.status(200).send({resultData:rows});
            }            
        })
 
})
module.exports = router;