const orderModel = require('../models/orderModels')
const cartModel = require('../models/cartModels')
const productModel = require('../models/productModel')
const userModel = require('../models/userModel')
const { isValidObjectId, isValidStatus } = require('../validation/validation')


//***************************************************************CREATE ORDER****************************************************************************************

const createOrder = async function (req, res) {
    try {
        const userId = req.params.userId
        const cartId = req.body.cartId

        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "invalid user Id.." })
        const user = await userModel.findOne({ userId: userId })
        if (!user) return res.status(404).send({ status: false, message: "user not found" })

        if (!isValidObjectId(cartId)) return res.status(400).send({ status: false, message: "invalid cart Id.." })
        const cart = await cartModel.findOne({ cartId: cartId })
        if (!cart) return res.status(404).send({ status: false, message: "cartId not found" })
        if (cart.length == 0) return res.status(400).send({ status: false, msg: "cart is empty" })

        cart.totalQuantity = cart.items.map(x => x.quantity).reduce((x, y) => x + y)
        const orderDetails = {
            userId: userId,
            items: cart.items,
            totalPrice: cart.totalPrice,
            totalItems: cart.totalItems,
            totalQuantity: cart.totalQuantity

        }
        const order = await orderModel.create(orderDetails)

        const emptyCart = await cartModel.findOneAndUpdate({ userId: userId, _id: cartId }, { $set: { items: [], totalPrice: 0, totalItem: 0 } })
        return res.status(201).send({ status: true, msg: "order creted successfully", data: order })

    }

    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}

const updateOrder = async function (req, res) {
  try { const userId = req.params.userId
    const orderId = req.body.orderId
    const status=req.body.status
    if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "invalid user Id.." })
    const user = await userModel.findById({ _id: userId })
    if (!user) return res.status(404).send({ status: false, message: "userId not found" })
    if (!isValidObjectId(orderId)) return res.status(400).send({ status: false, message: "invalid user Id.." })
    const newOrder = await orderModel.findById({ _id: orderId })
    if (!newOrder) return res.status(404).send({ status: false, message: "orderId not found" })

    if (newOrder.userId != userId) return res.status(400).send({ status: false, msg: "userId not found" })
    if (!status) return res.status(400).send({ status: false, msg: "status is mandatory" })
    if (!isValidStatus(status)) return res.status(400).send({ status: false, msg: "status should be pending, completed,cancelled" })
const orderUpdate=await orderModel.findOneAndUpdate({_id:orderId},{status:status},{new:true})

return res.status(200).send({ status: true,msg:"order updated successfully",data:orderUpdate})
}

catch(err){
    return res.status(500).send({ status: false, message: err.message })
}
}

module.exports = {
    createOrder,updateOrder
}



