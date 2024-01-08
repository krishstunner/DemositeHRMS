import Head from 'next/head';
import React, { useState } from 'react'
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  SolutionOutlined,
  PlusOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import  Router  from 'next/router';
import DZlogo1 from './../components/assets/images/DZlogo1.png'
import 'antd/dist/antd.js';
import { useRouter }  from 'next/router';

const { Header, Content, Sider } = Layout;

const AppLayout = ({ children }) => {
  let pathName;
  const router = useRouter()

  const handleMenuClick = (key) => {
    // Handle navigation menu click
    console.log(key);
    Router.push(`/${key.key}`)
    const { pathname } = router;
    console.log('key',key);
    pathName = key.key.toString();
    console.log('123',pathName);
  };

  const handleProfileMenuClick = (key) => {
    // Handle profile menu click
    
    Router.push('/edit-profile')
  };
const handleLogout = () => { 
    Router.push('/')
 }
  const menu = (
    <Menu onClick={handleProfileMenuClick}>
      <Menu.Item key="edit-profile">
        <EditOutlined /> Edit Profile
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  );
const handleOnclick = (e) => { 
    console.log(e);
    Router.push(`/${e.key}`)
 }
 console.log('12344', pathName);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Head>
        <title>HRMS Leave Management System</title>
      </Head>
      <Sider width={200} theme="dark">
        <div className="logo">
          {/* Add your company logo */}
          <img src={DZlogo1} />
        </div>
        <Menu
          mode="vertical"
          theme="dark"
          onClick={handleMenuClick}
          style={{ height: '100%', borderRight: 0 }}
          selectedKeys={[pathName != undefined ? pathName?.slice(1) : 'dashboard']}
        >
          <Menu.Item key="dashboard"  icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="employeesPage" icon={<TeamOutlined />}>
            Employees
          </Menu.Item>
          <Menu.Item key="attendance"icon={<SolutionOutlined />}>
            Attendance
          </Menu.Item>
          <Menu.Item key="onboarding" onClick={handleOnclick} icon={<PlusOutlined />}>
            Onboarding
          </Menu.Item>
          <Menu.Item key="administration" onClick={handleOnclick} icon={<SolutionOutlined />}>
            Administration Panel
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: 'transparent', padding: '0 16px', marginLeft:'auto' }}>
          <Dropdown overlay={menu}>
            <Avatar size="large" />
          </Dropdown>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
