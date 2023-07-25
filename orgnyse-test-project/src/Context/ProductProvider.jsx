import React, { createContext, useContext, useState } from 'react'
import { orderDetailes } from '../orderDetailes';
 const productContext = createContext()
 
 const ProductProvider = ({children}) => {
     const [ticketCounts, setTicketCounts] = useState(
        orderDetailes.map((order) => 1)
      );
      const [isCouponValid, setIsCouponValid] = useState(false);
      const [discountedTotal,setDiscountedTotal] = useState()
      const [discountedProduct,setDiscountedProduct] = useState({})
      const [updatedOrder,setUpdatedOrder] = useState({})
      const [priceToPay,setPriceToPay] = useState()
      const handleIncrement = (index) => {
        if (ticketCounts[index] < orderDetailes[index].maxQuantity) {
          setTicketCounts((prevCounts) =>
            prevCounts.map((count, i) => (i === index ? count + 1 : count))
          );
        }
      };
    
      const handleDecrement = (index) => {
        if (ticketCounts[index] > 1) {
          setTicketCounts((prevCounts) =>
            prevCounts.map((count, i) => (i === index ? count - 1 : count))
          );
        }
      };
      
  const totalPrice = orderDetailes.reduce(
    (accumulator, order, index) =>
      accumulator +
      parseFloat(order.price.slice(1)) *
        Math.min(ticketCounts[index], order.maxQuantity),
    0
  );
  return (
  <productContext.Provider
  value={{
    ticketCounts,
    setTicketCounts,
    handleDecrement,
    handleIncrement,
    isCouponValid, 
    setIsCouponValid,
    discountedTotal,
    setDiscountedTotal,
    discountedProduct,
    setDiscountedProduct,
    totalPrice,
    updatedOrder,
    setUpdatedOrder,
    priceToPay,
    setPriceToPay
  }}>
{children}
  </productContext.Provider>
  )
}
export const productState = ()=>{
    return useContext(productContext)
}

export default ProductProvider