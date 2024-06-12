import React from "react";
import Index from "./components/user/index.jsx";
import DetailProduct from "./components/user/Detail_Product.jsx";
import IndexAdmin from "./components/admin/HomeAdmin.jsx";
import Cart from "./components/user/Cart.jsx";
import Register from "./components/user/register.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import Logout from "./components/Logout.jsx";
import Checkout from "./components/user/Checkout.jsx";
import Infor from "./components/user/Infor.jsx";
import Order from "./components/user/Order_status.jsx";
import ChangePass from "./components/user/Change_pass.jsx";
import DetailOrder from "./components/user/Detail_order.jsx";
import Service from "./components/user/Service";
import Contact from "./components/user/contact.jsx";
import Thanks from "./components/user/Thanks.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />}></Route>
        <Route path="/teddy-store/homePage" element={<Index />}></Route>
        <Route path="/teddy-store/admin" element={<IndexAdmin />}></Route>
        <Route
          path="/teddy-store/detail_products/:id"
          element={<DetailProduct />}
        ></Route>
        <Route path="/teddy-store/login" element={<Login />}></Route>
        <Route path="/teddy-store/Logout" element={<Logout />}></Route>
        <Route path="/teddy-store/infor" element={<Infor />}></Route>
        <Route path="/teddy-store/cart" element={<Cart />}></Route>
        <Route path="/teddy-store/register" element={<Register />}></Route>
        <Route path="/teddy-store/order_status" element={<Order />}></Route>
        <Route path="/teddy-store/checkout" element={<Checkout />}></Route>
        <Route path="/teddy-store/changepass" element={<ChangePass />}></Route>
        <Route
          path="/teddy-store/detail_order"
          element={<DetailOrder />}
        ></Route>
        <Route path="/teddy-store/service" element={<Service />}></Route>
        <Route path="/teddy-store/contact" element={<Contact />}></Route>
        <Route path="/teddy-store/thanks" element={<Thanks />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
