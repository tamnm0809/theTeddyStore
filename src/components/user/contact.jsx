import React from "react";
import Sidebar from "../common/cate_sidebar";
import Nav from "../common/nav";
import Footer from "../common/footer";
const Order = () => {
  return (
    <div className="container-fluid">
      <Nav></Nav>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <div className="m-4 text_brown">
              <h4>Liên hệ</h4>
              <ul>
                <li className="mt-3">
                  Cửa Hàng: 94 Nguyễn Văn Nghi, Phường 7, quận Gò Vấp, TP.HCM
                </li>
                <li className="mt-3">Hotline: 0903930394</li>
                <li className="mt-3">
                  Mở cửa: 9h Sáng – 9h30 Tối (Cả T7 & CN)
                </li>
                <li className="mt-3">
                  Facebook: https://www.facebook.com/share/QWq29CS8sMknFQkL/?mibextid=qi2Omg
                </li>
                <li className="mt-3">Website: https://gaubongxinh.com</li>
                <li className="mt-3">Zalo: 0903930394</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Order;
