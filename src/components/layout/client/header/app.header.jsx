import React, { useState } from "react";
import { Menu, Badge, Avatar, Space, Dropdown } from "antd";
import {
    ShoppingCartOutlined,
    UserOutlined,
    DownOutlined,
    LogoutOutlined,
    ProfileOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";
import "../../../../assets/style/app.header.css";
import "../../../../assets/style/global.css";

const CheckLogin = () => {
    const navigate = useNavigate();
    const [isAuthentication, setIsAuthentication] = useState(true);

    const handleLogout = () => {
        setIsAuthentication(false);
    };

    const menuItems = [
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
            type: "divider",
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
                    <ProfileOutlined style={{ marginRight: "8px" }} />
                    Order History
                </div>
            ),
        },
        {
            key: "3",
            label: (
                <div
                    onClick={handleLogout}
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
            {isAuthentication ? (
                <Dropdown
                    menu={{ items: menuItems }}
                    trigger={["click"]}
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
                        <Avatar size="large" icon={<UserOutlined />} />
                        <DownOutlined
                            style={{
                                position: "absolute",
                                bottom: "-2px",
                                right: "-2px",
                                background: "#252728",
                                borderRadius: "50%",
                                padding: "2px",
                                fontSize: "10px",
                                color: "#fff",
                                boxShadow: "0 0 2px rgba(0,0,0,0.2)",
                            }}
                        />
                    </div>
                </Dropdown>
            ) : (
                <>
                    <a href="#!" className="header-action__link" onClick={() => navigate("/login")}>
                        Sign in
                    </a>
                    <a href="#!" className="header-action__sign-up btn" onClick={() => navigate("/register")}>
                        Sign up
                    </a>
                </>
            )}
        </>
    );
};

const AppHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isHome = location.pathname === "/";
    const isCart = location.pathname === "/order";

    return (
        <header className="header">
            <div className="container">
                <div className="header-top">
                    <div className="logo">
                        <img src="" alt="logo" className="logo__img" />
                    </div>
                    <nav className="navbar">
                        <ul className="navbar__list">
                            <li className="navbar__item">
                                <a
                                    href="#!"
                                    onClick={() => navigate("/")}
                                    className={`navbar__link ${
                                        isHome ? "navbar__link--active" : ""
                                    }`}
                                    style={{
                                        textDecoration: isHome
                                            ? "underline"
                                            : "none",
                                    }}
                                >
                                    Home
                                </a>
                            </li>
                            <li className="navbar__item">
                                <a
                                    href="#!"
                                    onClick={() => navigate("/order")}
                                    className={`navbar__link ${
                                        isCart ? "navbar__link--active" : ""
                                    }`}
                                    style={{
                                        textDecoration: isCart
                                            ? "underline"
                                            : "none",
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
                                <span className="cart-number">0</span>
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
