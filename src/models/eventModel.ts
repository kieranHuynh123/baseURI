import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const events = new Schema({
    nftContractAddress: String,
    tokenId: String,
    bidder: String,
    ethAmount:String
}, {
    timestamps: true
});

export default mongoose.model('events',events);