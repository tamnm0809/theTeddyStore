import React, { useEffect, useState } from 'react';
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber,
    notification,
    Pagination,
    Popconfirm,
    Select,
    Table
} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import productAPI from "../api/productAPI";
import moment from 'moment';
import discountAPI from "../api/discountAPI";

const DiscountPageForm = () => {
    const DURATION = 1; // Thời gian hiển thị thông báo
    const [listProduct, setListProduct] = useState([]);
    const [listDiscount, setListDiscount] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [total, setTotal] = useState(0);

    const [id, setId] = useState('-1');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isModeAdd, setIsModeAdd] = useState(true);

    const [searchDateFrom, setSearchDateFrom] = useState(null);
    const [searchDateTo, setSearchDateTo] = useState(null);

    const fetchListProduct = async () => {
        try {
            const response = await productAPI.getAllProductNoDiscount();
            setListProduct(response || []);
            console.log(response);
        } catch (error) {
            console.log('Failed to fetch product list: ', error);
        }
    }
    useEffect(() => {
        fetchListProduct().then(r => r); //chỉ định rằng fetchListProduct chỉ được gọi một lần khi component được render lần đầu tiên và không phụ thuộc vào bất kỳ giá trị nào khác.
    }, []);

    // xử lý khi thay đổi giá trị của select product
    const handleSelectProduct = (value) => {
        setSelectedProduct(value);
        const product = listProduct.find(p => p.detailsProduct[0].id === value); //tìm sản phẩm trong listProduct dựa theo value đc chọn.
        console.log(value);
        if (product) {
            setPrice(vietNameCurrencyFormat(product?.detailsProduct[0]?.price));
        }
    }

    // format tiền tệ việt nam
    const vietNameCurrencyFormat = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    }

    const handlePageChange = (newPage) => {
        // Nếu newPage < 0 hoặc newPage > tổng số trang thì không làm gì cả
        if (newPage < 0) {
            notification.warning({
                description: 'Bạn đang ở trang đầu tiên!', duration: DURATION, // Duration the notification stays open, in seconds
            });
            return;
        }
        if (newPage > total / size) {
            notification.warning({
                description: 'Bạn đang ở trang cuối cùng!', duration: DURATION, // Duration the notification stays open, in seconds
            });
            return;
        }

        // Gọi API lấy danh sách sản phẩm
        setPage(newPage);
    }

    const handleReset = () => {
        setId('');
        setSelectedProduct('');
        setStartDate(null);
        setEndDate(null);
        setPrice('');
        setDiscount(0);
        setPage(0);
        setSize(10);
        setIsModeAdd(true);
        fetchList().then(r => r);
        fetchListProduct().then(r => r);
    }

    const handleSubmit = async () => {
        // check validate each input
        if (!selectedProduct) {
            notification.error({
                message: 'Lỗi',
                description: 'Vui lòng chọn sản phẩm',
                duration: 1
            });
        } else if (!startDate) {
            notification.error({
                message: 'Lỗi',
                description: 'Vui lòng chọn ngày bắt đầu',
                duration: 1
            });
        } else if (!endDate) {
            notification.error({
                message: 'Lỗi',
                description: 'Vui lòng chọn ngày kết thúc',
                duration: 1
            });
        } else if (discount <= 0) {
            notification.error({
                message: 'Lỗi',
                description: 'Vui lòng nhập giá giảm',
                duration: 1
            });
        } else {
            // call api
            await discountAPI.updateDiscount({
                id,
                productId: selectedProduct,
                startDate: startDate,
                endDate: endDate,
                discount
            }).then(r => {
                if (r === 'OK') {
                    notification.success({
                        message: 'Thành công',
                        description: isModeAdd ? 'Thêm mới mã giảm giá thành công!' : 'Cập nhật giảm giá thành công',
                        duration: 1
                    });
                    handleReset();
                } else {
                    notification.error({
                        message: 'Lỗi',
                        description: 'Có lỗi xảy ra, vui lòng thử lại sau',
                        duration: 1
                    });
                }
            });
        }
    }

    // xử lý khi click vào icon bút chì để chỉnh sửa
    const handleFillData = (record) => {
        setId(record.id);
        setSelectedProduct(record.detailsProduct.id);
        setStartDate(record.date_start);
        setEndDate(record.date_end);
        setPrice(vietNameCurrencyFormat(record.detailsProduct.price));
        setDiscount(record.price_sale);
        setIsModeAdd(false);
        console.log(record);
    }
    const handleSizeChange = (value) => {
        setSize(value);
        setPage(0);
    }

    const handleDelete = async (record) => {
        await discountAPI.deleteDiscount(record.id).then(r => {
            if (r === 'OK') {
                notification.success({
                    message: 'Thành công',
                    description: 'Xóa mã giảm giá thành công!',
                    duration: 1
                });
                handleReset();
            } else {
                notification.error({
                    message: 'Lỗi',
                    description: 'Có lỗi xảy ra, vui lòng thử lại sau',
                    duration: 1
                });
            }
        });
    }

    const handleSearch = async () => {
        if (searchDateFrom === null || searchDateTo === null) {
            notification.error({
                description: 'Vui lòng nhập ngày bắt đầu và ngày kết thúc để tìm kiếm!',
                duration: DURATION, // Thời gian hiển thị thông báo, tính bằng giây
            });
            return;
        }
        try {
            const response = await discountAPI.searchDiscount({ searchDateFrom, searchDateTo });
            setListDiscount(response?.content || []);
            setTotal(response?.totalElements);
        } catch (error) {
            console.log('Failed to fetch product list: ', error);
        }
    }

    const fetchList = async () => {
        try {
            const response = await discountAPI.getAll(page, size);
            setListDiscount(response?.content || []);
            setTotal(response?.totalElements);
        } catch (error) {
            console.log('Failed to fetch product list: ', error);
        }
    }
    useEffect(() => {
        fetchList().then(r => {
        });
    }, [page, size]);


    const onShowSizeChange = (current, pageSize) => {
        setPage(current - 1);
        setSize(pageSize);
    };
    const onPageChange = (page, pageSize) => {
        setPage(page - 1);
    };
    return (
        <Form title="Trang chủ">
            <Form.Item>
                <div className="container mt-4 text-color">
                    <h5>Giảm giá</h5>
                    <form>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="colorSelect" className="form-label">Tên sản phẩm</label>
                                    <Select className="input" id="colorSelect"
                                        aria-required={true}
                                        value={selectedProduct} // hiển thi giá trị(sản phẩm) đc chọn
                                        onChange={handleSelectProduct}>
                                        <Select.Option value="">Chọn sản phẩm</Select.Option>
                                        {listProduct.map((c, index) => (
                                            <Select.Option key={index} // Mỗi phần tử trong một danh sách cần có một key duy nhất 
                                            //index được sử dụng làm key vì nó là một số nguyên duy nhất đại diện cho vị trí của phần tử trong mảng
                                                // value={c.detailsProduct[0].id}
                                                value=""
                                                >{c.name}</Select.Option>
                                        ))}
                                    </Select>
                                </div>

                                <div className="mb-3 row">
                                    <div className="col-md-6">
                                        <label className="form-label">Ngày bắt đầu</label>
                                        <DatePicker className="form-control input"
                                            value={startDate ? moment(startDate) : null}
                                            onChange={(date, dateString) => setStartDate(dateString)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Ngày kết thúc</label>
                                        <DatePicker className="form-control input"
                                            value={endDate ? moment(endDate) : null}
                                            onChange={(date, dateString) => setEndDate(dateString)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3 row">
                                    <div className="col-md-6">
                                        <label className="form-label">Giá gốc</label>
                                        <Input className="form-control input" disabled={true}
                                            value={price}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Giá giảm</label>
                                        <InputNumber className="form-control input" placeholder="0"
                                            required={true}
                                            value={discount}
                                            min={0}
                                            onChange={(e) => setDiscount(e)}
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className="mb-3 d-flex justify-content-center align-items-center">
                                <Button type="primary" className="me-2 button-action"
                                    onClick={handleSubmit}
                                >Lưu</Button>
                                <Button className="button-action"
                                    onClick={handleReset}
                                >Làm mới</Button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="d-flex justify-content-between mt-4">
                    <div className="mb-3 d-flex align-items-center justify-content-between">
                        <span>Hiển thị</span>
                        <Select
                            className="input-option"
                            value={size}
                            style={{ width: '80px' }}
                            onChange={handleSizeChange}
                        >
                            <Select.Option value={10}>10</Select.Option>
                            <Select.Option value={9}>9</Select.Option>
                            <Select.Option value={8}>8</Select.Option>
                            <Select.Option value={7}>7</Select.Option>
                        </Select>
                        <span>mục</span>
                    </div>
                    <div className="d-flex">
                        <div className="me-2">
                            <DatePicker className="form-control input" id="startDate"
                                value={searchDateFrom ? moment(searchDateFrom) : null}
                                onChange={(date, dateString) => setSearchDateFrom(dateString)}
                            />
                        </div>
                        <div className="me-2">
                            <DatePicker className="form-control input" id="endDate"
                                value={searchDateTo ? moment(searchDateTo) : null}
                                onChange={(date, dateString) => setSearchDateTo(dateString)}
                            />
                        </div>
                        <div>
                            <Button type="primary" className="text-white rounded-3"
                                onClick={handleSearch}
                                style={{ backgroundColor: '#644c38' }}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </Button>
                        </div>
                    </div>
                </div>
                <Table className="table text-center align-middle" dataSource={listDiscount} pagination={false}>
                    <Table.Column title="ID" dataIndex="id" key="id" />
                    <Table.Column
                        title="Tên sản phẩm"
                        dataIndex="detailsProduct"
                        key="name"
                        render={(text, record) => (
                            <span>
                                {record.detailsProduct.product.name}
                            </span>
                        )}
                    />
                    <Table.Column
                        title="Giá gốc"
                        dataIndex="detailsProduct"
                        key="price"
                        render={(text, record) => (
                            <span>
                                {vietNameCurrencyFormat(record.detailsProduct.price)}
                            </span>
                        )}
                    />
                    <Table.Column
                        title="Giá giảm"
                        dataIndex="price_sale"
                        key="discount"
                        render={(text, record) => (
                            <span>
                                {vietNameCurrencyFormat(record.price_sale)}
                            </span>
                        )}
                    />
                    <Table.Column title="Ngày bắt đầu" dataIndex="date_start" key="start_day" />
                    <Table.Column title="Ngày kết thúc" dataIndex="date_end" key="last_day" />
                    <Table.Column
                        title="Chỉnh sửa"
                        key="action"
                        render={(text, record) => (
                            <span>
                                <a href="#" className="me-2" style={{ color: '#644c38' }}
                                    onClick={() => handleFillData(record)}
                                >
                                    <EditOutlined style={{ width: '10px', height: '10px' }} />
                                </a>
                                <Popconfirm
                                    placement="top"
                                    title='Bạn có chắc chắn muốn xóa?'
                                    description={'Xóa mã giảm giá'}
                                    okText="Đồng ý"
                                    cancelText="Hủy"
                                    onConfirm={() => handleDelete(record)}
                                >
                                    <a href="#" style={{ color: '#644c38' }}>
                                        <DeleteOutlined style={{ width: '10px', height: '10px' }} />
                                    </a>
                                </Popconfirm>

                            </span>
                        )}
                    />

                </Table>
                <Pagination            
                   pageSize={size}
                   total={total}
                   prevIcon={<span onClick={() => handlePageChange(page - 1)}>Trước</span>}
                   nextIcon={<span onClick={() => handlePageChange(page + 1)}>Sau</span>}
                   onChange={onPageChange}                           
                />              
            </Form.Item>
        </Form>
    );
};


export default DiscountPageForm;