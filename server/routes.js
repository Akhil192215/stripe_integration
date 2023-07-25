const couponController = require("./Controllers/couponController");
const paymentController = require("./Controllers/paymentController");

const router = require("express").Router();

//Coupon-routes

router.post("/validate-coupon", couponController.validate);
router.post("/payment", paymentController.payment);

module.exports = router;
