import React, { useState } from "react";
import "../admin/css/index-admin.css";
import HomePage from "./HomePage";
import SVPageForm from "../admin/admin-service";
import Adminorder from "../admin/admin-order";
import logoHeader from "../../assets/XINH_logohedear.png";
import {
  HomeOutlined,
  SolutionOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Trang chủ", "1", <HomeOutlined />),
  getItem("Quản lý", "sub1", <SolutionOutlined />, [
    getItem("Quản lý hàng hóa", "2"),
    getItem("Quản lý size và màu", "3"),
    getItem("Quản lý sản phẩm", "4"),
    getItem("Tất cả sản phẩm", "5"),
    getItem("Giảm giá", "6"),
    getItem("Dịch vụ", "7"),
  ]),
  getItem("Quản lý khách hàng", "sub2", <IdcardOutlined />, [
    getItem("Tom", "8"),
    getItem("Bill", "9"),
    getItem("Alex", "10"),
  ]),
  getItem("Quản lý đơn hàng", "11", <HomeOutlined />),
  getItem("Hỗ trợ và liên hệ", "sub3", <HomeOutlined />, [
    getItem("Team 1", "12"),
    getItem("Team 2", "13"),
  ]),
  getItem("Quản lý đơn hàng", "sub4", <HomeOutlined />, [
    getItem("Team 1", "14"),
    getItem("Team 2", "15"),
  ]),
  getItem("Quản lý đơn hàng", "sub5", <HomeOutlined />, [
    getItem("Team 1", "16"),
    getItem("Team 2", "17"),
  ]),
  getItem("Quản lý đơn hàng", "sub6", <HomeOutlined />, [
    getItem("Team 1", "18"),
    getItem("Team 2", "19"),
  ]),
];
const Indexadmin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [selectedMenuItem, setSelectedMenuItem] = useState("1");

  const handleMenuItemClick = (item) => {
    setSelectedMenuItem(item);
  };
  const formComponents = {
    1: <HomePage />,
    2: <SVPageForm />,
    11: <Adminorder />,
    // Thêm các item khác nếu cần
  };

  const renderBreadcrumb = () => {
    switch (selectedMenuItem) {
      case "1":
        return <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>;

      case "2":
        return <Breadcrumb.Item>Quản lý</Breadcrumb.Item>;

      // Add more cases for other menu items if needed
      default:
        return <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ padding: 0, marginRight: 30 }}>
        <div className="demo-logo-vertical" />
        <a href="/" className=" ">
          <img src={logoHeader} className="img-fluid " alt="Logo" />
        </a>
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={({ key }) => handleMenuItemClick(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {/* <Space direction="vertical">  
                    <Search placeholder="input search text" onSearch={onSearch} enterButton />  
                </Space> */}
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            {renderBreadcrumb()}
          </Breadcrumb>
          <div
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}>
            <div style={{ padding: 20, minHeight: 360, background: "#fff" }}>
              {formComponents[selectedMenuItem]}
            </div>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Indexadmin;
