import React, { useState } from "react";
import { Card, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const products = [
    {
        id: 1,
        name: "Nike Air Zoom",
        description: "Product 1 description",
        price: "123$",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 2,
        name: "Nike Air Zoom",
        description: "Product 2 description",
        price: "123$",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 3,
        name: "Nike Air Zoom",
        description: "Product 3 description",
        price: "123$",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 4,
        name: "Nike Air Zoom",
        description: "Product 4 description",
        price: "123$",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 5,
        name: "Nike Air Zoom",
        description: "Product 5 description",
        price: "123$",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 1,
        name: "Nike Air Zoom",
        description: "Product 1 description",
        price: "123$",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 2,
        name: "Nike Air Zoom",
        description: "Product 2 description",
        price: "123$",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 3,
        name: "Nike Air Zoom",
        description: "Product 3 description",
        price: "123$",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 4,
        name: "Nike Air Zoom",
        description: "Product 4 description",
        price: "123$",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 5,
        name: "Nike Air Zoom",
        description: "Product 5 description",
        price: "123$",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 1,
        name: "Nike Air Zoom",
        description: "Product 1 description",
        price: "123$",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 2,
        name: "Nike Air Zoom",
        description: "Product 2 description",
        price: "123$",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 3,
        name: "Nike Air Zoom",
        description: "Product 3 description",
        price: "123$",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 4,
        name: "Nike Air Zoom",
        description: "Product 4 description",
        price: "123$",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 5,
        name: "Nike Air Zoom",
        description: "Product 5 description",
        price: "123$",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 1,
        name: "Nike Air Zoom",
        description: "Product 1 description",
        price: "123$",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 2,
        name: "Nike Air Zoom",
        description: "Product 2 description",
        price: "123$",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 3,
        name: "Nike Air Zoom",
        description: "Product 3 description",
        price: "123$",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 4,
        name: "Nike Air Zoom",
        description: "Product 4 description",
        price: "123$",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 5,
        name: "Nike Air Zoom",
        description: "Product 5 description",
        price: "123$",
        image: "https://via.placeholder.com/300x200",
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
            Math.min(prevIndex + 1, products.length - itemsPerPage)
        );
    };

    return (
        <div
            className="container"
            style={{
                padding: "20px",
                maxWidth: "1200px",
                margin: "0 auto",
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
                        width: "100%",
                        maxWidth: "900px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            transform: `translateX(-${currentIndex * 100}%)`,
                            transition: "transform 0.5s ease-in-out",
                            gap: "16px",
                        }}
                    >
                        {products.map((product) => (
                            <Card
                                key={product.id}
                                hoverable
                                style={{
                                    flex: "1 0 calc(33.33% - 16px)",
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
                    disabled={currentIndex >= products.length - itemsPerPage}
                    style={{ margin: "0 10px" }}
                />
            </div>
        </div>
    );
};

export default RelatedProducts;
