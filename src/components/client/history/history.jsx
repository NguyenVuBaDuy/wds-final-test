import React, { useEffect, useState } from "react";
import { Button, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { getOrdersAPI } from "../../../services/api.service";
import moment from "moment";
import ViewDetail from "./view.detail";
import { useSelector } from "react-redux";

const History = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [totalAllOrders, setTotalAllOrders] = useState(0);
    const [totalShippingFee, setTotalShippingFee] = useState(0);

    const [dataOrderDetail, setDataOrderDetail] = useState(null);
    const [isOpenViewOrderDetail, setIsOpenViewOrderDetail] = useState(false);
    const user_id = useSelector(state => state.profile.user.id)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getOrdersAPI(user_id);
                const ordersData = response.data;

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
        <>
            <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
                {/* Danh sách đơn hàng */}
                <div
                    style={{
                        width: "70%",
                        marginRight: "20px",
                        padding: "10px",
                        backgroundColor: "#fff",
                        maxHeight: "400px",
                        overflowY: "auto",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                    }}
                >
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <div
                                key={order.id}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    border: "1px solid #ddd",
                                    borderRadius: "3px",
                                    padding: "15px",
                                    marginBottom: "25px",
                                    backgroundColor: "#F9F9F9",
                                }}
                            >
                                <div
                                    style={{
                                        marginBottom: "10px",
                                        color: "#998382",
                                        fontSize: "18px",
                                    }}
                                >
                                    Order{" "}
                                    <strong
                                        style={{
                                            color: "blue",
                                            fontSize: "22px",
                                        }}
                                    >
                                        {order.id}
                                    </strong>{" "}
                                    day{" "}
                                    <strong
                                        style={{
                                            color: "blue",
                                            fontSize: "22px",
                                        }}
                                    >
                                        {moment(order.createdAt).format(
                                            "YYYY-MM-DD"
                                        )}
                                    </strong>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginTop: "10px",
                                    }}
                                >
                                    <strong
                                        style={{
                                            fontSize: "18px",
                                            color: "#333",
                                        }}
                                    >
                                        $
                                        {parseFloat(
                                            order.total_price || 0
                                        ).toFixed(2)}
                                    </strong>
                                    <Button
                                        type="primary"
                                        style={{
                                            backgroundColor: "#6f42c1",
                                            borderColor: "#6f42c1",
                                            color: "#fff",
                                        }}
                                        onClick={() => {
                                            setDataOrderDetail(order);
                                            setIsOpenViewOrderDetail(true);
                                        }}
                                    >
                                        View detail
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
                    <h2 style={{ marginBottom: "20px", fontSize: "18px" }}>
                        Order Summary
                    </h2>
                    <p
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "16px",
                            margin: "10px 0",
                        }}
                    >
                        <span>Total Orders:</span>
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
                        <span>
                            ${(totalAllOrders + totalShippingFee).toFixed(2)}
                        </span>
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
            <ViewDetail
                setIsOpenViewOrderDetail={setIsOpenViewOrderDetail}
                isOpenViewOrderDetail={isOpenViewOrderDetail}
                dataOrderDetail={dataOrderDetail}
                setDataOrderDetail={setDataOrderDetail}
            />
        </>
    );
};

export default History;
