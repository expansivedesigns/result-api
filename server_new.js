const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const routesUrls = require("./routes/routes")
const cors = require("cors")
//const bodyParser = require("body-parser")
const app = express()

dotenv.config()

const PORT= process.env.DATABASE_ACCESS || 4000; 

mongoose.connect(process.env.DATABASE_ACCESS, 
    { 	
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
	}, () => 
	console.log("Connected to mongoDB!")
)

//middleware
app.use(express.json())
app.use(cors())
app.use("/app", routesUrls)
//app.use(bodyParser.json())

app.get("/", (req, res) => res.send("Welcome to the API!")); 
app.all("*", (req, res) => res.send("You've tried reaching a route that doesn't exist."));
app.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`)); 
