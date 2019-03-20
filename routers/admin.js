var express = require('express');
var router = express.Router();

var User = require('../models/User');
// var Category = require('../models/Category');
// var Content = require('../models/Content');

router.use(function(req, res, next) {
    if (!req.userInfo.isAdmin) {
        //如果当前用户是非管理员
        res.send('对不起，只有管理员才可以进入后台管理');
        return;
    }
    next();
});

/**
 * 首页
 */
router.get('/', function(req, res, next) {
    res.render('admin/index', {
        userInfo: req.userInfo
    });
});

//管理员审核所有项目   get


router.get('/adminProject', function (req, res) {

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

    Newproject1.count().then(function (count) {

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

router.get('/adminWitness', function (req, res) {

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

    Witness1.count().then(function (count) {

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




router.get('/user', function(req, res) {

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
    var limit = 2;
    var pages = 0;

    User.count().then(function(count) {

        //计算总页数
        pages = Math.ceil(count / limit);
        //取值不能超过pages
        page = Math.min( page, pages );
        //取值不能小于1
        page = Math.max( page, 1 );

        var skip = (page - 1) * limit;

        User.find().limit(limit).skip(skip).then(function(users) {
            res.render('admin/user_index', {
                userInfo: req.userInfo,
                users: users,

                count: count,
                pages: pages,
                limit: limit,
                page: page
            });
        });

    });

});

module.exports=router;