import React from "react";
import Nav from "../common/nav";
import Footer from "../common/footer";
import "./css/thanks.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Thanks() {
  const currentUrl = window.location.href;
  let navigate = useNavigate();
  if (currentUrl.includes("?")) {
    const queryString = currentUrl.split("?")[1];
    const urlParams = new URLSearchParams(queryString);
    const vnp_Amount = urlParams.get("vnp_Amount");
    const vnp_BankCode = urlParams.get("vnp_BankCode");
    const vnp_BankTranNo = urlParams.get("vnp_BankTranNo");
    const vnp_CardType = urlParams.get("vnp_CardType");
    const vnp_OrderInfo = urlParams.get("vnp_OrderInfo");
    const vnp_PayDate = urlParams.get("vnp_PayDate");
    const vnp_ResponseCode = urlParams.get("vnp_ResponseCode");
    const vnp_TmnCode = urlParams.get("vnp_TmnCode");
    const vnp_TransactionNo = urlParams.get("vnp_TransactionNo");
    const vnp_TransactionStatus = urlParams.get("vnp_TransactionStatus");
    const vnp_TxnRef = urlParams.get("vnp_TxnRef");
    const vnp_SecureHash = urlParams.get("vnp_SecureHash");

    const generateRandomNumbers = () => {
      const min = 1000000000;
      const max = 9999999999;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const id = generateRandomNumbers();

    const dateParse = new Date(
      vnp_PayDate.slice(0, 4),
      parseInt(vnp_PayDate.slice(4, 6)) - 1,
      vnp_PayDate.slice(6, 8),
      vnp_PayDate.slice(8, 10),
      vnp_PayDate.slice(10, 12),
      vnp_PayDate.slice(12, 14)
    );

    const formattedDate = `${dateParse.getFullYear()}-${(
      dateParse.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${dateParse
      .getDate()
      .toString()
      .padStart(2, "0")} ${dateParse
      .getHours()
      .toString()
      .padStart(2, "0")}:${dateParse
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${dateParse.getSeconds().toString().padStart(2, "0")}`;

    const formDataTransaction = {
      id: id.toString(),
      vnp_Amount: vnp_Amount,
      vnp_Bank_Code: vnp_BankCode,
      vnp_Bank_Tran_No: vnp_BankTranNo,
      vnp_Card_Type: vnp_CardType,
      vnp_Order_Info: vnp_OrderInfo,
      vnp_Pay_Day: formattedDate,
      vnp_Response_Code: vnp_ResponseCode,
      vnp_Secure_Hash: vnp_SecureHash,
      vnp_Transaction_No: vnp_TransactionNo,
      vnp_Transaction_Status: vnp_TransactionStatus,
      vnp_Tmn_Code: vnp_TmnCode,
      vnp_Txn_Ref: vnp_TxnRef,
      order: {
        id: vnp_TxnRef,
      },
    };

    try {
      if (vnp_ResponseCode === "00") {
        axios.post(
          `http://localhost:7070/teddy-store/addTransaction`,
          formDataTransaction
        );
      } else {
        axios.put(
          `http://localhost:7070/teddy-store/updateOrder/${vnp_TxnRef}`
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="thanks-container container-fluid p-0 m-0">{<Nav />}</div>
      <div className="thanks-container container w-50 my-5 py-5 px-3">
        <div className="thanks-wrapper card">
          <div className="card-body text-center">
            <i className="fa-solid fa-check icon-check"></i>
            {/* {vnp_ResponseCode !== 0 ? (
              <h5 className="card-title">Thanh toán chưa hoàn tất!</h5>
            ) : ( */}
            <h5 className="card-title">Đặt hàng thành công</h5>
            {/* )} */}
            <p className="card-text">
              Chúng tôi xin cám ơn bạn trong muôn vàn cửa hàng khác lại đặt niềm
              tin vào cửa hàng của chúng tôi.
            </p>
            <p className="card-text">
              Chúc bạn có một trải nghiệm cửa hàng vui vẻ!
            </p>
            <Link
              to={"/teddy-store/homePage"}
              className="thanks-btn btn btn-primary mx-2"
            >
              Tiếp tục mua sắm
            </Link>
            <Link className="thanks-btn btn btn-primary mx-2">
              Xem đơn vừa đặt
            </Link>
          </div>
        </div>
      </div>
      <div className="thanks-container container-fluid p-0 m-0">
        {<Footer />}
      </div>
    </>
  );
}
