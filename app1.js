var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var ejs = require('ejs');
//数据库操作
var MongoClient = require('mongodb').MongoClient;
var DbUrl = 'mongodb://127.0.0.1:27017/productmanage';
/*连接数据库*/
 
// 文件上传
var multiparty = require('multiparty');
 
// 数据库操作
var DB=require('./routes/db');
 
// 业务模块引入
var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login/login');
var product = require('./routes/product/product');
 
// 实例化
var app = express();
 
// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
// 注册 html  模板引擎代码如下：
app.engine('html', ejs.__express);
app.set('view engine', 'html');
 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
// 设置session
app.use(session({
    secret: '12345',
    name: 'hahaha',
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: true
}));
 
// 静态资源路径
app.use(express.static(path.join(__dirname, 'public')));
// 上传图片路径
app.use('/upload', express.static('upload'));
 
 
// 路由模块
app.get('/', function (req, res) {
    console.log("index");
    res.send('index');
});
app.get('/login', function (req, res) {
    res.render('login/login');
});
 
// 登录接口
app.post('/login', function (req, res) {
    // 获取登录入参
    var username = req.body.username;
    var password = req.body.password;
    console.log("username：" + username);
    console.log("password：" + password);
    //1.获取数据
    //2.连接数据库查询数据
    MongoClient.connect(DbUrl, function (err, db) {
        if (err) {
            console.log(err);
            return;
        }
        var result = db.collection('user').find(req.body);
 
        //另一种遍历数据的方法
        result.toArray(function (err, data) {
            console.log(data);
            if (data.length > 0) {
                console.log('登录成功');
                //保存用户信息
                req.session.userinfo = data[0];
                res.redirect('/product');
                /*登录成功跳转到商品列表*/
            } else {
                //console.log('登录失败');
                res.send("<script>alert('登录失败');location.href='/login'</script>");
            }
            db.close();
        })
    })
});
 
app.get('/product', function (req, res) {
    var username = req.session.userInfo.username;
    var password = req.session.userInfo.password;
    res.send("已经进入商品页面---》你好：" + username + "   " + password);
    // res.render('product/product');
});
 
//获取表单提交的数据 以及post过来的图片
app.post('/uploadImage', function (req, res) {
    //获取表单的数据 以及post过来的图片
    var form = new multiparty.Form();
    form.uploadDir = 'upload';   //上传图片保存的地址     目录必须存在
    form.parse(req, function (err, fields, files) {
        //获取提交的数据以及图片上传成功返回的图片信息
        console.log(fields);  // 获取表单的数据
        console.log(files);  // 图片上传成功返回的信息
        var title = fields.title[0];
        var price = fields.price[0];
        var fee = fields.fee[0];
        var description = fields.description[0];
 
        var pic = files.pic[0].path;
 
        DB.insert('product', {
            title: title,
            price: price,
            fee: fee,
            description: description,
            pic: pic
 
        }, function (err, data) {
            if (!err) {
                res.send("商品数据库插入成功！！！");
                /*上传成功跳转到首页*/
            }
        })
    });
});
 
 
// 404处理
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
 
// 错误处理
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
 
module.exports = app;