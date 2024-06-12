import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Logout = () => {
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

  return (
    <div>
      <Link className="dropdown-item" onClick={handleLogout}>
        Đăng xuất
      </Link>
    </div>
  );
};

export default Logout;
