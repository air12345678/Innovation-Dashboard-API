const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer')
const db=require('./database');
const app = express();
 
// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true})); 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/ideaFiles')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({storage}).array('file');

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (!req.file) {
            
            console.log('File is not uploaded');
        }
        var sql = "INSERT INTO `ideaFiles`(`fileName`) VALUES ('" + req.files.map((value)=>value.originalname) + "')";
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
app.use('/api/login',require('./routes/login'));
app.use('/api/registration',require('./routes/registration'));
app.use('/api/ideas',require('./routes/ideas'))
app.use('/api/uploadFile',require('./routes/IdeaFiles'))

app.listen(8080, () => {
    console.log('Server started on: ' + 8080);
});

