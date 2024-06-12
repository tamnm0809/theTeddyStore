import React, {useEffect, useRef, useState} from 'react';
import {Form, notification, Pagination, Popconfirm, Spin} from 'antd';
import {Button, Input, Space, Select, Table,Image} from 'antd';
import {InputNumber} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import serviceAPI from "../api/serviceAPI";
import categoryAPI from "../api/categoryAPI";


const HomePageForm = () => {
    const [loading, setLoading] = useState(false);
    const DURATION = 1; 
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [list, setList] = useState([]);
    const [isAddMode, setIsAddMode] = useState(true); // True: là thêm mới, False: là cập nhật
    const [form] = Form.useForm();
    const [id, setId] = useState('-1');
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [file, setFile] = useState(null);
    const [idCate, setIdCate] = useState('');
    const [description, setDescription] = useState('');
    const [total, setTotal] = useState(0);
    const [search, setSearch] = useState(''); 
    const [categoryList, setCategoryList] = useState([]);
    const hiddenFileInput = useRef(null); 
   
    const onPageChange = (page, pageSize) => {
        setPage(page - 1);
    };

    const onFinish = (value) => {
        value.preventDefault();
        setLoading(true);
        if (name === '') {
            notification.error({
                description: 'Vui lòng nhập tên dịch vụ!',
                duration: DURATION, 
            });
            setLoading(false);
            return;
        } else if (price === 0) {
            notification.error({
                description: 'Vui lòng nhập giá dịch vụ!',
                duration: DURATION, 
            });
            setLoading(false);
            return;
        } else if (description === '') {
            notification.error({
                description: 'Vui lòng nhập mô tả dịch vụ!',
                duration: DURATION, 
            });
            setLoading(false);
            return;
        } else if (idCate === '') {
            notification.error({
                description: 'Vui lòng chọn danh mục dịch vụ!',
                duration: DURATION, 
            });
            setLoading(false);
            return;
        } else if (isAddMode && file === null) {
            notification.error({
                description: 'Vui lòng chọn hình ảnh dịch vụ!',
                duration: DURATION, 
            });
            setLoading(false);
            return;
        }
        const formData = new FormData();
        formData.append('image', file);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('idCate', idCate);
        formData.append('id', id);
       
        serviceAPI.updateService(formData).then(r => {
            setLoading(false);        
            if (r === "OK") {
                notification.success({
                    message: 'Success',
                    description: isAddMode ? 'Thêm dịch vụ thành công!' : 'Chỉnh sửa dịch vụ thành công!',
                    duration: DURATION, 
                });
                handleReset();
            } else {
                notification.error({
                    message: 'Error',
                    description: r === 'SERVICE_EXISTED' ? 'Tên dịch vụ đã tồn tại' : 'Thêm dịch vụ thất bại!',
                    duration: DURATION, 
                });
            }
        });
    }

   
    const handleSearch = () => {
        if (search === '') {
            fetchList().then(r => r);
            return;
        }
       
        serviceAPI.searchService(search).then(r => {
            setList(r?.content || []);
            setTotal(r?.totalElements || 0);
            setPage(0);
            setSize(5);
        });
    }


    const handleFillData = (record) => {
        setId(record.id);
        setName(record.name);
        setPrice(record.price);
        setImage(record.image);
        setDescription(record.description);
        setIdCate(record.category.id);
        setIsAddMode(false);
    }

    const handleDelete = async (record) => {
        setLoading(true);
        await serviceAPI.delete(record.id).then(r => {
            setLoading(false);
            if (r === 'OK') {
                notification.success({
                    message: 'Thành công',
                    description: 'Xóa dịch vụ thành công!',
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
    const handlePageChange = (newPage) => {
        console.log('ok', total);
        // Nếu newPage < 0 hoặc newPage > tổng số trang thì không làm gì cả
        if (newPage < 0) {
            notification.warning({
                description: 'Bạn đang ở trang đầu tiên!', duration: DURATION, 
            });
            return;
        }
        if (newPage > total / size) {
            notification.warning({
                description: 'Bạn đang ở trang cuối cùng!', duration: DURATION,
            });
            return;
        }
        setPage(newPage);
    }

    // hàm xử lý khi chọn số lượng hiển thị trên 1 trang
    const handleSizeChange = (value) => {
        setSize(value);
        setPage(0);
    }

    // hàm xử lý để lấy danh sách sản phẩm
    const fetchList = async () => {
        try {
            const r = await serviceAPI.getAll(page, size);
            setList(r?.content || []);
            setTotal(r?.totalElements || 0);
        } catch (error) {
            console.log('Failed to fetch product list: ', error);
        }
    }

    // hàm xử lý khi bấm nút làm mới
    const handleReset = () => {
        form.resetFields();
        setName('');
        setPrice(0);
        setImage('');
        setDescription('');
        setIdCate('');
        setIsAddMode(true);
        setId('-1');
        setSearch('');
        setPage(0);
        setSize(10);
        fetchList().then(r => r);
    }
    useEffect(() => {
        fetchList().then(r => r);
    }, [page, size]);
    useEffect(() => {
        categoryAPI.getAllActive().then(r => setCategoryList(r));
    }, []);
    const handleUploadClick = () => {
        hiddenFileInput.current.click(); // Kích hoạt click trên input file ẩn
    };
    const handleFileChange = (e) => {
        const fileUploaded = e.target.files[0];
        if (fileUploaded) {
            setImage(URL.createObjectURL(fileUploaded));
            setFile(fileUploaded);
        }
    };
    const vietNameCurrencyFormat = (price) => {
        return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(price);
    }
    return (
        <Form title="Trang chủ">
            <Form.Item>
                <div className="container mt-4 text-color">
                    <h5 className=''>Dịch vụ</h5>
                    <form>
                        <input type="file" style={{display: 'none'}} ref={hiddenFileInput}
                               accept="image/*"
                               onChange={handleFileChange}/>
                        <div className="row">
                            <div className="col-md-4 mb-4">
                                <label htmlFor="productImage" className="form-label">Hình ảnh dịch vụ</label>
                                <div className="d-flex align-items-center">
                                    <div className="row me-4">
                                        {
                                            image !== '' ? <img src={image}
                                                                alt="product"
                                                                style={{
                                                                    width: '100px',
                                                                    height: '100px',
                                                                    objectFit: 'cover'
                                                                }}
                                                                className="img-fluid img-thumbnail"/> : null
                                        }
                                    </div>
                                    <div>
                                        <button type="button" className="form-control btn-add-img"
                                                onClick={handleUploadClick}>
                                            <i className="fa-solid fa-plus"></i>
                                            Thêm hình ảnh
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-8 d-flex flex-column">
                                <div className="mb-3">
                                    <label className="form-label">Tên dịch vụ</label>
                                    <input className="form-control input"
                                           value={name}
                                           onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Giá</label>
                                    <InputNumber className="form-control input" placeholder="0"
                                                 value={price}
                                                 min={0}
                                                 onChange={(e) => setPrice(e)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mô tả</label>
                                    <textarea rows="5" className="form-control input"
                                              value={description}
                                              onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Danh mục</label>
                                    <Select className="form-control input" id="colorSelect"
                                            value={idCate}
                                            onChange={(value) => setIdCate(value)}
                                    >
                                        <Select.Option value="">Chọn danh mục</Select.Option>
                                        {categoryList.map((c, index) => (
                                            <Select.Option key={index} value={c.id}>{c.name}</Select.Option>
                                        ))}
                                    </Select>
                                </div>

                                <div className="mb-3 d-flex justify-content-end">
                                    <Button type="primary" className="me-2 button-action"
                                            onClick={onFinish}
                                    >
                                        Lưu
                                    </Button>
                                    <Button className="button-action"
                                            onClick={handleReset}>
                                        Làm mới
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="d-flex justify-content-between p-3 mb-2">
                        <div className="mb-3 d-flex align-items-center justify-content-between "
                             style={{color: '#714708'}}>
                            <span>Hiển thị</span>
                            <Select
                                className="input-option"
                                value={size}
                                style={{width: '80px'}}
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
                                <Input className="form-control input" placeholder="Tìm kiếm danh mục"
                                       value={search}
                                       onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                            <div>
                                <Button type="primary" className="text-white rounded-3"
                                        style={{backgroundColor: '#644c38'}}
                                        onClick={handleSearch}
                                >
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Table className="table text-center align-middle" dataSource={list} pagination={false}>
                        <Table.Column title="ID" dataIndex="id" key="id"/>
                        <Table.Column title="Tên dịch vụ" dataIndex="name" key="name"/>
                        <Table.Column title="Loại dịch vụ" dataIndex="name" key="category"
                                      render={(text, record) => (
                                          <p>{record.category.name}</p>
                                      )}
                        />
                        <Table.Column title="Hình ảnh" dataIndex="image" key="image"                       
                                      render={(text, record) => (
                                        <Image.PreviewGroup>
                                            <Image
                                                        width={50}
                                                        height={50}
                                                        src={record.image}
                                                    />                                                                               
                                               </Image.PreviewGroup>
                                      )}
                        />
                        <Table.Column title="Giá" dataIndex="price" key="price"
                                      render={(text, record) => (
                                          <div className="d-flex wrapped">
                                              <p className="wrapped">{vietNameCurrencyFormat(record.price)}</p>
                                          </div>
                                      )}/>
                        <Table.Column title="Mô tả " dataIndex="description" key="description"/>
                        <Table.Column
                            title="Chỉnh sửa"
                            key="action"
                            render={(text, record) => (
                                <Space size="middle">
                                    <a href="#" className="me-2" style={{color: '#644c38'}}
                                       onClick={() => handleFillData(record)}
                                    >
                                        <EditOutlined style={{width: '10px', height: '10px'}}/>
                                    </a>
                                    <Popconfirm
                                        placement="top"
                                        title='Bạn có chắc chắn muốn xóa?'
                                        description={'Xóa mã giảm giá'}
                                        okText="Đồng ý"
                                        cancelText="Hủy"
                                        onConfirm={() => handleDelete(record)}
                                    >
                                        <a href="#" style={{color: '#644c38'}}>
                                            <DeleteOutlined style={{width: '10px', height: '10px'}}/>
                                        </a>
                                    </Popconfirm>
                                </Space>
                            )}
                        />
                    </Table>
                </div>
                <Pagination
                                pageSize={size}
                                total={total}
                                prevIcon={<span onClick={() => handlePageChange(page - 1)}>Trước</span>}
                                nextIcon={<span onClick={() => handlePageChange(page + 1)}>Sau</span>}
                                onChange={onPageChange}
                />
            </Form.Item>
            <Spin spinning={loading} fullscreen={true}/>
        </Form>
    );
};


export default HomePageForm; 