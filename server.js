const app = require("./app.js");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });


mongoose
  .connect(process?.env?.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: false,
  })
  .then(() => {
    console.log("MongoDB connection established successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    console.error("Error code:", error.code);
    process.exit(1); // Exit the process with an error code
  });;

  const server = app.listen(process?.env?.PORT, () => {
    console.log(`Application runnning on server ${process.env.PORT}`);
  });

  process.on("uncaughtException", (err) => {
    console.error("Unhandled Rejection:", err.stack || err);
    server.close(() => {
      process.exit(1); //1 for uncalled exception and 0 for successfull
    });
  });
  process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err.stack || err);
    server.close(() => {
      process.exit(1); //1 for uncalled exception and 0 for successfull
    });
  });