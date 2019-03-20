const ipfsAPI = require("ipfs-http-client");
const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});

exports.add = (buffer) =>{
    return new Promise((resolve,reject)=>{
        try {
            ipfs.add(buffer, function (err, files) {
                if (err || typeof files == "undefined") {
                    reject(err);
                } else {
                    resolve(files[0].hash);
                }
            })
        }catch(ex) {
            reject(ex);
        }
    })
}
exports.get = (hash) =>{
    return new Promise((resolve,reject)=>{
        try{
            ipfs.get(hash,function (err,files) {
                if (err || typeof files == "undefined") {
                    reject(err);
                }else{
                    resolve(files[0].content);
                }
            })
        }catch (ex){
            reject(ex);
        }
    });
}
