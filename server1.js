
var express = require('express');
var multer = require("multer");
var app = express();
var bodyParse = require('body-parser');
var router = express.Router();
 
// 设置图片存储路径
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
 
// 添加配置文件到muler对象。
var upload = multer({ storage: storage });
var imgBaseUrl = '../'
 
// bodyParse 用来解析post数据
app.use(bodyParse.urlencoded({extended:false}));
app.use(express.static('public'));
 
// 解决跨域问题
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
 
  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});
 



// 文件上传请求处理，upload.array 支持多文件上传，第二个参数是上传文件数目
app.post('/upload/img', upload.array('img', 2), function (req, res) {
  // 读取上传的图片信息
  var files = req.files;
 
  // 设置返回结果
  var result = {};
  if(!files[0]) {
    result.code = 1;
    result.errMsg = '上传失败';
  } else {
    result.code = 0;
    result.data = {
      url: files[0].path
    }
    result.errMsg = '上传成功';
  }
  res.end(JSON.stringify(result));
});
 
// 监听3000端口
var server=app.listen(3000, '0.0.0.0', function () {
  console.log('listening at =====> http://0.0.0.0:3000......');
}) ;

// //另一个文件
// router.post('/proupload',upload.array('file',1),(req,res,next) => {  //第一个参数地址，第二个是照片数量，第三个是回调
// 	var proObj = req.body 
// 		if(req.files.length != 0){ //判断submit提交是否有file值，有的话执行如下操作
// 			var arr = req.files[0];//取到文件（照片）
// 			var obj = new Object();//定义一个对象
// 			fs.rename(arr.destination + arr.filename, arr.destination + arr.originalname,() => { //利用fs模块对获取的文件名进行重命名
// 			obj.origin ='http://localhost:3000/uploads/'+ arr.originalname;//拼接，把照片地址改成服务器能获取的地址
// 				proObj.poster = obj//把对象赋值给req.body（根据需要，这是主要是需要在proObj内部进行嵌套，一般可直接应用，无需定义obj对象）
// 		console.log(proObj._id)//本来打算利用数据库的唯一标识符_id进行修改，结果发现想多了
// 		MongoClient.mongoConnect('app',(db) => {
// 			console.log('chenggonfle哈哈')//小编测试了一下是否连接到了数据库
// 			MySql.updateData(db,'movies',{"name":proObj.name},{$set:proObj},() => {//此处是利用from表单内部传过来的名字
// 				res.send()//注意应用重定向时，send要传空值
// 				res.redirect('/')//重定向到首页
// 				db.close();
// 			})
// 		},(err) => {
// 			console.log(err)
// 			res.send('0')
// 			db.close();
// 		})
// 			},(err) => {
// 				res.send('0')
// 			})
// 		}else{//file只有文本没有文件照片的时候
// 				MongoClient.mongoConnect('app',(db) => {
// 					console.log('成功了啊 啊啊')
// 					console.log(proObj.id)
// 					console.log(proObj)
// 				MySql.updateData(db,'movies',{"name":proObj.name},{$set:proObj},() => {
// 					console.log('修改成功')
// 					res.send()
// 					res.redirect('/')
// 					db.close();
// 				})
// 			},(err) => {
// 				console.log(err)
// 				res.send('0')
// 				db.close();
// 			})
// 		}
// })
