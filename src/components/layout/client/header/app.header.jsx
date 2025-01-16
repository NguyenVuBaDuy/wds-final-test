import React from "react";
import { Menu, Badge, Avatar } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "../../../../assets/style/app.header.css";
import "../../../../assets/style/global.css";

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
                        <a href="#!" class="header-action__link">
                            Sign in
                        </a>

                        <a href="#!" class="header-action__sign-up btn">
                            Sign up
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
