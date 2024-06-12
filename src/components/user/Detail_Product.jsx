import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "../user/css/index-user.css";
import "../user/css/Detail_product.css";
import Navigation from "../common/nav.jsx";
import Footer from "../common/footer.jsx";
import TopBear from "./TopBear.jsx";
import Describepro from "../user/Describe_Pro.jsx"
import Servicepro from "../user/Service_pro.jsx"
import Rate from "../user/Rate.jsx"
import { Link, useParams, useNavigate } from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, Tabs, message } from 'antd';


export default function Detail_product() {
  const { id } = useParams();
  const [products, setProductDetail] = useState([]);
  const [ratePro, setRatePro] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState({});
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedPricesale, setselectedPricesale] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [ServicePro, setServicePro] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [quantityy, setQuantityy] = useState(0);
  const [fileList, setFileList] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const dataProduct = await axios.get(`http://localhost:7070/teddy-store/getProductDetailID/${id}`);
        setProductDetail(dataProduct.data);
        const RatePro = await axios.get(`http://localhost:7070/teddy-store/getRatePro/${id}`);
        setRatePro(RatePro.data);
        console.log(RatePro)
        const ImgPro = await axios.get(`http://localhost:7070/teddy-store/getImgPro/${id}`);
        setImageUrls(ImgPro.data);
        const ColorPro = await axios.get(`http://localhost:7070/teddy-store/getColorPro/${id}`);
        setColor(ColorPro.data);
        const sizesData = await Promise.all(
          dataProduct.data.map(async (product) => {
            const dataSize = await axios.get(
              `http://localhost:7070/teddy-store/getSizeBy/${product.id}`
            );
            return { productId: product.id, sizes: dataSize.data };
          })
        );

        const sizesByProductMap = {};
        sizesData.forEach((sizesObj) => {
          sizesByProductMap[sizesObj.productId] = sizesObj.sizes;
        });

        setSize(sizesByProductMap);

        const ServicePro = await axios.get(`http://localhost:7070/teddy-store/getProService/${id}`);
        setServicePro(ServicePro.data);


      } catch (error) {
        console.error('Error fetching product detail:', error);
      }
    };

    fetchProductDetail();
  }, [id]);

  // Chọn size đầu tiên và hiển thị giá tương ứng
  useEffect(() => {
    if (products.length > 0 && size[products[0].id]?.length > 0) {
      const firstSize = size[products[0].id][0];
      setSelectedSize(firstSize);
      setSelectedPrice(firstSize.price);
      setselectedPricesale(firstSize.price_sale);
      setSelectedProductId(products[0].id);
    }
  }, [products, size]);

  const handleSizeClick = (productId, selectedSize) => {
    setSelectedProductId(productId);
    setSelectedSize(selectedSize);
    setSelectedPrice(selectedSize.price);
    setselectedPricesale(selectedSize.price_sale);

  };
  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 0 && newQuantity <= (selectedSize ? selectedSize.quantity : Infinity)) {
      setQuantity(newQuantity);
    }
  };
  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (selectedSize && quantity < selectedSize.quantity) {
      setQuantity(quantity + 1);
    }
  };
  const handleChangeee = (event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 0 && newQuantity <= 2) {
      setQuantityy(newQuantity);
    }
  };
  const decreaseQuantityy = () => {
    if (quantityy > 0) {
      setQuantityy(quantityy - 1);
    }
  };

  const increaseQuantityy = () => {
    if (quantityy < 2) {
      setQuantityy(quantityy + 1);
    }
  };

  const handleBuyButtonClick = () => {
    // Thực hiện các hành động cần thiết trước khi chuyển hướng, ví dụ như lưu thông tin sản phẩm vào localStorage

    // Chuyển hướng đến trang Checkout
    if (!selectedSize || !selectedColor) {
      message.error('Vui lòng chọn màu sắc');
      return;
    }
    const id_size = selectedSize.id;
    const id_color = selectedColor.id;
    console.log(id_color)
    console.log(id_size)
    const user = JSON.parse(localStorage.getItem('userProfile')); // Lấy thông tin user từ localStorage
    if (!user || !user.id) {
      message.error('Vui lòng đăng nhập');
      return;
    }
    const generateRandomNumber = () => {
      const min = 1000000000;
      const max = 9999999999;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const currentDate = new Date(); // Tạo một đối tượng Date mới, đại diện cho ngày hiện tại
    const year = currentDate.getFullYear(); // Lấy năm hiện tại
    let month = currentDate.getMonth() + 1; // Lấy tháng hiện tại, phải cộng thêm 1 vì tháng bắt đầu từ 0
    month = month < 10 ? '0' + month : month; // Đảm bảo rằng tháng có 2 chữ số
    let day = currentDate.getDate(); // Lấy ngày hiện tại
    day = day < 10 ? '0' + day : day; // Đảm bảo rằng ngày có 2 chữ số
    const formattedDate = `${year}-${month}-${day}`;
    const selectedProductServicename = ServicePro.filter(service => service.id).map(service => service.name).join(',');
    const selectedProductServiceprice = ServicePro.filter(service => service.id).map(service => service.priceSv).join(',');
    const selectedProductServiceIds = ServicePro.filter(service => service.id).map(service => service.id).join(',');
    const id_acc = user.id;
    if (quantity <= 0) {
      message.error('Vui lòng chọn số lượng');
      return;
    }
    axios.get(`http://localhost:7070/teddy-store/getProductDt/${id_size}/${id_color}`)
      .then(response => {
        const id_dt_pro = response.data;
        const id_dt = id_dt_pro.filter(dt_pro => dt_pro.id).map(dt_pro => dt_pro.id).join(',')
        console.log(id_dt)
        console.log(selectedProductServiceprice)
        // Tiếp tục xử lý dữ liệu nhận được, ví dụ: thêm vào giỏ hàng
        const cartData = [{

          id: generateRandomNumber().toString(),
          id_acc: id_acc,
          id_dt_pro: id_dt,
          id_ser: selectedProductServiceIds,
          color: id_color,
          date_add: formattedDate,
          image_pro: products[0].img_url, // assuming products is an array and you want to take the first product's image_url
          name_pro: products[0].name, // assuming products is an array and you want to take the first product's name
          name_ser: selectedProductServicename, // Assuming this is fixed for all services or you have a specific way to get this data
          price_pro: selectedPrice,
          price_ser: quantityy * selectedProductServiceprice, // Assuming ServicePro is an array and you want to take the first service's priceSv
          quantity_pro: quantity,
          quantity_ser: quantityy, // Assuming no quantity for services in your initial data
          size_no: selectedSize.size_no

        }];
        localStorage.setItem("itemSelected", JSON.stringify(cartData));
        navigate('/teddy-store/checkout');
      })

      .catch(error => {
        message.error('Đã xảy ra lỗi khi thêm vào giỏ hàng.');
        console.error('Đã xảy ra lỗi khi thêm vào giỏ hàng:', error);
      });


  };
  const handleChangee = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    setFileList(newFileList);
  };
  const props = {
    action: '',
    onChange: handleChangee,
    multiple: true,
  };
  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };
  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      message.error('Vui lòng chọn màu sắc');
      return;
    }
    const id_size = selectedSize.id;
    const id_color = selectedColor.id;
    console.log(id_color)
    console.log(id_size)
    const user = JSON.parse(localStorage.getItem('userProfile')); // Lấy thông tin user từ localStorage
    if (!user || !user.username) {
      message.error('Vui lòng đăng nhập');
      return;
    }
    const generateRandomNumber = () => {
      const min = 1000000000;
      const max = 9999999999;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const currentDate = new Date(); // Tạo một đối tượng Date mới, đại diện cho ngày hiện tại
    const year = currentDate.getFullYear(); // Lấy năm hiện tại
    let month = currentDate.getMonth() + 1; // Lấy tháng hiện tại, phải cộng thêm 1 vì tháng bắt đầu từ 0
    month = month < 10 ? '0' + month : month; // Đảm bảo rằng tháng có 2 chữ số
    let day = currentDate.getDate(); // Lấy ngày hiện tại
    day = day < 10 ? '0' + day : day; // Đảm bảo rằng ngày có 2 chữ số
    const formattedDate = `${year}-${month}-${day}`;
    const selectedProductServiceIds = ServicePro.filter(service => service.id).map(service => service.id).join(',');
    const id_acc = user.id;
    if (quantity <= 0) {
      message.error('Vui lòng chọn số lượng');
      return;
    }


    axios.get(`http://localhost:7070/teddy-store/getProductDt/${id_size}/${id_color}`)
      .then(response => {
        const id_dt_pro = response.data;
        const id_dt = id_dt_pro.filter(dt_pro => dt_pro.id).map(dt_pro => dt_pro.id).join(',')
        console.log(id_dt)
        // Tiếp tục xử lý dữ liệu nhận được, ví dụ: thêm vào giỏ hàng
        const cartData = {
          id: generateRandomNumber().toString(),
          quantity_pro: quantity,
          quantity_ser: quantityy,
          date_add: formattedDate,
          service: { id: selectedProductServiceIds },
          detailsProduct: { id: id_dt },
          account: { id: id_acc }
        };
        console.log(cartData)
        // Gọi API để thêm vào giỏ hàng
        axios.post('http://localhost:7070/teddy-store/add', cartData, {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
          .then(() => {
            message.success('Thêm vào giỏ hàng thành công!');
            // Thực hiện các hành động cần thiết sau khi thêm vào giỏ hàng thành công (nếu có)
          })
          .catch(error => {
            message.error('Đã xảy ra lỗi khi thêm vào giỏ hàng.');
            console.error('Đã xảy ra lỗi khi thêm vào giỏ hàng:', error);
          });
      })

  };
  return (
    <>
      <div className="container-fluid p-0 m-0">
        <div className="container-fluid p-0 m-0">{<Navigation />}</div>
        <div className="container">
          {products.map(products => (
            <div className="row ms-5 mt-3">
              <div className="col-6 col-lg-4">
                {imageUrls.length > 0 && (
                  <img
                    src={`/img_pro/${imageUrls[selectedImageIndex].img_url}`}
                    className="img-p"
                    alt=""
                  />
                )}
                <div className="image-gallery">
                  <div className="images">
                    {imageUrls.map((imageUrl, index) => (
                      <img
                        key={index}
                        src={`/img_pro/${imageUrl.img_url}`}
                        alt=""
                        onClick={() => handleThumbnailClick(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-6 col-lg-8 content_pro">
                <h4>{products.name}</h4>
                {ratePro.length > 0 ? (
                  ratePro.map(ratePros => (
                    <div className="star">
                      {[...Array(5)].map((_, index) => (
                        <i key={index} className={`bi bi-star${index < ratePros.star_no ? '-fill' : ''}`}></i>
                      ))}
                      <p>|</p>
                      <h6>{ratePros.number_rate} Đánh giá</h6>
                      <p>|</p>
                      <h6>{ratePros.quantity} Đã bán</h6>
                    </div>
                  ))
                ) : (
                  <div className="star">
                    {[...Array(5)].map((_, index) => (
                      <i key={index} className="bi bi-star"></i>
                    ))}
                    <p>|</p>
                    <h6>0 Đánh giá</h6>
                    <p>|</p>
                    <h6>0 Đã bán</h6>
                  </div>
                )}

                <div className="price">
                  {selectedPricesale != null && (
                    <p >
                      {selectedPricesale.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  )}
                  {selectedPrice != null && (
                    <h3>
                      {selectedPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </h3>
                  )}
                </div>
                <div className=" color">
                  <div className='colorr'>
                    <p className='p mt-4'>Màu sắc:</p>
                  </div>
                  {color.map(color => (
                    <div key={color.id} >
                      <button
                        type="submit"
                        className={`buttonn ${selectedColor === color ? 'selected' : ''}`}
                        onClick={() => handleColorClick(color)}
                      >
                        {color.color}
                      </button>
                    </div>
                  ))}
                </div>
                {/* Size */}

                <div className="color mt-3 ">
                  <div className='size'>
                    <p className='s'>Size</p>
                  </div>
                  {size[products.id]?.map((size) => (
                    <div key={size.id} >
                      <button
                        className={`buttonn ${selectedSize === size ? 'selected' : ''}`}
                        onClick={() => handleSizeClick(products.id, size)}
                      >
                        {size.size_no}
                      </button>

                    </div>
                  ))}
                </div>

                <div className="note">
                  <p>Ghi chú: </p>
                  <input className='texttt' placeholder=" Yêu cầu thêm...."></input>
                </div>
                <div className="quantity">
                  <p className='p'>Số lượng: </p>
                  <div className="input-group">
                    <button className="btn btn-outline-secondary pe-3" type="button" onClick={decreaseQuantity}>-</button>
                    <input type="number" className="form-control ps-4" value={quantity} onChange={handleChange} />
                    <button className="btn btn-outline-secondary" type="button" onClick={increaseQuantity}>+</button>
                  </div>
                  {size[products.id]?.map((size) => (
                    <div key={size.id} >
                      {selectedProductId === products.id &&
                        selectedSize &&
                        selectedSize.id === size.id && (
                          <div>
                            {size.quantity != null && (
                              <p className='p'>
                                {size.quantity} sản phẩm có sẳn
                              </p>
                            )}
                          </div>
                        )}
                    </div>
                  ))}
                </div>
                <div>
                  <hr />
                </div>
                {ServicePro.length > 0 ? (
                  ServicePro.map((ServicePro, index) => (
                    <div key={index} className="service">
                      <p>Dịch vụ:</p>
                      <button>{ServicePro.name}</button>
                      <div className="quantity">
                        <p className='p'>Số lượng: </p>
                        <div className="input-group">
                          <button className="btn btn-outline-secondary pe-3" type="button" onClick={decreaseQuantityy}>-</button>
                          <input type="number" className="form-control ps-4" value={quantityy} onChange={handleChangeee} />
                          <button className="btn btn-outline-secondary" type="button" onClick={increaseQuantityy}>+</button>
                        </div>

                      </div>
                      <div className="price_service">
                        <p>Gía: </p>
                        <h3>{(quantityy * ServicePro.priceSv).toLocaleString()} VND</h3>
                      </div>
                      <div className="notesv">
                        <p>Nội dung muốn thêu:</p>
                        <input className="textt" type="text" placeholder=' VD:
Mặt trước: Nội dung 1, màu ...
Mặt sau: Nội dung 2, màu ...' />
                        <div>
                          <p><hr /></p>
                          <p>Hoặc</p>
                          <p><hr /></p>
                        </div>
                        <p>Tải thết kế của bạn</p>
                        <Upload {...props} fileList={fileList}>
                          <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-service">Không có dịch vụ nào được tìm thấy.</div>
                )}
                <div className="cartt">
                  <div className="cart">
                    <button onClick={handleAddToCart}> <i className="bi bi-plus-square pe-2" ></i>Thêm vào giỏ hàng </button>
                    <button onClick={handleBuyButtonClick}>Mua ngay</button>
                  </div>

                </div>
                <h5 className='mt-3 '>Chat với chúng tôi để đc tư vấn</h5>
                <div className='connectt'>
                  <div className='connect me-3'>
                    <a href="https://www.facebook.com/gaubongdepsaigon" className="facebook-icon">
                      <i className="fab fa-facebook me-2 ms-2"></i>
                    </a> Chat Facebook

                  </div>
                  <div className='connect'>
                    <a href="https://chat.zalo.me/" >
                      <img src="/img_pro/icon-Zalo-2021.jpg" alt="" className='zalo-icon'/>

                    </a>Chat Zalo

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="container mt-4">
          <Tabs defaultActiveKey="1" centered>
            <Tabs.TabPane tab="Mô tả" key="1">
              <Describepro />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Đánh giá" key="2">
              < Rate />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Dịch vụ" key="3">
              <Servicepro />
            </Tabs.TabPane>
          </Tabs>
        </div>
        <div className="container p-0 my-3">
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
        <div className="container-fluid p-0 m-0">{<Footer />}</div>
      </div>
    </>

  );
};
