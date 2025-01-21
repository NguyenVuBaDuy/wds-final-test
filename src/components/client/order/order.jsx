import React, { useState } from "react";
import { Table, Button, Select, Input, Steps, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../../assets/style/app.order.css";
import "../../../assets/style/global.css";
import RelatedProducts from "../product/related-product";

const { Option } = Select;
const { Step } = Steps;

const Order = () => {
    const navigate = useNavigate();
    const [coupon, setCoupon] = useState("");
    const [current, setCurrent] = useState(0);

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
                <span className="order__price">{price.toLocaleString()}₫</span>
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
                    {(price * record.quantity).toLocaleString()}₫
                </span>
            ),
        },
    ];

    const handleApplyCoupon = () => {
        console.log("Coupon Code:", coupon);
    };

    const handleCheckout = () => {
        message.success("Order placed successfully!");
        navigate("/");
    };

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const stepsContent = [
        <section className="order__items">
            <Table
                dataSource={products}
                columns={columns}
                pagination={false}
                bordered
            />
            <Button className="order__update">Update Cart</Button>
        </section>,
        <section className="order__address">
            <div className="order__address-form">
                <Select
                    style={{ marginBottom: "10px" }}
                    defaultValue="Vietnam"
                    className="order__address-item"
                    dropdownStyle={{ padding: "8px" }}
                >
                    <Option value="vietnam" style={{ margin: "8px 0" }}>
                        Vietnam
                    </Option>
                </Select>
                <Select
                    style={{ marginBottom: "10px" }}
                    defaultValue="Can Tho"
                    className="order__address-item"
                    dropdownStyle={{ padding: "8px" }}
                >
                    <Option value="cantho" style={{ margin: "8px 0" }}>
                        Can Tho
                    </Option>
                </Select>
                <Select
                    style={{ marginBottom: "10px" }}
                    defaultValue="O Mon"
                    className="order__address-item"
                    dropdownStyle={{ padding: "8px" }}
                >
                    <Option value="omon" style={{ margin: "8px 0" }}>
                        O Mon
                    </Option>
                </Select>
                <Input
                    placeholder="Enter Home Address"
                    className="order__address-item"
                />
            </div>
        </section>,
        <section className="order__summary">
            <h2 className="order__summary-title">Order Summary</h2>
            <div className="order__summary-item">
                <span>Subtotal</span>
                <span>{totalPrice.toLocaleString()}₫</span>
            </div>
            <div className="order__summary-item">
                <span>Shipping Fee</span>
                <span>{shippingFee.toLocaleString()}₫</span>
            </div>
            <div className="order__summary-item">
                <Input
                    placeholder="Enter Coupon Code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                />
                <Button onClick={handleApplyCoupon}>Apply Coupon</Button>
            </div>
            <div className="order__summary-total">
                <span>Total</span>
                <span>{(totalPrice + shippingFee).toLocaleString()}₫</span>
            </div>
            <Button className="order__checkout" onClick={handleCheckout}>
                Place Order
            </Button>
        </section>,
    ];

    return (
        <div className="container">
            <div className="order">
                <Steps current={current} style={{ marginBottom: "20px" }}>
                    <Step title="Cart" />
                    <Step title="Shipping Address" />
                    <Step title="Confirmation" />
                </Steps>
                <div className="steps-content">{stepsContent[current]}</div>
                <div style={{ marginTop: "20px" }} className="steps-action">
                    {current > 0 && (
                        <Button style={{ marginRight: 8 }} onClick={prev}>
                            Previous
                        </Button>
                    )}
                    {current < stepsContent.length - 1 ? (
                        <Button className="order__next-btn" onClick={next}>
                            Next
                        </Button>
                    ) : (
                        <Button
                            className="order__next-btn"
                            onClick={handleCheckout}
                        >
                            Confirm Order
                        </Button>
                    )}
                </div>
            </div>
            <RelatedProducts />
        </div>
    );
};

export default Order;
