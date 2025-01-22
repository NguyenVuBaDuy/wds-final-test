import React from "react";
import { Menu, Badge, Avatar, Space, Dropdown } from "antd";
import {
    ShoppingCartOutlined,
    UserOutlined,
    DownOutlined,
    LogoutOutlined,
    ProfileOutlined,
    SettingOutlined,
    DollarOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import "../../../../assets/style/app.header.css";
import "../../../../assets/style/global.css";
import { useDispatch, useSelector } from "react-redux";
import { doLogoutAction } from "../../../../redux/profile/profileSlice";
import { FaArrowRight } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import logo from "../../../../assets/img/logo.png";
const CheckLogin = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.profile.user);
    const isAuthenticated = useSelector(
        (state) => state.profile.isAuthenticated
    );
    const dispatch = useDispatch();
    const cart = useSelector(state => state.order.cart)


    const menuItems = [
        ...(user.role === "admin"
            ? [
                {
                    key: "admin",
                    label: (
                        <div
                            onClick={() => navigate("/admin")}
                            style={{
                                cursor: "pointer",
                                width: "100%",
                            }}
                        >
                            <RiAdminFill style={{ marginRight: "8px" }} />
                            Admin DashBoard
                        </div>
                    ),
                },
            ]
            : []),
        {
            key: "1",
            label: (
                <div
                    onClick={() => navigate("/profile")}
                    style={{
                        cursor: "pointer",
                        width: "100%",
                    }}
                >
                    <ProfileOutlined style={{ marginRight: "8px" }} />
                    Profile
                </div>
            ),
        },
        {
            key: "2",
            label: (
                <div
                    onClick={() => navigate("/history")}
                    style={{
                        cursor: "pointer",
                        width: "100%",
                    }}
                >
                    <DollarOutlined style={{ marginRight: "8px" }} />
                    Order History
                </div>
            ),
        },
        {
            type: "divider",
        },
        {
            key: "3",
            label: (
                <div
                    onClick={() => {
                        dispatch(doLogoutAction());
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
    ];

    return (
        <>
            {isAuthenticated ? (
                <Dropdown
                    menu={{ items: menuItems }}
                    trigger={["hover"]}
                    overlayStyle={{ minWidth: "200px" }}
                >
                    <div
                        onClick={(e) => e.preventDefault()}
                        style={{
                            position: "relative",
                            display: "inline-block",
                            cursor: "pointer",
                        }}
                    >
                        <Space style={{ marginRight: "15px" }}>
                            <Avatar size={"large"} src={user.avatar_url} />
                            {user.name}
                            <DownOutlined />
                        </Space>
                    </div>
                </Dropdown>
            ) : (
                <>
                    <a
                        className="header-action__link btn"
                        onClick={() => {
                            navigate("/login");
                        }}
                    >
                        Sign in
                    </a>
                    <a
                        className="header-action__sign-up btn"
                        onClick={() => {
                            navigate("/register");
                        }}
                    >
                        Get Started
                        <FaArrowRight style={{ marginLeft: "5px" }} />
                    </a>
                </>
            )}
        </>
    );
};

const AppHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const cart = useSelector(state => state.order.cart)


    const isHome = location.pathname === "/";
    const isCart = location.pathname === "/order";

    return (
        <header className="header">
            <div className="container">
                <div className="header-top">
                    <div className="logo">
                        <a href="#">
                            <img src={logo} alt="logo" className="logo__img" onClick={() => { navigate('/') }} />
                        </a>
                    </div>
                    <nav className="navbar">
                        <ul className="navbar__list">
                            <li className="navbar__item">
                                <a
                                    onClick={() => navigate("/")}
                                    className={`navbar__link ${isHome ? "navbar__link--active" : ""
                                        }`}
                                    style={{
                                        textDecoration: isHome
                                            ? "underline"
                                            : "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    Home
                                </a>
                            </li>
                            <li className="navbar__item">
                                <a
                                    onClick={() => navigate("/order")}
                                    className={`navbar__link ${isCart ? "navbar__link--active" : ""
                                        }`}
                                    style={{
                                        textDecoration: isCart
                                            ? "underline"
                                            : "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    Cart
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="header-action">
                        <div className="shopping-cart">
                            <a
                                onClick={() => navigate("/order")}
                                className="shopping-cart__link"
                                style={{ cursor: "pointer" }}
                            >
                                <ShoppingCartOutlined
                                    style={{
                                        fontSize: "2.4rem",
                                        color: "#000",
                                    }}
                                />
                                <span className="cart-number">{cart?.length}</span>
                            </a>
                        </div>
                        <CheckLogin />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
