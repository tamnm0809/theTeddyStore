import React, { useEffect, useRef, useState } from "react";
import { Select, Input, Button, Row, Col } from "antd";
import CardCustomer from "./card/CardCustomer";
import customerAPI from "../api/customerAPI";

const countDisplayCustomer = [
  {
    value: 9,
    content: "9",
  },
  {
    value: 1,
    content: "1",
  },
];

const statusCustomer = [
  {
    value: "1",
    content: "Hoạt động",
  },
  {
    value: "0",
    content: "Bị khóa",
  },
];

const PanelListCustomer = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(9);
  const [customers, setCustomers] = useState([]);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("1");
  const [lastPage, setLastPage] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      const result = await customerAPI.getCustomers({
        pageNumber,
        pageSize,
        query,
        active,
      });
      setLastPage(result.lastPage);
      setCustomers(result.data);
      console.log(result);
    };
    fetchCustomers();
  }, [query, pageNumber, pageSize, active]);

  return (
    <div>
      <div>
        <h4 className="text-color">Thông tin chi tiết</h4>
        <div className="d-flex justify-content-between">
          <div className="d-flex gap-2 align-items-center">
            <span>Hiển thị</span>
            <Select onChange={(value) => setPageSize(value)} value={pageSize}>
              {countDisplayCustomer.map((item) => (
                <Select.Option value={item.value} key={item.value}>
                  {item.content}
                </Select.Option>
              ))}
            </Select>
            <span>Khách hàng</span>
          </div>
          <div className="d-flex gap-4">
            <Select
              onChange={(value) => setActive(value)}
              value={active}
              style={{ width: "200px" }}>
              {statusCustomer.map((item) => (
                <Select.Option value={item.value} key={item.value}>
                  {item.content}
                </Select.Option>
              ))}
            </Select>
            <div className="d-flex gap-2">
              <Input
                ref={inputRef}
                placeholder="Tìm kiếm khách hàng"
                style={{ outline: "none !important" }}></Input>
              <Button
                onClick={() => setQuery(inputRef.current.input.value)}
                type="primary"
                className="text-white rounded-3"
                style={{ backgroundColor: "#644c38" }}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "30px",
          }}>
          {customers.length > 0 &&
            customers.map((customer) => (
              <CardCustomer key={customer.id} data={customer}></CardCustomer>
            ))}
        </div>
      </div>
      <div className="d-flex py-3 justify-content-end">
        <Button
          className="cusotmer__btn-prev"
          onClick={() => setPageNumber((prev) => prev - 1)}
          disabled={!pageNumber}
          style={{
            borderEndEndRadius: "0 !important",
            borderTopRightRadius: "0 !important",
          }}
          sty
          size="large">
          Trước
        </Button>
        <Button
          className="cusotmer__btn-next"
          onClick={() => setPageNumber((prev) => prev + 1)}
          disabled={!!lastPage}
          style={{
            borderEndStartRadius: "0 !important",
            borderTopLeftRadius: "0 !important",
          }}
          size="large">
          Sau
        </Button>
      </div>
    </div>
  );
};

export default PanelListCustomer;
