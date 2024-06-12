import React, { useState } from "react";
import "../admin/css/index-admin.css";
import HomePageForm from "./HomePage";
import { HomeOutlined, ProfileOutlined, CommentOutlined, AreaChartOutlined, UserOutlined, SettingOutlined, AppstoreOutlined ,BellOutlined} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import "./css/style.css";
import logoHeader from "./images/XINH_logoheader.png";
import SizeColorPageForm from "./Manage_size_and_color";
import CategoryPageForm from "./Manage_product_categories";
import ProductPageForm from "./Product_management";
import Service from "./Service";
import AllProductPageForm from "./All_products";
import DiscountPageForm from "./Discount";
import PanelListCustomer from "./PanelListCustomer";
import PanelReviewProduct from "./PanelReviewProduct";
import PanelManagementBanner from "./PanelManagementBanner";
import Manage_order from "./manage_order";
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
  getItem("Quản lý", "sub1", <AppstoreOutlined />, [
    getItem("Quản lý hàng hóa", "2"),
    getItem("Quản lý size và màu", "3"),
    getItem("Quản lý sản phẩm", "4"),
    getItem("Tất cả sản phẩm", "5"),
    getItem("Giảm giá", "6"),
    getItem("Dịch vụ", "7"),
  ]),
  getItem("Quản lý khách hàng", "8", <UserOutlined />),
  getItem("Quản lý đơn hàng", "9", <ProfileOutlined />),
  getItem("Đánh giá sản phẩm", "10", <CommentOutlined />),
  getItem("Cài đặt", "11", <SettingOutlined />),
  getItem("Báo cáo", "12", <AreaChartOutlined />),
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
    1: <HomePageForm />,
    2: <CategoryPageForm />,
    3: <SizeColorPageForm />,
    4: <ProductPageForm />,
    5: <AllProductPageForm />,
    6: <DiscountPageForm />,
    7: <Service/>,
    8: <PanelListCustomer />,
    9: <Manage_order/>,
    10: <PanelReviewProduct />,
    11: <PanelManagementBanner />
    // Thêm các item khác nếu cần
  };

  const renderBreadcrumb = () => {
    switch (selectedMenuItem) {
      case "1":
        return <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>; 
      case "2":
        return <Breadcrumb.Item>Quản lý loại hàng</Breadcrumb.Item>;
      case "3":
        return <Breadcrumb.Item>Quản lý size và màu</Breadcrumb.Item>;
      case "4":
        return <Breadcrumb.Item>Quản lý sản phẩm</Breadcrumb.Item>;
      case "5":
        return <Breadcrumb.Item>Tất cả sản phẩm</Breadcrumb.Item>;
      case "6":
        return <Breadcrumb.Item>Giảm giá</Breadcrumb.Item>;
      case "7":
        return <Breadcrumb.Item>Dịch vụ</Breadcrumb.Item>;
      case "8":
        return <Breadcrumb.Item>Quản lý khách hàng</Breadcrumb.Item>;
      case "9":
        return <Breadcrumb.Item>Quản lý đơn hàng</Breadcrumb.Item>;
      case "10":
        return <Breadcrumb.Item>Đánh giá sản phẩm</Breadcrumb.Item>;
      case "11":
        return <Breadcrumb.Item>Cài đặt</Breadcrumb.Item>;
      case "12":
        return <Breadcrumb.Item>Báo cáo</Breadcrumb.Item>;

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
          theme="light"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={({ key }) => handleMenuItemClick(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
        <div className="row"> 
            <div className="col-11">
              <h5>Xin chào admin</h5>
              <h3>Chào mừng quay trở lại</h3>
            </div>
            <div className="col-1 thongbao">
            <BellOutlined />
            </div>
          </div>
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
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}>
            <div style={{ padding: 24, minHeight: 360, background: "#fff" }}>
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

// import React from 'react';
// import { Form } from 'antd';

// const HomePageForm = () => {
//     return (
//         <Form title="Trang chủ">
//             <Form.Item>Quản lý hàng hóa</Form.Item>
//         </Form>
//     );
// };

// export default HomePageForm;

// import React from 'react';
// import { Form } from 'antd';

// const HomePageForm = () => {
//     return (
//         <Form title="Trang chủ">
//             <Form.Item>Trang chủ</Form.Item>
//         </Form>
//     );
// };

// export default HomePageForm;
