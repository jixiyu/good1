// var ipfs=require("ipfs-api");

const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});

ipfs.util.addFromFs('../', { recursive: true , ignore: ['subfolder/to/ignore/**']}, (err, result) => {
    if (err) { throw err }
    console.log(result)
  })
