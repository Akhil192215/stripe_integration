import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const PaymentForm = ({ discountedTotalPrice }) => {
  const [success, setSuccess] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const nav = useNavigate();
  let totalMoney = discountedTotalPrice.toFixed(2) * 100;
  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "#000",
        fontWeight: 500,
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#000" },
        "::placeholder": { color: "grey" },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#red",
      },
    },
  };
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:4000/payment", {
          amount: totalMoney,
          id,
        });

        if (response.data.success) {
          console.log("successful payment");
          setSuccess(true);
          setLoading(false);
          nav("/payment-success");
        }else{
          setLoading(false);
          alert("Payment unsccessfull");
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        alert("Payment unsccessfull");
      }
    } else {
      console.log(error.message);
      setLoading(false);
      alert(error.message);
    }
  };

  return (
    <>
      <div className="w-full max-w-lg mx-auto ml-[30px]  ">
        <p className="mb-4">Add any notes/comments (Optional)</p>
        <div className=" w-3/4  mb-12">
          <textarea
            className="appearance-none block w-[55vh] bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white "
            id="grid-password"
            type="text"
            rows="3"
            placeholder="Leave us a note about your order"
          />
        </div>
        <span className="text-form">Payment method</span>
        <div className="col-span-2 sm:flex sm:gap-6 mt-6 mb-6">
          <select
            id="card-type"
            name="card-type"
            className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
            defaultValue="credit-card" 
          >
            <option value="credit-card">Credit Card/Debit Card</option>
          </select>
        </div>
        <form onSubmit={handlePayment}>
          <fieldset className="FormGroup p-[20px] bg-white w-[450px]] h-[300px]">
            <div className="bg-white rounded-lg  p-6">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-lg  font-bold">Credit Card</h2>
                </div>
                <div>
                  <img src="/payment.png" alt="payment" />
                </div>
              </div>
            </div>
            <hr />
            <div className=" font-weight to 600  pt-4 pl-3 pb-2 text-[18px]">
              <span>Card Number</span>
            </div>
            <div className="FormRow w-full bg-white  p-4 border border-gray-200  focus:outline-none focus:border-blue-500">
              <CardNumberElement options={CARD_OPTIONS} />
            </div>
            <div className="flex gap-12 mt-6">
              <div className="FormRow  w-[12vh]  py-3 px-4 border bg-gray-100 cursor-not-allowed border-gray-200  focus:outline-none focus:border-blue-500">
                <span className="text-gray-500">NAME</span>
              </div>
              <div className="FormRow w-[12vh] py-3 px-4 border  border-gray-200  focus:outline-none focus:border-blue-500">
                <CardExpiryElement options={CARD_OPTIONS} />
              </div>
              <div className="FormRow  w-[12vh]  py-3 px-4 border  border-gray-200  focus:outline-none focus:border-blue-500">
                <CardCvcElement options={CARD_OPTIONS} />
              </div>
            </div>
            <div className="FormRow"></div>
          </fieldset>
          <label className="md:w-full block text-gray-500 font-medium mt-3">
            <input
              onChange={handleCheckboxChange}
              className="mr-2 "
              type="checkbox"
              checked={isChecked}
            />
            <span className="text-[13.5px] ">
              I agree with the Organisation’s{" "}
              <span className="text-primary  font-bold">
                Terms & Conditions
              </span>{" "}
              and Orgnyse{" "}
              <span className="text-primary  font-bold">Privacy Policy</span>
            </span>
          </label>
          <Button
            loading={loading}
            color="violet"
            appearance="primary"
            className={`w-full mt-5 bg-primary p-4 rounded-md text-white font-bold ${
              !isChecked ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePayment}
          >
            {loading ? "Loading..." : `Pay $${discountedTotalPrice.toFixed(2)}`}
          </Button>
        </form>
      </div>
    </>
  );
};

export default PaymentForm;
