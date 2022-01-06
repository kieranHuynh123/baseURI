import express from 'express';
import { getEventFromDB, getEventFromBlockchain } from '../controllers/eventController';

const eventRouter = express.Router();

eventRouter.get('/sever', getEventFromDB);
eventRouter.get('/blockchain', getEventFromBlockchain);

export default eventRouter;