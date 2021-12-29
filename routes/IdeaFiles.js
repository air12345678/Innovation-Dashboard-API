var express = require('express');
var router = express.Router();
var db = require('../database');
const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/ideaFiles')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({storage}).array('file');

router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (!req.file) {
            
            console.log('File is not uploaded');
        }
        console.log("file is uploaded");
        console.log(req.files);
        const sql = "INSERT INTO `ideaFiles`(`fileName`) VALUES ('" + req.files.map((value)=>value.originalname) + "')";
       //var sql = "INSERT INTO `ideaFiles`(`fileName`) VALUES ? ('" + req.files.map((value)=>value.originalname) + "')";
            db.query(sql,(err,result)=>{
                if(!err){
                    res.statusMessage = 'Success';
                    res.status(200).send({ resultData: result });
                    console.log(result);
                    console.log(res.statusMessage);
                }
                else 
                 console.log(err);
            })
    })
});

module.exports = router;