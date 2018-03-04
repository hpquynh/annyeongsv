var express = require('express');
var mongodb = require('../db');
var Lang = require('../model/lang');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    // mongodb.getVal(res);
    // res.render('index', { title: 'Annyeong - Add new word' });
    Lang.find(function(err, result) {
        if (err) {
            console.log(err);
            res.send('database error');
            return
        }
        var values = {};
        for (var i in result) {
            var val = result[i];
            values[val["_id"]] = val["lang"]
        }
        res.render('index', {title: 'Annyeong - Add new word', values: values});

    });
});
router.get('/list', function (req, res) {
    // router.get('/', passport.authenticate('bearer', { session: false }), function (req, res) {

    Lang.find(function (err, langs) {
        if (!err) {
            return res.json(langs);
        } else {
            res.statusCode = 500;

            console.log('Internal error(%d): %s', res.statusCode, err.message);

            return res.json({
                error: 'Server error'
            });
        }
    });
});
router.post('/add', function (req, res) {

    var lang = new Lang({
        lang: {
            'en' : req.body.lang1,
            'kr' : req.body.lang2
        }
    });


    //
    lang.save(function (err) {
        if (!err) {
            console.log("New word: %s", lang.id);
            return res.json({
                status: 'ok',
                lang: lang
            });
        } else {
            if (err.name === 'ValidationError') {
                res.statusCode = 400;
                res.json({
                    error: 'Validation error'
                });
            } else {
                res.statusCode = 500;
                console.log('Internal error(%d): %s', res.statusCode, err.message);

                res.json({
                    error: 'Server error'
                });
            }
        }
    });
});

router.delete('/word/:id', function(req, res) {

    var uuid = req.params.id;

    Lang.remove({_id: uuid}, function(err) {
        if (!err) {
            return res.json({
                status: 'ok',
                id: uuid
            });
        }else{

            if (err.name === 'ValidationError') {
                res.statusCode = 400;
                res.json({
                    error: 'Validation error'
                });
            } else {
                res.statusCode = 500;
                console.log('Internal error(%d): %s', res.statusCode, err.message);

                res.json({
                    error: 'Server error'
                });
            }
        }
    });
});

module.exports = router;