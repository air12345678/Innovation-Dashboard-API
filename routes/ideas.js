const router = require('express').Router();
const db = require('../database');


//Creating GET Router to fetch all the learner details from the MySQL Database
router.get('/', (req, res) => {
    db.query('SELECT * FROM ideas', (err, rows, fields) => {
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
    var sql = "SET @_id = ?;SET @_email_address = ?;SET @_ideatitle = ?;SET @_ideator = ?; SET @_application = ?;SET @_status = ?;SET @_problemstatement = ?;SET @_proposedSolution = ?;SET @_benefits = ?;SET @_businessvalues = ?;SET @_comments = ?;SET @_Crtd_time = ?;SET @_Crtd_by = ?;SET @_Updtd_time = ?;SET @_Updtd_by = ?;\
        CALL ideaAddOrEdit(@_id,@_email_address,@_ideatitle, @_ideator,@_application,@_status,@_problemstatement,@_proposedSolution,@_benefits,@_businessvalues,@_comments,@_Crtd_time,@_Crtd_by,@_Updtd_time,@_Updtd_by);";
    db.query(sql, [ideaData.id, ideaData.email, ideaData.ideatitle, ideaData.ideator, ideaData.Application,
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
    var sql = "SET @_id = ?;SET @_email_address = ?;SET @_ideatitle = ?;SET @_ideator = ?; SET @_application = ?;SET @_status = ?;SET @_problemstatement = ?;SET @_proposedSolution = ?;SET @_benefits = ?;SET @_businessvalues = ?;SET @_comments = ?;SET @_Crtd_time = ?;SET @_Crtd_by = ?;SET @_Updtd_time = ?;SET @_Updtd_by = ?;\
            CALL ideaAddOrEdit(@_id,@_email_address,@_ideatitle, @_ideator,@_application,@_status,@_problemstatement,@_proposedSolution,@_benefits,@_businessvalues,@_comments,@_Crtd_time,@_Crtd_by,@_Updtd_time,@_Updtd_by);";
    db.query(sql, [ideaData.id, ideaData.email, ideaData.ideatitle, ideaData.ideator, ideaData.Application,
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