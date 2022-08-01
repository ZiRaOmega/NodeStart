var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
function ConnectDBAndFindByID(id, callback) {
  var reresult = "";
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    
    let counter = -1;
    console.log("Connected successfully to server");
    var cursor = dbo.collection('Movies').find();

    cursor.forEach(function (doc) {
      counter++;
      if (doc != null) {
        if (counter == 0) {
          //console.log(doc);
        }
        if (counter == id) {
          reresult += "<h2>" + doc.name + "</h2>";
          doc.url.forEach(element => {
            reresult += ("<a target='_blank' href=" + element + ">" + doc.name + "</a><br>");
          });
          //console.log(reresult);
          //return reresult;
        }
        
      }
    }
    , function (err) {
        if (err) throw err;
        console.log("Count: " + counter);
        db.close();
        callback(reresult);
      }
    );
  });
  
  return reresult;
}
/* GET users listing. */
router.get('/', function (req, res, next) {
  let result="";
  console.log(req.query);
  id = parseInt(req.query.id);
  ConnectDBAndFindByID(id,function (result) {
    res.send(result);
  }
  );
  console.log(result)
  
});

module.exports = router;
