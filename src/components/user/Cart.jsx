import "./css/cart.css";
import axios from "axios";
import Swal from "sweetalert2";
import Nav from "../common/nav";
import Footer from "../common/footer";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function Cart() {
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));
  const [listCart, setListCart] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [checkedAll, setCheckedAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  let navigate = useNavigate();

  let count = listCart.length;

  localStorage.setItem("cartQuantity", JSON.stringify(count));

  useEffect(() => {
    render();
  });

  const render = async () => {
    try {
      if (!userProfile?.id) {
        Swal.fire({
          icon: "warning",
          title: "Bạn chưa đăng nhập!",
          showConfirmButton: false,
          timer: 1500,
        });
        localStorage.removeItem("cartQuantity");
        setTimeout(() => {
          navigate("/teddy-store/login");
        }, 1500);
      } else {
        const result = await axios.get(
          `http://localhost:7070/teddy-store/getAllCart/${userProfile.id}`
        );
        setListCart(result.data);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const updateQuantity = async (id, quantity_pro, quantity_ser) => {
    try {
      const response = await axios.put(
        `http://localhost:7070/teddy-store/updateCart/${id}`,
        { quantity_pro, quantity_ser }
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Cập nhật số lượng thành công!",
          showConfirmButton: false,
          timer: 1500,
        });
        render();
        if (quantity_pro === 0 || quantity_pro < 0) {
          await axios.delete(
            `http://localhost:7070/teddy-store/delete-cart/${id}`
          );
        } else if (quantity_ser < 0) {
          Swal.fire({
            icon: "warning",
            title: "Số lượng dịch vụ không thể dưới 0!",
            showConfirmButton: false,
            timer: 1500,
          });
          return;
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Cập nhật số lượng thất bại!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleCheckAllChange = (event) => {
    const isChecked = event.target.checked;
    setCheckedAll(isChecked);

    const updatedCheckedItems = {};
    const updatedSelectedItems = [];

    listCart.forEach((cartItem) => {
      updatedCheckedItems[cartItem.id] = isChecked;
      if (isChecked) {
        updatedSelectedItems.push(cartItem);
      }
    });

    setSelectedItems(updatedSelectedItems);
    setCheckedItems(updatedCheckedItems);
  };

  const handleCheckItemChange = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      const selectedItemDetails = listCart.find((item) => item.id === id);
      if (selectedItemDetails) {
        setSelectedItems([...selectedItems, selectedItemDetails]);
      }
    }
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleDeleteCart = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Chắc chắn muốn xóa sản phẩm?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });
      if (result.isConfirmed) {
        const response = await axios.delete(
          `http://localhost:7070/teddy-store/delete-cart/${id}`
        );
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Xóa khỏi giỏ hàng thành công!",
            showConfirmButton: false,
            timer: 1500,
          });
          render();
        } else {
          Swal.fire({
            icon: "success",
            title: "Xóa khỏi giỏ hàng thất bại!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const totalPrice = listCart.reduce((total, cartItem) => {
    if (checkedAll || checkedItems[cartItem.id]) {
      return total + (cartItem.price_pro + cartItem.price_ser);
    }
    return total;
  }, 0);

  const handleCheckTotal = (totalPrice) => {
    if (totalPrice === 0) {
      Swal.fire({
        icon: "warning",
        title: "Bạn chưa chọn sản phẩm cần mua",
        timer: 3000,
      });
    } else {
      localStorage.setItem("itemSelected", JSON.stringify(selectedItems));
    }
  };

  return (
    <>
      <div className="container-fluid p-0 m-0">{<Nav />}</div>
      <div className="cart container my-5">
        <h4>Giỏ hàng của bạn</h4>
        <div className="row mt-4">
          <div className="col-md-9">
            {listCart.length === 0 ? (
              <p className="text-center">Không có sản phẩm trong giỏ hàng</p>
            ) : (
              <table className="table table-borderless">
                <thead className="text-center align-middle">
                  <tr>
                    <td colSpan={2}>
                      <div className="d-flex">
                        <input
                          className="form-check-input ms-4"
                          type="checkbox"
                          id="check-all"
                          name="check-all"
                          checked={checkedAll}
                          onChange={handleCheckAllChange}
                        />
                        <label className="form-label mx-3">
                          Tất cả {checkedAll ? count : ""} sản phẩm
                        </label>
                      </div>
                    </td>
                    <td>Số lượng</td>
                    <td>Giá</td>
                    <td>Tổng</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody className="align-middle text-center">
                  {listCart.map((cartItem) => (
                    <React.Fragment key={cartItem.id}>
                      <tr>
                        <td rowSpan={2}>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`check-item-${cartItem.id}`}
                              checked={checkedItems[cartItem.id]}
                              onChange={() =>
                                handleCheckItemChange(cartItem.id)
                              }
                            />
                            <label className="form-check-label" />
                          </div>
                        </td>
                        <td style={{ width: "100%" }} className="text-start">
                          <Link
                            to={`/teddy-store/detail_products/${cartItem.id_pro}`}
                            className="d-flex text-decoration-none"
                          >
                            <img
                              className="img-fluid w-25 rounded me-3"
                              src={`/img_pro/${cartItem.image_pro}`}
                              alt="For product"
                            />
                            <div className="infor_teddy w-75">
                              <span className="name-product">
                                {cartItem.name_pro}
                              </span>
                              <div>
                                <span className="color-product">
                                  Màu: {cartItem.color}
                                </span>
                              </div>
                              <div>
                                <span className="size-product">
                                  Size: {cartItem.size_no}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td>
                          <div className="container d-flex">
                            <button
                              type="button"
                              className="btn"
                              onClick={() =>
                                updateQuantity(
                                  cartItem.id,
                                  cartItem.quantity_pro - 1,
                                  cartItem.quantity_ser
                                )
                              }
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                            <input
                              type="number"
                              className="quantity text-center"
                              value={cartItem.quantity_pro}
                              readOnly
                            />
                            <button
                              type="button"
                              className="btn"
                              onClick={() =>
                                updateQuantity(
                                  cartItem.id,
                                  cartItem.quantity_pro + 1,
                                  cartItem.quantity_ser
                                )
                              }
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                        </td>
                        <td>
                          {(
                            cartItem.price_pro * cartItem.quantity_pro
                          ).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                        <td rowSpan={2}>
                          {(
                            cartItem.price_pro * cartItem.quantity_pro +
                            cartItem.price_ser * cartItem.quantity_ser
                          ).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                        <td rowSpan={2}>
                          <button
                            type="button"
                            className="btn"
                            onClick={() => handleDeleteCart(cartItem.id)}
                          >
                            <i className="fa-regular fa-trash-can"></i>
                          </button>
                        </td>
                      </tr>
                      <tr
                        style={{ borderBottom: "1px solid rgb(218 214 214)" }}
                      >
                        <td style={{ width: "40%" }} className="text-start">
                          Dịch vụ kèm:
                          <span className="name-service mx-2">
                            {cartItem.name_ser}
                          </span>
                        </td>
                        <td>
                          <div className="container d-flex">
                            <button
                              type="button"
                              className="btn"
                              onClick={() =>
                                updateQuantity(
                                  cartItem.id,
                                  cartItem.quantity_pro,
                                  cartItem.quantity_ser - 1
                                )
                              }
                              disabled={cartItem.quantity_ser === 0}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                            <input
                              type="number"
                              className="quantity text-center"
                              value={cartItem.quantity_ser}
                              readOnly
                            />
                            <button
                              type="button"
                              className="btn"
                              onClick={() =>
                                updateQuantity(
                                  cartItem.id,
                                  cartItem.quantity_pro,
                                  cartItem.quantity_ser + 1
                                )
                              }
                              disabled={cartItem.name_ser === "Không có"}
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                        </td>
                        <td className="mb-5">
                          {(
                            cartItem.price_ser * cartItem.quantity_ser
                          ).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="cart-pay col-md-3">
            <h5 className="text-center">Tổng tiền sản phẩm</h5>
            <hr className="my-3" />
            <div className="d-flex">
              <div className>Thành tiền</div>
              <div className="ms-auto cart-total">
                {totalPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
            </div>
            <div className="d-flex mt-2">
              <div>Tổng tiền (bao gồm VAT)</div>
              <div className="ms-auto">
                {totalPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </div>
            </div>
            <div>
              <Link
                to={totalPrice === 0 ? "#" : "/teddy-store/checkout"}
                className="btn"
                onClick={() => handleCheckTotal(totalPrice)}
              >
                Thanh toán
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid p-0 m-0">{<Footer />}</div>
    </>
  );
}
