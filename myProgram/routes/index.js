var express = require('express');
var router = express.Router();
var myArticle = require('../dbcode/article/article')

/* GET home page. */
router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8MB4");
    next();
});

// 创建新文章
router.post('/creArticle',(req,res)=>{
    var data = req.body
    myArticle.creArticle(data,r=>res.send(r))
})

//查询某一文章具体内容
router.get("/oneArticle",(req,res)=>{
    var data= req.query
    myArticle.oneArticle(data,r=>res.send(r))
})

//查询文章列表
router.get("/allArticle",(req,res) =>{
    var data= req.query
    if(data.type=='P'){
        res.send([])
    }
    else{
        if(data.type=='all')
        data={}
        myArticle.allArticle(data.type,r=>res.send(r))        
    }
})
 
// 点赞或收藏
router.post("/preAndColle",((req,res)=>{
    var data=req.body
    myArticle.preAndColle(data,r=>res.send(r))
}))

// 取消点赞或收藏
router.post("/delpreAndColle",((req,res)=>{
    var data=req.body
    myArticle.delpreAndColle(data,r=>res.send(r))
}))

// 添加评论
router.post("/comment",(req,res)=>{
    var data=req.body
    myArticle.comment(data,r=>res.send(r))
})

//查看收藏文章
router.get("/getMyCo",(req,res)=>{
    var data=req.query
    myArticle.getMyCo(data,r=>res.send(r))
})
module.exports = router;
