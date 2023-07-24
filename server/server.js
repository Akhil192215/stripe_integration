const express = require('express')
const app = express()
require('dotenv').config()
const stripe =require('stripe')(process.env.STRIPE_SECRET_KEY)
const cors = require('cors')
const router = require("./routes");

app.use(express.json())
app.use(cors())


app.post('/payment',cors(), async(req,res)=>{
 let {amount,id} = req.body 
 console.log(req.body );

 try {
    const payment = await stripe.paymentIntents.create({
        amount,
        currency:"USD",
        description:"Dream company",
        payment_method:id,
        confirm:true
    })
    console.log("Payment",payment);
    res.json({
        message:"Payment Successfull",
        success:true
    })
 } catch (error) {
    console.log("Error",error);
    res.json({
        message:"Payment Faild",
        success:false
    })
 }
})


app.use(router);
app.listen(process.env.PORT || 4000, ()=>{
    console.log("server connected");
})