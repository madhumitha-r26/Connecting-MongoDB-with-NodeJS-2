const mongoose = require("mongoose");
const dotenv = require("dotenv");

function DbConnection() {
  dotenv.config();
  mongoose.connect(process.env.MONGO_URL);

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "Connection Error"));

  db.once("open", function () {
    console.log("DB CONNECTED!");
  });
}

module.exports = DbConnection;
