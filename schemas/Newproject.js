var mongoose = require('mongoose');

//用户的表结构
module.exports = new mongoose.Schema({

    //项目编号
    projectNumber: {
        type: String,
        //待审核
        default: "000"   
    },
 //_id
       //关联字段 - 用户id
       user: {
        //类型
        type: mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'User'
    },
    //项目编号username
    username1: {
        type: String,
        default: "1xx"   
    },
    //姓名
    username: String,
    //性别
    render:String,
    //出生年月
    bothDate:Date,
    //身份证号码
    IDnumber:String,
    //电话号码
    telePhone:Number,
    //为什么需要捐款
    whyNeed:String,
    //身份证正面照
    IDimage1:String,
    //身份证反面照
    IDimage2:String,
    //其他证明 图片
    Otherimage1:String,
    //目标金额
   money:Number,
    //申请天数
    Projectdays:Number,
    //封面图片——图片
    Otherimage2:String,
    //审核状态——————default：待审核 0   同意。1   拒绝。2
    //证据   Array[]
     //添加时间
     addTime: {
        type: Date,
        default: new Date()
    },
    isAgree: {
        type: String,
        //待审核
        default: "2"   
    },
       //管理员修改意见   String
       advice: {
        type: String,
        default: "暂无"
    },
});