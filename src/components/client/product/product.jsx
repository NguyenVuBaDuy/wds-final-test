import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Rate, Tabs, Select, InputNumber, Avatar } from "antd";

const { TabPane } = Tabs;

const ProductPage = () => {
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    return (
        <div
            style={{
                padding: "20px",
                maxWidth: "1200px",
                margin: "0 auto",
            }}
        >
            <div
                className="breadcrumb"
                style={{
                    marginBottom: "20px",
                    color: "#888",
                    fontSize: "14px",
                }}
            >
                <Link to="/" style={{ textDecoration: "none", color: "#888" }}>
                    Home
                </Link>{" "}
                &raquo; Vans UA Old Skool
            </div>
            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "flex-start",
                }}
            >
                <div>
                    <img
                        src="src\assets\img\product-1.png"
                        alt="Product Image"
                        style={{
                            width: "100%",
                            borderRadius: "5px",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                        }}
                    />
                </div>

                <div style={{ flex: "1.5", padding: "0 20px" }}>
                    <h1
                        style={{
                            fontSize: "28px",
                            fontWeight: "bold",
                            marginBottom: "10px",
                        }}
                    >
                        Vans UA Old Skool
                    </h1>
                    <p
                        style={{
                            fontSize: "22px",
                            fontWeight: "bold",
                            color: "#ff4d4f",
                            marginBottom: "10px",
                        }}
                    >
                        20 $
                    </p>
                    <p style={{ marginBottom: "5px" }}>
                        Brand: <strong>Vans</strong>
                    </p>
                    <p style={{ marginBottom: "15px" }}>
                        Product Code: <strong>111</strong>
                    </p>
                    <Rate
                        disabled
                        defaultValue={5}
                        style={{ marginBottom: "10px" }}
                    />{" "}
                    <span>(1 customer review)</span>
                    <p style={{ lineHeight: "1.6", margin: "15px 0" }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eos tenetur quas reprehenderit eaque accusamus ipsum
                        delectus inventore esse cum ratione, laborum, amet illum
                        harum magnam. Dolor incidunt illo cupiditate quod!
                    </p>
                    <div style={{ marginBottom: "20px" }}>
                        <div style={{ marginBottom: "15px" }}>
                            <span style={{ fontWeight: "bold" }}>Color:</span>
                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    marginTop: "5px",
                                }}
                            >
                                <div
                                    className="color-box"
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "50%",
                                        backgroundColor: "#ddd",
                                        cursor: "pointer",
                                        border: "1px solid #ccc",
                                    }}
                                ></div>
                                <div
                                    className="color-box"
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "50%",
                                        backgroundColor: "#444",
                                        cursor: "pointer",
                                        border: "1px solid #ccc",
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div style={{ marginBottom: "15px" }}>
                            <span style={{ fontWeight: "bold" }}>Size:</span>
                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    marginTop: "5px",
                                }}
                            >
                                {[39, 40, 41].map((size) => (
                                    <Button
                                        key={size}
                                        type={
                                            selectedSize === size
                                                ? "primary"
                                                : "default"
                                        }
                                        onClick={() => setSelectedSize(size)}
                                        style={{
                                            width: "50px",
                                            textAlign: "center",
                                        }}
                                    >
                                        {size}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div
                            style={{
                                marginBottom: "20px",
                                display: "flex",
                                alignItems: "center",
                                gap: "15px",
                            }}
                        >
                            <span style={{ fontWeight: "bold" }}>
                                Quantity:
                            </span>
                            <InputNumber
                                min={1}
                                max={10}
                                value={quantity}
                                onChange={(value) => setQuantity(value)}
                                style={{ width: "80px" }}
                            />
                        </div>
                    </div>
                    <Button
                        type="primary"
                        style={{
                            width: "100%",
                            height: "50px",
                            fontSize: "16px",
                            fontWeight: "bold",
                        }}
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>

            {/* Tabs Section */}
            <div style={{ marginTop: "40px" }}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Giới thiệu sản phẩm" key="1">
                        <p style={{ lineHeight: "1.6" }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Aenean commodo ligula eget dolor. Aenean
                            massa. Cum sociis natoque penatibus et magnis dis
                            parturient montes.
                        </p>
                    </TabPane>
                    <TabPane tab="Reviews (1)" key="2">
                        <div
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "15px",
                                marginBottom: "20px",
                            }}
                        >
                            <Avatar
                                src="https://via.placeholder.com/40"
                                alt="User Avatar"
                                size={40}
                            />
                            <div>
                                <Rate disabled defaultValue={4} />
                                <p
                                    style={{
                                        fontWeight: "bold",
                                        margin: "5px 0",
                                    }}
                                >
                                    Customer Review:
                                </p>
                                <p style={{ lineHeight: "1.6" }}>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipiscing.
                                </p>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default ProductPage;
