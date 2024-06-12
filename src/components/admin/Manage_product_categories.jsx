import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Table, Space, Badge, notification, Pagination } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import categoryAPI from "../api/categoryAPI";


const CategoryPageForm = () => {
    const DURATION = 1; 
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [list, setList] = useState([]);
    const [isAddMode, setIsAddMode] = useState(true); 
    const [form] = Form.useForm();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [active, setActive] = useState("true");
    const [total, setTotal] = useState(0);   
    const [search, setSearch] = useState('');   


    const onPageChange = (page) => { 
        setPage(page - 1);
    };
    const handlePageChange = (newPage) => {
        console.log('ok', total);
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
    const onFinish = (value) => {
        value.preventDefault(); 
        if (name === '') {
            notification.error({
                description: 'Vui lòng nhập tên danh mục!',
                duration: DURATION, 
            });
            return;
        }

        if ( active === undefined) { // Thêm kiểm tra active === undefined
            notification.error({
                description: 'Vui lòng chọn trạng thái!',
                duration: DURATION, 
            });
            return;
        }
      
        categoryAPI.updateCategory({ id, name, active }).then(r => {         
            if (r === "OK") {
                notification.success({
                    message: 'Success',
                    description: isAddMode ? 'Thêm danh mục thành công!' : 'Chỉnh sửa danh mục thành công!',
                    duration: DURATION, 
                });
                handleReset();
            } else {
                notification.error({
                    message: 'Error',
                    description: r === 'CATEGORY_EXISTED' ? 'Danh mục đã tồn tại' : 'Thêm danh mục thất bại!',
                    duration: DURATION, 
                });
            }
        });
    }


    const handleSearch = () => {
        if (search === '') {
            notification.error({
                description: 'Vui lòng nhập tên danh mục để tìm kiếm!',
                duration: DURATION, 
            });
            return;
        }
        // Tìm kiếm theo tên danh mục
        categoryAPI.searchCategory({ name: search, page, size, id, active }).then(r => {
            setList(r?.content || []);
            setTotal(r?.totalElements || 0);
        });
    }

    // hàm xử lý khi bấm nút sửa (icon bút chì)
    const handleFillData = (record) => { // record truy cập giá trị từng dòng 
        setId(record.id);
        setName(record.name);
        setActive(record.active ? "true" : "false");
        setIsAddMode(false);
    }

    // hàm xử lý khi chọn số lượng hiển thị trên 1 trang
    const handleSizeChange = (value) => {
        setSize(value);
        setPage(0);
    }

    // hàm xử lý để lấy danh sách sản phẩm
    const fetchList = async () => {
        try {
            const response = await categoryAPI.getAll(page, size);
            setList(response?.content || []);
            setTotal(response?.totalElements || 0);
        } catch (error) {
            console.log('Failed to fetch product list: ', error);
        }
    }

    // hàm xử lý khi bấm nút làm mới
    const handleReset = () => {
        form.resetFields();
        setName('');
        setActive("true");
        setIsAddMode(true);
        setId('-1');
        setSearch('');

        setPage(0);
        setSize(size);
        fetchList().then(r => r);
    }
    useEffect(() => {
        fetchList().then(r => {
        });
    }, [page, size]);

    return (
        <>
            <Form title="Trang chủ">
                <Form.Item>
                    <div className="mt-4 text-color">
                        <div className="container">
                            <h5>Quản lý loại hàng</h5>
                            <div className="d-flex justify-content-between mt-4">
                                <div>
                                    <span className="text-color">Hiển thị
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
                                        mục</span>
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
                                            onClick={handleSearch}
                                            style={{ backgroundColor: '#644c38' }}>
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <Form className="d-flex flex-wrap align-items-center mt-4"
                            >
                                <Form.Item className="mb-3 me-2" name={'name'}
                                    rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}>
                                    <label className="form-label form-label-sm">Tên danh mục</label>
                                    <Input className="form-control form-control-sm input"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Form.Item>
                                {!isAddMode && (
                                    <Form.Item className="mb-3 me-5"
                                        rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}>
                                        <label className="form-label form-label-sm">Trạng thái</label>
                                        <Select
                                            value={active}
                                            onChange={(value) => setActive(value)}
                                            allowClear
                                        >
                                            <Select.Option value="true">Hiển thị</Select.Option>
                                            <Select.Option value="false">Ẩn</Select.Option>
                                        </Select>
                                    </Form.Item>
                                )}
                                <Form.Item className="mb-3 mt-4">
                                    <Button type="primary" className="me-2 button-action"
                                        onClick={onFinish}
                                    >Lưu</Button>
                                    <Button className="button-action"
                                        onClick={handleReset}
                                    >Làm mới</Button>
                                </Form.Item>
                            </Form>
                            {/* table */}
                            <Table className="table text-center align-middle" dataSource={list} pagination={false}>
                                <Table.Column title="ID" dataIndex="id" key="id" />
                                <Table.Column title="Tên danh mục" dataIndex="name" key="name" />
                                <Table.Column
                                    title="Trạng thái"
                                    dataIndex="active"
                                    key="active"
                                    render={(text, record) => (
                                        <Badge status="success"
                                            text={record?.active === true ? 'Hiển thị' : 'Ẩn'} />)}
                                />
                                <Table.Column
                                    title=""
                                    key="action"
                                    render={(text, record) => (<Space size="middle">
                                        <a href="#" className="me-2" style={{ color: '#644c38' }}
                                            onClick={() => handleFillData(record)}
                                        >
                                            <EditOutlined style={{ width: '10px', height: '10px' }} />
                                        </a>
                                    </Space>)}
                                />
                            </Table>

                            <Pagination
                                pageSize={size}
                                total={total}
                                prevIcon={<span onClick={() => handlePageChange(page - 1)}>Trước</span>}
                                nextIcon={<span onClick={() => handlePageChange(page + 1)}>Sau</span>}
                                onChange={onPageChange}
                            />      
                             </div>
                    </div>
                </Form.Item>
            </Form>
        </>
    );
};


export default CategoryPageForm;