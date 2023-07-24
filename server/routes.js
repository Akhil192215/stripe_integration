const couponController = require("./Controllers/couponController");

const router = require("express").Router();



//Coupon-routes

router.post('/validate-coupon',couponController.validate)




module.exports = router;