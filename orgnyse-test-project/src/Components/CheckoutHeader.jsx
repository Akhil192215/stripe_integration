
import React from 'react';

const CheckoutHeader = () => {
  return (
    <div className= ' flex bg-pagebg justify-between items-baseline w-[500px]  '>
    <div>
    <h2 className="text-pageHead font-bold  ml-[46px] mt-[46px] text-[40px]" >EventShop</h2>
    <p className='text-primary text-[16px]   ml-[46px] mb-4 mt-3' >Back to event page</p>
    <h2 className="text-black font-bold  ml-[46px]  text-[40px]" >Checkout</h2>
    </div>
    <div>
      <div className='block md:hidden'>
        <img src="/burger.png" alt="burger" />
      </div>
    </div>
  </div>
  );
};

export default CheckoutHeader;
