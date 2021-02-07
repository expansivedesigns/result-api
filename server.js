const express = require('express')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose')
const routesUrls = require('./routes/routes')
const cors = require('cors')

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI, {         
        //await mongoose.connect(`mongodb+srv://DB_USER:DB_PASS@cluster0.fv0mg.mongodb.net/mytable?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }, () => console.log("Connected to mongoDB!"))
    } catch(err){
        console.error(err)
    }
}

connectDB()
   

app.use(express.json())
app.use(cors())
app.use('/app', routesUrls)
app.listen(4000, () => console.log('server up and running'))