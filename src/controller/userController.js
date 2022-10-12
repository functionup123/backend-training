const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const aws = require("../util/aws")
const jwt = require("jsonwebtoken")
const { uploadFile } = require("../util/aws")

const mongoose = require("mongoose")
const { isValidRequestBody, isValid2,ValidName,isValidPassword, isValidString, ValidEmail, ValidPhone, isValid, isValidObjectId } = require("../validation/validation")

const createUser = async function (req, res) {
    try {
        let data = req.body
        let files = req.files
        if (!isValidRequestBody(data)) return res.send({ status: false, message: "body can not be empty" })
        const { fname, lname, email, phone, profileImage, password, address } = data
        if (!isValid(fname)) return res.send({ status: false, message: "first name required " })
        if (!isValid(lname)) return res.send({ status: false, message: "lname is required" })
        if (!isValid(email)) return res.send({ status: false, message: "email is required" })
        if (!isValid(phone)) return res.send({ status: false, message: "phone is required" })
        if (!ValidName(fname)) return res.send({ status: false, message: "first name is incorrect" })
        if (!ValidName(lname)) return res.send({ status: false, message: "last name is incorrect" })
   if (!ValidEmail(email)) return res.send({ status: false, message: "email is incorrect" })
        if (!ValidPhone(phone)) return res.send({ status: false, message: "phone is incorrect" })
        const newemail = await userModel.findOne({ email });
        if (newemail) return res.status(400).send({ status: false, message: " email  is already present" })
        const newphone = await userModel.findOne({ phone });
        if (newphone) return res.status(400).send({ status: false, message: "phone number is already present" })
 if (!ValidName(profileImage)) return res.send({ status: false, message: "profileImage is incorrect" })
        if (!isValidPassword(password)) return res.send({ status: false, message: "enter correct password" })
    const bcryptPassword = await bcrypt.hash(password, 10)
        data.password = bcryptPassword
 if (files && files.length > 0) {
            let image = await uploadFile(files[0])
            if (!image) return res.status(400).send({ status: false, message: "profileImage is required" })
            data.profileImage = image
        }
        if (!isValid(address.shipping.city)) return res.status(400).send({ status: false, message: "city is required" })
        if (!isValid(address.shipping.street)) return res.status(400).send({ status: false, message: "street is required" })
        if (!isValid(address.shipping.pincode)) return res.status(400).send({ status: false, message: "pincode is required" })
        if (!isValid(address.billing.city)) return res.status(400).send({ status: false, message: "pincode is required" })
        if (!isValid(address.billing.street)) return res.status(400).send({ status: false, message: "pincode is required" })
        if (!isValid(address.billing.pincode)) return res.status(400).send({ status: false, message: "pincode is required" })

        let savedData = await userModel.create(data)
        res.status(201).send({ status: true, message: "success", data: savedData })





    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//-------------------------------------------------------------------------------

const loginUser = async function (req, res) {
    try {
        let requestBody = req.body
        const { email, password } = requestBody
        if (!isValid(email)) return res.send({ status: false, message: "first name required" })
        if (!ValidEmail(email)) return res.send({ status: false, message: "email is incorrect" })

        if (!isValid(password)) return res.send({ status: false, message: "password is required" })

        let userLogin = await userModel.findOne({ email })
        if (!userLogin) return res.send({ status: false, message: "Not found" })
        let checkPassword = await bcrypt.compare(password, userLogin.password)
        if (!checkPassword) return res.send({ status: false, message: "Password not valid" })

        let token = jwt.sign({
            userId: userLogin._id
        },"e-website@project5", { expiresIn: '24h' }
        )
       res.setHeader("Authorization",token)
        return res.send({ status: true, message: "User loged in successfully", data: token })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
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

//***************************************************************************************************** */

const updateUserDetails = async function (req, res) {
    try {
        const userId = req.params.userId
        const files = req.files
        const updateData = req.body

        const { address, fname, lname, email, phone, password } = updateData

        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, msg: "invalid user Id" })
        let findUserId = await userModel.findById({ _id: userId })
        if (!findUserId) return res.status(404).send({ status: false, msg: "user not found" })

        if ((Object.keys(updateData).length == 0)) return res.status(400).send({ status: false, msg: "please provide data to update" })///
        if (files.length != 0) {
            let updateProfileImage = await uploadFile(files[0])
            updateData.profileImage = updateProfileImage
        }
        if (fname) {
            if (!isValid(fname)) return res.status(400).send({ status: false, msg: "fname is not valid" })
            if (!isValidString(fname)) return res.status(400).send({ status: false, msg: "fname should not contain number" })
        }
        if (lname) {
            if (!isValid(lname)) return res.status(400).send({ status: false, msg: "lname is not valid" })
            if (!isValidString(lname)) return res.status(400).send({ status: false, msg: "lname should not contain number" })
        }
        if (email) {
            if (!ValidEmail(email)) return res.status(400).send({ status: false, msg: "email is not valid" })
        }

        if (phone) {
            if (!ValidPhone(phone)) return res.status(400).send({ status: false, msg: "phone is not valid" })
        }
        if (password) {
            if (!isValid(password)) return res.status(400).send({ status: false, msg: "password is not valid" })
            if (!isValidPassword(password)) return res.status(400).send({ status: false, message: "password not valid..password length should be min 8 max 15 charavters " })
            updateData.password = await bcrypt.hash(password, 10)
        }
        if (address) {
          

            const findAddress = await userModel.findOne({ _id: userId })

            if (address.shipping) {
                const { street, city, pincode } = address.shipping
                if (street) {
                    if (!isValid2(street))return res.status(400).send({ status: false, msg: "shipping street is not valid " })
                findAddress.address.shipping.street = street
                }
                if (city) {
                    if (!isValid(city)) return res.status(400).send({ status: false, msg: "shipping city is not valid " })
                    findAddress.address.shipping.city = city
                }
                if (pincode) {
                    if (!isValid(pincode)) return res.status(400).send({ status: false, msg: "shipping pincode is not valid " })
                    findAddress.address.shipping.pincode = pincode
                }
            }
            if (address.billing) {
                const { street, city, pincode } = address.billing
                if (street) {
                    if (!isValid(street)) return res.status(400).send({ status: false, msg: "billing street is not valid " })
                    findAddress.address.billing.street = street
                }
                if (city) {
                    if (!isValid(city)) return res.status(400).send({ status: false, msg: "billing city is not valid " })
                    findAddress.address.billing.city = city
                }
                if (pincode) {
                    if (!isValid(pincode)) return res.status(400).send({ status: false, msg: "billing pincode is not valid " })
                    findAddress.address.billing.pincode = pincode
                }
            }
            updateData.address = findAddress.address
        }
        const updateDetails = await userModel.findByIdAndUpdate({ _id: userId }, updateData, { new: true },)
        return res.status(200).send({ status: true, message: "User profile updated successfully", data: updateDetails })
    }
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}










module.exports = { createUser, loginUser, getUser, updateUserDetails }