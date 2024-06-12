import React from "react";
import { NavLink } from "react-router-dom";
import "../common/css/nav.css";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// npm install react-icons --save
const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:7070/teddy-store/logout"
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Đăng xuất thành công!",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          localStorage.removeItem("userProfile");
          localStorage.removeItem("cartQuantity");
          navigate("/teddy-store/login");
        }, 2000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Đăng xuất thất bại, vui lòng kiểm tra máy chủ!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error("Đăng xuất thất bại, vui lòng kiểm tra máy chủ!");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Đăng xuất thất bại, vui lòng kết nối mạng!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Đăng xuất thất bại, vui lòng kết nối mạng", error);
    }
  };
  const menuItem = [
    {
      path: "/teddy-store/infor",
      name: "Thông tin cá nhân",
      icon: <i class="fa-solid fa-note-sticky"></i>,
    },
    {
      path: "/teddy-store/order_status",
      name: "Đơn hàng của tôi",
      icon: <i class="fa-solid fa-box"></i>,
    },
    {
      path: "/teddy-store/changepass",
      name: "Đổi mật khẩu",
      icon: <i class="fa-solid fa-arrows-rotate"></i>,
    },    
  ];
  return (
    <div className="container">
      <div className="sidebar">
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="text_brown d-flex text-decoration-none mb-4 fs-5 mt-5"
            activeclassName="active"
          >
            <div className="icon me-3">{item.icon}</div>
            <div className="link_text">{item.name}</div>
          </NavLink>
        ))}
        <div className="fs-5 text_brown" onClick={handleLogout}>
          <i className="me-2 mt-4 fa-solid fa-right-from-bracket"></i> Đăng xuất
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
