var fs = require('fs');
var express = require('express');
var multer  = require('multer')
var app = express();

app.set('view engine', 'html');

var createFolder = function(folder) {
    try {
        fs.accessSync(folder);
    } catch (e) {
        fs.mkdirSync(folder);
    }
};

var uploadFolder = './upload/';

createFolder(uploadFolder);

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadFolder);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

// 多图上传
app.post('/upload', upload.array('logo', 2), function(req, res, next){
    res.send({ret_code: '0'});
});

// app.get('/form', function(req, res, next){
//     var form = fs.readFileSync('./form.html', {encoding: 'utf8'});
//     res.send(form);
// });

module.exports=server_load;