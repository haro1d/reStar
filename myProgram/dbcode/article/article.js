var exports = module.exports
var dbconnect = require("../connect")
var mod = require('../mod')

//创建一片文章
var creArticle = (msg, callback) => {
    dbconnect.dbconnect((db, dbclose) => {
        var db = db.collection("article")
        var myMsg = { ...msg }
        myMsg.collected = []
        myMsg.favourite = []
        myMsg.comment = []
        mod.randomNum(15, db, 'article_id', res => {
            if (res) {
                myMsg.article_id = res
                mod.addKeywords(db, myMsg, r => {
                    callback(r)
                    dbclose.close()
                })
            }
            else {
                callback(res)
                dbclose.close()
            }
        })

    })
}

//查询某一篇文章具体内容
var oneArticle = (msg, callback) => {

    dbconnect.dbconnect((db, dbclose) => {
        // console.log("msg,",msg)
        var db_article = db.collection("article")
        var lookup1 = mod.lookup('user', 'user_name', 'user_name', 'user_msg')
        var project1 = { "_id": 0 }
        var project2 = {
            "_id": 0,
            "type": 1,
            "user_name": 1,
            "content": 1,
            "time": 1,
            "title": 1,
            "collected": 1,
            "favourite": 1,
            "article_id": 1,
            "img": "$user_msg.img",

            "comment": 1
        }
        var lookup2 = mod.lookup('user', 'comment.user_name', 'user_name', 'mimg')
        var project3 = {
            "_id": 0,
            "type": 1,
            "user_name": 1,
            "content": 1,
            "time": 1,
            "title": 1,
            "collected": 1,
            "favourite": 1,
            "article_id": 1,
            "img": 1,
            comment: 1,
            mimg: 1
            // "comment.img":"$mimg.img",//错误
            // "comment.user_name":1,
            // "comment.content":1,
            // "comment.time":1
        }
        var aggreagate = [
            { $match: msg },
            { $project: project1 },
            { $lookup: lookup1 },
            { $unwind: "$user_msg" },
            { $project: project2 },
            { $lookup: lookup2 },
            { $project: project3 }
        ]
        mod.aggregateKeywords(db_article, aggreagate, r => {
            if (r.length > 0) {
                console.log(r[0].mimg);
                for (var item of r[0].comment) {
                    for (var ite of r[0].mimg) {
                        if (item.user_name == ite.user_name)
                            item.img = ite.img
                    }
                }
            }
            callback(r)
            dbclose.close()
        })

    })

}

//查询文章列表--公共
var allArticle = (msg, callback) => {
    dbconnect.dbconnect((db, dbclose) => {
        var db_article = db.collection("article")
        mod.findKeywords(db_article, msg, {
            "_id": 0,
            "user_name": 1,
            "time": 1,
            "title": 1,
            "collected": 1,
            "favourite": 1,
            "article_id": 1,
            "comment": 1,
            "type": 1
        }, 0, 100, {}, r => {
         //   callback(r)
           let a=[]
            for(var i=0;i<r.length;i++){
                if(r[i].type !== 'P'){
                    a[i] = r[i]
                }
            }
             let b=a.filter(i=>i)
             
            // console.log("rrrrrrrrr is",b);
            // console.log("length is",b.length);
            callback(b)

            dbclose.close()
        })
    })
}
//点赞或收藏
var preAndColle = (msg, callback) => {
    dbconnect.dbconnect((db, dbclose) => {
        var db_article = db.collection("article")
        mod.updateOneKeyword(db_article, { article_id: msg.article_id }, { "$push": { [msg.type]: msg.user_name } }, r => {
            if ([msg.type] == 'collected') {
                var db_user = db.collection("user")
                mod.updateOneKeyword(db_user, { user_name: msg.user_name }, { "$push": { "collected": msg.article_id } }, res => {
                    callback(res)
                    dbclose.close()
                })
            }
            else{
                callback(r)
                dbclose.close()
            }
            
        })
    })
}

//取消点赞或收藏
var delpreAndColle = (msg, callback) => {
    dbconnect.dbconnect((db, dbclose) => {
        var db_article = db.collection("article")
        mod.updateOneKeyword(db_article, { article_id: msg.article_id }, { "$pull": { [msg.type]: msg.user_name } }, r => {
            if([msg.type]=='collected'){
                var db_user=db.collection("user")
                mod.updateOneKeyword(db_user,{user_name:msg.user_name},{"$pull":{'collected':msg.article_id}},res=>{
                    callback(res)
                    dbclose.close()
                })
            }
            else{
            callback(r)
            dbclose.close()                
            }

        })
    })
}

// 评论
var comment = (msg, callback) => {
    dbconnect.dbconnect((db, dbclose) => {
        var db_article = db.collection("article")
        mod.updateOneKeyword(db_article, { article_id: msg.article_id }, { "$push": { "comment": msg } }, r => {
            callback(r)
            dbclose.close()
        })
    })
}

// 获取收藏文章
var getMyCo = (msg,callback)=>{
    dbconnect.dbconnect((db,dbclose)=>{
        var  db_user =db.collection('user')
        var project1 = {
            "_id":0,
            collected:1
        }
        var lookup = mod.lookup("article","collected","article_id","amsg")
        var aggreagate=[
            {$match:msg},
            {$project:project1},
            {$unwind:"$collected"},
            {$lookup:lookup}
        ]
        mod.aggregateKeywords(db_user,aggreagate,r=>{
            callback(r)
            dbclose.close()
        })
    })
}

// oneArticle({article_id:"173191822258336"},r=>console.log(r[0].comment))

exports.creArticle = creArticle
exports.oneArticle = oneArticle
exports.allArticle = allArticle
exports.preAndColle = preAndColle
exports.delpreAndColle = delpreAndColle
exports.comment = comment
exports.getMyCo = getMyCo