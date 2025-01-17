import React from "react";
import { Menu, Badge, Avatar, Space, Dropdown } from "antd";
import {
    ShoppingCartOutlined,
    UserOutlined,
    DownOutlined,
    LogoutOutlined,
    ProfileOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import "../../../../assets/style/app.header.css";
import "../../../../assets/style/global.css";

const items = [
    {
        key: "1",
        label: (
            <a
                href="/profile"
                style={{ display: "flex", alignItems: "center" }}
            >
                <ProfileOutlined style={{ marginRight: "8px" }} />
                Profile
            </a>
        ),
    },
    {
        key: "2",
        label: (
            <a
                href="/settings"
                style={{ display: "flex", alignItems: "center" }}
            >
                <SettingOutlined style={{ marginRight: "8px" }} />
                Settings
            </a>
        ),
    },
    {
        type: "divider",
    },
    {
        key: "3",
        label: (
            <a
                href="/logout"
                style={{ display: "flex", alignItems: "center", color: "red" }}
            >
                <LogoutOutlined style={{ marginRight: "8px" }} />
                Logout
            </a>
        ),
    },
];

const CheckLogin = () => {
    const isAuthentication = false;

    return (
        <>
            {isAuthentication ? (
                <Dropdown
                    menu={{ items }}
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
                    <a href="#!" className="header-action__link">
                        Sign in
                    </a>
                    <a href="#!" className="header-action__sign-up btn">
                        Sign up
                    </a>
                </>
            )}
        </>
    );
};

const AppHeader = () => {
    return (
        <header class="header">
            <div class="container">
                <div class="header-top">
                    <div class="logo">
                        <img src="" alt="logo" class="logo__img" />
                    </div>
                    <nav class="navbar">
                        <ul class="navbar__list">
                            <li class="navbar__item">
                                <a
                                    href="#!"
                                    class="navbar__link navbar__link--active"
                                >
                                    Home
                                </a>
                            </li>
                            <li class="navbar__item">
                                <a href="#!" class="navbar__link">
                                    Cart
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div class="header-action">
                        <div className="shopping-cart">
                            <a href="#!" class="shopping-cart__link">
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
