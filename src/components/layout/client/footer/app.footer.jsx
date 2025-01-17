import React from "react";
import {
    FacebookOutlined,
    TwitterOutlined,
    LinkedinOutlined,
    InstagramOutlined,
} from "@ant-design/icons"; // Import các icon
import "../../../../assets/style/app.footer.css";
import "../../../../assets/style/global.css";

const AppFooter = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__logo-section">
                    <div className="logo">
                        LOGO
                        <img src="" alt="Logo" className="logo__img" />
                    </div>
                    <p className="footer__description">SHOP DESCRIPTION</p>
                    <div className="footer__social-links">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer__social-link"
                        >
                            <FacebookOutlined
                                style={{ fontSize: "20px", color: "#4267B2" }}
                            />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer__social-link"
                        >
                            <LinkedinOutlined
                                style={{ fontSize: "20px", color: "#0077B5" }}
                            />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer__social-link"
                        >
                            <TwitterOutlined
                                style={{ fontSize: "20px", color: "#1DA1F2" }}
                            />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer__social-link"
                        >
                            <InstagramOutlined
                                style={{ fontSize: "20px", color: "#E4405F" }}
                            />
                        </a>
                    </div>
                </div>
                <div className="footer__links-section">
                    <ul className="footer__links-column">
                        <li key="home">
                            <a href="#" className="footer__link">
                                Home
                            </a>
                        </li>
                        <li key="brand">
                            <a href="#" className="footer__link">
                                Brand
                            </a>
                        </li>
                        <li key="shop">
                            <a href="#" className="footer__link">
                                Shop
                            </a>
                        </li>
                        <li key="about">
                            <a href="#" className="footer__link">
                                About
                            </a>
                        </li>
                        <li key="community">
                            <a href="#" className="footer__link">
                                Community
                            </a>
                        </li>
                        <li key="review">
                            <a href="#" className="footer__link">
                                Review
                            </a>
                        </li>
                        <li key="faq">
                            <a href="#" className="footer__link">
                                FAQ
                            </a>
                        </li>
                    </ul>
                    <ul className="footer__links-column">
                        <li key="returns">
                            <a href="#" className="footer__link">
                                Returns and Refunds
                            </a>
                        </li>
                        <li key="contact">
                            <a href="#" className="footer__link">
                                Contact us
                            </a>
                        </li>
                        <li key="privacy">
                            <a href="#" className="footer__link">
                                Privacy Policy
                            </a>
                        </li>
                        <li key="terms">
                            <a href="#" className="footer__link">
                                Terms & Conditions
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="footer__subscribe-section">
                    <p className="footer__subscribe-title">Get new coupons?</p>
                    <form
                        className="footer__subscribe-form"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="email"
                            className="footer__input"
                            placeholder="Email address"
                        />
                        <button type="submit" className="footer__button">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
            <div className="footer__bottom">
                <p className="footer__copyright">
                    Copyright © 2022 UIHUT all rights reserved.
                </p>
                <div className="footer__bottom-links">
                    <a href="#" className="footer__link">
                        Privacy Policy
                    </a>
                    <a href="#" className="footer__link">
                        Terms & Conditions
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default AppFooter;
