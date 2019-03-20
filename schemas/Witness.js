var mongoose = require('mongoose');

//用户的表结构
module.exports = new mongoose.Schema({
    //关联字段 - 用户id
    user: {
        //类型
        type: mongoose.Schema.Types.ObjectId,
        //引用
        ref: 'User'
    },

    // 编号
    proID: {
        type: String,
        default: "0000"
    },
     // 用户名id
     userID: {
        type: String,
        default: "0000"
    },
    //说明
    explain: {
        type: String,
        default: "0000"
    },
      //凭证图片
      WitnessPhoto: {
        type: String,
        default: null
    },
    //以太坊地址
    addr1: {
        type: String,
        default: "0000"
    },
    //需要金额
    money1: {
        type: Number,
        default: 0
    },
    //是否通过
    isAgree1: {
        type: String,
        default: "2"   // 待审核
    },
   //修改意见
   revice1: {
    type: String,
    default: "暂无"   // 
} 

});