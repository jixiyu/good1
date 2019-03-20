var express = require('express');
var router = express.Router();
var multer = require('multer')
var User = require('../models/User');
// var Category = require('../models/Category');
// var Content = require('../models/Content');

var Newproject1 = require('../models/Newproject');

var Witness1 = require('../models/Witness');

//引入全局变量
var Projectnumber;

//统一返回格式
var responseData;

router.use(function (req, res, next) {
    responseData = {
        code: 0,
        message: ''
    }

    next();
});

//获取时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate.toString();
}
var datatime = 'public/images/' + getNowFormatDate();
//将图片放到服务器

var storage = multer.diskStorage({
    // 如果你提供的 destination 是一个函数，你需要负责创建文件夹
    destination: datatime,
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({
    storage: storage
});

/**
 * 首页
 */
router.get('/', function (req, res, next) {
    res.render('users/index', {
        userInfo: req.userInfo
    });
});

//所有用户查看所有项目 get
router.get('/Doproject/projectIndex', function (req, res, next) {
    console.log("——————————————————进入到查看项目的界面！");
   var page = Number(req.query.page || 1);
   var limit = 2;
   var pages = 0;

var date=new Date();

var date1 = new Date('2013/04/02 18:00')
var date2 = new Date('2013/04/02 19:22:21')
 
var s1 = date1.getTime(),s2 = date2.getTime();
var total = (s2 - s1)/1000;
 
 
var day = parseInt(total / (24*60*60));//计算整数天数
var afterDay = total - day*24*60*60;//取得算出天数后剩余的秒数
var hour = parseInt(afterDay/(60*60));//计算整数小时数
var afterHour = total - day*24*60*60 - hour*60*60;//取得算出小时数后剩余的秒数
var min = parseInt(afterHour/60);//计算整数分
var afterMin = total - day*24*60*60 - hour*60*60 - min*60;//取得算出分后剩余的秒数

   Newproject1.count().then(function (count) {

       //计算总页数
       pages = Math.ceil(count / limit);
       //取值不能超过pages
       page = Math.min(page, pages);
       //取值不能小于1
       page = Math.max(page, 1);

       var skip = (page - 1) * limit;

       Newproject1.find(
       ).limit(limit).skip(skip).then(function (projects) {
           console.log(projects);
           res.render('users/projectIndex', {
               userInfo: req.userInfo,
               projects: projects,
               count: count,
               pages: pages,
               limit: limit,
               page: page,
               afterMin:afterMin,
               day:day,
               date:date
           });
       });

   });
   console.log("查询完毕——");
   console.log("查询完毕——");
});


//发起项目的路由 get
router.get('/Doproject/add', function (req, res, next) {
    console.log("发起项目成功！");
    res.render('users/createProject', {
        userInfo: req.userInfo
    });
});

//查看自己审查的项目状态 get



//发出证据的路由 get
router.get('/Doproject/addWitness', function (req, res, next) {
    res.render('users/addWitness1', {
        userInfo: req.userInfo
    });
});

//保存证据的post请求
router.post('/Doproject/witnessSave', upload.single("picUrl"), function (req, res, next) {
    console.log("————————————");
    console.log(req.file);
    console.log("————————————");
    console.log(req.body);
    console.log("————————————");
    console.log("用户" + req.userInfo._id);
    console.log("————————————");
    console.log("————————————");
    console.log("—保存数据的post请求已经被使用———————————");
    console.log("用户" + req.file.path);
    console.log("用户" + req.file.path);

    var postData = {
        //项目编号
        proID: req.body.proid,

        userID: req.userInfo._id,
        //说明
        explain: req.body.shuoming,
        //凭证图片
        WitnessPhoto: req.file.path,
        //以太坊地址
        addr1: req.body.address1,
        //需要金额
        money1: req.body.money1
    }

    var Witness12 = new Witness1({
        proID:postData.proid,
        userID:postData.userID,
        explain:postData.explain,
        WitnessPhoto:postData.WitnessPhoto,
        addr1:postData.addr1,
        money1:postData.money1

    })

    Witness12.save().then(function (newContent) {
        console.log("success");
        responseData.message = '————————————提交证据成功————————————';
        // responseData.data = newContent;
        // res.json(responseData);
    }).then(function (newCategory) {
        res.render('users/success', {
            userInfo: req.userInfo,
            message: '提交证据成功',
            url: '/user12'
        });
    });

})

//发起项目的post请求
router.post('/Doproject/addp', upload.any(), function (req, res, next) {
    Projectnumber++;
    console.log("输出Projectnumber" + Projectnumber);
    console.log("————————————");
    console.log("提交post请求");
    console.log("————————————");
    console.log(req.files);
    console.log("————————————");
    console.log(req.body);
    console.log("————————————");
    console.log("————————————");
    console.log("用户" + req.userInfo._id);
    console.log("————————————");
    console.log("—发起项目的post请求已经被使用———————————");
    // console.log(req.files[0]);
    // console.log(req.files[0].filename);
    // console.log(req.files[0].size);
    // console.log(req.files[0].path);


    //内容的id
    var projectId = req.body.projectId || '';
    var postData = {
        //项目编号
        projectNumber: req.userInfo._id + String(Projectnumber),
        //用户名id
        username1: req.userInfo._id,

        //用户名
        username: req.userInfo.username,
        //真实姓名
        projectUsername: req.body.projectUsername,
        //性别
        render: req.body.gender,
        //出生年月

        //身份证号码
        IDnumber: req.body.idendity,
        //电话号码
        telePhone: req.body.telephone,
        //为什么需要捐款

        whyNeed: req.body.projectWhyneed,
        //身份证正面照
        IDimage1: req.files[0].path,
        //身份证正面照
        IDimage2: req.files[1].path,
        //其他证明 图片
        Otherimage1: req.files[2].path,
        //目标金额
        money: req.body.money,
        //申请天数
        Projectdays: req.body.days,
        //封面图片——图片
        Otherimage2: req.files[3].path,
        //审核状态——————default：待审核 0   同意。1   拒绝。2
        //证据   Array[]


        //添加时间
        addTime: new Date(),
    };


    var project = new Newproject1({

        projectNum: postData.projectNum,

        username1: postData.username1,
        //真实姓名
        username: postData.projectUsername,
        //性别
        render: postData.render,
        //出生年月
        //身份证号码
        IDnumber: postData.IDnumber,
        //电话号码
        telePhone: postData.telePhone,
        //为什么需要捐款

        whyNeed: postData.whyNeed,
        //身份证正面照
        IDimage1: postData.IDimage1,
        //身份证正面照
        IDimage2: postData.IDimage2,
        //其他证明 图片
        Otherimage1: postData.Otherimage1,
        //目标金额
        money: postData.money,
        //申请天数
        Projectdays: postData.Projectdays,
        //封面图片——图片
        Otherimage2: postData.Otherimage2
    });


    project.save().then(function (newContent) {
        console.log("success");
        responseData.message = '提交项目成功';
        // responseData.data = newContent;
        // res.json(responseData);
    }).then(function (newCategory) {
        res.render('users/success', {
            userInfo: req.userInfo,
            message: '提交项目成功',
            url: '/user12'
        });
    });


});


/*
* 分类的保存
* */
router.post('/category/add', function (req, res) {

    var name = req.body.name || '';

    if (name == '') {
        res.render('admin/error', {
            userInfo: req.userInfo,
            message: '名称不能为空'
        });
        return;
    }

    //数据库中是否已经存在同名分类名称
    Category.findOne({
        name: name
    }).then(function (rs) {
        if (rs) {
            //数据库中已经存在该分类了
            res.render('admin/error', {
                userInfo: req.userInfo,
                message: '分类已经存在了'
            })
            return Promise.reject();
        } else {
            //数据库中不存在该分类，可以保存
            return new Category({
                name: name
            }).save();
        }
    }).then(function (newCategory) {
        res.render('admin/success', {
            userInfo: req.userInfo,
            message: '分类保存成功',
            url: '/admin/category'
        });
    })

});

// //发起项目的post请求
// router.post('/Doproject/addp', function(req, res, next) {
//     console.log("提交post请求");
//     console.log(req.body);
//     console.log(req.path);


// });

// router.post('/Doproject/addp',upload.single('picUrl4'),function(req,res,next){
//     res.send(req.body);
//     // res.send(req.body);
//     console.log(req.body.picUrl1)//console.log(req.query.picTitle);//get
//     console.log(req.body.picUrl1)
//     console.log(req.file)//req.file文件的具体信息

// });

// router.post('/Doproject/addp',function(req,res,next){
//     //多个文件上传
//     upload(req,res,function(err){
//         if(err){
//             console.error('[System] '+err.message);
//         }else{
//             //循环处理
//             var fileCount=req.files.length;
//              req.files.forEach(function(i){
//                  //设置存储的文件路径
//                  var uploadFilePath=uploadDir+i.originalname;
//                  //获取临时文件的存储路径
//                  var uploadTmpPath=i.path;
//                  //读取临时文件
//                  fs.readFile(uploadTmpPath,function(err,data){
//                      if(err){
//                          console.error('[System] '+err.message);
//                      }else{
//                          //读取成功将内容写入到上传的路径中，文件名为上面构造的文件名
//                          fs.writeFile(uploadFilePath,data,function(err){
//                              if(err){
//                                  console.error('[System] '+err.message);
//                              }else{
//                                  //写入成功,删除临时文件
//                                  fs.unlink(uploadTmpPath,function(err){
//                                      if(err){
//                                          console.error('[System] '+err.message);
//                                      }else{
//                                          console.log('[System] '+'Delete '+uploadTmpPath+' successfully!');
//                                      }
//                                  });
//                              }
//                          });
//                      }
//                  });
//             });

//             //所有文件上传成功
//             //回复信息
//             var reponse={
//                 message:'File uploaded successfully',
//             };
//             //返回
//             res.end(JSON.stringify(reponse));
//         }
//     });
// });

//显示项目审核页面————————传入数据库数据

router.get('/Doproject/checkUserProject', function (req, res) {

    /*
    * 从数据库中读取所有的用户数据
    *
    * limit(Number) : 限制获取的数据条数
    *
    * skip(2) : 忽略数据的条数
    *
    * 每页显示2条
    * 1 : 1-2 skip:0 -> (当前页-1) * limit
    * 2 : 3-4 skip:2
    * */

    var page = Number(req.query.page || 1);
    var limit = 5;
    var pages = 0;

    Newproject1.find(
        {
            username1: req.userInfo._id
        }
    ).count().then(function (count) {

        //计算总页数
        pages = Math.ceil(count / limit);
        //取值不能超过pages
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);

        var skip = (page - 1) * limit;

        Newproject1.find(
            {
                username1: req.userInfo._id
            }
        ).limit(limit).skip(skip).then(function (projects) {
            console.log(projects);
            res.render('users/userProjectCheck', {
                userInfo: req.userInfo,
                projects: projects,

                count: count,
                pages: pages,
                limit: limit,
                page: page
            });
        });

    });
    console.log("查询完毕——");
    console.log("查询完毕——");
});

//显示证据审核页面————————传入数据库数据

router.get('/Doproject/userWitnessCheck', function (req, res) {

    /*
    * 从数据库中读取所有的用户数据
    *
    * limit(Number) : 限制获取的数据条数
    *
    * skip(2) : 忽略数据的条数
    *
    * 每页显示2条
    * 1 : 1-2 skip:0 -> (当前页-1) * limit
    * 2 : 3-4 skip:2
    * */

    var page = Number(req.query.page || 1);
    var limit = 10;
    var pages = 0;

    Witness1.find(
        {
            userID: req.userInfo._id
        }
    ).count().then(function (count) {

        //计算总页数
        pages = Math.ceil(count / limit);
        //取值不能超过pages
        page = Math.min(page, pages);
        //取值不能小于1
        page = Math.max(page, 1);

        var skip = (page - 1) * limit;

        Witness1.find(
            {
                userID: req.userInfo._id
            }
        ).limit(limit).skip(skip).then(function (witness) {
            console.log(witness);
            res.render('users/userWitnessCheck', {
                userInfo: req.userInfo,
                witness: witness,

                count: count,
                pages: pages,
                limit: limit,
                page: page
            });
        });

    });
    console.log("查询完毕——");
    console.log("查询完毕——");
});

module.exports = router;