import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import "../../../assets/style/app.history.css";
import "../../../assets/style/global.css";
import RelatedProducts from "../product/related-product";

const History = () => {
    const navigate = useNavigate();
    const data = [
        {
            key: "1",
            product: {
                name: "Shoe Shoe Shoe",
                price: 47.0,
                stockStatus: "In Stock",
                image: "src/assets/img/product-1.png",
                rating: 4.6,
                reviews: 2200,
            },
            quantity: 2,
            color: "White",
        },
        {
            key: "2",
            product: {
                name: "Shoe Shoe Shoe",
                price: 47.0,
                stockStatus: "In Stock",
                image: "src/assets/img/product-1.png",
                rating: 4.6,
                reviews: 2200,
            },
            quantity: 2,
            color: "White",
        },
        {
            key: "3",
            product: {
                name: "Shoe Shoe Shoe",
                price: 47.0,
                stockStatus: "In Stock",
                image: "src/assets/img/product-1.png",
                rating: 4.6,
                reviews: 2200,
            },
            quantity: 2,
            color: "White",
        },
    ];

    const calculateSubtotal = () =>
        data.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
        <div className="container">
            <div className="containers">
                <div className="history-container">
                    <div className="product-list">
                        {data.map((item) => (
                            <div className="product-item" key={item.key}>
                                <img
                                    src={item.product.image}
                                    alt={item.product.name}
                                    className="product-image"
                                />
                                <div className="product-details">
                                    <h3 className="product-name">
                                        {item.product.name}
                                    </h3>
                                    <div className="product-info">
                                        <span className="product-price">
                                            ${item.product.price.toFixed(2)}
                                        </span>
                                        <span className="in-stock">
                                            {item.product.stockStatus}
                                        </span>
                                        <div className="product-options">
                                            <span>Color: {item.color}</span>
                                            <span>
                                                Quantity: {item.quantity}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="product-rating">
                                        <span>★</span>
                                        <span>{item.product.rating}</span> (
                                        {item.product.reviews})
                                    </div>
                                </div>
                                <Button
                                    type="primary"
                                    className="buy-again-button"
                                >
                                    Buy again
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="summary-section">
                        <div className="summary">
                            <div>Subtotal (items)</div>
                            <div className="summary-value">{data.length}</div>
                        </div>
                        <div className="summary">
                            <div>Price (Total)</div>
                            <div className="summary-value">
                                ${calculateSubtotal().toFixed(2)}
                            </div>
                        </div>
                        <div className="summary">
                            <div>Shipping</div>
                            <div className="summary-value">$10.00</div>
                        </div>
                        <div className="summary total">
                            <div>Total</div>
                            <div className="summary-value">
                                ${(calculateSubtotal() + 10).toFixed(2)}
                            </div>
                        </div>
                        <Button
                            type="default"
                            className="continue-shopping-button"
                            onClick={() => navigate("/")}
                        >
                            Continue Shopping
                        </Button>
                    </div>
                </div>
            </div>
            <RelatedProducts />
        </div>
    );
};

export default History;
