import { Card, Col, Row, Statistic } from "antd"
import { useEffect, useState } from "react"
import { getAllOrdersAPI, getAllProductAPI, getUsersAPI } from "../../../services/api.service"
import CountUp from 'react-countup';

const Dashboard = () => {
    const [countUsers, setCountUsers] = useState(0)
    const [countOrders, setCountOrders] = useState(0)
    const [countProducts, setCountProducts] = useState(0)

    useEffect(() => {
        loadDashboard()
    }, [])

    const loadDashboard = async () => {
        const resOrder = await getAllOrdersAPI()
        const resUser = await getUsersAPI()
        const resProduct = await getAllProductAPI()

        if (resOrder.data) {
            setCountOrders(resOrder.data.length)
        }
        if (resProduct.data) {
            setCountProducts(resProduct.data.length)
        }
        if (resUser.data) {
            setCountUsers(resUser.data.length)
        }

    }

    const formatter = (value) => <CountUp end={value} separator="," />;


    return (
        <Row gutter={[20, 20]}>
            <Col md={8} sm={24}>
                <Card>
                    <Statistic title="Total Users" value={countUsers} formatter={formatter} />
                </Card>
            </Col>
            <Col md={8} sm={24}>
                <Card>
                    <Statistic title="Total Products" value={countProducts} formatter={formatter} />
                </Card>
            </Col>
            <Col md={8} sm={24}>
                <Card>
                    <Statistic title="Total Orders" value={countOrders} formatter={formatter} />
                </Card>
            </Col>
        </Row>
    )
}

export default Dashboard