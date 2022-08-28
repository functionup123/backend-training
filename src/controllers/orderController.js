const newUserModel = require("../models/newUserModel.js")
const productModel = require("../models/productModel.js")
const orderModel = require("../models/orderModel.js")

const createOrder = async function (req, res) {
    orderData = req.body
    let userId = orderData.userId
    let productId = orderData.productId
    if (!userId) {
        return res.send({ msg: "userId is mandatory in req" })
    }
    else if (!productId) {
        return res.send({ msg: "productId is mandatory in req" })
    }
    let userIdInModel = await newUserModel.findById(userId)
    let productIdInModel = await productModel.findById(productId)
    if (!userIdInModel) {
        return res.send({ msg: "this userid not present in db" })
    }
    else if (!productIdInModel) {
        return res.send({ msg: "this productid not present in db" })
    } else { }


    let headerValue = req.headers.isfreeappuser
    console.log(headerValue)
    let value = 0
 //if isfree is true
 if (headerValue =='true') {
        orderData.amount = value
        orderData.isFreeAppUser=headerValue
        let savedData = await orderModel.create(orderData)
        res.send({ msg: savedData })
    }
    //isfreeapp is false
    else if (userIdInModel.balance >= productIdInModel.price) {
        await newUserModel.findOneAndUpdate({ _id: userId },
            { $set: { balance: userIdInModel.balance - productIdInModel.price } })
        orderData.amount = productIdInModel.price
        orderData.isFreeAppUser = req.headers.isfreeappuser
        let savedData = await orderModel.create(orderData)
        res.send({ msg: savedData })
    }
    else {
        res.send("insufficent Balance!!!")
    }
}
module.exports.createOrder = createOrder