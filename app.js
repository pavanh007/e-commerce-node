import express from "express";
const app = express();
import morgan from 'morgan';
import bodyParser from "body-parser";
// import { rateLimit } from "express-rate-limit";

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

import userRouter from './routes/userRouter.js'
// import authRouter from './routes/authRouter.js'


// //Body parser, reading data from the body into req.body
app.use(express.json({ limit: "10kb" }));


//Development logging configuration
if (process.env.NODE_ENV === "development") {
  console.log("morgan is Enabled");
  app.use(morgan("tiny"));
}
app.use("/v1/users", userRouter);

export default app;
