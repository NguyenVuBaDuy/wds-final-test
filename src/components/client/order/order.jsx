import React, { useState } from "react";
import { Table, Button, Select, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../../assets/style/app.order.css";
import "../../../assets/style/global.css";

const { Option } = Select;

const Order = () => {
    const navigate = useNavigate();
    const [coupon, setCoupon] = useState("");
    const products = [
        {
            key: "1",
            name: "Nike Air Zoom Pegasus",
            price: 5000000,
            quantity: 1,
            image: "src/assets/img/product-1.png",
        },
        {
            key: "2",
            name: "Nike Air Zoom Pegasus",
            price: 5000000,
            quantity: 1,
            image: "src/assets/img/product-1.png",
        },
    ];

    const totalPrice = products.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const shippingFee = 50000;

    const columns = [
        {
            title: "",
            dataIndex: "delete",
            key: "delete",
            render: () => (
                <div className="order__delete-icon">
                    <DeleteOutlined />
                </div>
            ),
        },
        {
            title: "Product Name",
            dataIndex: "name",
            key: "name",
            className: "custom-align-center",
            render: (text, record) => (
                <div className="order__item">
                    <img
                        src={record.image}
                        alt={text}
                        className="order__item-image"
                    />
                    <span className="order__item-name">{text}</span>
                </div>
            ),
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            className: "custom-align-center",
            render: (price) => (
                <span className="order__price">{price.toLocaleString()}đ</span>
            ),
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            className: "custom-align-center",
            render: (quantity) => (
                <div className="order__quantity">
                    <button className="order__quantity-btn">-</button>
                    <span>{quantity}</span>
                    <button className="order__quantity-btn">+</button>
                </div>
            ),
        },
        {
            title: "Total Price",
            dataIndex: "price",
            key: "total",
            className: "custom-align-center",
            render: (price, record) => (
                <span className="order__price">
                    {(price * record.quantity).toLocaleString()}đ
                </span>
            ),
        },
    ];

    const handleApplyCoupon = () => {
        console.log("Coupon Code:", coupon);
    };

    const handleCheckout = () => {
        navigate("/");
    };

    return (
        <div className="container">
            <div className="order">
                <main className="order__cart">
                    <section className="order__items">
                        <Table
                            dataSource={products}
                            columns={columns}
                            pagination={false}
                            bordered
                        />
                        <Button className="order__update">Update Cart</Button>
                    </section>
                    <section className="order__summary">
                        <h2 className="order__summary-title">Order Summary</h2>
                        <div className="order__summary-item">
                            <span>Subtotal</span>
                            <span>{totalPrice.toLocaleString()} đ</span>
                        </div>
                        <div className="order__summary-item">
                            <span>Shipping Fee</span>
                            <span>{shippingFee.toLocaleString()} đ</span>
                        </div>
                        <div className="order__summary-item">
                            <span>Address</span>
                            <div className="order__address">
                                <Select
                                    defaultValue="Vietnam"
                                    className="order__address-item"
                                >
                                    <Option value="vietnam">Vietnam</Option>
                                </Select>
                                <Select
                                    defaultValue="Can Tho"
                                    className="order__address-item"
                                >
                                    <Option value="cantho">Can Tho</Option>
                                </Select>
                                <Select
                                    defaultValue="O Mon"
                                    className="order__address-item"
                                >
                                    <Option value="omon">O Mon</Option>
                                </Select>
                                <Input
                                    placeholder="Home Address"
                                    className="order__address-item"
                                />
                            </div>
                        </div>
                        <div className="order__summary-item">
                            <Input
                                placeholder="Enter Coupon Code"
                                value={coupon}
                                onChange={(e) => setCoupon(e.target.value)}
                            />
                            <Button onClick={handleApplyCoupon}>
                                Apply Coupon
                            </Button>
                        </div>
                        <div className="order__summary-total">
                            <span>Total</span>
                            <span>
                                {(totalPrice + shippingFee).toLocaleString()} đ
                            </span>
                        </div>
                        <Button
                            className="order__checkout"
                            onClick={handleCheckout}
                        >
                            Checkout
                        </Button>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Order;
