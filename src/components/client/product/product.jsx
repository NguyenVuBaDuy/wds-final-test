import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Rate, InputNumber, Avatar, Space, Tabs } from "antd";
import { getProductByIdAPI } from "../../../services/api.service";
import ProductNotification from "./notification";

const { TabPane } = Tabs;

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isNotificationVisible, setNotificationVisible] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await getProductByIdAPI(id);
                setProduct(response.data);
            } catch (err) {
                setError("Failed to load product data.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleAddToCart = () => {
        setNotificationVisible(true);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!product) return <p>Product not found.</p>;

    return (
        <div
            style={{
                padding: "20px",
                maxWidth: "1200px",
                margin: "0 auto",
            }}
        >
            <div className="breadcrumb" style={{ marginBottom: "20px" }}>
                <a href="/">Home</a> &raquo; {product.name}
            </div>

            <div style={{ display: "flex", gap: "20px" }}>
                <img
                    src={product.image_url}
                    alt={product.name}
                    style={{
                        width: "400px",
                        height: "400px",
                        objectFit: "cover",
                        borderRadius: "5px",
                    }}
                />

                <div style={{ flex: 1 }}>
                    <h1
                        style={{
                            fontSize: "28px",
                            fontWeight: "600",
                            marginBottom: "10px",
                        }}
                    >
                        {product.name}
                    </h1>
                    <p
                        style={{
                            color: "#ff4d4f",
                            fontSize: "22px",
                            fontWeight: "500",
                            marginBottom: "10px",
                        }}
                    >
                        ${product.price}
                    </p>
                    <p
                        style={{
                            fontSize: "16px",
                            color: "#888",
                            marginBottom: "20px",
                        }}
                    >
                        Brand: {product.code || "N/A"}
                    </p>
                    <Rate
                        disabled
                        value={product.ratings_number}
                        style={{ marginBottom: "15px" }}
                    />
                    <p style={{ marginTop: "15px", fontSize: "16px" }}>
                        {product.description}
                    </p>

                    <div style={{ marginTop: "20px" }}>
                        <div>
                            <strong>Colors:</strong>
                            <div
                                style={{
                                    marginTop: "10px",
                                    display: "flex",
                                    gap: "15px",
                                }}
                            >
                                {product.colors.map((color) => (
                                    <div
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        style={{
                                            width: "35px",
                                            height: "35px",
                                            borderRadius: "50%",
                                            backgroundColor: color,
                                            border:
                                                selectedColor === color
                                                    ? "2px solid black"
                                                    : "1px solid #ccc",
                                            cursor: "pointer",
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginTop: "20px" }}>
                            <strong>Sizes:</strong>
                            <div
                                style={{
                                    marginTop: "10px",
                                    display: "flex",
                                    gap: "10px",
                                }}
                            >
                                {product.sizes.map((size) => (
                                    <Button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        type={
                                            selectedSize === size
                                                ? "primary"
                                                : "default"
                                        }
                                        style={{
                                            padding: "8px 16px",
                                            fontSize: "16px",
                                        }}
                                    >
                                        {size}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginTop: "20px" }}>
                            <strong>Quantity:</strong>
                            <InputNumber
                                min={1}
                                max={product.stock_quantity}
                                value={quantity}
                                onChange={(value) => setQuantity(value)}
                                style={{
                                    marginLeft: "10px",
                                    width: "100px",
                                    fontSize: "16px",
                                }}
                            />
                        </div>
                    </div>

                    <Button
                        type="primary"
                        style={{
                            marginTop: "20px",
                            width: "100%",
                            padding: "12px",
                            fontSize: "18px",
                        }}
                        onClick={handleAddToCart}
                        disabled={!selectedSize || !selectedColor}
                    >
                        Add to Cart
                    </Button>
                    <ProductNotification
                        isVisible={isNotificationVisible}
                        onClose={() => setNotificationVisible(false)}
                    />
                </div>
            </div>

            <div style={{ marginTop: "40px" }}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Product Introduction" key="1">
                        <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
                            {product.description}
                        </p>
                    </TabPane>
                    <TabPane tab="Reviews" key="2">
                        <p>Coming soon...</p>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
};

export default Product;
