import AppInit from "./src/index.router.js";
import dotenv from "dotenv";
import express from "express";
import moment from "moment/moment.js";
const app = express();
dotenv.config();
AppInit(app, express);

console.log(moment().format());
console.log(moment().format("LT"));
console.log(new Date().toString());
console.log(String(new Date()));
console.log(moment().add(2, "minutes").format("LT"));

app.listen(process.env.PORT, () => {
  console.log(`server is working now on ..... ${process.env.PORT}`);
});
