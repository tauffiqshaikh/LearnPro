import express from "express"
import cors from 'cors'
import { readdirSync } from 'fs'
import mongoose from "mongoose"

const morgan = require("morgan")
require("dotenv").config()

//creating express app
const app = express();

//db
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=> console.log("**DB CONNECTED**"))
.catch((e)=> console.log("DB CONNECTION ERR => ", e));

//apply middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


//route
readdirSync('./routes').map((r) => 
app.use("/api", require(`./routes/${r}`)));

//port
const port = process.env.PORT || 8000;

app.listen(port, ()=>console.log(`Server is running on ${port}`) );