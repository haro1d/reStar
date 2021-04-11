var exports = module.exports;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
var socketdata = "myProgram"
// 连接数据库
var dbconnect = callback => {
    MongoClient.connect(url, {  useUnifiedTopology: true }, (err, dbo) => {
        if (err) throw err;
        console.log("数据库已经连接!");
        var dbb = dbo.db(socketdata)
        // var dbb = db.collection(connectName)
        callback(dbb,dbo)
        // dbo.close()
    });
}
exports.dbconnect = dbconnect