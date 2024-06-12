import React, { useEffect, useRef, useState } from "react";
import "./css/panel-review-product.css";
import { Avatar, Button, Pagination } from "antd";
import { DeleteOutlined, MessageOutlined, StarFilled } from "@ant-design/icons";
import RowTableReview from "./table/RowTableReview";
import rateAPI from "../api/rateAPI";
import Swal from "sweetalert2";

const PanelReviewProduct = () => {
  const [rates, setRates] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = useRef(1);

  useEffect(() => {
    const fetchRates = async () => {
      const result = await rateAPI.getRatesPagination({
        pageNumber: pageNumber - 1,
        pageSize: pageSize.current,
      });
      console.log(result);
      setRates(result?.data || []);
      setTotalElements(result?.totalElements || 0);
    };
    fetchRates();
  }, [pageNumber]);

  const handleDeleteRate = (id) => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa đánh giá này?",
      text: "Không thể hoàn tác khi xóa",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        rateAPI.deleteRate(id).then((result) => {
          if (result) {
            setRates((prev) => prev.filter((item) => item.id !== id));
            Swal.fire({
              title: "Đã xóa",
              text: "Xóa thành công",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Xảy ra sự cố",
              text: "Xóa thất bại",
              icon: "error",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <h4 className="text-color">Đánh giá sản phẩm</h4>
      <div className="table-review">
        <div className="table-review__header">
          <span className="table-review__td" style={{ flex: "4" }}>
            Khách hàng
          </span>
          <span className="table-review__td">Id Sản phẩm</span>
          <span className="table-review__td">Đánh giá</span>
          <span className="table-review__td" style={{ flex: "4" }}>
            Bình luận
          </span>
          <span className="table-review__td">Ngày đăng</span>
          <span className="table-review__td" style={{ flex: "1" }}></span>
        </div>
        <div className="table-review__body">
          {rates.length > 0 &&
            rates.map((rate) => (
              <RowTableReview
                key={rate.id}
                data={rate}
                handleDeleteRate={handleDeleteRate}
              />
            ))}
        </div>
      </div>
      <div className="mt-3 mx-auto d-flex justify-content-center">
        <Pagination
          current={pageNumber}
          onChange={(page) => setPageNumber(page)}
          total={totalElements}
          pageSize={pageSize.current}
        />
      </div>
    </div>
  );
};

export default PanelReviewProduct;
