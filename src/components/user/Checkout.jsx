import React, { useEffect, useRef, useState } from "react";
import Footer from "../common/footer";
import Nav from "../common/nav";
import Swal from "sweetalert2";
import axios from "axios";
import "../user/css/checkout.css";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));
  const productSelected = JSON.parse(localStorage.getItem("itemSelected"));
  const navigate = useNavigate();
  const [selectMethodDelivery, setSelectMethodDelivery] = useState("GHN");
  const [selectMethodPayment, setMethodPayment] = useState("COD");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalAddressIsOpen, setModalAddressIsOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dataAcc, setDataAcc] = useState([]);
  const [dataAddress, setDataAddress] = useState([]);
  const [nameAddress, setNameAddress] = useState("");
  const [typeAddress, setTypeAddress] = useState("");
  const [subAddress, setSubAddress] = useState("");
  const [idCart, setIdCart] = useState("");
  const quantity_pro = useRef(null);
  const quantity_ser = useRef(null);
  const price_unit = useRef(null);
  const price_unit_ser = useRef(null);
  const address = useRef(null);
  const note = useRef(null);
  const amount = useRef(null);
  const id_dt_pro = useRef(null);
  const id_ser = useRef(null);
  const id_acc = userProfile.id.toString();

  const generateRandomNumbers = () => {
    const min = 1000000000;
    const max = 9999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const id = generateRandomNumbers();

  const renderDataAcc = async () => {
    try {
      if (!userProfile?.id) {
        Swal.fire({
          icon: "warning",
          title: "Bạn chưa đăng nhập!",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        const result = await axios.get(
          `http://localhost:7070/teddy-store/getDataAccWithId/${userProfile.id}`
        );
        setDataAcc(result.data);
      }
    } catch (error) {
      console.error("Error fetching checkout data:", error);
    }
  };

  const renderAddresses = async () => {
    try {
      const results = await axios.get(
        `http://localhost:7070/teddy-store/getDataAddressWithId/${userProfile.id}`
      );
      setDataAddress(results.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const addNewAddress = async (newAddressData) => {
    try {
      const response = await axios.post(
        "http://localhost:7070/teddy-store/addNewAddress",
        newAddressData
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Thêm mới địa chỉ thành công!",
          showConfirmButton: false,
          timer: 3000,
        });
        renderAddresses();
        setModalAddressIsOpen(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Thêm mới thất bại!",
          text: "Vui lòng kiểm tra dữ liệu lại",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (error) {
      console.error("Lỗi khi thực hiện yêu cầu thêm địa chỉ:", error);
    }
  };

  const handleConfirmAddress = async (event) => {
    event.preventDefault();

    try {
      const newAddressData = {
        id: id.toString(),
        account: userProfile.id,
        name_address: nameAddress,
        type_address: typeAddress,
        sub_address: subAddress,
      };

      await addNewAddress(newAddressData);
    } catch (error) {
      console.error("Lỗi khi thêm địa chỉ mới:", error);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Chắc chắn muốn xóa địa chỉ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://localhost:7070/teddy-store/removeAddress/${id}`
        );
        if (response.status === 200) {
          await Swal.fire({
            icon: "success",
            title: "Xóa địa chỉ thành công!",
            showConfirmButton: false,
            timer: 1500,
          });
          renderAddresses();
        }
      } else {
        await Swal.fire({
          icon: "error",
          title: "Xóa địa chỉ thất bại!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const addNewOrder = async (dataOrder) => {
    try {
      const response = await axios.post(
        "http://localhost:7070/teddy-store/addNewOrder",
        dataOrder
      );
      if (response.statusCode === 200) {
        Swal.fire({
          icon: "success",
          title: "Đặt hàng thành công!",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (error) {
      console.error("Lỗi khi thực hiện yêu cầu đặt hàng:", error);
      throw error;
    }
  };

  const handleConfirmAddNewOrder = async (event) => {
    event.preventDefault();

    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
      const day = currentDate.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      const dataOrder = {
        id: id.toString(),
        account: {
          id: id_acc,
        },
        date_order: formattedDate,
        status: "Đặt thành công",
      };
      await addNewOrder(dataOrder);
      await handleConfirmAddNewOrderDetail(dataOrder.id);
    } catch (error) {
      console.error("Lỗi khi thêm đơn đặt hàng mới:", error);
    }
  };

  const handleConfirmAddNewOrderDetail = async (orderId) => {
    try {
      const price_proString = price_unit.current.value;
      const price_serString = price_unit_ser.current.value;
      const amountString = amount.current.value;
      const priceNumber = parseFloat(price_proString.replace(/[^\d.,]/g, ""));
      const priceSerNumber = parseFloat(
        price_serString.replace(/[^\d.,]/g, "")
      );
      const amountNumber = parseFloat(amountString.replace(/[^\d.,]/g, ""));
      const detailOrderData = {
        id: id.toString(),
        quantity_pro: quantity_pro.current.value,
        price_unit: priceNumber * 1000,
        quantity_ser: quantity_ser.current.value,
        price_unit_ser: priceSerNumber * 1000,
        address: address.current.value,
        note: note.current.value,
        method_payment: selectMethodPayment,
        amount: amountNumber * 1000,
        order: {
          id: orderId,
        },
        detailsProduct: {
          id: id_dt_pro.current.value,
        },
        service: {
          id: id_ser.current.value,
        },
      };
      if (selectMethodPayment === "COD") {
        await addNewOrderDetail(detailOrderData);
        await deleteIdCart();
        Swal.fire({
          icon: "success",
          title: "Đặt hàng thành công!",
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          navigate("/teddy-store/thanks");
        }, 2000);
      } else if (selectMethodPayment === "MOMO") {
        Swal.fire({
          icon: "success",
          title: "Tính năng đang phát triển!",
          showConfirmButton: false,
          timer: 3000,
        });
      } else if (selectMethodPayment === "VNP") {
        getPaymentUrl(orderId);
        await deleteIdCart();
        await addNewOrderDetail(detailOrderData);
      }
    } catch (error) {
      console.log("Error adding order detail" + error);
      throw new Error("Error adding order detail");
    }
  };

  const addNewOrderDetail = async (detailOrderData) => {
    try {
      const response = await axios.post(
        "http://localhost:7070/teddy-store/addNewOrderDetail",
        detailOrderData
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Đặt hàng thành công!",
          showConfirmButton: false,
          timer: 3000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Đặt hàng thất bại!",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const handlePaymentRedirect = (paymentUrl) => {
    window.location.href = paymentUrl;
  };

  const getPaymentUrl = async (orderId) => {
    try {
      const amountString = amount.current.value;
      const amountNumber = parseInt(amountString.replace(/[^\d]/g, ""), 10);
      const amountCurrency = amountNumber;
      const response = await axios.get(
        `http://localhost:7070/teddy-store/VNPay?amountValue=${amountCurrency}&orderId=${orderId}`
      );
      if (response.status === 200) {
        const paymentUrl = response.data;
        handlePaymentRedirect(paymentUrl);
      } else {
        console.error("Lỗi lấy url VNPay");
      }
    } catch (error) {
      console.log("Error getting payment url" + error);
    }
  };

  useEffect(() => {
    renderDataAcc();
    getIdCart();
    calculateTotalPrice();
  }, []);

  useEffect(() => {
    try {
      if (modalIsOpen) {
        renderAddresses();
      }
    } catch (error) {
      console.log("Error rendering" + error.message);
    }
  });

  const handleMethodDelivery = (event) => {
    setSelectMethodDelivery(event.target.id);
    const isChecked = event.target.checked;
    if (isChecked) {
    }
  };

  const handleMethodPay = (event) => {
    const selectedMethod = event.target.id;
    setMethodPayment(selectedMethod);
  };

  const calculateTotalPrice = () => {
    let total = 0;
    if (productSelected) {
      productSelected.forEach((product) => {
        total += product.price_pro + product.price_ser;
      });
    }
    setTotalPrice(total);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openModalAddress = () => {
    setModalAddressIsOpen(true);
  };

  const closeModalAddress = () => {
    setModalAddressIsOpen(false);
  };

  const deleteIdCart = async () => {
    try {
      await axios.delete(
        `http://localhost:7070/teddy-store/delete-cart/${idCart}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getIdCart = async () => {
    try {
      const result = await axios.get(
        `http://localhost:7070/teddy-store/getIdCart/${userProfile.id}/${id_dt_pro.current.value}`
      );
      setIdCart(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-fluid p-0 m-0">
        <Nav />
      </div>
      <div className="container my-4">
        <h5 className="checkout-title my-4">Thanh toán</h5>
        <div className="checkout row p-0 m-0">
          <div className="col-12 col-sm-6 col-md-6 col-lg-7 px-3">
            <div className="checkout-info container">
              {dataAcc.map((acc) => (
                <React.Fragment key={acc.id}>
                  <h6 className="checkout-title-info mb-4">
                    Thông tin kiện hàng
                  </h6>
                  <div className="input-group mb-3">
                    <label className="form-label">Tên người nhận</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      defaultValue={acc.name}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <button
                      className="btn btn-address form-label"
                      onClick={openModal}
                    >
                      Địa chỉ (có thể chọn)
                    </button>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      id="address"
                      defaultValue={acc.address}
                      ref={address}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      id="email"
                      defaultValue={acc.email}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <label className="form-label">Số điện thoại</label>
                    <input
                      type="text"
                      className="form-control"
                      name="numberPhone"
                      id="numberPhone"
                      defaultValue={"0" + acc.phone}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <label className="form-label">Ghi chú</label>
                    <textarea
                      type="text"
                      className="form-control"
                      name="note"
                      id="note"
                      defaultValue={" "}
                      ref={note}
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="row mt-4">
              <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                <div className="checkout-delivery mt-4">
                  <h6 className="checkout-title">Phương thức giao hàng</h6>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="method-delivery"
                      id="GHTK"
                      defaultChecked={selectMethodDelivery === "GHTK"}
                      onChange={handleMethodDelivery}
                    />
                    <label className="form-check-label" htmlFor="GHTK">
                      Giao hàng tiết kiệm
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="method-delivery"
                      id="GHN"
                      defaultChecked={selectMethodDelivery === "GHN"}
                      onChange={handleMethodDelivery}
                    />
                    <label className="form-check-label" htmlFor="GHN">
                      Giao hàng nhanh
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                <div className="checkout-pay mt-4">
                  <h6 className="checkout-title">Phương thức thanh toán</h6>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="method_payment"
                      id="MOMO"
                      defaultChecked={selectMethodPayment === "MOMO"}
                      onClick={handleMethodPay}
                    />
                    <label className="form-check-label" htmlFor="MOMO">
                      Thanh toán qua MOMO
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="method_payment"
                      id="VNP"
                      defaultChecked={selectMethodPayment === "VNP"}
                      onClick={handleMethodPay}
                    />
                    <label className="form-check-label" htmlFor="VNP">
                      Thanh toán qua ngân hàng
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="method_payment"
                      id="COD"
                      defaultChecked={selectMethodPayment === "COD"}
                      onClick={handleMethodPay}
                    />
                    <label className="form-check-label" htmlFor="COD">
                      Thanh toán khi nhận hàng (COD)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="checkout-order col-12 col-sm-6 col-md-6 col-lg-5 px-3">
            <h6>Thông tin đơn hàng</h6>
            <div className="d-flex justify-content-between mt-3">
              <div className="checkout-order-title">Sản phẩm</div>
              <div className="checkout-order-title">Tổng</div>
            </div>
            <hr />
            <div className="product-wrapper">
              {productSelected.map((product) => (
                <React.Fragment key={product.id}>
                  <div className="product d-flex justify-content-between">
                    <div className="product-info d-flex">
                      <img
                        src={`/img_pro/${product.image_pro}`}
                        alt="For product"
                        style={{ width: "30%" }}
                        className="img-fluid rounded align-self-start me-3"
                      />
                      <input
                        type="text"
                        defaultValue={product.id_dt_pro}
                        hidden
                        readOnly
                        ref={id_dt_pro}
                      />
                      <input
                        type="text"
                        defaultValue={product.id_ser}
                        hidden
                        readOnly
                        ref={id_ser}
                      />
                      <div className="product-info-details w-100">
                        <div className="product d-flex  justify-content-between">
                          <div className="info">
                            <p className="product-name mt-0 mb-0">
                              {product.name_pro}
                            </p>
                            <p className="product-quantity">
                              Số lượng:{" "}
                              <input
                                type="text"
                                name="quantity_pro"
                                id="quantity_pro"
                                defaultValue={product.quantity_pro}
                                readOnly
                                ref={quantity_pro}
                              />
                            </p>
                          </div>
                          <div className="price">
                            <input
                              type="text"
                              defaultValue={product.price_pro.toLocaleString(
                                "vi-VN",
                                {
                                  style: "currency",
                                  currency: "VND",
                                }
                              )}
                              ref={price_unit}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="service d-flex justify-content-between">
                          <div className="info">
                            <p className="product-ser m-0">
                              Dịch vụ kèm: {product.name_ser}
                            </p>
                            <div className="product-quantity">
                              Số lượng:
                              <input
                                type="text"
                                defaultValue={product.quantity_ser}
                                readOnly
                                ref={quantity_ser}
                              />
                            </div>
                          </div>
                          <div className="price">
                            <input
                              type="text"
                              defaultValue={product.price_ser.toLocaleString(
                                "vi-VN",
                                {
                                  style: "currency",
                                  currency: "VND",
                                }
                              )}
                              ref={price_unit_ser}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="dropdown">
                          <p
                            className="dropdown-toggle"
                            role="button"
                            id="dropdownMenuLink"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Xem chi tiết{" "}
                            <i className="fa-solid fa-angle-down"></i>
                          </p>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuLink"
                          >
                            <li>
                              <p className="dropdown-item">
                                Màu: {product.color}
                              </p>
                            </li>
                            <li>
                              <p className="dropdown-item">
                                Size: {product.size_no}
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
              ))}
            </div>
            <div className="checkout-total-price d-flex justify-content-between">
              <div className="checkout-total-title mt-2">
                <p>Tổng tiền sản phẩm</p>
              </div>
              <div className="checkout-total mt-2">
                <p>
                  {totalPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
            </div>
            <div className="checkout-total-price d-flex justify-content-between">
              <div className="checkout-total-title">
                <p>Phí ship</p>
              </div>
              <div className="checkout-total">
                <p>44.000</p>
              </div>
            </div>
            <div className="checkout-total-price d-flex justify-content-between">
              <div className="checkout-total-title">
                <p>Tổng cộng</p>
              </div>
              <div className="checkout-total">
                <input
                  type="text"
                  name="total"
                  id="total"
                  value={(totalPrice + 44000).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                  readOnly
                  ref={amount}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn"
              onClick={handleConfirmAddNewOrder}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
      <div className="container">
        <ReactModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="modal-container"
          overlayClassName="modal-overlay"
        >
          <h4 className="modal-title">Chọn địa chỉ bạn muốn giao</h4>
          <div
            className="modal-content-address"
            style={{ overflowY: "auto", height: "80vh" }}
          >
            {dataAddress.map((address) => (
              <div
                className="contaner-fluid card my-1"
                key={address.id}
                onClick={() => {
                  document.getElementById("address").value =
                    address.sub_address;
                  document.getElementById("name").value = address.name_address;
                  closeModal();
                }}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{address.name_address}</h5>
                    <button
                      className="btn-remove"
                      onClick={() => handleDeleteAddress(address.id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                  <div className="cart-text">
                    Loại địa chỉ:{" "}
                    <span className="type-address">{address.type_address}</span>
                  </div>
                  <div className="card-text">
                    Địa chỉ:{" "}
                    <span className="sub-address">{address.sub_address}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="modal-close btn m-0" onClick={closeModal}>
            <i className="fa-solid fa-x"></i>
          </button>
          <button className="modal-add mt-3" onClick={openModalAddress}>
            <i className="fa-solid fa-plus me-2"></i>
            <span>Thêm địa chỉ mới</span>
          </button>
        </ReactModal>
        <ReactModal
          isOpen={modalAddressIsOpen}
          onRequestClose={closeModalAddress}
          className="modal-container"
          overlayClassName="modal-overlay"
        >
          <h4 className="modal-title mb-4">Thêm địa chỉ mới</h4>
          <form action="" method="post" onSubmit={handleConfirmAddress}>
            <div className="modal-content">
              <div className="mb-3 row">
                <label
                  htmlFor="staticNameAddress"
                  className="col-sm-2 col-form-label"
                >
                  Tên
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="name_address"
                    placeholder="Vui lòng nhập tên người nhận.."
                    onChange={(e) => setNameAddress(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  htmlFor="staticTypeAddress"
                  className="col-sm-2 col-form-label"
                >
                  Loại
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control"
                    id="type_address"
                    placeholder="Vui lòng loại địa chỉ.."
                    onChange={(e) => setTypeAddress(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mb-3 row">
                <label
                  htmlFor="staticAddress"
                  className="col-sm-2 col-form-label"
                >
                  Địa chỉ
                </label>
                <div className="col-sm-10">
                  <textarea
                    type="text"
                    className="form-control"
                    id="sub_address"
                    placeholder="Vui lòng nhập địa chỉ.."
                    onChange={(e) => setSubAddress(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <button className="modal-close btn m-0" onClick={closeModalAddress}>
              <i className="fa-solid fa-x"></i>
            </button>
            <div className="text-center">
              <button type="submit" className="modal-add mt-3">
                <i className="fa-solid fa-check me-2"></i>
                <span>Xác nhận</span>
              </button>
            </div>
          </form>
        </ReactModal>
      </div>
      <div className="container-fluid p-0 m-0">
        <Footer />
      </div>
    </>
  );
}
