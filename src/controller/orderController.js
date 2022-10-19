const orderModel = require('../models/orderModel')
const cartModel = require('../models/cartModel')
const productModel = require('../models/productModel')
const userModel = require('../models/userModel')
const { isValidObjectId, isValidStatus } = require('../utils/validation')


//***************************************************************CREATE ORDER****************************************************************************************

const createOrder = async function (req, res) {
    try {
        const userId = req.params.userId
        const { cartId } = req.body

        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "invalid user Id.." })
        const user = await userModel.findOne({ userId: userId })
        if (!user) return res.status(404).send({ status: false, message: "user not found" })

        if (!isValidObjectId(cartId)) return res.status(400).send({ status: false, message: "invalid cart Id.." })
       
        

    }

    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}






