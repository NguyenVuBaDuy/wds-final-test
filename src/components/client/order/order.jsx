import React, { useState } from "react";
import { Table, Button, Select, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "../../../assets/style/app.order.css";

const { Option } = Select;

const Order = () => {
    const [coupon, setCoupon] = useState("");
    const [products, setProducts] = useState([
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
    ]);

    // Tính tổng tiền hàng
    const totalPrice = products.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const shippingFee = 50000; // Phí ship cố định

    // Xử lý tăng số lượng
    const handleIncrease = (key) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.key === key
                    ? { ...product, quantity: product.quantity + 1 }
                    : product
            )
        );
    };

    // Xử lý giảm số lượng
    const handleDecrease = (key) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.key === key && product.quantity > 1
                    ? { ...product, quantity: product.quantity - 1 }
                    : product
            )
        );
    };

    // Xử lý xóa sản phẩm
    const handleDelete = (key) => {
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product.key !== key)
        );
    };

    // Cột cho bảng sản phẩm
    const columns = [
        {
            title: "",
            dataIndex: "delete",
            key: "delete",
            render: (_, record) => (
                <div
                    className="order__delete-icon"
                    onClick={() => handleDelete(record.key)}
                >
                    <DeleteOutlined />
                </div>
            ),
        },
        {
            title: "Tên giày",
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
            title: "Giá",
            dataIndex: "price",
            key: "price",
            className: "custom-align-center",
            render: (price) => (
                <span className="order__price">{price.toLocaleString()}đ</span>
            ),
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            className: "custom-align-center",
            render: (quantity, record) => (
                <div className="order__quantity">
                    <button
                        className="order__quantity-btn"
                        onClick={() => handleDecrease(record.key)}
                    >
                        -
                    </button>
                    <span>{quantity}</span>
                    <button
                        className="order__quantity-btn"
                        onClick={() => handleIncrease(record.key)}
                    >
                        +
                    </button>
                </div>
            ),
        },
        {
            title: "Tổng tiền",
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
        console.log("Mã giảm giá:", coupon);
        // Thêm logic xử lý mã giảm giá tại đây
    };

    return (
        <div className="order">
            <main className="order__cart">
                <section className="order__items">
                    <Table
                        dataSource={products}
                        columns={columns}
                        pagination={false}
                        bordered
                    />
                    <Button className="order__update">Cập nhật giỏ hàng</Button>
                </section>
                <section className="order__summary">
                    <h2 className="order__summary-title">
                        Tổng tiền thanh toán
                    </h2>
                    <div className="order__summary-item">
                        <span>Tiền hàng</span>
                        <span>{totalPrice.toLocaleString()} đ</span>
                    </div>
                    <div className="order__summary-item">
                        <span>Tiền ship</span>
                        <span>{shippingFee.toLocaleString()} đ</span>
                    </div>
                    <div className="order__summary-item">
                        <span>Địa chỉ</span>
                        <div className="order__address">
                            <Select
                                defaultValue="Việt Nam"
                                className="order__address-item"
                            >
                                <Option value="vietnam">Việt Nam</Option>
                            </Select>
                            <Select
                                defaultValue="Cần Thơ"
                                className="order__address-item"
                            >
                                <Option value="cantho">Cần Thơ</Option>
                            </Select>
                            <Select
                                defaultValue="Ô Môn"
                                className="order__address-item"
                            >
                                <Option value="omon">Ô Môn</Option>
                            </Select>
                            <Input
                                placeholder="Địa chỉ nhà"
                                className="order__address-item"
                            />
                        </div>
                    </div>
                    <div className="order__summary-item">
                        <Input
                            placeholder="Nhập mã giảm giá"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                        />
                        <Button onClick={handleApplyCoupon}>
                            Áp dụng mã giảm giá
                        </Button>
                    </div>
                    <div className="order__summary-total">
                        <span>Tổng tiền</span>
                        <span>
                            {(totalPrice + shippingFee).toLocaleString()} đ
                        </span>
                    </div>
                    <Button className="order__checkout">Thanh toán</Button>
                </section>
            </main>
        </div>
    );
};

export default Order;
