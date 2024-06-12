import React, { useState } from "react";
import "../user/css/order.css";
import Modal from "../admin/modal_detailOrder";
import { Link } from "react-router-dom"; 
const Infor = () => {
    const [activeTab, setActiveTab] = useState("tab1");
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4 className="text_brown fw-bold">Đơn hàng của tôi</h4>
                        <div className="tab-container mt-4">
                            <div className="tabs">
                                <button
                                    className={activeTab === "tab1" ? "active-tab" : ""}
                                    onClick={() => handleTabChange("tab1")}
                                >
                                    Tất cả
                                    <button className="sl_order">5</button>
                                </button>
                                <button
                                    className={activeTab === "tab2" ? "active-tab" : ""}
                                    onClick={() => handleTabChange("tab2")}
                                >
                                    Đang tiến hành
                                    <button className="sl_order">1</button>
                                </button>
                                <button
                                    className={activeTab === "tab3" ? "active-tab" : ""}
                                    onClick={() => handleTabChange("tab3")}
                                >
                                    Đang giao
                                    <button className=" sl_order">1</button>
                                </button>
                                <button
                                    className={activeTab === "tab4" ? "active-tab" : ""}
                                    onClick={() => handleTabChange("tab4")}
                                >
                                    Hoàn thành
                                    <button className=" sl_order">1</button>
                                </button>
                                <button
                                    className={activeTab === "tab5" ? "active-tab" : ""}
                                    onClick={() => handleTabChange("tab5")}
                                >
                                    Hoàn trả
                                    <button className=" sl_order">1</button>
                                </button>
                                <button
                                    className={activeTab === "tab6" ? "active-tab" : ""}
                                    onClick={() => handleTabChange("tab6")}
                                >
                                    Hủy đơn
                                    <button className=" sl_order">1</button>
                                </button>
                            </div>
                            <div className="card-container">
                                {activeTab === "tab1" && (
                                    <div className="container">
                                        <div className="row mt-4">
                                            <div className="col-sm-6 d-flex">
                                                <span className="mt-2">Xem</span>
                                                <div className="dropdown mx-2">
                                                    <div className="dropdown-select">
                                                        <span className="select">05</span>
                                                        <i class="fa-solid fa-caret-down"></i>
                                                    </div>
                                                    <div className="dropdown-list">
                                                        <div className="item">5</div>
                                                        <div className="item">10</div>
                                                        <div className="item">20</div>
                                                        <div className="item">30</div>
                                                    </div>
                                                </div>
                                                <span className="mt-2">mục</span>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="d-flex">
                                                    <input
                                                        type="text"
                                                        className=" ms-auto search-input border-2 ps-3 "
                                                        placeholder="Tìm kiếm"
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="bg_brown btn_seach ms-2"
                                                    >
                                                        <i className="fa-solid fa-magnifying-glass text-light fs-6"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <table class="table mt-5">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Mã đơn hàng</th>
                                                    <th scope="col">Ngày đặt</th>
                                                    <th scope="col">Ngày giao</th>
                                                    <th scope="col">Trạng thái</th>
                                                    <th scope="col">Tổng đơn hàng</th>
                                                    <th scope="col">Thanh toán</th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>ID248U2747</td>
                                                    <td>03/03/2024</td>
                                                    <td>07/03/2024</td>
                                                    <td>
                                                        <div className="delivery">Đang giao</div>
                                                    </td>
                                                    <td></td>
                                                    <td className="text-warning">Chưa thanh toán</td>
                                                    <td> 
                                                        {modalOpen && <Modal setOpenModal={setModalOpen} />}
                                                    </td>
                                                    
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="pagination">
                                            <Link>&laquo;</Link>
                                            <Link>1</Link>
                                            <Link class="active">2</Link>
                                            <Link>3</Link>
                                            <Link>4</Link>
                                            <Link>&raquo;</Link>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div> 
            </div>
           
        </div>
    );
};

export default Infor;
