const productModel= require("../models/productModel")
const aws = require("../util/aws")
const { uploadFile } = require("../util/aws")

const mongoose = require("mongoose")
const { isValidRequestBody,isValidBody, ValidName,validate3, value, isValidPassword, isValidString, ValidEmail, ValidPhone, isValid, isValidObjectId } = require("../validation/validation")

const createProduct=async function(req,res){
    try {
        let requestBody = req.body
        let files = req.files
        let { title, description, price, currencyId, style, availableSizes, installments } = requestBody

        if (!isValidBody(requestBody)) return res.status(400).send({ status: false, msg: "provide details" })




    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}
module.exports = { createProduct }