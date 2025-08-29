import React, { useState } from 'react';
import AppHeader from "./Header";
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from "../../contexts/UserContext";
import logo from "../../assets/images/logo.png";

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useUser();

  const items: MenuItem[] = [
    getItem('Trang chủ', '/', <PieChartOutlined />),



    ...(user?.role === "admin"
      ? [
        getItem('Quản lý thiết bị', 'device', <DesktopOutlined />, [
          getItem('Danh sách', '/devices'),
          getItem('Thêm thiết bị', 'devices/add'),
        ]),
        getItem('Quản lý người dùng', 'sub2', <TeamOutlined />, [
          getItem('Danh sách người dùng', '/users'),
          getItem('Thêm người dùng', '/users/add'),
        ]),
      ]
      : []),

  ];


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "12px",
              width: "80px",
              height: "80px",
            }}
          >
            <img src={logo} alt="Signal" style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={items}
        />
      </Sider>
      <Layout>
        <AppHeader />
        <Content style={{ margin: '10px 16px' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>

        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;