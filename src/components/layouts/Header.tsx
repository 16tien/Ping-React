import { Layout, Avatar, Badge, Dropdown, Space, message } from "antd";
import {
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import { useSearch } from "../../hooks/useSearch";
import { useHeaderTitle } from "../../hooks/useHeaderTitle";

const AppHeader = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { searchComponent } = useSearch();
  const { title } = useHeaderTitle();

  const handleLogout = async () => {
    try {
      await logout();
      message.success("Đăng xuất thành công");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      message.error("Đăng xuất thất bại");
    }
  };

  const handleNavigateProfile = () => navigate("/profile");

  const menuItems = [
    {
      key: "profile",
      icon: <ProfileOutlined />,
      label: <span onClick={handleNavigateProfile}>Hồ sơ cá nhân</span>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: <span onClick={handleLogout}>Đăng xuất</span>,
    },
  ];

  return (
    <Layout.Header style={styles.header}>
      
      <div style={styles.title}>{title}</div>
      <Space size="large">
        {searchComponent}
        <Badge count={3}>
          <BellOutlined style={styles.icon} />
        </Badge>
        <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={["click"]}>
          <Avatar style={styles.avatar} icon={<UserOutlined />} />
        </Dropdown>
      </Space>
    </Layout.Header>
  );
};

export default AppHeader;

const styles = {
  header: {
    background: "#fff",
    padding: "0 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  icon: {
    fontSize: 20,
    cursor: "pointer",
  },
  avatar: {
    backgroundColor: "#87d068",
    cursor: "pointer",
  },
};
