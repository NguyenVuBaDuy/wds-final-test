import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom";



const ProtectedRoute = (props) => {

    const isAdminRoute = window.location.pathname.startsWith('/admin')
    const role = useSelector((state) => state.profile.user.role)
    const isAuthenticated = useSelector(state => state.profile.isAuthenticated)
    const navigate = useNavigate()

    if (!isAuthenticated && !isAdminRoute) {
        return (
            < Navigate to={'/login'} replace />
        )
    } else
        return (
            <>
                {(isAdminRoute === true && role === "admin")
                    || (!isAdminRoute && (role === 'user' || role === 'admin'))
                    ?
                    <>{props.children}</>
                    :
                    <Result
                        status="403"
                        title="403"
                        subTitle="Sorry, you are not authorized to access this page."
                        extra={<Button type="primary" onClick={() => { navigate('/') }}><ArrowLeftOutlined />Go Back Home</Button>}
                    />
                }
            </>
        )

}

export default ProtectedRoute