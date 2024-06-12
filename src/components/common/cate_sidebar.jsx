import React from "react";
import { NavLink } from "react-router-dom";
// import "../common/css/sidebar.css";
// npm install react-icons --save
const Sidebar = ({ children }) => {
  const menuItem = [
    {
      path: "/infor",
      name: "Thú bông",
      icon: <i class="fa-solid fa-fish"></i>,
    },
    {
      path: "/order",
      name: "Gấu Teddy",
      icon: <i class="fa-solid fa-fish"></i>,
    },
    {
      path: "/changepass",
      name: "Gấu hoạt hình",
      icon: <i class="fa-solid fa-fish"></i>,
    },
    {
      path: "",
      name: "Gối mềm 2in1",
      icon: <i class="fa-solid fa-fish"></i>,
    },
    {
      path: "",
      name: "Bút cao cấp",
      icon: <i class="fa-solid fa-fish"></i>,
    },
    {
      path: "",
      name: "Dịch vụ",
      icon: <i class="fa-solid fa-fish"></i>,
    },
  ];
  return (
    <div className="container">
      <div className="sidebar">
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link d-flex text-decoration-none mb-4 fs-5 mt-5 text_brown"
            activeclassName="active"
          >
            <div className="link_text">{item.name}</div>
            <div className="icon ms-auto fs-6">{item.icon}</div>
          </NavLink>
        ))}
      </div>
      <div className="Smart_search"></div>
    </div>
  );
};

export default Sidebar;
