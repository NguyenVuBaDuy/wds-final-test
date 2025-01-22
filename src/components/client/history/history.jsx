import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { getOrdersAPI } from "../../../services/api.service";

const History = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [totalAllOrders, setTotalAllOrders] = useState(0);
    const [totalShippingFee, setTotalShippingFee] = useState(0);

    const formatDateTime = (dateString) => {
        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: "Asia/Ho_Chi_Minh",
        };
        return new Intl.DateTimeFormat("vi-VN", options).format(new Date(dateString));
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrdersAPI();
                const ordersData = response.data;
                console.log(ordersData);

                const totalOrderPrice = ordersData.reduce(
                    (acc, order) => acc + parseFloat(order.total_price || 0),
                    0
                );

                const totalShipping = ordersData.reduce(
                    (acc, order) => acc + parseFloat(order.shipping_fee || 0),
                    0
                );

                setOrders(ordersData);
                setTotalAllOrders(totalOrderPrice);
                setTotalShippingFee(totalShipping);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
            {/* Danh sách sản phẩm */}
            <div
                style={{
                    width: "70%",
                    maxHeight: "500px",
                    overflowY: "auto",
                    marginRight: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "10px",
                    backgroundColor: "#fff",
                }}
            >
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div
                            key={order.id}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                borderBottom: "1px solid #ddd",
                                padding: "15px 0",
                            }}
                        >
                            <div style={{ marginBottom: "10px", color: "#555" }}>
                                <strong>Payment Date:</strong> {formatDateTime(order.payment.payment_date)}
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginTop: "10px",
                                }}
                            >
                                <strong style={{ fontSize: "18px", color: "#333" }}>
                                    ${parseFloat(order.total_price || 0).toFixed(2)}
                                </strong>
                                <Button
                                    type="primary"
                                    style={{
                                        backgroundColor: "#6f42c1",
                                        borderColor: "#6f42c1",
                                        color: "#fff",
                                    }}
                                    onClick={() => navigate(`/orders/${order.id}`)}
                                >
                                    Buy again
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No orders available.</p>
                )}
            </div>

            {/* Tổng kết đơn hàng */}
            <div
                style={{
                    width: "30%",
                    padding: "20px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                }}
            >
                <h2 style={{ marginBottom: "20px", fontSize: "18px" }}>Order Summary</h2>
                <p
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "16px",
                        margin: "10px 0",
                    }}
                >
                    <span>Subtotal (items):</span>
                    <span>{orders.length}</span>
                </p>
                <p
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "16px",
                        margin: "10px 0",
                    }}
                >
                    <span>Price (Total):</span>
                    <span>${totalAllOrders.toFixed(2)}</span>
                </p>
                <p
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "16px",
                        margin: "10px 0",
                    }}
                >
                    <span>Shipping Fee:</span>
                    <span>${totalShippingFee.toFixed(2)}</span>
                </p>
                <hr style={{ margin: "20px 0" }} />
                <p
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontWeight: "bold",
                        fontSize: "16px",
                    }}
                >
                    <span>Total:</span>
                    <span>${(totalAllOrders + totalShippingFee).toFixed(2)}</span>
                </p>
                <Button
                    type="default"
                    style={{
                        marginTop: "20px",
                        width: "100%",
                        backgroundColor: "#6f42c1",
                        color: "#fff",
                        borderColor: "#6f42c1",
                    }}
                    onClick={() => navigate("/")}
                >
                    Continue Shopping
                </Button>
            </div>
        </div>
    );
};

export default History;
