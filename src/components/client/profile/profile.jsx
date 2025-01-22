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
import { useDispatch, useSelector } from "react-redux";
import { updateUserAPI, uploadProductImageAPI } from "../../../services/api.service";
import { doChangeAvatar, doSetTempAvatarAction, doUpdateUserAction } from "../../../redux/profile/profileSlice";

const { Content } = Layout;
const { Title } = Typography;

const Profile = () => {
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [avatar, setAvatar] = useState(null); // Avatar URL
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector((state) => state.profile.user)
    const tempAvatar = useSelector(state => state.profile.tempAvatar)
    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                name: user.name,
                phone_number: user.phone_number,
                email: user.email,
                id: user.id,
                avatar_url: user.avatar_url
            });
            setAvatar(user.avatar_url); // Set initial avatar
        }
    }, []);

    const handleSave = async ({ id, name, phone_number, avatar_url }) => {
        if (id) {
            const res = await updateUserAPI(id, name, phone_number, avatar_url)
            if (res.data) {
                dispatch(doUpdateUserAction({ name, phone_number }))
                message.success("Change Information Successfully")
                localStorage.removeItem('access_token')
            } else {
                notification.error({
                    message: "Change Information Failed",
                    description: res.message
                })
            }
        }
    }

    const handleUploadAvatar = async (values) => {
        const { file, onSuccess, onError } = values
        const res = await uploadProductImageAPI(file)
        if (res) {
            dispatch(doSetTempAvatarAction(res.data.url))
            onSuccess("ok")
        } else onError("Error")
    }

    const props = {
        name: 'file',
        maxCount: 1,
        multiple: false,
        showUploadList: false,
        onChange(info) {
            if (info.file.status !== 'uploading') {
            }
            if (info.file.status === 'done') {
            } else if (info.file.status === 'error') {
                message.error(`Avatar upload failed.`);
            }
        },
        customRequest: handleUploadAvatar,
    }

    const handleChangeAvatar = async () => {
        if (user.id) {
            const res = await updateUserAPI(user.id, user.name, user.phone_number, tempAvatar)
            if (res.data) {
                dispatch(doChangeAvatar(tempAvatar))
                message.success("Update Avatar Successfully")
                localStorage.removeItem('access_token')
            } else {
                notification.error({
                    message: "Update Avatar Failed",
                    description: res.message
                })
            }
        }
    }

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
                            <Col span={16}>
                                <Form
                                    form={form}
                                    layout="vertical"
                                    style={{ maxWidth: "100%" }}
                                    onFinish={handleSave}
                                >
                                    <Form.Item
                                        name="id"
                                        hidden
                                    >
                                    </Form.Item>
                                    <Form.Item
                                        name="avatar_url"
                                        hidden
                                    >

                                    </Form.Item>

                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Name cannot be left blank!",
                                            },
                                        ]}
                                    >
                                        <Input disabled={!isEditing} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Phone Number"
                                        name="phone_number"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Phone number cannot be left blank!",
                                            },
                                        ]}
                                    >
                                        <Input disabled={!isEditing} />
                                    </Form.Item>
                                    <Form.Item
                                        label="Email"
                                        name="email"

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
                                            onClick={() => { form.submit() }}
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
                                        src={tempAvatar || avatar}
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
                                        <Upload {...props}>
                                            <Button
                                                icon={<EditOutlined />}
                                                type="link"
                                            >
                                                Change Avatar
                                            </Button>
                                        </Upload>

                                    </div>
                                </div>
                                {tempAvatar &&
                                    <Button type="primary" onClick={handleChangeAvatar}>
                                        Save
                                    </Button>}

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
