var exports=module.exports
var dbconnect = require("../connect")
var mod = require('../mod')

//注册用户
var createUser = (msg, callback) => {
    dbconnect.dbconnect((db, dbclose) => {
        var db = db.collection('user')
        mod.isRepeat(db, { user_name: msg.user_name }, n => {
            if (n == false) {
                    var user_msg = {
                        user_name: msg.user_name,
                        pwsd: msg.pwsd,
                        time: msg.time,
                        img: msg.img,
                    }
                    mod.addKeywords(db, user_msg, re => {
                        callback(re)
                        dbclose.close()
                })
            } else {
                callback(false)
                dbclose.close()
            }
        })
    })
}

//用户登录
var login = (msg,callback)=>{
    dbconnect.dbconnect((db,dbclose)=>{
        var db = db.collection("user")
        mod.isRepeat(db,msg,r=>{
            callback(r)
            dbclose.close()
        })
    })
}

//查看用户基本信息
var myMsg=(msg,callback)=>{
    dbconnect.dbconnect((db,dbclose)=>{
        var db=db.collection('user')
        mod.findKeywords(db,msg,{
            "_id":0,
            user_name:1,
            time:1,
            img:1
        },0,1,{},r=>{
            callback(r)
            dbclose.close()
        })
    })
}
//
// var myMsg1=(msg,callback)=>{
//     dbconnect.dbconnect((db,dbclose)=>{
//         var db=db.collection('user')

//         mod.updateOneKeyword(db_user,{user_name:user_name},{"$pull":{[msg.img]:msg}},r=>{
//             callback(r)
//             dbclose.close()
//         })

//     })
// }


//查询用户私人或所有文章列表
var myArticle = (msg,callback)=>{
    dbconnect.dbconnect((db,dbclose)=>{
        var db_user= db.collection("article")
        mod.findKeywords(db_user,msg,{
            "_id":0,
            title:1,
            article_id:1,
            time:1
        },0,100,{},r=>{
            callback(r)
            dbclose.close()
        })
    })
}

//更换用户头像
var changeImg=(msg,callback)=>{
    dbconnect.dbconnect((db,dbclose)=>{
        var db_user=db.collection("user")
        mod.updateOneKeyword(db_user,{user_name:msg.user_name},{"$set":{img:msg.img}},r=>{
            callback(r)
            dbclose.close()
        })
    })
}

exports.createUser=createUser
exports.login  = login
exports.myMsg  = myMsg
exports.myArticle  = myArticle
exports.changeImg  = changeImg