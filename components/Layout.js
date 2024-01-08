import { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { Layout, Menu, Avatar, Dropdown, message } from "antd";
import {
  UserOutlined,
  EditOutlined,
  LogoutOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
  ScheduleOutlined,
  AppstoreAddOutlined,
  UserSwitchOutlined,
  SafetyCertificateOutlined,
  FileProtectOutlined,
  FolderOpenOutlined,
  TeamOutlined,
  CheckSquareOutlined,
  NotificationOutlined,
  AuditOutlined,
  ShareAltOutlined,
  DisconnectOutlined,
} from "@ant-design/icons";
import "./../styles/layout.module.css";
import LoginForm from "./LoginForm";
import Image from "next/image";
import NotificationBell from "./NotificationBell";
import Cookies from "js-cookie";

const { Header, Content, Sider } = Layout;

const AppLayout = ({ children }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [url, setUrl] = useState();
  const [messageApi, contextHolder] = message.useMessage();

  const CustomAvatar = () => {
    const router = useRouter();

    const userMenu = (
      <Menu>
        <Menu.Item
          key="1"
          icon={<EditOutlined />}
          onClick={() => router.push("/edit-profile")}
        >
          Edit Profile
        </Menu.Item>
        <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={userMenu}>
        <Avatar size="large" icon={<UserOutlined />} />
      </Dropdown>
    );
  };
  const handleLogout = () => {
    const userDetails = JSON.parse(Cookies.get("userDetails"));
    Cookies.remove("isLoggedIn"); // Remove the "isLoggedIn" cookie
    Cookies.remove("userDetails"); // Remove user details cookie
    Cookies.remove("userToken"); // Remove user token cookie
    // Clear the login cookie
    // document.cookie = "Login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    messageApi.open({
      type: "success",
      content: `${userDetails.username} logged out successfully`,
    });
    // Redirect to the login page
    router.push("/");
  };
  // Check if the login cookie is set
  useEffect(() => {
    !isLoggedIn && loginCheck();
    setUrl("dashboard");
  }, []);

  useEffect(() => {
    setUrl(router.pathname.slice(1, router.pathname.length));
  }, [router.pathname]);

  const loginCheck = () => {
    const loginCookie = true;
    if (loginCookie) {
      // setIsLoggedIn(true);
    } else {
      // Redirect to the login page if not logged in
      if (router.pathname !== "/") {
        router.push("/");
      }
    }
  };

  const handleClick = (e) => {
    const route = e?.key;
    router.push({
      pathname: "/" + e.key.toString(),
    });
    setUrl(e.key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {contextHolder}
      {/* {isLoggedIn && ( */}
      <Sider width={250} height="100vh" theme="dark">
        <div className="logo">
          <Image
            src="/DZlogo1.png"
            alt="Company Logo"
            width={200}
            height={150}
          />
        </div>
        <Menu
          mode="vertical"
          theme="dark"
          onClick={handleClick}
          selectedKeys={[url]}
        >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.SubMenu
            key="employeeManagement"
            icon={<UsergroupAddOutlined />}
            title="Employee Management"
          >
            <Menu.Item key="employeeManagement/employeeList">
              Employees List
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="sub2"
            icon={<ScheduleOutlined />}
            title="Attendance Management"
          >
            <Menu.Item key="attendenceManagement/employeeList">
              Employees List
            </Menu.Item>
          </Menu.SubMenu>
          {/* <Menu.Item key="administration" icon={<AppstoreAddOutlined />}>
            Administration Panel
          </Menu.Item> */}
          <Menu.Item key="onboarding" icon={<UserSwitchOutlined />}>
            Onboarding
          </Menu.Item>
          <Menu.SubMenu
            key="sub3"
            icon={<SafetyCertificateOutlined />}
            title="Leave Management"
          >
            <Menu.Item key="leaveManagement/employeeDetails">
              Employees Details
            </Menu.Item>
            {/* <Menu.Item key="leaveManagement/leaveRequests">
              Leave Requests
            </Menu.Item> */}
            <Menu.Item key="leaveManagement/leaveApprovals">
              Leave Approvals
            </Menu.Item>
            <Menu.Item key="leaveManagement/employeeSelfService">
              Holiday updates
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="sub4"
            icon={<FileProtectOutlined />}
            title="Promotions and Movements"
          >
            <Menu.Item key="promotions/employeeDetails">
              Employee Details
            </Menu.Item>
            <Menu.Item key="promotions/promotionApprovals">
              Promotion Approvals
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu
            key="sub5"
            icon={<NotificationOutlined />}
            title="Exit Management"
          >
            <Menu.Item key="exitManagement/voluntaryResignation">
              Voluntary Resignation
            </Menu.Item>
            <Menu.Item key="exitManagement/involuntaryResignation">
              Involuntary Resignation
            </Menu.Item>
            <Menu.Item key="exitManagement/exitFormalities">
              Exit Formalities
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
      {/* )} */}
      <Layout>
        <Header
          className="header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              marginLeft: "auto",
              width: 150,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <NotificationBell />
            {isLoggedIn && <CustomAvatar />}
          </div>
        </Header>
        <Content style={{ padding: "24px" }}>
          {/* {isLoggedIn ? ( */}
          {children}
          {/* ) : ( */}
          {/* <div className="login-form">
              <LoginForm />
            </div> */}
          {/* )} */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
