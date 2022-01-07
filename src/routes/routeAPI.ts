import express from "express";
import eventRouter from "./eventRoute";

const routeAPI = express.Router();

routeAPI.use('/event', eventRouter);

export default routeAPI;
