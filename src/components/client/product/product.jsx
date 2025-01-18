import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Rate, Tabs, InputNumber, Avatar, Space } from "antd";
import RelatedProducts from "./related-product";
import ProductNotification from "./notification";

const { TabPane } = Tabs;

const Product = () => {
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [reviews, setReviews] = useState([
        { id: 1, rating: 5, content: "Great product!", user: "John Doe" },
        {
            id: 2,
            rating: 4,
            content: "Very good, but could be better.",
            user: "Jane Smith",
        },
        { id: 3, rating: 3, content: "Average quality.", user: "Alice Brown" },
        { id: 4, rating: 3, content: "Not bad.", user: "Charlie Green" },
        { id: 5, rating: 4, content: "Liked it!", user: "Dave Blue" },
        { id: 6, rating: 2, content: "Could be better.", user: "Emma White" },
    ]);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [filterRating, setFilterRating] = useState(null);
    const maxVisibleReviews = 3;

    const limitedReviews = showAllReviews
        ? reviews
        : reviews.slice(0, maxVisibleReviews);

    const [isNotificationVisible, setNotificationVisible] = useState(false);

    const handleAddToCart = () => {
        setNotificationVisible(true);
    };

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
                        src="src/assets/img/product-1.png"
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
                        $20
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
                                {["#ddd", "#444"].map((color) => (
                                    <div
                                        key={color}
                                        className="color-box"
                                        onClick={() => setSelectedColor(color)}
                                        style={{
                                            width: "30px",
                                            height: "30px",
                                            borderRadius: "50%",
                                            backgroundColor: color,
                                            cursor: "pointer",
                                            border:
                                                selectedColor === color
                                                    ? "2px solid #000"
                                                    : "1px solid #ccc",
                                        }}
                                    ></div>
                                ))}
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
                        onClick={handleAddToCart}
                        disabled={!selectedColor || !selectedSize}
                    >
                        Add to Cart
                    </Button>
                    {/* Thông báo */}
                    <ProductNotification
                        isVisible={isNotificationVisible}
                        onClose={() => setNotificationVisible(false)}
                    />
                </div>
            </div>

            <div style={{ marginTop: "40px" }}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Product introdution" key="1">
                        <p style={{ lineHeight: "1.6" }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Aenean commodo ligula eget dolor. Aenean
                            massa. Cum sociis natoque penatibus et magnis dis
                            parturient montes.
                        </p>
                    </TabPane>
                    <TabPane
                        tab={`Reviews (${reviews.length})`}
                        key="2"
                    >
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <Rate
                                allowHalf
                                onChange={(value) => setFilterRating(value)}
                                value={filterRating}
                                style={{ marginBottom: "20px" }}
                            />
                            {limitedReviews.map((review) => (
                                <div
                                    key={review.id}
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: "15px",
                                        marginBottom: "20px",
                                    }}
                                >
                                    <Avatar
                                        src={`https://via.placeholder.com/40?text=${review.user[0]}`}
                                        alt="User Avatar"
                                        size={40}
                                    />
                                    <div>
                                        <Rate
                                            disabled
                                            defaultValue={review.rating}
                                        />
                                        <p
                                            style={{
                                                fontWeight: "bold",
                                                margin: "5px 0",
                                            }}
                                        >
                                            {review.user}:
                                        </p>
                                        <p style={{ lineHeight: "1.6" }}>
                                            {review.content}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {reviews.length > maxVisibleReviews && (
                                <Button
                                    type="link"
                                    onClick={() =>
                                        setShowAllReviews(!showAllReviews)
                                    }
                                    style={{
                                        display: "block",
                                        margin: "0 auto",
                                    }}
                                >
                                    {showAllReviews ? "View Less" : "View More"}
                                </Button>
                            )}
                        </Space>
                    </TabPane>
                </Tabs>
            </div>

            <RelatedProducts />
        </div>
    );
};

export default Product;
