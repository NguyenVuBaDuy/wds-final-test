import React from "react";
import { Table, Button, Select, InputNumber } from "antd";
import {
    ArrowLeftOutlined,
    SaveOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../../../assets/style/app.history.css";

const { Option } = Select;

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
            },
            quantity: 1,
            color: "Black",
        },
        {
            key: "2",
            product: {
                name: "Shoe Shoe Shoe",
                price: 53.0,
                stockStatus: "In Stock",
                image: "src/assets/img/product-1.png",
            },
            quantity: 2,
            color: "White",
        },
        {
            key: "3",
            product: {
                name: "Shoe Shoe Shoe",
                price: 38.65,
                stockStatus: "In Stock",
                image: "src/assets/img/product-1.png",
            },
            quantity: 1,
            color: "Yellow",
        },
    ];

    const columns = [
        {
            title: "Product",
            dataIndex: "product",
            key: "product",
            render: (product) => (
                <div className="product-cell">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                    />
                    <div>
                        <div className="product-name">{product.name}</div>
                    </div>
                </div>
            ),
            className: "centered-cell",
        },
        {
            title: "Color",
            dataIndex: "color",
            key: "color",
            render: (color, record) => (
                <div className="product-option">
                    <div className="product-price">
                        ${record.product.price.toFixed(2)} |{" "}
                        <span className="in-stock">
                            {record.product.stockStatus}
                        </span>
                    </div>
                    <Select defaultValue={color} className="select-color">
                        <Option value="Black">Black</Option>
                        <Option value="White">White</Option>
                        <Option value="Yellow">Yellow</Option>
                    </Select>
                </div>
            ),
            className: "centered-cell",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            render: (quantity) => (
                <InputNumber min={1} defaultValue={quantity} />
            ),
            className: "centered-cell",
        },
        {
            title: "",
            key: "actions",
            render: () => (
                <div className="action-buttons">
                    <Button
                        type="text"
                        className="action-button save-button"
                        icon={<SaveOutlined />}
                        onClick={() => {
                            window.location.href =
                                "src/assets/img/product-1.png";
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        type="text"
                        className="action-button delete-button"
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            alert("Deleted!");
                        }}
                    >
                        Delete
                    </Button>
                </div>
            ),
            className: "centered-cell",
        },
    ];

    const calculateSubtotal = () =>
        data.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
        <div className="history-container">
            <Table
                dataSource={data}
                columns={columns}
                pagination={false}
                className="product-table"
            />
            <div className="summary-section">
                <div className="summary">
                    <div>Subtotal (items)</div>
                    <div className="buy-again-text">{data.length}</div>
                </div>
                <div className="summary">
                    <div>Price (Total)</div>
                    <div className="buy-again-text">
                        ${calculateSubtotal().toFixed(2)}
                    </div>
                </div>
                <div className="summary">
                    <div>Shipping</div>
                    <div className="buy-again-text">$10.00</div>
                </div>
                <div className="summary total">
                    <div>Estimated Total</div>
                    <div className="buy-again-text">
                        {" "}
                        ${(calculateSubtotal() + 10).toFixed(2)}
                    </div>
                </div>
                <Button type="primary" className="buy-again-button">
                    Buy again
                </Button>
            </div>

            <div className="continue-shopping-container">
                <Button
                    type="primary"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate("/home")}
                    className="continue-shopping-button"
                >
                    Continue Shopping
                </Button>
            </div>
        </div>
    );
};

export default History;
