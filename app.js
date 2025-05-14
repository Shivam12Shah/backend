const express = require("express")
const app = express()
require("dotenv").config({path:"./.env"})
const cookieParser = require('cookie-parser');
const indexRouter = require("./routes/indexRoute")
const userRouter = require("./routes/userRouter")
const morgan = require("morgan")

require("./config/dbconection").dbconnection()
app.use(morgan("dev"))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));



app.use("/", indexRouter)
app.use("/user", userRouter)

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server is running on port 3000')
})