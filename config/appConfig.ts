import dotenv from "dotenv";
dotenv.config()
 
import express from "express";
const app = express();

const port = process.env.PORT || 3000;

import routeAPI from "../routes/routeAPI";

const runningApp = () => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use('/',routeAPI);

    app.listen(port, () => {
        console.log(`Sever is running on http://localhost:${port}`);
    });
}

export default runningApp;