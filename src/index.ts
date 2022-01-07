import { connectDB } from "./config/dbConfig";
import { runningApp } from "./config/appConfig";
import { catchEvent } from "./config/catchEventConfig";


connectDB();

runningApp();

// catchEvent();
