import React from "react";
import { Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";

const ProductNotification = ({ isVisible, onClose }) => {
    const navigate = useNavigate();
    return (
        <Modal
            open={isVisible}
            footer={null}
            onCancel={onClose}
            centered
            closable={false}
            style={{
                textAlign: "center",
                padding: "20px",
            }}
        >
            <div style={{ marginBottom: "20px" }}>
                <div
                    style={{
                        width: "50px",
                        height: "50px",
                        margin: "0 auto",
                        backgroundColor: "#52c41a",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <span
                        style={{
                            fontSize: "24px",
                            color: "#fff",
                        }}
                    >
                        ✓
                    </span>
                </div>
                <p style={{ fontSize: "16px", margin: "20px 0" }}>
                    Đơn hàng đã được thêm vào giỏ!
                </p>
            </div>
            <Button
                type="primary"
                style={{
                    width: "100%",
                    height: "40px",
                    fontWeight: "bold",
                }}
                onClick={() => {
                    onClose();
                    navigate("/order");
                }}
            >
                Đi đến thanh toán
            </Button>
        </Modal>
    );
};

export default ProductNotification;
