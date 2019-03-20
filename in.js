const ipfsFile = require('./ipfsFile');
const fs = require('fs');

//操作文件
let addPath = "./public/images/2019-03-12/cookie.png";
let getPath = "./public/images/2019-03-12/cookie.png";
let buff = fs.readFileSync(addPath);
ipfsFile.add(buff).then((hash)=>{
    console.log(hash);
    console.log("http://localhost:8080/ipfs/"+hash);
    return ipfsFile.get(hash);
}).then((buff)=>{
    fs.writeFileSync(getPath,buff);
    console.log("file:"+getPath);
}).catch((err)=>{
    console.log(err);
})

//操作内容
let User = {
    "name":"naruto",
    "age":23,
    "level":"ss"
};
buff = Buffer.from(JSON.stringify(User));
ipfsFile.add(buff).then((hash)=>{
    console.log(hash);
    console.log("http://localhost:8080/ipfs/"+hash);
    return ipfsFile.get(hash);
}).then((buff)=>{
    let obj = JSON.parse(buff.toString('utf-8'));
    console.log(obj);
}).catch((err)=>{
    console.log(err);
})
