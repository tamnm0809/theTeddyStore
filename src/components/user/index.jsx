import React from "react";
import Navigation from "../common/nav.jsx";
import Footer from "../common/footer.jsx";
import TopBear from "./TopBear.jsx";
import DataBear from "./DataBear.jsx";
import ThuBong from "./ThuBong.jsx";
import GauBongHoatHinh from "./GauBongHoatHinh";
import { Link } from "react-router-dom";
import "./css/index-user.css";
import Banner from "../common/banner.jsx";
import axios from "axios";

export default function Index() {
  return (
    <>
      <div className="container-fluid p-0 m-0">
        <div className="container-fluid p-0 m-0">{<Navigation />}</div>
        <div className="container-fluid p-0 m-0">{<Banner />}</div>
        <div className="container p-0 my-5">
          <div className="title-topbear">
            <div className="title text-center">
              <h3 className="">Top gấu bán chạy</h3>
            </div>
            <div className="learn-more text-end">
              <Link className="text-decoration-none">
                <span>Xem thêm</span>
                <i className="mx-1 fa-solid fa-angles-right"></i>
              </Link>
            </div>
          </div>
          <div className="product-topbear">
            <div className="row">
              <TopBear />
            </div>
          </div>
        </div>
        <div className="container mb-5 p-0">
          <div className="row text-center">
            <div className="col-6 col-sm-6 col-md-6 col-lg-6">
              <Link>
                <img
                  src="/img_pro/sll.jpg"
                  alt=""
                  width={"100%"}
                  style={{ borderRadius: "10px" }}
                />
              </Link>
            </div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-6">
              <Link>
                <img
                  src="/img_pro/theu-ao.jpg"
                  alt="hi"
                  width={"100%"}
                  style={{ borderRadius: "10px" }}
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="container mb-5 d-flex justify-content-center">
          <div className="row p-0 m-0 w-75">{<DataBear />}</div>
          <div className="banner-teddy w-25">
            <Link className="img-fluid">
              <img
                src="/img_pro/teddy-cc.png"
                alt="đf"
                style={{ borderRadius: "10px" }}
              />
            </Link>
          </div>
        </div>
        <div className="thu-bong container-fluid py-5">
          <div className="container my-3">
            <div className="title-topbear">
              <div className="title text-center">
                <h3 className="">Thú bông</h3>
              </div>
              <div className="learn-more text-end">
                <Link className="text-decoration-none">
                  <span>Xem thêm</span>
                  <i className="mx-1 fa-solid fa-angles-right"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="container">{<ThuBong />}</div>
        </div>
        <div className="container my-5 d-flex justify-content-center">
          <div className="banner-teddy p-0 m-0 w-20">
            <Link className="img-fluid">
              <img
                src="/img_pro/gau-bong-hoat-hinh.jpg"
                alt="ádsafasd"
                style={{ borderRadius: "10px" }}
              />
            </Link>
          </div>
          <div className="row p-0 m-0 w-75">{<GauBongHoatHinh />}</div>
        </div>
        <div className="blog container my-5">
          <div className="title-blog">
            <div className="title">
              <h3>Blog của Gấu Bông Xinh</h3>
            </div>
            <div className="arrow-blog">
              <Link className="btn btn-left">
                <i className="fa-solid fa-angle-left"></i>
              </Link>
              <Link className="btn btn-right">
                <i className="fa-solid fa-angle-right"></i>
              </Link>
            </div>
          </div>
          <hr />
          <div className="content">
            <div className="row p-0 m-0">
              <div className="px-5 col-12 col-sm-6 col-md-4 col-lg-4">
                <div className="card p-4">
                  <img src="/img_pro/thubong_cho_shiba.jpg" alt="kjasd" />
                  <div className="card-body">
                    <h5 className="card-title p-0 m-0">
                      Top những gấu bông được yêu thích nhất
                    </h5>
                    <p className="card-text p-0 mt-1 mb-0">Tháng 7, năm 2023</p>
                    <p className="card-text1 p-0 mt-1 mb-0">
                      Tổng hợp những mẫu Gấu Brown bán chạy, được các bạn trẻ
                      yêu thích nhất năm 2023. Những mẫu Brown nhập khẩu với ...
                    </p>
                    <Link href="/" className="btn mt-3">
                      Xem thêm
                    </Link>
                  </div>
                </div>
              </div>
              <div className="px-5 col-12 col-sm-6 col-md-4 col-lg-4">
                <div className="card p-4">
                  <img src="/img_pro/thubong_cho_shiba.jpg" alt="al;ksdn;f" />
                  <div className="card-body">
                    <h5 className="card-title p-0 m-0">
                      Top những gấu bông được yêu thích nhất
                    </h5>
                    <p className="card-text p-0 mt-1 mb-0">Tháng 7, năm 2023</p>
                    <p className="card-text1 p-0 mt-1 mb-0">
                      Tổng hợp những mẫu Gấu Brown bán chạy, được các bạn trẻ
                      yêu thích nhất năm 2023. Những mẫu Brown nhập khẩu với ...
                    </p>
                    <Link href="/" className="btn mt-3">
                      Xem thêm
                    </Link>
                  </div>
                </div>
              </div>
              <div className="px-5 col-12 col-sm-6 col-md-4 col-lg-4">
                <div className="card p-4">
                  <img src="/img_pro/thubong_cho_shiba.jpg" alt="á;kljldnfa" />
                  <div className="card-body">
                    <h5 className="card-title p-0 m-0">
                      Top những gấu bông được yêu thích nhất
                    </h5>
                    <p className="card-text p-0 mt-1 mb-0">Tháng 7, năm 2023</p>
                    <p className="card-text1 p-0 mt-1 mb-0">
                      Tổng hợp những mẫu Gấu Brown bán chạy, được các bạn trẻ
                      yêu thích nhất năm 2023. Những mẫu Brown nhập khẩu với ...
                    </p>
                    <Link href="/" className="btn mt-3">
                      Xem thêm
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid p-0 mt-5">{<Footer />}</div>
      </div>
    </>
  );
}
