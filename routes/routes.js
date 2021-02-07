const express = require("express")
const router = express.Router()
const signUpTemplateCopy = require("../models/SignUpModels")
const bcrypt = require("bcrypt")

let results = []

router.post("/signup", async (request, response) => {
    // {
    //     "firstName":"jane",
    //     "usename":"janed",
    //     "email":"jane@mail",
    //     "password":"janeyj"
    // }    
    //results.push({...signedUpUser}) - try this here instead of bottom

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(request.body.password, saltPassword)   

    const signedUpUser = new signUpTemplateCopy({ 
            fullName:request.body.fullName,
            username:request.body.username,
            email:request.body.email,
            password:securePassword
            //password:request.body.password
    })

    signedUpUser.save()
    // .then(data =>{
    //     response.json(data)
    // })
    // .catch(error =>{
    //     response.json(error)
    // })

    response.send(`${signedUpUser} added to the database`) 
    results.push(signedUpUser)  
})

module.exports = router