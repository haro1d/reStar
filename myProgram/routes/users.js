var express = require('express');
var router = express.Router();
var myUser = require('../dbcode/user/user')

//配置跨域
router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8MB4");
    next();
});

// 注册
router.post("/regist", (req, res) => {
    var data = req.body
    myUser.createUser(data, r => res.send(r))
})


//登录 
router.post("/login", (req, res) => {
    var data = req.body
    myUser.login(data, r => res.send(r))
})

//查看用户基本信息
router.get('/myMsg', (req, res) => {
    var data = req.query
    myUser.myMsg(data, r => res.send(r))
})
//
// router.post('/myMsg1',(req,res)=>{
//     var data = req.query
//     myUser.myMsg1(data,r=>res.send(r))
// })

//查看用户私人或所有文章列表
router.get("/myArticle", (req, res) => {
    var data = req.query
    myUser.myArticle(data, r => res.send(r))
})

//更换用户头像
router.post("/changeImg", (req, res) => {
    var data = req.body
    myUser.changeImg(data, r => res.send(r))
})

module.exports = router;
