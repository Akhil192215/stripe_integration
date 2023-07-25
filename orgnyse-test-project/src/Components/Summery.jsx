import React, { useEffect } from "react";
import { productState } from "../Context/ProductProvider";
import { orderDetailes } from "../orderDetailes";
function Summery() {
  const {
    ticketCounts,
    isCouponValid,
    discountedProduct,
    handleDecrement,
    handleIncrement,
    totalPrice,
    updatedOrder,
    setPriceToPay,
  } = productState();

  const productsToRender =
    updatedOrder.length > 0 ? updatedOrder : orderDetailes;

  const calculatedTotalPrice = isCouponValid
    ? productsToRender.reduce(
        (accumulator, order, index) =>
          accumulator +
          parseFloat(discountedProduct[order.ticketNo].slice(1)) *
            Math.min(ticketCounts[index], order.maxQuantity),
        0
      )
    : totalPrice;

  useEffect(() => {
    setPriceToPay(calculatedTotalPrice);
  }, [calculatedTotalPrice, setPriceToPay]);
  return (
    <div className="sm:w-1/2">
      {productsToRender.map((order, index) => (
        <div key={index}>
          <p className="mb-3 mt-3 ml-[44px] font-medium text-[18px]">
            {order.ticketNo}
          </p>

          <div className="flex justify-between w-full mb-2 ml-[46px] ">
            <div>
              <span className="font-bold text-[30px] ">
                {isCouponValid ? ( 
                  <>
                    <del>${order.price.slice(1)}</del>{" "}
                    <span className="text-primary font-bold">
                      ${discountedProduct[order.ticketNo]}
                    </span>
                  </>
                ) : (
                  `${order.price}`
                )}
              </span>{" "}
            </div>

            <div className="flex gap-x-6 justify-center  mr-10 items-center">
              <img
                style={{ width: "24px", height: "24px" }}
                src="/Decrement.png"
                alt="decrement"
                onClick={() => handleDecrement(index)}
              />
              <p>{ticketCounts[index]}</p>
              <img
                style={{
                  width: "24px",
                  height: "24px",
                  cursor:
                    ticketCounts[index] >= order.maxQuantity
                      ? "not-allowed"
                      : "pointer",
                  filter:
                    ticketCounts[index] >= order.maxQuantity
                      ? "grayscale(100%)"
                      : "none",
                }}
                src="/Increment.png"
                alt="increment"
                onClick={() => handleIncrement(index)}
              />
            </div>
          </div>
          <div className="flex gap-x-2 ml-[46px] mb-6 items-center">
            <div>
              {" "}
              <img src="/delete.png" alt="" />
            </div>
            <div>
              {" "}
              <p className="text-delete">Delete</p>
            </div>
          </div>
          <hr />
        </div>
      ))}
      <div className="flex ml-[35px] gap-x-[345px] items-center mt-5">
        <div>
          <p className="font-medium text-black text-[18px]">Total</p>
        </div>
        <div>
          {isCouponValid ? (
            <>
              <span className="text-red-500 font-bold">
                <del>${totalPrice.toFixed(2)}</del>
              </span>{" "}
              <span className="text-primary text-[30px] font-bold mr-8">
                ${calculatedTotalPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <p className="font-bold text-black text-[30px] mr-8 ">
              ${totalPrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Summery;
