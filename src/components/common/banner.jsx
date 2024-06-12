import React, { useEffect, useState } from "react";
import "./css/banner.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import bannerAPI from "../api/bannerAPI";
import Banner2 from "../../assets/banner.jpg";
import Banner1 from "../../assets/banner-1.jpg";

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    const fetchBanner = async () => {
      const result = await bannerAPI.getBanners();
      setBanners([...result]);
    };
    fetchBanner();
  }, []);
  console.log(banners);
  return (
    <>
      <div className=" container wrapper p-0 mx-0 mb-1 mx-auto mt-4">
        <Slider {...settings} className="slide">
          {banners.length > 0 &&
            banners.map((banner) => (
              <Link href="/" className="m-0 p-0" key={banner.id}>
                <img src={banner?.url || ""} alt="banner" />
              </Link>
            ))}
        </Slider>
      </div>
      <div className="article d-flex justify-content-center p-0 mt-5">
        <div className="row p-0 m-0">
          <div className="col-12 col-sm-6 col-md-3 col-lg-3">
            <div className="card text-center" style={{ width: "20rem" }}>
              <i className="fa-solid fa-gear"></i>
              <div className="card-body">
                <h5 className="card-title">Bảo hành vĩnh viễn</h5>
                <p className="card-text">
                  Gấu bông được bảo hành đường chỉ may vĩnh viễn
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-3 col-lg-3">
            <div className="card text-center" style={{ width: "20rem" }}>
              <i className="fa-solid fa-truck-fast"></i>
              <div className="card-body">
                <h5 className="card-title">Giao hàng toàn quốc</h5>
                <p className="card-text">
                  Sản phẩm có thể vận chuyện và mua ở bất cứ tính nào bạn muốn
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-3 col-lg-3">
            <div className="card text-center" style={{ width: "20rem" }}>
              <i className="fa-solid fa-wind"></i>
              <div className="card-body">
                <h5 className="card-title">Giao hàng siêu tốc</h5>
                <p className="card-text">
                  Gấu bông sẽ được giao siêu tốc 60p khu vực nội thành phố
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-3 col-lg-3">
            <div className="card text-center" style={{ width: "20rem" }}>
              <i className="fa-solid fa-headphones-simple"></i>
              <div className="card-body">
                <h5 className="card-title">Hỗ trợ khách hàng</h5>
                <p className="card-text">
                  Những thắc mắc cần giải đáp liên hệ với tổng đài, luôn sẵn
                  sàng hỗ trợ 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
