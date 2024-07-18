const express = require("express")
const cors = require("cors")
const cookieparser = require("cookie-parser");
const dotenv = require("dotenv");
const { route } = require("./src/routes/route");
const pool = require("./db_connect");
const errorHandler = require("./src/middleware/errorHandling");
dotenv.config()

const helmet = require('helmet')


const app = express();
const PORT = process.env.PORT || 3002
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 204,
};
app.use(helmet())


app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieparser());

app.use(route)

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`ur running on http://localhost:${PORT}`)
})



