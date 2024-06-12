import React, { useEffect, useRef, useState } from 'react';
import { Badge, Form, notification, Spin } from 'antd';
import { Button, Select } from 'antd';
import { InputNumber } from 'antd';
import { MinusCircleTwoTone } from "@ant-design/icons";
import categoryAPI from "../api/categoryAPI";
import sizeAPI from "../api/sizeAPI";
import colorAPI from "../api/colorAPI";
import productAPI from "../api/productAPI";


const ProductPageForm = ({ product, onSaveCompleted }) => {
    // Danh sách các hình ảnh đã tải lên
    const [loading, setLoading] = useState(false);
    const [imagesList, setImagesList] = useState(product?.productImages ?? []);
    const [fileList, setFileList] = useState([]);   // Mảng chứa các file đã tải lên để gửi lên server
    const [listImageDelete, setListImageDelete] = useState([]);

    const [categoryList, setCategoryList] = useState([]);
    const [sizeList, setSizeList] = useState([]);
    const [colorList, setColorList] = useState([]);

    // filldataForm
    const [productName, setProductName] = useState(product?.name ?? '');
    const [productDescription, setProductDescription] = useState(product?.description ?? '');
    const [productPrice, setProductPrice] = useState(product?.detailsProduct[0]?.price ?? 0);
    const [productQuantity, setProductQuantity] = useState(product?.detailsProduct[0]?.quantity ?? 0);
    const [selectedCategory, setSelectedCategory] = useState(product?.category?.id ?? '');
    const [selectedSize, setSelectedSize] = useState(product?.detailsProduct[0]?.size?.id ?? '');
    const [selectedColor, setSelectedColor] = useState(product?.detailsProduct[0]?.color?.id ?? '');


    const hiddenFileInput = useRef(null); // Sử dụng để tham chiếu đến input file ẩn


    const initialAllList = async () => {
        // Lấy danh sách danh mục
        await categoryAPI.getAllActive().then((res) => {
            setCategoryList(res);
        });
        // Lấy danh sách kích thước
        await sizeAPI.getAllActive().then((res) => {
            setSizeList(res);
        });
        // Lấy danh sách màu sắc
        await colorAPI.getAllActive().then((res) => {
            setColorList(res);
        });
    }
    //cập nhật mới ds data 
    useEffect(() => {
        initialAllList().then(r => r);
    }, []);

    const handleUploadClick = () => {
        hiddenFileInput.current.click(); // Kích hoạt click trên input file ẩn
    };

    const handleFileChange = (e) => {
        const fileUploaded = e.target.files[0]; // chọn ảnh khi mở file 
        if (fileUploaded) {
            const fileId = fileUploaded.name;
            const newImageList = [...imagesList, { id: fileId, img_url: URL.createObjectURL(fileUploaded), new: true }];
            const newFileList = [...fileList, { id: fileId, file: fileUploaded }]; // Thêm file vào mảng
            setImagesList(newImageList);
            setFileList(newFileList); // Cập nhật state với mảng file mới
        }
    };
    const deleteImage = (index, image) => {
        // Tạo một bản sao mới của mảng và loại bỏ phần tử tại vị trí chỉ mục
        const newImagesList = imagesList.filter((_, imgIndex) => imgIndex !== index);
        // Cập nhật state với mảng mới
        setImagesList(newImagesList);
        // Xóa file tương ứng với hình ảnh bị xóa
        if (!image?.new) {
            setListImageDelete([...listImageDelete, image.id]);
        }
        // Xóa file tương ứng với hình ảnh bị xóa
        const newFileList = fileList.filter((file) => file.id !== image.id);
        setFileList(newFileList);
    }

    const handleReset = () => {
        setImagesList([]);
        setFileList([]);
        setProductName('');
        setProductDescription('');
        setProductPrice(0);
        setProductQuantity(0);
        setSelectedCategory('');
        setSelectedSize('');
        setSelectedColor('');
    }


    const handleSave = () => {
        if (imagesList?.length < 1) {
            notification.error({
                message: 'Lỗi',
                description: 'Vui lòng chọn ít nhất một hình ảnh cho sản phẩm',
                duration: 1
            });
        } else if (productName === '') {
            notification.error({
                message: 'Lỗi',
                description: 'Vui lòng nhập tên sản phẩm',
                duration: 1
            });
        } else if (productDescription === '') {
            notification.error({
                message: 'Lỗi',
                description: 'Vui lòng nhập mô tả sản phẩm',
                duration: 1
            });
        } else if (productPrice <= 0) {
            notification.error({
                message: 'Lỗi',
                description: 'Vui lòng nhập giá sản phẩm hợp lệ',
                duration: 1
            });

        } else if (productQuantity <= 0) {
            notification.error({
                message: 'Lỗi',
                description: 'Vui lòng nhập số lượng sản phẩm hợp lệ',
                duration: 1
            });

        } else if (selectedCategory === '') {
            notification.error({
                message: 'Lỗi',
                description: 'Vui lòng chọn danh mục cho sản phẩm',
                duration: 1
            });
        } else if (selectedSize === '') {
            notification.error({
                message: 'Lỗi',
                description: 'Vui lòng chọn kích thước cho sản phẩm',
                duration: 1
            });

        } else if (selectedColor === '') {
            notification.error({
                message: 'Lỗi',
                description: 'Vui lòng chọn màu sắc cho sản phẩm',
                duration: 1
            });

        }
        else {
            setLoading(true);
            const formData = new FormData();
            fileList.forEach(file => { // lặp qua file truyền hình ảnh đã chọn truyền vào images
                formData.append('images', file.file);
            });
            formData.append('name', productName);
            formData.append('description', productDescription);
            formData.append('price', productPrice);
            formData.append('quantity', productQuantity);
            formData.append('idCate', selectedCategory);
            formData.append('idSize', selectedSize);
            formData.append('idColor', selectedColor);
            formData.append('listImageDelete', listImageDelete);
            formData.append('id', product?.id ?? 'P-1'); // nếu product?.id = null truyền p-1 sang be xuly
            productAPI.updateProduct(formData).then((res) => {
                setLoading(false);
                if (res === 'OK') {
                    notification.success({
                        message: product ? "Cập nhật sản phẩm thành công" : "Thêm sản phẩm thành công",
                        placement: 'bottomRight',
                        duration: 1
                    });
                    if (product) {
                        onSaveCompleted();
                    } else {
                        handleReset();
                    }

                } else {
                    notification.error({
                        message: res === "NAME_EXISTED" ? "Tên sản phẩm bị trùng" : "Thêm sản phẩm thất bại",
                        placement: 'bottomRight',
                        duration: 1
                    });
                }
            });
        }
    }
    return (
        <Form title="Trang chủ">
            <Form.Item>
                <div className="container mt-4 text-color">
                    <h5 className='fw-bold'>Thông tin sản phẩm</h5>
                    <form>
                        <div className="mb-3 pt-3">
                            <label htmlFor="productImage" className="form-label">Hình ảnh sản phẩm</label>
                            <div className="d-flex align-items-center">
                                {imagesList.map((image, index) => (
                                    <Badge key={index} count={<MinusCircleTwoTone />}
                                        onClick={() => deleteImage(index, image)} className="remove-image me-4">
                                        <img src={image.img_url} className="btn-add-img" alt="preview" />
                                    </Badge>
                                ))}

                                <button type="button" className="form-control btn-add-img"
                                    onClick={handleUploadClick}
                                >
                                    <i className="fa-solid fa-plus"></i>
                                    Thêm hình ảnh
                                </button>
                                <input type="file" style={{ display: 'none' }} ref={hiddenFileInput}
                                    accept="image/*"
                                    onChange={handleFileChange} />
                            </div>
                        </div>


                        <div className="mb-3">
                            <label className="form-label">Tên sản phẩm</label>
                            <input className="form-control input"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Mô tả</label>
                            <textarea rows="5" className="form-control input"
                                value={productDescription}
                                onChange={(e) => setProductDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="mb-3 row">
                            <div className="col-md-4">
                                <div className="mb-3">
                                    <label className="form-label">Giá </label>
                                    <InputNumber className="form-control input" placeholder="0"
                                        value={productPrice}
                                        min={0}
                                        onChange={(e) => setProductPrice(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Màu: </label>
                                    <Select className="form-control input" id="colorSelect"
                                        value={selectedColor}
                                        onChange={(value) => setSelectedColor(value)}
                                    >
                                        <Select.Option value="">Chọn màu</Select.Option>
                                        {colorList.map((c, index) => (
                                            <Select.Option key={index} value={c.id}>{c.color}</Select.Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-4">
                                    <label className="form-label" style={{ marginBottom: '5px', display: 'block' }}>Số
                                        lượng</label>
                                    <InputNumber min={0} // Đặt giá trị nhỏ nhất là 0, dùng số thay vì chuỗi
                                        className="form-control input"
                                        style={{ height: '38px', fontSize: '14px', padding: '4px' }}
                                        value={productQuantity}
                                        onChange={(value) => setProductQuantity(value)} // Cập nhật giá trị state
                                        step={1} // Đảm bảo chỉ có thể tăng hoặc giảm số nguyên
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="colorSelect" className="form-label">Size</label>
                                    <Select className="form-control input" id="colorSelect"
                                        value={selectedSize}
                                        onChange={(value) => setSelectedSize(value)}
                                    >
                                        <Select.Option value="">Chọn size</Select.Option>
                                        {sizeList.map((size, index) => (
                                            <Select.Option key={index} value={size.id}>{size.size_no}</Select.Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="mb-4">
                                    <label className="form-label" style={{ marginBottom: '5px', display: 'block' }}>Danh
                                        mục</label>
                                    <Select className="form-control input" id="colorSelect"
                                        value={selectedCategory}
                                        onChange={(value) => setSelectedCategory(value)}
                                    >
                                        <Select.Option value="">Chọn danh mục</Select.Option>
                                        {categoryList.map((size, index) => (
                                            <Select.Option key={index} value={size.id}>{size.name}</Select.Option>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <Button type="primary" className="me-2 button-action "
                                onClick={handleSave}
                            > 
                                Lưu
                            </Button>
                            <Button type="primary" className="button-action">
                                Làm mới
                            </Button>
                        </div>
                    </form>
                </div>
            </Form.Item>
            <Spin spinning={loading} fullscreen={true} />
        </Form>
    );
};


export default ProductPageForm;