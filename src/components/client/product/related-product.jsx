import React, { useState } from "react";
import { Card, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const products = [
    {
        id: 1,
        name: "Nike Air Zoom",
        description: "Product 1 description",
        price: "123$",
        image: "src/assets/img/product-1.png",
    },
    {
        id: 2,
        name: "Nike Air Zoom",
        description: "Product 2 description",
        price: "123$",
        image: "src/assets/img/product-1.png",
    },
    {
        id: 3,
        name: "Nike Air Zoom",
        description: "Product 3 description",
        price: "123$",
        image: "src/assets/img/product-1.png",
    },
    {
        id: 4,
        name: "Nike Air Zoom",
        description: "Product 4 description",
        price: "123$",
        image: "src/assets/img/product-1.png",
    },
    {
        id: 5,
        name: "Nike Air Zoom",
        description: "Product 5 description",
        price: "123$",
        image: "src/assets/img/product-1.png",
    },
    {
        id: 1,
        name: "Nike Air Zoom",
        description: "Product 1 description",
        price: "123$",
        image: "src/assets/img/product-1.png",
    },
    {
        id: 2,
        name: "Nike Air Zoom",
        description: "Product 2 description",
        price: "123$",
        image: "src/assets/img/product-1.png",
    },
    {
        id: 3,
        name: "Nike Air Zoom",
        description: "Product 3 description",
        price: "123$",
        image: "src/assets/img/product-1.png",
    },
    {
        id: 4,
        name: "Nike Air Zoom",
        description: "Product 4 description",
        price: "123$",
        image: "src/assets/img/product-1.png",
    },
    {
        id: 5,
        name: "Nike Air Zoom",
        description: "Product 5 description",
        price: "123$",
        image: "src/assets/img/product-1.png",
    },
];

const RelatedProducts = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3;

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            Math.min(
                prevIndex + 1,
                Math.ceil(products.length / itemsPerPage) - 1
            )
        );
    };

    const containerWidth = 900;
    const translateX = -currentIndex * containerWidth;

    return (
        <div
            className="container"
            style={{
                maxWidth: "1200px",
                margin: "20px auto",
            }}
        >
            <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
                Related Products
            </h2>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Button
                    shape="circle"
                    icon={<LeftOutlined />}
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    style={{ margin: "0 10px" }}
                />
                <div
                    style={{
                        overflow: "hidden",
                        width: `${containerWidth}px`,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            transition: "transform 0.5s ease-in-out",
                            transform: `translateX(${translateX}px)`,
                            gap: "16px",
                            width: `${
                                products.length *
                                (containerWidth / itemsPerPage)
                            }px`,
                        }}
                    >
                        {products.map((product, index) => (
                            <Card
                                key={index}
                                hoverable
                                style={{
                                    width: `${containerWidth / itemsPerPage}px`,
                                    flexShrink: 0,
                                    border: "1px solid #ddd",
                                }}
                                cover={
                                    <img
                                        alt={product.name}
                                        src={product.image}
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                            objectFit: "cover",
                                        }}
                                    />
                                }
                            >
                                <h3
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                        margin: "10px 0",
                                    }}
                                >
                                    {product.name}
                                </h3>
                                <p
                                    style={{
                                        fontSize: "14px",
                                        color: "#666",
                                        marginBottom: "10px",
                                    }}
                                >
                                    {product.description}
                                </p>
                                <p
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        color: "#000",
                                    }}
                                >
                                    {product.price}
                                </p>
                                <Button
                                    type="primary"
                                    style={{ marginTop: "10px" }}
                                >
                                    Order Now
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>
                <Button
                    shape="circle"
                    icon={<RightOutlined />}
                    onClick={handleNext}
                    disabled={
                        currentIndex ===
                        Math.ceil(products.length / itemsPerPage) - 1
                    }
                    style={{ margin: "0 10px" }}
                />
            </div>
        </div>
    );
};

export default RelatedProducts;
