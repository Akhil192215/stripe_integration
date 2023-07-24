import { BrowserRouter, Route, Routes } from "react-router-dom";
import CheckoutBody from "./Pages/CheckoutBody";
import CheckoutPageFinal from "./Pages/CheckoutPageFinal";
import PaymentSuccess from "./Components/PaymentSuccess";


function App() {
  return  (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<CheckoutBody />} path="/" />
          <Route element={<CheckoutPageFinal />} path="/checkout" />
          <Route element={<PaymentSuccess />} path="/payment-success" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
