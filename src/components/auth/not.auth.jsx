import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";



const NotAuth = (props) => {

    const isAuthenticated = useSelector((state) => state.profile.isAuthenticated)
    const navigate = useNavigate()

    return (
        <>
            {isAuthenticated === true
                ?
                <>{props.children}</>
                :
                <Result
                    status="403"
                    title="401"
                    subTitle="Sorry, you need log in to access this page."
                    extra={<Button type="primary" onClick={() => { navigate('/') }}><ArrowLeftOutlined />Go Back Home</Button>}
                />
            }
        </>
    )
}

export default NotAuth