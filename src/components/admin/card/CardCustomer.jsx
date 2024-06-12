import React, { useState } from "react";
import { Avatar, Button } from "antd";
import moment from "moment";
import customerAPI from "../../api/customerAPI";
import Swal from "sweetalert2";

const CardCustomer = ({ data }) => {
  const [active, setActive] = useState(data?.active);

  const handleChangeActiveCustomer = async () => {
    Swal.fire({
      title: `Bạn có muốn ${active ? "khóa" : "mở khóa"} khoản này`,
      text: `Tài khoản này sẽ ${active ? "bị khóa" : "được mở khóa"}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: active ? "Khóa" : "Mở khóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        const fetchCustomerAPI = async () => {
          if (active) {
            const result = await customerAPI.updateActiveCustomer({
              id: data?.id || "",
              active: !active,
            });
            setActive(result ? !active : active);
          } else {
            const result = await customerAPI.updateActiveCustomer({
              id: data?.id || "",
              active: !active,
            });
            setActive(result ? !active : active);
          }
        };
        fetchCustomerAPI();
      }
    });
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#fffbf1",
        borderRadius: "12px",
        border: "1px solid #ccc",
      }}>
      <div className="d-flex gap-3">
        <Avatar shape="square" size={110} src={data?.info?.avatar} />
        <div className="d-flex flex-column">
          <span
            className="text-color"
            style={{
              fontSize: "18px",
              fontWeight: "700",
            }}>
            {data?.info?.name}
          </span>
          <span
            style={{
              color: active ? "#1cb541" : "#ff3564",
              fontSize: "11px",
              fontWeight: "700",
              textAlign: "center",
            }}>
            {active ? "Đang hoạt động" : "Bị khóa"}
          </span>
          <span
            className="text-color"
            style={{
              fontSize: "11px",
              fontWeight: "600",
              textAlign: "center",
            }}>
            Ngày tạo: {moment(data?.createdAt).format("DD/MM/YYYY")}
          </span>
          <span
            className="text-color"
            style={{ fontSize: "14px", marginTop: "auto" }}>
            Giới tính:{" "}
            <span style={{ fontWeight: "700" }}>
              {data?.gender ? "Nam" : "Nữ"}
            </span>
          </span>
          <span className="text-color" style={{ fontSize: "14px" }}>
            Ngày sinh:{" "}
            <span style={{ fontWeight: "700" }}>
              {moment(data?.info?.birthday).format("DD/MM/YYYY")}
            </span>
          </span>
        </div>
      </div>
      <div className="d-flex flex-column gap-2 py-3">
        <span className="d-flex gap-2 align-items-center">
          <i
            style={{ color: "#247eff", width: "16px", fontSize: "14px" }}
            class="fa fa-phone"></i>
          <span className="text-color" style={{ fontWeight: "700" }}>
            <span>{`0${data?.info?.phone}`}</span>
          </span>
        </span>
        <span className="d-flex gap-2 align-items-center">
          <i
            style={{ color: "#bda814", width: "16px", fontSize: "14px" }}
            class="fa-solid fa-location-dot"></i>
          <span className="text-color" style={{ fontWeight: "700" }}>
            {data?.info?.address}
          </span>
        </span>
        <span className="d-flex gap-2 align-items-center">
          <i
            style={{ color: "#ff4949", width: "16px", fontSize: "14px" }}
            class="fa fa-envelope"></i>
          <span className="text-color" style={{ fontWeight: "700" }}>
            {data?.info?.email}
          </span>
        </span>
      </div>
      <div className="d-flex justify-content-center">
        <Button
          onClick={handleChangeActiveCustomer}
          type="primary"
          className="text-white rounded-3"
          style={{ backgroundColor: "#644c38" }}>
          {active ? "Khóa tài khoản" : "Mở khóa tài khoản"}
        </Button>
      </div>
    </div>
  );
};

export default CardCustomer;
