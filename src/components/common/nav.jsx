import React from "react";
import "../common/css/nav.css";
import logoHeader from "../../assets/XINH_logohedear.png";
import Logout from "../Logout";
import { Link } from "react-router-dom";

export default function Nav() {
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));
  const cartQuantity = parseInt(localStorage.getItem("cartQuantity"), 10) || 0;

  return (
    <>
      <div className="container header">
        <div className="header-left mt-2 p-0">
          <Link to={"/teddy-store/homePage"}>
            <img
              src={logoHeader}
              className="img-fluid logo-header"
              alt="Logo"
            />
          </Link>
        </div>

        <div className="header-right ms-auto d-flex align-items-center mt-2 p-0">
          <div className="search d-flex">
            <input
              type="text"
              className="form-control border-0"
              placeholder="Tìm kiếm sản phẩm"
            />
            <button type="submit" className="btn button-search">
              <i className="fa-solid fa-magnifying-glass fs-6"></i>
            </button>
          </div>
          <div className="tool d-flex mt-2">
            <div className="dropdown">
              {userProfile && userProfile.username ? (
                <>
                  <Link
                    className="btn button-profile"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="me-2 fa-regular fa-user"></i>
                    <span className="">{userProfile.username}</span>
                  </Link>
                  <ul className="dropdown-menu">
                    <li>{<Logout />}</li>
                    <li>
                      <div>
                        <Link
                          to={"/teddy-store/infor"}
                          className="dropdown-item"
                        >
                          Tài khoản
                        </Link>
                      </div>
                    </li>
                  </ul>
                </>
              ) : (
                <>
                  <Link
                    className="btn button-profile"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="me-2 fa-regular fa-user"></i>
                    <span>Chưa đăng nhập</span>
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to={"/teddy-store/login"} className="dropdown-item">
                        Đăng nhập
                      </Link>
                    </li>
                  </ul>
                </>
              )}
            </div>
            <Link type="submit" className="btn button-favorite">
              <i className="fa-regular fa-heart"></i>
              <span>Yêu thích</span>
            </Link>
            {userProfile && userProfile.role === "admin" ? (
              <Link to={"/teddy-store/admin"} className="btn button-dashboard">
                <i className="fa-solid fa-dashboard"></i>
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link
                to={"/teddy-store/cart"}
                type="submit"
                className="btn button-cart"
              >
                <i className="fa-solid fa-bag-shopping"></i>
                <span>Giỏ hàng ({cartQuantity})</span>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="menu py-2 container-fluid">
        <nav className="navbar navbar-expand-lg ">
          <div className="container ">
            <button
              className="navbar-toggler btn-nav border-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
            >
              <i class="fa-solid fa-list text_brown"></i>
            </button>
            <div className="collapse navbar-collapse " id="navbarNav">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <Link to={"/teddy-store/homePage"} className="nav-link me-5">
                    Trang chủ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link me-5">Vườn gấu</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link me-5">Thú bông</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link me-5">Gấu Teddy</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link me-5">Gấu hoạt hình</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link me-5">Bút cao cấp</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link me-5">Khuyến mãi</Link>
                </li>
                <li className="nav-item">
                  <Link to={"/teddy-store/service"} className="nav-link me-5">
                    Dịch vụ
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/teddy-store/contact"} className="nav-link me-5">
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
