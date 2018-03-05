var mongoose = require('mongoose');

var url = "mongodb://mongo/krdb";

mongoose.connect(url);

var db = mongoose.connection;

db.on('error', function (err) {
   console.log('Connection error:', err.message);
});

db.once('open', function callback() {
    console.log("Connected to DB!");
});


module.exports = mongoose;



// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("krdb");
//     dbo.createCollection("langs", function(err, res) {
//         if (err) throw err;
//         console.log("Collection created!");
//         db.close();
//     });
// });
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("krdb");
//     var myobj = {"lang": {
//             "en": "we",
//             "kr": "우리"
//         }};
//     dbo.collection("langs").insertOne(myobj, function(err, res) {
//         if (err) throw err;
//         console.log("1 document inserted");
//         db.close();
//     });
// });
// module.exports = {
//     connectDB : function() {
//         mongoose.connect(url);
//     },
//
//     getVal : function(res) {
//         Values.find(function(err, result) {
//             if (err) {
//                 console.log(err);
//                 res.send('database error');
//                 return
//             }
//             var values = {};
//             for (var i in result) {
//                 var val = result[i];
//                 values[val["_id"]] = val["value"]
//             }
//             res.render('index', {title: 'NodeJS MongoDB demo', values: values});
//         });
//     },
//
//     sendVal : function(val, res) {
//        var request = new Values({value: val});
//         request.save(function (err, result) {
//             if (err) {
//                 console.log(err);
//                 res.send(JSON.stringify({status: "error", value: "Error, db request failed"}));
//                 return
//             }
//             res.status(201).send(JSON.stringify({status: "ok", value: result["value"], id: result["_id"]}));
//         });
//
//     },
//
//     delVal : function(id) {
//         Values.remove({_id: id}, function(err) {
//             if (err) {
//                 console.log(err);
//             }
//         });
//     }
// };
