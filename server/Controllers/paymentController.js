const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
class PaymentController {
  async payment(req, res) {
    let { amount, id } = req.body;
    try {
      const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "Dream company",
        payment_method: id,
        confirm: true,
      });
      console.log("Payment", payment);
      res.json({
        message: "Payment Successfull",
        success: true,
      });
    } catch (error) {
      console.log("Error", error);
      res.json({    
        message: "Payment Faild",
        success: false,
      });
    }
  }
}

module.exports = new PaymentController();
