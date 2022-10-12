const productModel= require("../models/productModel")
const aws = require("../util/aws")
const { uploadFile } = require("../util/aws")

const mongoose = require("mongoose")
const { isValidRequestBody,isValidBody,isValid1,isValidPrice, ValidName,validate3, value, isValidPassword, isValidString, ValidEmail, ValidPhone, isValid, isValidObjectId } = require("../validation/validation")

const createProduct=async function(req,res){
    try {
        let requestBody = req.body
        let files = req.files
        let { title, description, price, currencyId, style, availableSizes, installments } = requestBody

        if (!isValidBody(requestBody)) return res.status(400).send({ status: false, msg: "provide details" })

//-------------------------------title--------------------------//
        if (!title) return res.status(400).send({ status: false, message: "title is mandatory" })
        if (!isValid1(title)) return res.status(400).send({ status: false, message: "title Should be Valid" })
        if (await productModel.findOne({ title })) return res.status(400).send({ status: false, message: "title Should be Unique" })

//-----------------------------description----------------------------//

if (!description) return res.status(400).send({ status: false, message: "description is mandatory" })
if (!isValid1(description)) return res.status(400).send({ status: false, message: "description  Should be Valid" })

//-------------------------------------  validprice--------------------------------//
if (!price) return res.status(400).send({ status: false, message: "price is mandatory" })
if (!isValidPrice(price)) return res.status(400).send({ status: false, message: "price Should be Valid" })

//-------------------------------------currencyId-----------------------------------//

if (!currencyId) return res.status(400).send({ status: false, message: "currencyId is mandatory" })
if (currencyId.toUpperCase() != "INR") return res.status(400).send({ status: false, message: "currencyId Should be Valid" })
requestBody.currencyId = currencyId.toUpperCase()
requestBody.currencyFormat = "₹"
//------------------------------------style----------------------------

if (!style) return res.status(400).send({ status: false, message: "style is mandatory" })
if (!isValid1(style)) return res.status(400).send({ status: false, message: "style Should be Valid" })
if (!isValidString(style)) return res.status(400).send({ status: false, message: "style Should Not Contain Numbers" })

//---------------------------------------------availableSizes---------------------------------------//

if (!availableSizes) return res.status(400).send({ status: false, message: "availableSizes is mandatory" })



//------------------------------------------installments-----------------------------//
if (!installments) return res.status(400).send({ status: false, message: "installments is mandatory" })
if(!(/^-?(0|[1-9]\d*)$/).test(installments)) return res.status(400).send({ status: false, message: "installments contant only number" })


if (!(files && files.length > 0)) return res.status(400).send({ status: false, message: "product image is mandatory" })


let imageUrl = await uploadFile(files[0])
requestBody.productImage = imageUrl

let productCreated = await productModel.create(requestBody)
return res.status(201).send({ status: true, message: "product created successfully", data: productCreated })


    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}
module.exports = { createProduct }