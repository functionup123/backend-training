const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const aws = require("../util/aws")
const jwt = require("jsonwebtoken")
const {uploadFile} = require("../util/aws")

const mongoose = require("mongoose")
const {isValidRequestBody, ValidName, isValidPassword, ValidEmail, ValidPhone,isValid,isValidObjectId}= require("../validation/validation")

const createUser = async function(req, res){
    try {
        //req.body = JSON.parse(JSON.stringify(req.body))
  //      let file = req.profileImage
       let data = req.body
       let files = req.files
       console.log(data)

       if(!isValidRequestBody(data)) return res.send({status: false, message: "hy guysvnkmvbj"})

       const {fname, lname, email, phone,profileImage,password, address} = data

       if(!isValid(fname)) return res.send({status: false, message: "first name required"})
       if(!isValid(lname)) return res.send({status: false, message: "first name required"})
       if(!isValid(email)) return res.send({status: false, message: "first name required"})
       if(!isValid(phone)) return res.send({status: false, message: "first name required"})
       

       if(!ValidName(fname)) return res.send({status: false, message: "first name is incorrect"})
       if(!ValidName(lname)) return res.send({status: false, message: "last name is incorrect"})

       if(!ValidEmail(email)) return res.send({status: false, message: "email is incorrect"})
       if(!ValidPhone(phone)) return res.send({status: false, message: "phone is incorrect"})
    if(!ValidName(profileImage))return res.send({status: false, message: "profileImage is incorrect"})

    //if(!ValidName(password)) return res.send({status: false, message: "Password is not valid"})
    if(!isValidPassword(password)) return res.send({status: false, message: "enter correct password"})

    const bcryptPassword = await bcrypt.hash(password, 10)
        data.password = bcryptPassword
        

        if(files && files.length>0){
            let image = await uploadFile(files[0])
            if(!image) return res.status(400).send({status: false, message: "profileImage is required"})
            data.profileImage=image
        }

        let newAdd= address.shipping

        const {city, street, pincode} = newAdd
        console.log(city)
        console.log(street)

        let savedData = await userModel.create(data)
        res.send({status: true, message: "hy guys", data:savedData})





    } catch (error) {
     return res.status(500).send({status: false, message: error.message})
    }
}

//-------------------------------------------------------------------------------

const loginUser= async function(req, res){
    try {
        let requestBody = req.body
        const{email, password} = requestBody
        if(!isValid(email)) return res.send({status: false, message: "first name required"})
        if(!ValidEmail(email)) return res.send({status: false, message: "email is incorrect"})

        if(!isValid(password)) return res.send({status: false, message: "password is required"})

        let userLogin = await userModel.findOne({email})
        if(!userLogin) return res.send({status: false, message: "Not found"})
        let checkPassword = await bcrypt.compare(password, userLogin.password)
        if(!checkPassword) return res.send({status: false, message: "Password not valid"})

        let token = jwt.sign({
            userId: userLogin._id}, "e-website@project5", {expiresIn: '24h'}
        )
        return res.send({status: true, message: "User loged in successfully", data: token})

    } catch (error) {
        return res.status(500).send({status: false, message: error.message})
    }
}


//----------------------------------------------------------------------------------------------------


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



module.exports = { createUser,loginUser,getUser }