import dotenv from "dotenv";
dotenv.config()
 
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import routeAPI from "../routes/routeAPI";
import { corsOptions } from "./corsConfig";
import { catchEvent } from "./catchEventConfig";

const app = express();
const sever = http.createServer(app);

const io = new Server(sever);
const port = process.env.PORT || 3000;

const runningApp = () => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors(corsOptions));

    app.use('/',routeAPI);

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    io.on("connection", (socket) => {
        let events = catchEvent();
        if (events !== undefined ){
            console.log(events);
            socket.emit("newEvent",events);
        }
    })

    sever.listen(port, () => {
        console.log(`Sever is running`);
    });
}


export{
    runningApp, 
};