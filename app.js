require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const connectDb = require('./db/connectDb')

//security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// Routes 
const notFound = require('./middlewares/not-found')

//middlewares
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(express.json());






app.use(notFound);
const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        const port = process.env.PORT || 8000
        app.listen(port, () => {
            console.log(`listening on port: ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()