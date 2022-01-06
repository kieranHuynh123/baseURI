import dotenv from "dotenv";
dotenv.config();

const { USERNAME_DB, PASSWORD_DB, NAME_DB } = process.env;

import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect(
      `mongodb+srv://${ USERNAME_DB }:${ PASSWORD_DB }@cluster0.viwvr.mongodb.net/${ NAME_DB }?retryWrites=true&w=majority`,
      (error) => {
        if (error) {
          console.log(error);
        } 
        else {
          console.log("Connect succesfully to database!");
        }
      }
    );
};

export { 
  connectDB,
};