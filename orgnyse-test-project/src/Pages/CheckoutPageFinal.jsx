import React, { useState } from "react";

import { useLocation } from "react-router-dom";
import StripeContainer from "../Payment-system/StripeContainer";
import CheckoutHeader from "../Components/CheckoutHeader";
import Summery from "../Components/Summery";
import ProgressBar from "../Components/ProgressBar";
import axios from "axios";
import { productState } from "../Context/ProductProvider";
import { orderDetailes } from "../orderDetailes";

const CheckoutPageFinal = () => {
  const location = useLocation();
  const { ticketCounts, totalPrice } = location.state || {};
  console.log(ticketCounts);
  const {
    isCouponValid,
    setIsCouponValid,
    discountedTotal,
    setDiscountedTotal,
    discountedProduct,
    setDiscountedProduct,
    priceToPay,
  } = productState();
  const [couponCode, setCouponCode] = useState("");
  const [invalid, setInvalid] = useState(false);
  const handleCouponChange = async (e) => {
    const enteredCouponCode = e.target.value;
    setCouponCode(enteredCouponCode);
    try {
      if (e.key === "Enter" && enteredCouponCode) {
        const { data } = await axios.post(
          "http://localhost:4000/validate-coupon",
          { enteredCouponCode, orderDetailes }
        );

        setDiscountedTotal(data.totalPrice);
        setDiscountedProduct(data.discountedProducts);
        console.log(data);
        console.log(data.discountedProducts);
        setIsCouponValid(true);
        setInvalid(false);
      }
    } catch (error) {
      setIsCouponValid(false);
      setInvalid(true);
    }
  };
  const handleRemoveCoupon = () => {
    setCouponCode("");
    setIsCouponValid(false);
  };

  return (
    <>
      <CheckoutHeader />
      <div className="grid grid-cols  md:grid-cols-2 gap-4  ">
        <div className="mt-4 md:mt-0">
          <p className="ml-12 mb-4">
            Have a promo coupon?{" "}
            {isCouponValid && !invalid ? (
              <>
                <span className="text-green-500">Coupon applied!</span>{" "}
                <button
                  className="text-primary underline"
                  onClick={handleRemoveCoupon}
                >
                  Remove Coupon
                </button>
              </>
            ) : invalid ? (
              <span className="text-red-600"> Invalid coupon!</span>
            ) : (
              <span className="text-primary"> Redeem your coupon</span>
            )}
          </p>
          <div className="w-[500px] px-3 ml-7">
            <input
              className=" block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white "
              id="grid-password"
              type="text"
              placeholder="Eg: WINTER10"
              onKeyDown={handleCouponChange}
            />
          </div>
          <Summery
            orderDetails={orderDetailes}
            ticketCounts={ticketCounts}
            totalPrice={totalPrice}
            isCouponValid={isCouponValid}
            discountedTotal={discountedTotal}
            discountedProduct={discountedProduct}
          />
        </div>
        <StripeContainer discountedTotalPrice={priceToPay} />
      </div>
      <div className="mt-[3vh]">
        <ProgressBar />
      </div>
    </>
  );
};

export default CheckoutPageFinal;
