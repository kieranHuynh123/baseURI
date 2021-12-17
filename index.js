const express = require("express");
const app = express();
const fs = require("fs");
const metadataRouter  = require("./routes/metadataRoute");
const { connectDB } = require("./config/dbConfig");
 
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/metadata", metadataRouter);



connectDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
