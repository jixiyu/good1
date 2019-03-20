var express = require('express');
var app = express();
var mongoose = require('mongoose');
var router = express.Router();

var multer = require('multer')

var ipfsClient = require('ipfs-http-client')

// connect to ipfs daemon API server
var ipfs = ipfsClient('localhost', '5001', { protocol: 'http' }) // leaving out the arguments will default to these values


require('./model.js');
// require("ejs");    ——————————修改

//加载模板处理模块
var swig = require('swig');

//加载body-parser，用来处理post提交过来的数据
var bodyParser = require('body-parser');

var User = require('./models/User');

require("./routers/main");

//设置cookies
var Cookies = require("cookies");

mongoose.Promise = global.Promise;  //为了避免警告的出现，因为mongoose的默认promise已经弃用了
//设置静态文件托管
//当用户访问的url以/public开始，那么直接返回对应__dirname + '/public'下的文件
app.use('/public', express.static(__dirname + '/public'));


//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是views，第二个参数是目录
app.set('views', './views');
//注册所使用的模板引擎，第一个参数必须是 view engine，第二个参数和app.engine这个方法中定义的模板引擎的名称（第一个参数）是一致的
app.set('view engine', 'html');
//在开发过程中，需要取消模板缓存
swig.setDefaults({ cache: false });

//bodyparser设置
app.use(bodyParser.urlencoded({ extended: true }));

// app.set('view engine', 'ejs');  _____修改


// router.post('/addPicture',upload.single('picUrl'),function(req,res,next){
//     console.log(req.body.picTitle)//console.log(req.query.picTitle);//get
//     console.log(req.body.picType)
//     console.log(req.file)//req.file文件的具体信息
//     res.send({ret_code: datatime});
// });




//设置cookie
app.use(function (req, res, next) {
    req.cookies = new Cookies(req, res);
    //解析登录用户的cookie信息
    req.userInfo = {};
    if (req.cookies.get('userInfo')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));

            //获取当前登录用户的类型，是否是管理员
            User.findById(req.userInfo._id).then(function (userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            })
        } catch (e) {
            next();
        }

    } else {
        next();
    }
});


app.use("/user12",require("./routers/user12"));
app.use("/admin",require("./routers/admin"));
app.use("/api", require("./routers/api"));
app.use("/", require("./routers/main"));


var url = "mongodb://127.0.0.1:27017/ref";   //mongo是我的数据库
var db = mongoose.connect(url, function (err) {
    if (err) {
        console.log("数据库连接失败");
    }
    else {

        console.log("数据库连接成功");

        var server = app.listen(3000, function () {
            console.log("start");
        })
    }

});                     //连接数据库

