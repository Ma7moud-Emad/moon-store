import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Layout from "./components/layouts/Layout";
import VerifyEmail from "./pages/VerifyEmail";
import ResetCode from "./pages/ResetCode";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import Cart from "./pages/Cart";
import ProductDetails from "./features/products/components/ProductDetails";
import Wishlistpage from "./pages/Wishlist";
import Orders from "./features/orders/components/Orders";
import Payment from "./pages/Payment";
import Error from "./pages/Error";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verifedemail" element={<VerifyEmail />} />
        <Route path="/resetcode" element={<ResetCode />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlistpage />} />
          <Route path="/allorders" element={<Orders />} />
          <Route path="/payment" element={<Payment />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
      <div>
        <Toaster position="top-center" reverseOrder={true} />
      </div>
    </BrowserRouter>
  );
};

export default App;
