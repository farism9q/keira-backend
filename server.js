const mongoose = require("mongoose");
const doteve = require("dotenv").config({ path: "./config.env" });

const DB = process.env.DATABASE_CONNECTION.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

// Connect to the database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("DATABASE connection has done successfully"));

const app = require("./app");

const port = process.env.PORT || 3000;

// Start the server
const server = app.listen(port, () => {
  console.log("App is running 🚀🚀");
});
