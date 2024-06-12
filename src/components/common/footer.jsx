import React from "react";
import "./css/footer.css";
import logoFooter from "../../assets/xinh_logo.png";
import { Link } from "react-router-dom";
export default function footer() {
  return (
    <>
      <footer className="text-center text_brown text-lg-start footer mt-5">
        <section className="send_mail">
          <div className="container p-4 pb-0">
            <form>
              <div className="row">
                <div className="col-auto mb-4 mb-md-0 ">
                  <div className="me-5 d-flex">
                    <i className="fas fa-envelope me-3 fs-1 mt-2" />
                    <div>
                      <div className="fw-bold fs-5 ">
                        Theo dõi bảng tin của chúng tôi
                      </div>
                      <div>
                        Nhận tất cả các thông tin mới nhất về Sự kiện, Bán hàng
                        và Ưu đãi qua Email.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-12 mb-4 mb-md-0 mt-2">
                  {/* Email input */}
                  <div className="form-outline  ">
                    <input type="email" className="form-control" />
                  </div>
                </div>
                <div className="col-auto mb-4 mb-md-0 mt-2">
                  <button
                    type="button"
                    className="btn text-light dark_brown px-4 mb-4 me-5"
                  >
                    Đăng ký
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
        <section>
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <img src={logoFooter} className="img-fluid w-75" alt="" />
                <h6 className="text-uppercase fw-bold mb-4 mt-3">
                  Thông tin liên hệ
                </h6>
                <p>
                  <i className="fas fa-phone me-3" />
                  0903930394
                </p>
                <p>
                  <i className="fas fa-envelope me-3" />
                  gaubongxinh@gmail.com
                </p>
                <p>
                  <i className="fas fa-home me-3" />
                  93 Nguyễn Văn Nghi, phường 7, quận Gò Vấp
                </p>
              </div>
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3" />
                  Thông tin
                </h6>
                <p>
                  <Link className="text-decoration-none text-reset">
                    Chính sách bảo mật thông tin
                  </Link>
                </p>
                <p>
                  <Link className="text-decoration-none text-reset">
                    Chính sách bán sỉ
                  </Link>
                </p>
                <p>
                  <Link className="text-decoration-none text-reset">
                    Bảo hành và đổi trả
                  </Link>
                </p>
                <p>
                  <Link className="text-decoration-none text-reset">
                    Cách đặt hàng{" "}
                  </Link>
                </p>
                <p>
                  <Link className="text-decoration-none text-reset">
                    Giới thiệu và liên hệ
                  </Link>
                </p>
              </div>
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  Liên kết tài khoản
                </h6>
                <p>
                  <Link className="text-decoration-none text-reset">
                    Giỏi hàng
                  </Link>
                </p>
                <p>
                  <Link className="text-decoration-none text-reset">
                    Tài khoản
                  </Link>
                </p>
                <p>
                  <Link className="text-decoration-none text-reset">
                    Sản phẩm mới
                  </Link>
                </p>
                <h6 className="text-uppercase fw-bold mb-3 mt-4">
                  Dịch vụ giao hàng
                </h6>
                <p>
                  Dịch vụ vận chuyển: Ahamove, GHTK <br></br>
                  TP.HCM: Nhận hàng từ 60 - 90 Phút<br></br>
                  Tỉnh: Nhận hàng từ 2 - 4 ngày
                </p>
              </div>
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Map</h6>
                <div>
                  <iframe
                    src="https://www.google.com/maps/d/embed?mid=14XBVf6GPq9QbfqynNiOmzBwN_cmD1E0&ehbc=2E312F"
                    style={{ height: "280px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div style={{ backgroundColor: "#644C38", color: "#FFFFFF" }}>
          <div className="container">
            <div className="d-flex py-2">
              <div className="">
                © 2023 Copyright:
                <Link className="text-reset fw-bold">Gaubongxinh.vn</Link>
              </div>
              <div className="ms-auto ">
                <Link className="me-4 text-reset">
                  <i className="fab fa-facebook-f" />
                </Link>
                <Link className="me-4 text-reset">
                  <i className="fab fa-google" />
                </Link>
                <Link className="me-4 text-reset">
                  <i className="fab fa-instagram" />
                </Link>
                <Link className="me-4 text-reset">
                  <i className="fa-brands fa-twitter"></i>
                </Link>
                <Link className="me-4 text-reset">
                  <i className="fa-brands fa-youtube"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
