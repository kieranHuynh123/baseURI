import dotenv from "dotenv";
dotenv.config();

import web3 from 'web3';
import eventModel from "../models/eventModel";
import data from "../abis/nftAuction.json";

const { RINKEBY_NET } = process.env;
const provider = new web3.providers.WebsocketProvider((<any>RINKEBY_NET));
const Web3 = new web3(provider);
const contracts = new Web3.eth.Contract((<any>data).abi, (<any>data).address);

const catchEvent = () => {
    let newEvent: any;
    contracts.events.BidMade({filter : {}, fromBlock:"latest"}, async (err: any, data: any) => {
        if(err) {
            console.log(err);
        }
        else {
            newEvent = await new eventModel({
            nftContractAddress: data.returnValues.nftContractAddress,
            tokenId: data.returnValues.tokenId,
            bidder: data.returnValues.bidder,
            ethAmount: data.returnValues.ethAmount
            });
            
            await newEvent.save(); 
        }
    })

    console.log(newEvent);
    
    return newEvent;
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
    catchLastEvent,
}    