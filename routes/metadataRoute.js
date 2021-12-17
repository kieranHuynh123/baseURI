const express = require("express");
const metadataRouter = express.Router();
const { uploadJson,getJson,getTokenId } = require('../controllers/metadataController');

metadataRouter.get('/ipfs',uploadJson);
metadataRouter.get('/get/:filename',getJson);
metadataRouter.get('/tokenId',getTokenId);

module.exports = metadataRouter;