var express = require('express');
var router = express.Router();



router.use("/",function (req, res, next) {
    console.log("1");
    res.render('main/register1',{
        userInfo: req.userInfo
    });
    console.log("2");
});

module.exports = router;