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
        getItem('Quản lý thiết bị', '/home', <DesktopOutlined />, [
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
            height: 64,
            margin: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 8,
          }}
        >
          {collapsed ? (
            <img src="/logo-small.png" alt="Logo" style={{ height: 32 }} />
          ) : (
            <img src="/logo.png" alt="Logo" style={{ height: 32 }} />
          )}
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