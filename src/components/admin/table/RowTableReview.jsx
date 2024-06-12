import React, { useState } from "react";
import { Avatar, Button } from "antd";
import { DeleteOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import moment from "moment";

const RowTableReview = ({ data, handleDeleteRate }) => {
  // const [openComment, setOpenComment] = useState(false);

  return (
    <div className="table-review__row">
      <div className="table-review__row__content">
        <div
          className="table-review__td table-review__customer-info"
          style={{ flex: "4" }}>
          <Avatar size={40} src={data?.info_customer?.avatar} />
          <div className="d-flex flex-column ">
            <span style={{ fontWeight: "600" }}>
              {data?.info_customer?.name}
            </span>
            <span>{`0${data?.info_customer?.phone}`}</span>
          </div>
        </div>
        <div className="table-review__td">{data?.id_product}</div>
        <div className="table-review__td d-flex gap-1 align-items-start">
          {Array(data?.star || 0)
            .fill(1)
            .map((_, index) => (
              <StarFilled
                key={new Date() + index}
                style={{ color: "#f7b436" }}
              />
            ))}
          {Array(5 - (data?.star || 0))
            .fill(1)
            .map((_, index) => (
              <StarOutlined
                style={{ color: "#f7b436" }}
                key={new Date() + index}
              />
            ))}
        </div>
        <div className="table-review__td" style={{ flex: "4" }}>
          {data?.description}
        </div>
        <div className="table-review__td">
          {moment(data?.createdAt).format("DD/MM/YYYY")}
        </div>
        <div
          className="table-review__td d-flex gap-0 align-items-start"
          style={{ flex: "1" }}>
          {/* <button
            className="table-review__action-btn"
            onClick={() => setOpenComment((prev) => !prev)}>
            <MessageOutlined
              style={{
                fontSize: "18px",
                color: openComment ? "#f7dfba" : "#714708",
              }}
            />
          </button> */}
          <button
            className="table-review__action-btn"
            onClick={() => handleDeleteRate(data?.id)}>
            <DeleteOutlined
              style={{
                fontSize: "18px",
              }}
            />
          </button>
        </div>
      </div>
      {/* {openComment && (
        <div className="table-review__comment">
          <textarea
            className="table-review__comment__input"
            rows="3"></textarea>
          <Button style={{ background: "#714708" }} type="primary">
            Trả lời
          </Button>
        </div>
      )} */}
    </div>
  );
};

export default RowTableReview;
