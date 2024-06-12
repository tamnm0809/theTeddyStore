import React from "react";
import Sidebar from "../common/cate_sidebar";
import Nav from "../common/nav";
import Footer from "../common/footer";
const Order = () => {
  return (
    <div className="container-fluid">
      <Nav></Nav>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9 text_brown">
            <div className="card mt-4 rounded-5">
              <div className="m-4">
                <button className="btn btn-warning fw-bold mb-3">
                  Dịch vụ in, thêu
                </button>
                <p>
                  🧵🐻 In và Thêu Trên Áo Gấu Bông: Tạo Ra Một Món Quà Đẹp và Ý
                  Nghĩa
                </p>
                <p>
                  🌟 Chúng tôi chuyên cung cấp dịch vụ in và thêu trên áo gấu
                  bông, biến những mẫu thiết kế yêu thương của bạn thành hiện
                  thực trên sản phẩm gấu bông đáng yêu.
                </p>
                <p>
                  🎁 Mang lại sự độc đáo và cá nhân hóa cho món quà In hình ảnh,
                  logo hoặc thông điệp yêu thương lên áo gấu bông. Thêu tên,
                  ngày sinh, hoặc câu châm ngôn đặc biệt lên sản phẩm.
                </p>
                <p>
                  🎀 Biến Ý Tưởng của Bạn Thành Hiện Thực 💡 Chúng tôi sẵn sàng
                  thực hiện theo yêu cầu của bạn, từ chất liệu, màu sắc cho đến
                  thiết kế và phối hợp. 🎨 Tận hưởng trải nghiệm mua sắm thoải
                  mái và dễ dàng với dịch vụ tư vấn chuyên nghiệp.
                </p>
                <p>
                  🧸 Dễ dàng tạo ra những quà tặng ấn tượng Lựa chọn từ nhiều
                  mẫu áo gấu bông chất lượng. Thiết kế độc đáo phản ánh cá nhân
                  của bạn hoặc người nhận quà.
                </p>
                <p>
                  💌 Thích hợp cho mọi dịp đặc biệt Sinh nhật, kỷ niệm,
                  Valentine, ngày của mẹ,... Quà tặng ý nghĩa cho bé yêu, người
                  thân, bạn bè, hoặc đối tác.
                </p>
                <p>
                  🚀 Dịch vụ in và thêu nhanh chóng và chất lượng Sử dụng công
                  nghệ in và thêu hiện đại, đảm bảo chất lượng hình ảnh sắc nét
                  và bền vững. Cam kết sản phẩm đẹp, sạch sẽ và độc đáo.
                </p>
                <p>
                  📞 Liên hệ ngay với chúng tôi để tư vấn và biến ý tưởng của
                  bạn thành hiện thực trên áo gấu bông đáng yêu!
                </p>
              </div>
              <div className="d-flex m-3">
                <button className="btn btn-primary ms-3 fw-bold">
                  <i class="fa-brands fa-facebook"></i>
                </button>
                <button className="btn btn-primary ms-3 fw-bold">Zalo</button>
              </div>
            </div>
            <h4 className="m-3">Một số hình ảnh thêu, in lên áo của Gấu</h4>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Order;
