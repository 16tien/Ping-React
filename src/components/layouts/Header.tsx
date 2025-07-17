import { Layout, Avatar, Badge, Dropdown, Space, message } from "antd";
import {
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const AppHeader = () => {
  const {logout} =  useAuth()
   const handleLogout = async () => {
  try {
    await logout(); 
    message.success("Đăng xuất thành công");
    navigate("/login");
  } catch (error) {
    console.error(error);
    message.error("Đăng xuất thất bại");
  }
};

  const navigate = useNavigate();
  const { Header } = Layout;

  const menuItems = [
    {
      key: "profile",
      icon: <ProfileOutlined />,
      label: <span onClick={() => navigate("/profile")}>Hồ sơ cá nhân</span>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: <span onClick={handleLogout}>Đăng xuất</span>,
    },
  ];

  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "18px" }}>Device Manager</div>

      <Space size="large">
        {/* Chuông thông báo */}
        <Badge count={3}>
          <BellOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
        </Badge>

        {/* Avatar dropdown */}
        <Dropdown
          menu={{ items: menuItems }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Avatar
            style={{ backgroundColor: "#87d068", cursor: "pointer" }}
            icon={<UserOutlined />}
          />
        </Dropdown>
      </Space>
    </Header>
  );
};

export default AppHeader;
