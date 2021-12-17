const fs=require('fs');
// const { uploadFile } = require('../config/firebaseConfig');

require('dotenv').config();

const {NFTStorage, File, Blob} = require('nft.storage');
const apiKey = process.env.API_NFTSTORAGE;
const client = new NFTStorage({ token: apiKey })
const metadataModel = require("../models/metadataModel");

const multer=require('multer')
const upload=multer({dest:'uploads', 
fileFilter:(req,file,callback)=>{ 
    if(file.mimetype.startsWith('application/json')){ 
        callback(null,true)
    }
    else{
        callback(null,false)
    }
},limits:{fileSize:5000000}})



const uploadJson = async (req,res) => {
    let filename = req.query.filename;
    let tokenId; 
    var data
    if(!filename){
        return res.json({
            code:0,
            msg:"No filename input"
        });
    }

    try{
        data = await fs.readFileSync(`./public/${filename}`);
    }catch(err){
        return res.json({
            code:0,
            msg:"No file to ipfs"
        });
    }
    

    let lastestFile = await metadataModel.find().sort({createdAt:-1}).limit(1);
    if(lastestFile.length !== 0){
        tokenId = parseInt(lastestFile[0].filename.split(".")[0]) + 1;
    }
    else{
        tokenId = 1;
    }

    const content = new Blob([data])
    const cid = await client.storeBlob(content)

    if(cid){
        console.log('Upload Ipfs success');
    }

    let metadata = {
        "attributes": [
          {
            "trait_type": "Species",
            "value": "Crocodile"
          },
          {
            "trait_type": "Color",
            "value": "Yellow"
          }
        ],
        "description": "Crocodile Yellow",
        "image": `https://ipfs.io/ipfs/${cid}`,
        "name": "Animal"
    }

    await fs.writeFileSync(`./public/${tokenId}.json`, String(JSON.stringify(metadata)), "utf-8" );

    fs.renameSync(`./public/${tokenId}.json`,`uploads/${tokenId}.json`)


    const newMetadata = await new metadataModel({
        filename: `${tokenId}.json`,
        url: `uploads/${tokenId}.json`,
        createdAt: Date.now()
    });

    let a = await newMetadata.save();

    if(!a){
        return res.json({
            code:0,
            msg:"Save failed"
        });
    }

    res.json({
        code:1,
        msg:'Upload success'
    });
}

const getJson = async (req,res) => {
   let filename = req.params.filename;
   let curFile = await metadataModel.findOne({filename:filename});
   if(!curFile){
       return res.json({
           code:0,
           msg:"File not found"
       });
   }

   let metadataFile  = fs.readFileSync(curFile.url,"utf-8");

   if(!metadataFile){
       return res.json({
           code:0,
           msg:"File can't read"
       });
   }

   res.json(JSON.parse(metadataFile));
}

const getTokenId = async(req,res) => {
    let lastestFile = await metadataModel.find().sort({createdAt:-1}).limit(1);
    if(lastestFile.length !== 0){
        tokenId = parseInt(lastestFile[0].filename.split(".")[0]);
    }
    else{
        return res.json({
            msg:"No tokenId created"
        });
    }
    res.json({
        tokenId:tokenId,
        msg:`Current tokenId is ${tokenId}`
    });
}

module.exports = {uploadJson,getJson,getTokenId};