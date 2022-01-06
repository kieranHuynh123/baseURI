import eventModel from "../models/eventModel";
import { Request, Response } from "express";
import { catchLastEvent } from "../config/catchEventConfig";

// Get made bid event with tokenId
const getEventFromDB = async (req: Request, res: Response) => {
    let tokenId = req.query.tokenId;
    if(!tokenId){
        return res.json({
            code: -1,
            msg: "Missing tokenId in query"
        })
    }

    let event = await eventModel.findOne({tokenId:tokenId});

    if(!event){
        return res.json({
            code: 0,
            msg: "No event with tokenId"
        })
    }
    
    return res.json({
        code: 1,
        msg: event
    })
}

const getEventFromBlockchain = async (req: Request, res: Response) => {
    let tokenId = req.query.tokenId;

    if(!tokenId){
        return res.json({
            code: -1,
            msg: "Missing tokenId in query"
        })
    }

    let event: any = await catchLastEvent(tokenId);

    if(!event){
        return res.json({
            code: 0,
            msg: "No event with tokenId"
        })
    }

    return res.json({
        code: 1,
        msg: event
    })
}

export {
    getEventFromDB,
    getEventFromBlockchain,
}