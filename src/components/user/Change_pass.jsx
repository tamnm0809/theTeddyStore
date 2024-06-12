import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../common/sidebar_user";
import Nav from "../common/nav";
import Footer from "../common/footer";
import {message } from 'antd';
const Order = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const inforAccount = JSON.parse(localStorage.getItem("accInfor"));
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      message.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }
  
    if (newPassword !== confirmPassword) {
      message.error("Nhập lại mật khẩu không khớp với mật khẩu mới.");
      return;
    }
    try {
      if (inforAccount && inforAccount.length > 0) {
        const accountId = inforAccount[0].id;
        console.log("ID của tài khoản:", accountId);
        await axios.post(`http://localhost:7070/teddy-store/UpdatePassword/${accountId}`, {
        oldPassword,
        newPassword,
      });
      
      };
      message.success("Đổi mật khẩu thành công")
    } catch (error) {
      message.error("Mật khẩu không tồn tại")
    }
  };
  const handleReset = () => {
    // Đặt lại giá trị của các state về rỗng khi click nút "Hủy"
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  return (
    <div className="container-fluid">
      <Nav></Nav>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <form className="row mx-5">
              <h4 className="mt-5 text_brown fw-bold">Đổi mật khẩu</h4>
              <div className="row mt-4">
                <label className="col-sm-3 text-end brown_color mt-3 fw-bold">
                  Mật khẩu cũ
                </label>
                <div className="col-sm-9">
                  <input type="password" className="form-input"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}></input>
                </div>
              </div>
              <div className="row my-4">
                <label className="col-sm-3 text-end brown_color mt-3 fw-bold">
                  Mật khẩu mới
                </label>
                <div className="col-sm-9">
                  <input type="password" className="form-input" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}></input>
                </div>
              </div>
              <div className="row ">
                <label className="col-sm-3 text-end brown_color mt-3 fw-bold">
                  Nhập lại mật khẩu{" "}
                </label>
                <div className="col-sm-9">
                  <input type="password" className="form-input" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}></input>
                </div>
              </div>
              <div className="row ">
                <label className="col-sm-3 text-end brown_color mt-3 fw-bold">
                  {" "}
                </label>
                <div className="col-sm-9 d-flex mt-3">
                  <button className="btn text-light fw-bold bg_brown rounded-5 px-4 me-4" onClick= {handleSubmit}>
                    Lưu
                  </button>
                  <button className="btn text-light fw-bold bg_brown rounded-5 px-4 " onClick={handleReset}>
                    Hủy
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Order;
