var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.query.search == undefined) {
    last_search = "";
  }else{
    last_search = req.query.search;
  }
  ConnectDBAndFind(function (result) {
    res.render('index', { title: 'Express', result: result, last_search: last_search });
  });
});

module.exports = router;
function ConnectDBAndFind(callback) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var reresult = "br>";
    let counter = 0;
    console.log("Connected successfully to server");
    var cursor = dbo.collection('Movies').find();

    cursor.forEach(function (doc) {
      if (doc != null) {
        reresult += "<a href=/users?id=" + counter + ">" + doc.name + "</a><br>";
        counter++;
      }
    }, function (err) {
      if (err) throw err;
      console.log("Count: " + counter);
      db.close();
      callback(reresult);
    }
    );
  });
}
