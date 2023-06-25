const express = require('express')
const { postOrder, orderList, orderDetail, updateStatus, userOrders, deleteOrder } = require('../controllers/orderController')
const router = express.Router()

router.post('/postorder', postOrder)
router.get('/orderlist', orderList)
router.get('/orderdetail/:id', orderDetail)
router.put('/updatestatus/:id', updateStatus)
router.get('/userorders/:userid', userOrders)
router.delete('/deleteorder/:id', deleteOrder)

module.exports=router
