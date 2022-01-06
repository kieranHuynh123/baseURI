import dotenv from "dotenv";
dotenv.config();


import web3 from 'web3';
import eventModel from "../models/eventModel";
import data from "./nftAuction.json";

const { PROVIDER } = process.env;
const provider = new web3.providers.WebsocketProvider((<any>PROVIDER));
const Web3 = new web3(provider);
const contracts = new Web3.eth.Contract((<any>data).abi, (<any>data).address);


const catchEvent = () => {
    contracts.events.BidMade({filter : {}, fromBlock:"latest"}, async (err: any, data: any) => {
        if(err) {
            console.log(err);
        }
        else {
            const newEvent = await new eventModel({
            nftContractAddress: data.returnValues.nftContractAddress,
            tokenId: data.returnValues.tokenId,
            bidder: data.returnValues.bidder,
            ethAmount: data.returnValues.ethAmount
            });
            
            await newEvent.save(); 
        }
    })
}

const catchLastEvent = async (tokenId: any) => {
    let options = {
        filter: {
            tokenId: tokenId   
        },
        fromBlock: 0,                  
        toBlock: 'latest'
    };

    let result = await contracts.getPastEvents('BidMade', options);
      
    return result;
}
  
export { 
    catchEvent,
    catchLastEvent
}    