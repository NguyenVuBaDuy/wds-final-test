import { ArrowRightOutlined } from "@ant-design/icons"
import { Button, Result } from "antd"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const StepSuccess = () => {
    const navigate = useNavigate()

    return (
        <Result
            status="success"
            title="Successfully Orders"
            subTitle="Thank you <3"
            extra={[
                <Button type="primary" key="console" onClick={() => { navigate('/') }}>
                    Continue Shopping <ArrowRightOutlined />
                </Button>,
            ]}
        />
    )
}

export default StepSuccess