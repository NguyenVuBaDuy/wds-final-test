import React from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate và useLocation
import { Button, Typography, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Title, Text, Link } = Typography;

const ErrorPage = () => {
    const navigate = useNavigate(); // Khởi tạo navigate
    const location = useLocation(); // Lấy thông tin đường dẫn hiện tại

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                backgroundColor: "#1e1e1e",
                color: "#fff",
                textAlign: "left",
                paddingBottom: "80px",
            }}
        >
            <Space direction="vertical" size="large">
                <ExclamationCircleOutlined
                    style={{ fontSize: "48px", color: "#fff" }}
                />

                <Title level={2} style={{ color: "#fff", margin: 0 }}>
                    Error notification
                </Title>

                <Text style={{ color: "rgba(255, 255, 255, 0.75)" }}>
                    Check if there is a typo in{" "}
                    <Text code>{location.pathname}</Text>.
                </Text>
                <Text style={{ color: "rgba(255, 255, 255, 0.75)" }}>
                    If spelling is correct, try running{" "}
                    <Link
                        style={{ color: "#1890ff" }}
                        href="https://support.microsoft.com/"
                        target="_blank"
                    >
                        Windows Network Diagnostics
                    </Link>
                    .
                </Text>

                <Button
                    style={{ borderRadius: "99px", marginTop: "20px" }}
                    type="primary"
                    size="large"
                    onClick={() => navigate("/")} // Điều hướng về trang chủ
                >
                    Back to homepage
                </Button>
            </Space>
        </div>
    );
};

export default ErrorPage;
