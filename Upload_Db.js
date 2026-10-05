const fs = require("fs");
const mongoose = require("mongoose");
const movieModel = require("./models/movie.model");
const { initializeDatabase } = require("./db/db.connect");
const { json } = require("stream/consumers");
initializeDatabase();
const Upload_db = async () => {
  try {
    const rowData = fs.readFileSync("./movies.json", "utf-8");
    const Obj = JSON.parse(rowData);
    await movieModel.deleteMany();
    await movieModel.insertMany(Obj);
    console.log("move uploaded to the Db successfully");
  } catch (error) {
    console.log(error);
  }
};
Upload_db();
