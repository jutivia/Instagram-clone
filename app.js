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

const errorHandler = require('./middlewares/error-handler')
// Routes 
const notFound = require('./middlewares/not-found')
const UserRoute = require('./routes/userAuth')
const auth = require('./middlewares/authorization')
const googleAuth = require('./routes/googleAuth')
const TweetRoutes = require('./routes/tweets')
//middlewares
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 10 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(express.json());

app.use('/api/v1/user', UserRoute)
app.use("/api/v1/user", googleAuth);
app.use("/api/v1/tweets", [auth,TweetRoutes]);


// app.use('/', (req,res)=> res.status(200).json({ msg: "yes" }))



app.use(notFound, errorHandler)

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
start();
