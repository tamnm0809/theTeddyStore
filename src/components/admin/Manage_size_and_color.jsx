import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Table, Space, Tabs, notification, Pagination } from 'antd';
import { EditOutlined} from '@ant-design/icons';
import sizeAPI from "../api/sizeAPI";
import colorAPI from "../api/colorAPI";

const { TabPane } = Tabs;


const SizeColorPageForm = () => {

    const DURATION = 1; 
    const [pageSize, setPageSize] = useState(0);
    const [sizeSize, setSizeSize] = useState(10);
    const [listSize, setListSize] = useState([]);
    const [isAddModeSize, setIsAddModeSize] = useState(true); 
    const [formSize] = Form.useForm();
    const [idSize, setIdSize] = useState('-1');
    const [sizeNo, setsizeNo] = useState('');
    const [totalSize, setTotalSize] = useState(0);   
    const [searchSize, setSearchSize] = useState('');   

    const onPageChangeSize = (page, pageSize) => {
        setPageSize(page - 1);
    };

    const handlePageChangeSize = (newPage) => {
        
        if (newPage < 0) {
            notification.warning({
                description: 'Bạn đang ở trang đầu tiên!', duration: DURATION, 
            });
            return;
        }
        if (newPage > totalSize / sizeSize) {
            notification.warning({
                description: 'Bạn đang ở trang cuối cùng!', duration: DURATION, 
            });
            return;
        }
        setPageSize(newPage);
    }

    const onFinishSize = (value) => {
        value.preventDefault();
        if (sizeNo === '') {
            notification.error({
                description: 'Vui lòng số size!', duration: DURATION, 
            });
            return;
        }

        sizeAPI.updateSize({ idSize, sizeNo }).then(r => {
            if (r === "OK") {
                notification.success({
                    message: 'Success',
                    description: isAddModeSize ? 'Thêm size gấu thành công!' : 'Chỉnh sửa size gấu thành công!',
                    duration: DURATION, 
                });
                handleResetSize();
            } else {
                notification.error({
                    message: 'Error',
                    description: r === 'SIZE_EXISTED' ? 'Size gấu đã tồn tại' : 'Thêm size gấu thất bại!',
                    duration: DURATION, 
                });
            }
        });
    }

    
    const handleSearchSize = () => {
      
        if (searchSize === '') {
            notification.error({
                description: 'Vui lòng nhập size gấu để tìm kiếm!', duration: DURATION, 
            });
            return;
        }

        sizeAPI.searchSize({ sizeNo: searchSize, pageSize, sizeSize }).then(r => {
            setListSize(r?.content || []);
            setTotalSize(r?.totalElements || 0);
        });
    }


    const handleFillDataSize = (record) => {
        setIdSize(record.id);
        setsizeNo(record.size_no);
        setIsAddModeSize(false);
    }


    const handleSizeChangeSize = (value) => {
        setSizeSize(value);
        setPageSize(0);
    }

  
    const fetchListSize = async () => {
        try {
            const response = await sizeAPI.getAll(pageSize, sizeSize);
            setListSize(response?.content || []);
            setTotalSize(response?.totalElements || 0);
        } catch (error) {
            console.log('Failed to fetch size list: ', error);
        }
    }

 
    const handleResetSize = () => {
        formSize.resetFields();
        setsizeNo('');
        setIsAddModeSize(true);
        setIdSize('-1');
        setSearchSize('');

        setPageSize(0);
        setSizeSize(10);
        fetchListSize().then(r => r);
    }
    useEffect(() => {
        fetchListSize().then(r => r);
    }, [pageSize, sizeSize]);



    const [pageColor, setPageColor] = useState(0);
    const [sizeColor, setSizeColor] = useState(10);
    const [listColor, setListColor] = useState([]);
    const [isAddModeColor, setIsAddModeColor] = useState(true);
    const [formColor] = Form.useForm();
    const [idColor, setIdColor] = useState('-1');
    const [color, setColor] = useState('');
    const [totalColor, setTotalColor] = useState(0);   
    const [searchColor, setSearchColor] = useState('');   


    const onPageChangeColor = (page, pageSize) => {
        setPageColor(page - 1);
    };
    const handlePageChangeColor = (newPage) => {
        if (newPage < 0) {
            notification.warning({
                description: 'Bạn đang ở trang đầu tiên!', duration: DURATION, 
            });
            return;
        }
        if (newPage > totalColor / sizeColor) {
            notification.warning({
                description: 'Bạn đang ở trang cuối cùng!', duration: DURATION, 
            });
            return;
        }
        setPageColor(newPage);
    }


    const onFinishColor = (value) => {
        value.preventDefault();
        if (color === '') {
            notification.error({
                description: 'Vui lòng nhập màu gấu!', duration: DURATION, 
            });
            return;
        }

        
        colorAPI.updateColor({ idColor, color }).then(r => {
            if (r === "OK") {
                notification.success({
                    message: 'Success',
                    description: isAddModeColor ? 'Thêm màu gấu thành công!' : 'Chỉnh sửa màu gấu thành công!',
                    duration: DURATION, 
                });
                handleResetColor();
            } else {
                notification.error({
                    message: 'Error',
                    description: r === 'COLOR_EXISTED' ? 'Màu gấu đã tồn tại' : 'Thêm màu gấu thất bại!',
                    duration: DURATION, 
                });
            }
        });
    }


    const handleSearchColor = () => {
        if (searchColor === '') {
            notification.error({
                description: 'Vui lòng nhập màu gấu để tìm kiếm!', duration: DURATION, 
            });
            return;
        }
        
        colorAPI.searchColor({ color: searchColor, pageColor, sizeColor }).then(r => {
            setListColor(r?.content || []);
            setTotalColor(r?.totalElements || 0);
        });
    }

    
    const handleFillDataColor = (record) => {
        setIdColor(record.id);
        setColor(record.color);
        setIsAddModeColor(false);
    }

   
    const handleSizeChangeColor = (value) => {
        setSizeColor(value);
        setPageColor(0);
    }

    
    const fetchListColor = async () => {
        try {
            const response = await colorAPI.getAll(pageColor, sizeColor);
            setListColor(response?.content || []);
            setTotalColor(response?.totalElements || 0);
        } catch (error) {
            console.log('Failed to fetch color list: ', error);
        }
    }

   
    const handleResetColor = () => {
        formColor.resetFields();
        setColor('');
        setIsAddModeColor(true);
        setIdColor('-1');
        setSearchColor('');
        setPageColor(0);
        setSizeColor(10);
        fetchListColor().then(r => r);
    }
    useEffect(() => {
        fetchListColor().then(r => r);
    }, [pageColor, sizeColor]);
    return (<Form title="Trang chủ">
        <Form.Item>
            <div className="container mt-4 text-color">
                <h5>Quản lý size và màu</h5>
                <Tabs defaultActiveKey="1" id="myTab">
                    <TabPane tab="Size gấu" key="1">
                        {/* tab1 */}
                        <div className="container">
                            <div className="d-flex justify-content-between mt-4">
                                <div>
                                    <span className="text-color">Hiển thị
                                        <Select className="input-option" id="colorSelect"
                                            value={sizeSize}
                                            style={{ width: '80px' }}
                                            onChange={handleSizeChangeSize}
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
                                        <Input type="text" placeholder="Tìm kiếm màu"
                                            value={searchSize}
                                            onChange={(e) => setSearchSize(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Button type="primary" className="text-white rounded-3"
                                            onClick={handleSearchSize}
                                            style={{ backgroundColor: '#644c38' }}>
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mt-0 ">
                                <Form className="d-flex flex-wrap align-items-center mt-4">
                                    <Form.Item className="mb-3 me-5"
                                        rules={[{ required: true, message: 'Vui lòng nhập size gấu!' }]}>
                                        <label className="form-label form-label-sm text-color">Size gấu</label>
                                        <Input className="form-control form-control-sm input"
                                            value={sizeNo}
                                            onChange={(e) => setsizeNo(e.target.value)}
                                        />
                                    </Form.Item>

                                    <Form.Item className="mb-3 mt-4">
                                        <Button type="primary" className="me-2 button-action"
                                            onClick={onFinishSize}
                                        >Lưu</Button>
                                        <Button className="button-action"
                                            onClick={handleResetSize}>Làm mới</Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                        {/* table */}
                        <Table className="table text-center align-middle" dataSource={listSize} pagination={false}>
                            <Table.Column title="ID" dataIndex="id" key="id" />
                            <Table.Column title="Size" dataIndex="size_no" key="size_no" />
                            <Table.Column
                                title="Chỉnh sửa"
                                key="action"
                                render={(text, record) => (<Space size="middle">
                                    <a href="#" className="me-2" style={{ color: '#644c38' }}
                                        onClick={() => handleFillDataSize(record)}>
                                        <EditOutlined style={{ width: '10px', height: '10px' }} />
                                    </a>
                                </Space>)}
                            />
                        </Table>

                        <div className='col-12'>
                        <Pagination                          
                            pageSize={sizeSize}
                            total={totalSize}
                            prevIcon={<span onClick={() => handlePageChangeSize(pageSize - 1)}>Trước</span>}
                            nextIcon={<span onClick={() => handlePageChangeSize(pageSize + 1)}>Sau</span>}
                            onChange={onPageChangeSize}
                        />
                        </div>                      
                    </TabPane>
                    <TabPane tab="Màu gấu" key="2">
                        {/* tab2 */}
                        <div className="container">
                            <div className="d-flex justify-content-between mt-4">
                                <div>
                                    <span className="text-color">Hiển thị
                                        <Select
                                            className="input-option"
                                            value={sizeColor}
                                            style={{ width: '80px' }}
                                            onChange={handleSizeChangeColor}
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
                                        <Input type="text" placeholder="Tìm kiếm màu"
                                            value={searchColor}
                                            onChange={(e) => setSearchColor(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Button type="primary" className="text-white rounded-3"
                                            onClick={handleSearchColor}
                                            style={{ backgroundColor: '#644c38' }}>
                                            <i className="fa-solid fa-magnifying-glass"></i>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <Form className="d-flex flex-wrap align-items-center mt-4">
                                <Form.Item className="mb-3 me-5"
                                    rules={[{ required: true, message: 'Vui lòng màu gấu!' }]}>
                                    <label className="form-label form-label-sm text-color">Màu</label>
                                    <Input className="form-control form-control-sm input"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)} />
                                </Form.Item>

                                <Form.Item className="mb-3 mt-4">
                                    <Button type="primary" className="me-2 button-action"
                                        onClick={onFinishColor}>Lưu</Button>
                                    <Button className="button-action"
                                        onClick={handleResetColor}>Làm mới</Button>
                                </Form.Item>
                            </Form>
                        </div>
                        {/* table */}
                        <Table className="table text-center align-middle" dataSource={listColor}
                            pagination={false}>
                            <Table.Column title="ID" dataIndex="id" key="id" />
                            <Table.Column title="Màu" dataIndex="color" key="color" />

                            <Table.Column
                                title="Chỉnh sửa"
                                key="action"
                                render={(text, record) => (<Space size="middle">
                                    <a href="#" className="me-2" style={{ color: '#644c38' }}
                                        onClick={() => handleFillDataColor(record)}>
                                        <EditOutlined style={{ width: '10px', height: '10px' }} />
                                    </a>
                                </Space>)}
                            />
                        </Table>

                        <Pagination
                            pageSize={sizeColor}
                            total={totalColor}
                            prevIcon={<span onClick={() => handlePageChangeColor(pageColor - 1)}>Trước</span>}
                            nextIcon={<span onClick={() => handlePageChangeColor(pageColor + 1)}>Sau</span>}
                            onChange={onPageChangeColor}
                        />                      
                    </TabPane>
                </Tabs>
            </div>

        </Form.Item>
    </Form>);
};


export default SizeColorPageForm; 
