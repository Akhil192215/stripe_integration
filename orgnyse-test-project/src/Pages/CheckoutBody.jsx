import React, { useEffect, useState } from "react";
import CheckoutHeader from "../Components/CheckoutHeader";
import Summery from "../Components/Summery";
import ProgressBar from "../Components/ProgressBar";
import { useNavigate } from "react-router-dom";

const CheckoutBody = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };

  
  const orderDetailes = [
    {
      ticketNo: "Ticket Number 1 Name",
      price: "$12.99",
      maxQuantity: 3,
    },
    {
      ticketNo: "Ticket Number 2 Name",
      price: "$36.99",
      maxQuantity: 5,
    },
  ];

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [check, setCheck] = useState(false);
  
  const nav = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setCheck(true);
  };

  const validate = (values) => {
    const errors = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!values.firstName) {
      errors.firstName = "First name is required";
    } else if (values.firstName.length < 3) {
      errors.firstName = "First name should be more than 3 characters";
    }
    if (!values.lastName) errors.lastName = "Last name is required";
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Enter a valid email";
    }
    return errors;
  };


  const [ticketCounts, setTicketCounts] = useState(
    orderDetailes.map((order) => 1)
  );

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


  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && check) {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  }, [formErrors, check]);

  useEffect(() => {
    if (isSubmit) {
      nav('/checkout',{  state: { ticketCounts, totalPrice } })
    }
  }, [isSubmit]);
  return (
    <>
      <CheckoutHeader />
      <div className="grid grid-cols md:grid-cols-2 gap-4 ">
        <div className="bg-pagebg mt-[40px] ml-[46px]">
          <p className="text-white text-[16px] w-36  bg-primary rounded-sm  pl-2 pr-2 mb-4">
            Primary Attendee
          </p>

          <form className="w-full max-w-lg">
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block  tracking-wide text-form text-xl font-medium mb-2"
                  htmlFor="grid-first-name"
                >
                  First Name
                </label>
                <input
                  className={`appearance-none block w-full ${
                    formErrors.firstName ? "  border border-red-500" : ""
                  } bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                  id="grid-first-name"
                  type="text"
                  placeholder="Jane"
                  value={formValues.firstName}
                  onChange={handleChange}
                  name="firstName"
                />
                <p className="text-red-500 text-xs ">{formErrors.firstName}</p>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block  tracking-wide text-form text-xl font-medium  mb-2"
                  htmlFor="grid-last-name"
                >
                  Last Name
                </label>
                <input
                  className={`appearance-none block w-full ${
                    formErrors.lastName ? "  border border-red-500" : ""
                  } bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                  id="grid-last-name"
                  type="text"
                  placeholder="Doe"
                  value={formValues.lastName}
                  onChange={handleChange}
                  name="lastName"
                />
                <p className="text-red-500 text-xs ">{formErrors.lastName}</p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3">
                <label
                  className="block  tracking-wide text-form  text-xl font-medium  mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  className={`appearance-none block w-full ${
                    formErrors.email ? "  border border-red-500" : ""
                  } bg-white text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                  id="grid-email"
                  type="email"
                  value={formValues.email}
                  placeholder="Email"
                  onChange={handleChange}
                  name="email"
                />
                <p className="text-red-500 text-xs ">{formErrors.email}</p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3">
                <label
                  className="block  tracking-wide text-form  text-xl font-medium  mb-2"
                  htmlFor="grid-password"
                >
                  Phone Number
                </label>
                <input
                  className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="tel"
                  placeholder="Phone Number"
                  value={formValues.phone}
                  onChange={handleChange}
                  name="phone"
                />
              </div>
            </div>
          </form>
        </div>
        <div Name="mt-4 md:mt-0">
          <p className="text-primary ml-[46px] mt-[8vh]">SUMMERY</p>
          <Summery 
           orderDetails={orderDetailes}
           ticketCounts={ticketCounts}
           setTicketCounts={setTicketCounts}
           totalPrice={totalPrice}
           />
        </div>
      </div>
      <div className="mt-[20vh]">
        <ProgressBar  handleSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default CheckoutBody;
