const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const {isValidRequestBody, ValidName, ValidEmail, ValidPhone}= require("../validation/validation")

const createUser = async function(req, res){
    try {
        //req.body = JSON.parse(JSON.stringify(req.body))
        let data = req.body
        console.log(data)   
        
        // if(!isValidRequestBody(data)) return res.status(400).send({status: false, message: "Body can't be empty, Please entr some data"})
        const {fname, lname, email, phone} = data

        if(!ValidName(fname)) return res.status(400).send({status: false, message: "Please enter valid first name"})

        if(!ValidName(lname)) return res.status(400).send({status: false, message: "Please enter valid last name"})

        if(!ValidEmail(email)) return res.status(400).send({status: false, message: "Please enter valid email"})

        if(!ValidPhone(phone)) return res.status(400).send({status: false, message: "Please enter valid Phone no."})


        const savedData = await userModel.create(req.body)
        return res.send({status: true, message: "hy guys"})




    } catch (error) {
     return res.status(500).send({status: false, message: error.message})
    }
}

module.exports.createUser=createUser