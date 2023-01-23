const router = require('express').Router();
const { DATE } = require('mysql/lib/protocol/constants/types');
const db = require('../database');
const moment = require('moment');

//Creating GET Router to fetch all the learner details from the MySQL Database
router.get('/', (req, res) => {
//     const date = moment(db.query('select crtd_time from ideas')
//    ); // This is your query from MySQL
    
//     let mydate = date.format("YYYY-MM-DD"); 
    
     var date = db.query('select crtd_time from ideas')
    var d = new Date(Date.UTC(date[0],date[1]-1,date[2]))
    db.query('select id, email_address,ideatitle,ideator,LOB,Application, estimate,problemstatement,proposedSolution,benefits,businessvalues,comments, DATE_FORMAT(crtd_time,\'%Y-%m-%d\') AS crtd_time,crtd_by,Updtd_time,Updtd_by from ideas', (err, rows, fields) => {
        if (!err) {
            res.statusMessage = 'Success';
            res.status(200).send({ resultData: rows });
            console.log(rows);
            console.log(res.statusMessage);
        }
        else
            console.log(err);
    })
});

router.get('/:id', (req, res) => {
    db.query('SELECT * FROM ideas WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.statusMessage = 'Success';
            res.status(200).send({ resultData: rows });
            console.log(rows);
            console.log(res.statusMessage);
        }
        else
            console.log(err);
    })
});

router.post('/', (req, res) => {
    let ideaData = req.body;
    var sql = "SET @_id = ?;SET @_email_address = ?;SET @_ideatitle = ?;SET @_ideator = ?;SET @_lob = ?; SET @_application = ?;SET @_status = ?;SET @_problemstatement = ?;SET @_proposedSolution = ?;SET @_benefits = ?;SET @_businessvalues = ?;SET @_comments = ?;SET @_Crtd_time = ?;SET @_Crtd_by = ?;SET @_Updtd_time = ?;SET @_Updtd_by = ?;\
        CALL ideaAddOrEdit(@_id,@_email_address,@_ideatitle, @_ideator,@_lob,@_application,@_status,@_problemstatement,@_proposedSolution,@_benefits,@_businessvalues,@_comments,@_Crtd_time,@_Crtd_by,@_Updtd_time,@_Updtd_by);";
    db.query(sql, [ideaData.id, ideaData.email, ideaData.ideatitle, ideaData.ideator, ideaData.lob,ideaData.Application,
    ideaData.status, ideaData.problemstatement, ideaData.proposedSolution, ideaData.benefits,
    ideaData.businessvalues, ideaData.comments,
    ideaData.crtd_time, ideaData.Crtd_by, ideaData.Updtd_time, ideaData.Updtd_by], (err, rows, fields) => {
        if (!err) {
            res.statusMessage = 'Success';

            console.log(JSON.stringify(rows[rows.length - 2][0].ideas_id));
            var data = JSON.stringify(rows[rows.length - 2][0].ideas_id)
            res.status(200).send({ resultData: data });
            console.log(res.statusMessage);
        }

        else
            console.log(err);
    })
});

router.put('/', (req, res) => {
    let ideaData = req.body;
    var sql = "SET @_id = ?;SET @_email_address = ?;SET @_ideatitle = ?;SET @_ideator = ?;SET @_lob = ?; SET @_application = ?;SET @_status = ?;SET @_problemstatement = ?;SET @_proposedSolution = ?;SET @_benefits = ?;SET @_businessvalues = ?;SET @_comments = ?;SET @_Crtd_time = ?;SET @_Crtd_by = ?;SET @_Updtd_time = ?;SET @_Updtd_by = ?;\
            CALL ideaAddOrEdit(@_id,@_email_address,@_ideatitle, @_ideator,@_lob,@_application,@_status,@_problemstatement,@_proposedSolution,@_benefits,@_businessvalues,@_comments,@_Crtd_time,@_Crtd_by,@_Updtd_time,@_Updtd_by);";
    db.query(sql, [ideaData.id, ideaData.email, ideaData.ideatitle, ideaData.ideator,ideaData.lob,ideaData.Application,
    ideaData.status, ideaData.problemstatement, ideaData.proposedSolution, ideaData.benefits,
    ideaData.businessvalues, ideaData.comments,
    ideaData.crtd_time, ideaData.Crtd_by, ideaData.Updtd_time, ideaData.Updtd_by], (err, rows, fields) => {
        if (!err) {
            res.statusMessage = 'Success';

            console.log(JSON.stringify(rows[rows.length - 2][0].ideas_id));
            var data = JSON.stringify(rows[rows.length - 2][0].ideas_id)
            res.status(200).send({ resultData: data });
            console.log(res.statusMessage);
        }

        else
            console.log(err);
    })
});

router.delete('/:id', (req, res) => {
    db.query('DELETE FROM ideas WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.statusMessage = 'Success';
            res.status(200).send({ resultData: rows });
            console.log(rows);
            console.log(res.statusMessage);
        }
        else
            console.log(err);
    })
    });

module.exports = router;