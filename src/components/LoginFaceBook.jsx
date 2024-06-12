import React from "react";
import axios from "axios";
// import ReactFacebookLogin from "react-facebook-login";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function LoginFaceBook() {
  // const navigate = useNavigate();
  // const responseFacebook = async (response) => {
  //   const randomNumbers = [];
  //   for (let i = 0; 1 < 0; i++) {
  //     const randomNumber = Math.floor(Math.random() * 100) + 1;
  //     randomNumbers.push(randomNumber);
  //   }
  //   try {
  //     const apiResponse = await axios.post(
  //       "http://localhost:7070/teddy-store/login-facebook",
  //       {
  //         id: String(randomNumbers),
  //         username: response.email,
  //         password: "123456",
  //         role: false,
  //         active: true,
  //         date_create: new Date(),
  //       }
  //     );
  //     if (apiResponse.status === 200) {
  //       const userData = apiResponse.data;
  //       localStorage.setItem("userProfile", JSON.stringify(userData));
  //       Swal.fire({
  //         icon: "success",
  //         title: "Đăng nhập thành công!",
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //       setTimeout(() => {
  //         navigate("/teddy-store/homePage", {
  //           state: { userProfile: userData },
  //         });
  //       }, 2000);
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Đăng nhập thất bại",
  //         text: "Có lỗi từ server. Vui lòng thử lại sau.",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error inserting data:", error);
  //   }
  // };

  // return (
  //   <>
  //     <ReactFacebookLogin
  //       appId="944332657410384"
  //       autoLoad={false}
  //       fields="name,email"
  //       callback={responseFacebook}
  //     />
  //   </>
  // );
}
