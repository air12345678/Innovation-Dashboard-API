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

const upload = multer({ storage }).array('file', 10);


router.post('/', (req, res) => {
    debugger

    upload(req, res, (err) => {
        console.log("Request:" + req.body.idea_id);
        console.log("Request Crtd_By:" + req.body.crtd_by);
        console.log("Request Crtd_Date:" + req.body.crtd_dt);
        if (!req.files) {

            console.log('File is not uploaded');
        }
        console.log("file is uploaded");
        res.statusMessage = 'Success';
        console.log(res.statusMessage);
        console.log(req.files);
        const data = {
            fileName: req.files.map((value) => value.originalname),
            idea_id: req.body.idea_id,
            crtd_by: req.body.crtd_by,
            crtd_dt: req.body.crtd_dt

        }
        console.log(data);
        var sql = "INSERT INTO `ideafiles`(`fileName`,`idea_Id`,`crtd_by`,`crtd_dt`) VALUES  ('" + req.files.map((value) => value.originalname).join(', ') + "','" + req.body.idea_id + "','" + req.body.crtd_by + "','" + req.body.crtd_dt + "')";
        db.query(sql, (err, result) => {
            if (!err) {
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