import { Form, Input, message, Modal, notification } from "antd";
import { createUserAPI } from "../../../services/api.service";

const CreateUser = (props) => {
    const { isOpenModalCreateUser, setIsOpenModalCreateUser, actionRef } =
        props;

    const [form] = Form.useForm();

    const handleCreateUser = async (values) => {
        const { name, email, phone_number, password } = values;
        const res = await createUserAPI(name, email, phone_number, password);
        if (res.data) {
            message.success("Create User Successfully");
            setIsOpenModalCreateUser(false);
            form.resetFields();
            actionRef.current?.reload();
        } else {
            notification.error({
                message: "Create User Failed!",
                description: res.message,
            });
        }
    };

    return (
        <Modal
            title="Create User"
            open={isOpenModalCreateUser}
            onOk={() => {
                form.submit();
            }}
            onCancel={() => {
                setIsOpenModalCreateUser(false);
                form.resetFields();
            }}
            centered
        >
            <Form
                layout="vertical"
                form={form}
                onFinish={handleCreateUser}
                autoComplete="off"
            >
                <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your full name",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your full name",
                        },
                        { type: "email", message: "Invalid email" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your password",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="phone_number"
                    label="Phone number"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your phone number",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateUser;
