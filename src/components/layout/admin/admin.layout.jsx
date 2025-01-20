import { DollarOutlined, DownOutlined, HomeOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ProductOutlined, UserOutlined, WindowsOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { doLogoutAction } from "../../../redux/profile/profileSlice";

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [activeMenu, setActiveMenu] = useState('')
    const location = useLocation()
    const user = useSelector(state => state.profile.user)


    useEffect(() => {
        const active = items.find(item => location.pathname === item.key).key ?? '/admin'
        setActiveMenu(active)
    }, [location])

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const items = [
        {
            key: '/admin',
            icon: <WindowsOutlined />,
            label: <Link to={'/admin'}>Dashboard</Link>,
        },
        {
            key: '/admin/user',
            icon: <UserOutlined />,
            label: <Link to={'/admin/user'}>User Management</Link>,
        },
        {
            key: '/admin/product',
            icon: <ProductOutlined />,
            label: <Link to={'/admin/product'}>Product Management</Link>,
        },
        {
            key: '/admin/order',
            icon: <DollarOutlined />,
            label: <Link to={'/admin/order'}>Order Management</Link>,
        }
    ]

    const itemsAccount = [
        {
            key: "homepage",
            label: (
                <div
                    onClick={() => { navigate('/') }}
                    style={{
                        cursor: "pointer",
                        width: "100%",
                    }}
                >
                    <HomeOutlined style={{ marginRight: "8px" }} />
                    Homepage
                </div>
            ),
        },
        {
            type: "divider",
        },
        {
            key: "logout",
            label: (
                <div
                    onClick={() => {
                        dispatch(doLogoutAction())
                        navigate('/')
                    }}
                    style={{
                        color: "red",
                        cursor: "pointer",
                        width: "100%",
                    }}
                >
                    <LogoutOutlined style={{ marginRight: "8px" }} />
                    Logout
                </div>
            ),
        },
    ]

    const handleLogout = () => {

    }

    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider trigger={null} collapsible collapsed={collapsed} width={"230px"}>
                    <div className="demo-logo-vertical" style={{
                        color: "#61dafb",
                        margin: "15px 0",
                        textAlign: "center",
                        fontSize: !collapsed ? "32px" : "15px",
                        cursor: "pointer"
                    }}
                        onClick={() => { navigate('/admin') }}
                    >
                        ADMIN
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['/admin']}
                        items={items}
                        selectedKeys={[activeMenu]}
                    />
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }}>
                        <div style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => {
                                    setCollapsed(!collapsed)
                                }}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />

                            <Dropdown menu={{ items: itemsAccount }} trigger={['hover']} placement="bottomRight">
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space style={{ marginRight: "15px" }}>
                                        <Avatar size='large' src={user.avatar_url} />{user.name}
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default AdminLayout