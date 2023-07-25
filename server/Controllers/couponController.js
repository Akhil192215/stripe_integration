const coupons = require("../couponDB");

class CouponController {
  validate(req, res) {
    const { enteredCouponCode, orderDetailes } = req.body;
    const couponObj = coupons.find((obj) => obj.code === enteredCouponCode);
    // console.log(orderDetailes);
    if (couponObj) {
      const { discount } = couponObj;
      const applyDiscount = (price) => {
        const productPrice = parseFloat(price.replace("$", ""));
        const discountedPrice = productPrice - productPrice * (discount / 100); // 10% discount
        return discountedPrice.toFixed(2);
      };
      let totalPrice = 0;
      const discountedProducts = orderDetailes.reduce((result, product) => {
        const discountedPrice = applyDiscount(product.price);
        result[product.ticketNo] = `$${applyDiscount(product.price)}`;
        totalPrice += +discountedPrice;

        return result;
      }, {});
      res.status(200).json({ discountedProducts, totalPrice });
    } else {
      res.status(404).json({ message: "invalid coupon" });
    }
  }
}

module.exports = new CouponController();
