import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../user/css/topBear.css";
import Swal from "sweetalert2";

export default function TopBear() {
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));
  const [topBear, setTopBear] = useState([]);
  const [size, setSize] = useState({});
  const [id_dt_pro, setId_dt_pro] = useState("");
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedPrice, setSelectedPrice] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get(
          "http://localhost:7070/teddy-store/getAllProduct"
        );
        setTopBear(productsResponse.data);

        const sizesData = await Promise.all(
          productsResponse.data.map(async (product) => {
            const sizesResponse = await axios.get(
              `http://localhost:7070/teddy-store/getSizeBy/${product.id}`
            );
            return { productId: product.id, sizes: sizesResponse.data };
          })
        );

        const sizesByProductMap = {};
        sizesData.forEach((sizesObj) => {
          sizesByProductMap[sizesObj.productId] = sizesObj.sizes;
        });

        setSize(sizesByProductMap);
      } catch (error) {
        console.error("Error loading top bear:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const initialPrices = {};
    topBear.forEach((product) => {
      const firstSize = size[product.id]?.[0];
      if (firstSize) {
        initialPrices[product.id] = firstSize.price;
        setSelectedSize((prevState) => ({
          ...prevState,
          [product.id]: firstSize,
        }));
      }
    });
    setSelectedPrice(initialPrices);
  }, [topBear, size]);

  const handleSizeClick = (productId, selectedSize) => {
    axios
      .get(
        `http://localhost:7070/teddy-store/getIdDetailsBy/${selectedSize.id}/${productId}`
      )
      .then((response) => {
        setId_dt_pro(response.data);
      })
      .catch((error) => {
        console.error("Error fetching id_dt_pro:", error);
      });

    setSelectedSize((prevState) => ({
      ...prevState,
      [productId]: selectedSize,
    }));
    setSelectedPrice((prevState) => ({
      ...prevState,
      [productId]: selectedSize.price,
    }));
  };

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let day = currentDate.getDate();
  day = day < 10 ? "0" + day : day;
  const formattedDate = `${year}-${month}-${day}`;

  const generateRandomNumber = () => {
    const min = 1000000000;
    const max = 9999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const formData = {
    id: generateRandomNumber().toString(),
    quantity_pro: 1,
    quantity_ser: 0,
    date_add: formattedDate,
    service: {
      id: "1234567893",
    },
    detailsProduct: {
      id: id_dt_pro,
    },
    account: {
      id: userProfile.id,
    },
  };

  const handleAddToCart = async () => {
    try {
      const result = await axios.post("http://localhost:7070/teddy-store/add", formData);
      if(result.status ===200){
        Swal.fire({
          icon: "success",
          title: "Thêm vào giỏ hàng thành công",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.log("Error add to Cart | TopBear: " + error.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        {topBear.map((product) => (
          <div
            key={product.id}
            className="p-2 my-2 col-12 col-sm-6 col-md-3 col-lg-3"
          >
            <div className="product-card card text-center">
              <div className="image">
                <img
                  src={`/img_pro/${product.img_url}`}
                  alt="Product"
                  className="img-fluid"
                />
                <div className="card-product-hover">
                  <Link onClick={handleAddToCart} className="btn mx-2 btn-primary">
                    <i className="fa-solid fa-bag-shopping"></i>
                  </Link>
                  <Link
                    to={`/teddy-store/detail_products/${product.id}`}
                    className="btn mx-2 btn-primary"
                  >
                    <i className="fa-regular fa-eye"></i>
                  </Link>
                  <Link to="#" className="btn mx-2 btn-primary">
                    <i className="fa-regular fa-heart"></i>
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                {size[product.id]?.map((sizeItem) => (
                  <div key={sizeItem.id}>
                    {selectedSize[product.id] &&
                      selectedSize[product.id].id === sizeItem.id && (
                        <div className="price-product mb-2">
                          {selectedPrice[product.id] != null && (
                            <p className="card-text">
                              {selectedPrice[product.id].toLocaleString(
                                "vi-VN",
                                {
                                  style: "currency",
                                  currency: "VND",
                                }
                              )}
                            </p>
                          )}
                        </div>
                      )}
                  </div>
                ))}
                <div className="row">
                  {size[product.id]?.map((sizeItem) => (
                    <div
                      className="mx-1 col-12 col-sm-3 col-md-3 col-lg-3"
                      key={sizeItem.id}
                    >
                      <div className="size-product">
                        <div className="button">
                          <button
                            type="button"
                            className={`btn mx-2 mb-2 ${
                              selectedSize[product.id] &&
                              selectedSize[product.id].id === sizeItem.id
                                ? "selected"
                                : ""
                            }`}
                            onClick={() =>
                              handleSizeClick(product.id, sizeItem)
                            }
                          >
                            {sizeItem.size_no}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
