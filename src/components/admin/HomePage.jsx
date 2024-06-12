import axios from "axios";
import React, { useEffect, useState } from "react";
import "../admin/css/index-admin.css";
import Admin_banner from "../../assets/admin_banner.jpg";
import { DatePicker, Space } from "antd";

import {
  EyeOutlined,
  TeamOutlined,
  ShoppingOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Carousel, Card, Col, Row } from "antd";
const onChange = (date, dateString) => {
  console.log(date, dateString);
};
const HomePageForm = () => {
  const [productDetails, setProductDetails] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productDetailsResponse = axios.get(
          "http://localhost:7070/teddy-store/product-details"
        );
        const orderDetailResponse = axios.get(
          "http://localhost:7070/teddy-store/DetailsOrders"
        );

        const [productDetailsData, orderDetailData] = await Promise.all([
          productDetailsResponse,
          orderDetailResponse,
        ]);

        setProductDetails(productDetailsData.data);
        console.log(productDetails.data);
        setOrderDetail(orderDetailData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  });
  
  return (
    <>
      <Carousel>
        <div>
          <div className="demo-logo-vertical" />
          <a className=" ">
            <img src={Admin_banner} alt="Logo" />
          </a>
        </div>
      </Carousel>
      <Row justify="center">
        <Col>
          <Card bordered={false}>
            <div className="icon1">
              <EyeOutlined />
            </div>
            <div>
              <h3>4301</h3>
              <h5>Lượt truy cập</h5>
            </div>
          </Card>
        </Col>
        <Col>
          <Card bordered={false}>
            <div className="icon2">
              <TeamOutlined />
            </div>
            <div>
              <h3>4399</h3>
              <h5>Khách hàng</h5>
            </div>
          </Card>
        </Col>
        <Col>
          <Card>
            <div className="icon3">
              <ShoppingOutlined />
            </div>
            <div>
              <h3>4000</h3>
              <h5>Đơn hàng</h5>
            </div>
          </Card>
        </Col>
        <Col>
          <Card>
            <div className="icon4">
              <CloseCircleOutlined />
            </div>
            <div>
              <h3>4000</h3>
              <h5>Đơn hủy</h5>
            </div>
          </Card>
        </Col>
      </Row>
      <div className="container-fluid d-flex justify-content-around">
        <div className="card p-3" style={{ width: "65%" }}>
          <h4>Đơn hàng mới nhất</h4>
          <table className="table mt-3">
            {orderDetail.map((orderDetail) => (
              <tr key={orderDetail.id}>
                <td>{orderDetail.date}</td>
                <td>{orderDetail.id}</td>
                <td className="color-status">{orderDetail.status}</td>
                <td className="color-price">{orderDetail.price_unit}</td>
                <td>
                  <button className="btn">
                    <i class="fa-solid fa-right-long"></i>
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
        <div className="card p-3" style={{ width: "30%" }}>
          <Space direction="vertical" className="ms-auto">
            <DatePicker
              onChange={onChange}
              picker="year"
              className="border-dark text-dark"
            />
          </Space>
          <div>
            <div className="year-selector">
            </div>
            <div className="d-flex mt-3">
                <div className="dollar">
                    <i className="color-price fa-solid fa-dollar-sign"></i>
                </div>
                <div className="ms-4">
                    <h4 className="color-price">200.000.000VND</h4>
                    <h5>Tổng doanh thu</h5>
                </div>
            </div>
            <div className="mt-3">
                 
                    <div  className="d-flex p-2">
                        <h6 className="color-ora">Doanh thu quý 1 </h6>
                        <h6 className="mx-auto color-price">30.000.000 VND</h6>
                    </div>
                 
            </div>
        </div>
        </div>
      </div>
      <div className="card m-4 p-3">
        <h4>Sản phẩm bán chạy nhất</h4>
        <table className="table mt-3" key={productDetails.id}>
          <thead>
            <tr>
              <th scope="col">Mã sản phẩm</th>
              <th scope="col">Tên</th>
              <th scope="col">Màu</th>
              <th scope="col">Size</th>
              <th scope="col">Lượt mua</th>
            </tr>
          </thead>
          <tbody>
            {productDetails.map((productDetails) => (
              <tr key={productDetails.id}>
                <td>{productDetails.id}</td>
                <td className="img_sp d-flex">
                  <img
                    className="rounded me-3"
                    src={`/img_pro/${productDetails.img_url}`}
                    alt="#"
                  />
                  <p className="text-color">{productDetails.name}</p>
                </td>
                <td>{productDetails.color}</td>
                <td>{productDetails.size}</td>
                <td className="fw-bold color-price">
                  {productDetails.purchases}{" "}
                  <i class="fa-solid fa-arrow-up"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HomePageForm;
