const userModel = require("../models/userModel")
//const jwt = require("jsonwebtoken")

const mongoose = require("mongoose")
const {isValidRequestBody, ValidName, ValidEmail, ValidPhone,isValid,isValidObjectId}= require("../validation/validation")

const createUser = async function(req, res){
    try {
        //req.body = JSON.parse(JSON.stringify(req.body))
       let data = req.body

       if(!isValidRequestBody(data)) return res.send({status: false, message: "hy guysvnkmvbj"})

       const {fname, lname, email, phone,profileImage,address,} = data

       if(!isValid(fname)) return res.send({status: false, message: "first name required"})
       if(!isValid(lname)) return res.send({status: false, message: "first name required"})
       if(!isValid(email)) return res.send({status: false, message: "first name required"})
       if(!isValid(phone)) return res.send({status: false, message: "first name required"})
      // if(!isValid(address.shipping)) return res.send({status: false, message: " address  is required"})
      // if(!isValid(address.billing)) return res.send({status: false, message: " address  is required"})
       






       if(!ValidName(fname)) return res.send({status: false, message: "first name is incorrect"})
       if(!ValidName(lname)) return res.send({status: false, message: "last name is incorrect"})

       if(!ValidEmail(email)) return res.send({status: false, message: "email is incorrect"})
       if(!ValidPhone(phone)) return res.send({status: false, message: "phone is incorrect"})
// if(!ValidName(shipping.city)) return res.send({status: false, message: "city is incorrect"})
// if(!ValidName(shipping.street)) return res.send({status: false, message: "street is incorrect"})

// if(!ValidName(billing.city)) return res.send({status: false, message: "city is incorrect"})
// if(!ValidName(billing.street)) return res.send({status: false, message: "street is incorrect"})
if(!ValidName(profileImage))return res.send({status: false, message: "profileImage is incorrect"})




    //    const userData = {
    //     fname, lname, email, phone
    //    }
        let savedData = await userModel.create(data)
        res.send({status: true, message: "hy guys", data:savedData})





    } catch (error) {
     return res.status(500).send({status: false, message: error.message})
    }
}


const getUser = async function (req, res) {
    try {
        const userId = req.params.userId
        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "invalid user Id" })
        const findUserId = await userModel.findById({ _id: userId })
        if (!findUserId) return res.status(404).send({ status: false, message: "user details not found" })
        return res.status(200).send({ status: true, message: "User profile details", data: findUserId })
    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}



module.exports = { createUser,getUser }