// var db=require('./connect')
var exports = module.exports;

var rand = (n) => {
    if (n > 21) return null
    var re = new RegExp("(\\d{" + n + "})(\\.|$)")
    var num = (Array(n - 1).join(0) + Math.pow(10, n) * Math.random()).match(re)[1]
    return num
}

//生成随机数--去重--已验证
var randomNum = (n, db, keyWord, callback) => {
    var num = rand(n)
    isRepeat(db, { [keyWord]: num }, res => {
        if (res == false)
            callback(num)
        else {
            randomNum(n, db, keyWord)
        }
    })
}

//查找关键字组--一重---传出查找结果--已验证
var findKeywords = (db, keyWord, project, skip, limit, sort, callback) => {
    db.find(keyWord).project(project).skip(skip).limit(limit).sort(sort).toArray((err, res) => {
        if (err) { callback(false) };
        callback(res)
    })
}

//检查关键字--一重----传出ture为重复,false为不重复----已验证
var isRepeat = (db, keyWord, callback) => {
    db.find(keyWord).toArray((err, res) => {
        if (err) { callback(false) };
        if (res&&res.length != 0)
            callback(true)
        else
            callback(false)
    })
}

//添加关键字组--不分重复--已验证
var addKeywords = (db, keyWords, callback) => {
    db.insertOne(keyWords, (err, res) => {
        if (err) { callback(false) };
        callback(true)
    })
}

//更新关键字组--去重--已验证
var updateOneKeyword = (db, query, set, callback) => {
    db.updateOne(query, set, (err, res) => {
        if (err) {  callback(false) };
        // console.log(res)
        callback(true)
    })
}
//更新关键字组-同步
var updateOneKey=(db,query,set)=>{
    db.updateOne(query,set)
}

//删除整个数据
var deleteAll=(db,query,callback)=>{
    db.deleteOne(query,(err,res)=>{
        if(err)
        callback(false)
        else
        callback(true)
    })
}

//左连接
var lookup = (from,localField,foreignField,asNewWord) => {
    return {
            from:from ,            // 右集合
            localField:localField ,    // 左集合 join 字段
            foreignField:foreignField ,         // 右集合 join 字段
            as: asNewWord           // 新生成字段（类型array）
    }
}


// 聚合操作
var aggregateKeywords = (db, aggregate, callback) => {
    db.aggregate(aggregate).toArray((err, res) => {
        if (err){console.log(err); callback(false)}
        else
        callback(res)
    })
}



exports.isRepeat = isRepeat
exports.addKeywords = addKeywords
exports.randomNum = randomNum
exports.updateOneKeyword = updateOneKeyword
exports.rand = rand
exports.findKeywords = findKeywords
exports.lookup=lookup
exports.aggregateKeywords=aggregateKeywords
exports.updateOneKey=updateOneKey
exports.deleteAll=deleteAll