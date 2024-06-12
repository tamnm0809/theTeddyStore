import React, { useState } from "react";
import { Form, Upload } from "antd";
// import ImgCrop from "antd-img-crop";
import "../user/css/modal.css";
import { Rate } from "antd";
import img_teddy from "../user/images/forget-password-img.jpg";
import { PlusOutlined } from "@ant-design/icons";
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
// import "../common/css/cart.css";

function Modal({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div
        className="modalContainer"
        style={{ height: "750px", overflowY: "auto" }}
      >
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            {" "}
            X
          </button>
        </div>
        <div className="title">
          <h5 className="fw-bold brown_color mb-3">Đánh giá sản phẩm</h5>
        </div>
        <div className="body">
          <div className="d-flex">
            <div className="image">
              <img src={img_teddy} alt="" className="w-50" />
            </div>
            <div className="item_teddy ms-5">
              <div className="fw-bold brown_color">Gấu Teddy lông xoăn</div>
              <div>
                <span className="fw-bold brown_color">Màu: </span>Hồng
              </div>
              <div>
                <span className="fw-bold brown_color">Size: </span>1m4
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className=" brown_color">Chất lượng sản phẩm</div>
            <div className=" ms-5 item_teddy">
              <Rate />
            </div>
          </div>
          <div class="mb-3">
            <label class="brown_color mt-3">Chia sẻ cảm nhận của bạn</label>
            <textarea class="form-control" rows="3"></textarea>
          </div>
          <Form.Item
            className="brown_color"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture-card">
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>

          <hr />
          <div className="fw-bold brown_color my-4">
            Thêu lên áo gấu bông theo yêu cầu
          </div>
          <div className="d-flex">
            <div className="brown_color">Chất lượng dịch vụ</div>
            <div className=" ms-5 item_teddy">
              <Rate />
            </div>
          </div>
          <div class="mb-3">
            <label class="brown_color mt-3">Chia sẻ cảm nhận của bạn</label>
            <textarea class="form-control" rows="3"></textarea>
          </div>
          <Form.Item
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture-card">
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
        </div>
        <div className="footer_model">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Hủy
          </button>
          <button>Gửi đánh giá</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
