import { Button, Col, Divider, Form, Input, Row } from "antd"
import background from './assets/images/background.png'
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()
    return (
        <div className="register-container">
            <div className="register-form">
                <div className="form-container">
                    <div className="title">
                        <h1>Get Started Now</h1>
                    </div>

                    <div className="form">
                        <Form
                            layout="vertical"
                            form={form}
                            onFinish={() => { }}
                            autoComplete="off"
                        >

                            <Form.Item
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter full name!"
                                    },
                                ]}
                            >
                                <div className="label" style={{ marginBottom: "5px", fontSize: '15px', fontWeight: "600" }}>
                                    Full Name
                                </div>
                                <Input
                                    placeholder="Enter your full name"
                                    className="input" />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter email!"
                                    },
                                    {
                                        type: 'email',
                                        message: "Email is incorrect format!"
                                    }
                                ]}
                            >
                                <div className="label" style={{ marginBottom: "5px", fontSize: '15px', fontWeight: "600" }}>
                                    Email
                                </div>
                                <Input
                                    placeholder="Enter your email"
                                    className="input" />
                            </Form.Item>

                            <Form.Item
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter phone number!"
                                    },
                                ]}
                            >
                                <div className="label" style={{ marginBottom: "5px", fontSize: '15px', fontWeight: "600" }}>
                                    Phone Number
                                </div>
                                <Input
                                    placeholder="Enter your phone number"
                                    className="input" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter password!"
                                    },
                                ]}
                            >
                                <div className="label" style={{ marginBottom: "5px", fontSize: '15px', fontWeight: "600" }}>
                                    Password
                                </div>
                                <Input.Password
                                    placeholder="Enter your password"
                                    className="input" />
                            </Form.Item>


                            <Form.Item
                            >
                                <Button
                                    className="custom-button button-register"
                                    style={{
                                        backgroundColor: "#F0EBD6",
                                        color: "black", fontWeight: "600",
                                        fontSize: "14px", height: '39.63px',
                                        width: "100%", marginTop: "10px"
                                    }}>Sign Up</Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <Divider>Or</Divider>
                    <div className="form-footer">
                        <Button
                            className="button-google"
                            style={{
                                borderColor: "#F0EBD6",
                                color: "black", fontWeight: "600",
                                fontSize: "14px", height: '39.63px',
                                width: "100%",
                            }}>
                            <FcGoogle style={{ fontSize: "14px" }} />
                            Sign in with Google
                        </Button>
                        <div style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
                            Do you have an account? <span
                                style={{
                                    cursor: "pointer",
                                    color: '#0F3DDE'
                                }}
                                onClick={() => { navigate('/login') }}
                            >Login here</span>
                        </div>
                    </div>


                </div>
            </div>
            <div className="background">
                <img src={background} alt="background" />
            </div>

        </div >
    )
}

export default Register