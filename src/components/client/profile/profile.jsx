import React, { useState } from "react";
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
    Space,
} from "antd";
import { UserOutlined, EditOutlined, MessageOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

const Profile = () => {
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();

    const initialValues = {
        name: "User Name",
        phone: "0123456789",
        email: "user@example.com",
        gender: "Male",
        birthDate: "1990-01-01",
        accountCreated: "2020-01-01",
    };

    const handleSave = () => {
        form.validateFields()
            .then((values) => {
                console.log("Saved values:", values);
                setIsEditing(false);
            })
            .catch((info) => {
                console.log("Validation failed:", info);
            });
    };

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
                                    initialValues={initialValues}
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
                                        label="Phone"
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
                                    <Form.Item label="Gender" name="gender">
                                        <Input disabled={!isEditing} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Date of Birth"
                                        name="birthDate"
                                    >
                                        <Input disabled={!isEditing} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Account Created"
                                        name="accountCreated"
                                    >
                                        <Input disabled={true} />
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

                            {/* Right Column: Avatar and Order History */}
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
                                        icon={<UserOutlined />}
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
                                            User Name
                                        </Title>
                                        <Button
                                            icon={<EditOutlined />}
                                            type="link"
                                        >
                                            Change Avatar
                                        </Button>
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
