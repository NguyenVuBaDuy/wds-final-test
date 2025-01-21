import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Layout,
    Card,
    Avatar,
    Input,
    Button,
    Form,
    Row,
    Col,
    Typography,
    Upload,
    message,
} from "antd";
import {
    UserOutlined,
    EditOutlined,
    MessageOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Content } = Layout;
const { Title } = Typography;

const Profile = () => {
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [avatar, setAvatar] = useState(null); // Avatar URL
    const navigate = useNavigate();

    const user = useSelector((state) => state.profile.user);
    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                name: user.name,
                phone: user.phone_number,
                email: user.email,
            });
            setAvatar(user.avatar_url); // Set initial avatar
        }
    }, []);

    return (
        <div className="container">
            <Layout>
                <Content
                    style={{
                        padding: "40px",
                    }}
                >
                    <Card
                        bordered={false}
                        style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
                    >
                        <Row gutter={32}>
                            {/* Left Column: User Information Form */}
                            <Col span={16}>
                                <Form
                                    form={form}
                                    layout="vertical"
                                    style={{ maxWidth: "100%" }}
                                >
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your name!",
                                            },
                                        ]}
                                    >
                                        <Input disabled={!isEditing} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Phone Number"
                                        name="phone"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your phone number!",
                                            },
                                        ]}
                                    >
                                        <Input disabled={!isEditing} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Email"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                type: "email",
                                                message:
                                                    "Please input a valid email!",
                                            },
                                        ]}
                                    >
                                        <Input disabled={!isEditing} />
                                    </Form.Item>
                                </Form>
                                {isEditing ? (
                                    <Row
                                        justify="start"
                                        style={{ marginTop: "20px" }}
                                    >
                                        <Button
                                            type="primary"
                                            onClick={handleSave}
                                            style={{
                                                marginRight: "10px",
                                                width: "100px",
                                            }}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            onClick={() => setIsEditing(false)}
                                            style={{ width: "100px" }}
                                        >
                                            Cancel
                                        </Button>
                                    </Row>
                                ) : (
                                    <Row
                                        justify="start"
                                        style={{ marginTop: "20px" }}
                                    >
                                        <Button
                                            type="primary"
                                            onClick={() => setIsEditing(true)}
                                            style={{ width: "200px" }}
                                        >
                                            Edit Information
                                        </Button>
                                    </Row>
                                )}
                            </Col>

                            <Col
                                span={8}
                                style={{
                                    textAlign: "center",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <div style={{ marginBottom: "20px" }}>
                                    <Avatar
                                        size={120}
                                        src={avatar}
                                        style={{
                                            backgroundColor: "#87d068",
                                            marginBottom: "10px",
                                        }}
                                    />
                                    <div>
                                        <Title
                                            level={4}
                                            style={{ marginBottom: 0 }}
                                        >
                                            {user?.name || "User Name"}
                                        </Title>
                                        <Upload >
                                            <Button
                                                icon={<EditOutlined />}
                                                type="link"
                                            >
                                                Change Avatar
                                            </Button>
                                        </Upload>
                                    </div>
                                </div>
                                <Button
                                    type="link"
                                    style={{
                                        color: "#1890ff",
                                        marginTop: "20px",
                                    }}
                                    onClick={() => navigate("/history")}
                                >
                                    <MessageOutlined
                                        style={{ marginRight: "8px" }}
                                    />
                                    View Order History
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Content>
            </Layout>
        </div>
    );
};

export default Profile;
