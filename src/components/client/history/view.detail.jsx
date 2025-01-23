import { Col, Descriptions, Divider, Drawer, Row } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";

const ViewDetail = ({ setDataOrderDetail, setIsOpenViewOrderDetail, isOpenViewOrderDetail, dataOrderDetail }) => {

    const user = useSelector(state => state.profile.user)

    return (
        <Drawer
            title="Product Detail"
            onClose={() => {
                setDataOrderDetail(null);
                setIsOpenViewOrderDetail(false);
            }}
            open={isOpenViewOrderDetail}
            width="50vw"
        >
            {dataOrderDetail ? (
                <>
                    <Divider orientation="left">Order Detail</Divider>
                    <Descriptions bordered>
                        <Descriptions.Item label="Order Id" span={2}>
                            {dataOrderDetail.id}
                        </Descriptions.Item>
                        <Descriptions.Item label="Order Date" span={2}>
                            {moment(dataOrderDetail.createdAt).format('YYYY-MM-DD HH:MM:SS')}
                        </Descriptions.Item>
                        <Descriptions.Item label="Customer" span={2}>
                            {user.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phone Number" span={2}>
                            {user.phone_number}
                        </Descriptions.Item>
                        <Descriptions.Item label="Shipping Address" span={3}>
                            {dataOrderDetail.shipping_address}
                        </Descriptions.Item>
                        <Descriptions.Item label="Order Detail" span={3}>
                            <>
                                {dataOrderDetail.orderDetails.map((order, index) => {
                                    return (
                                        <>
                                            <div style={{ display: "flex", width: "100%" }}>
                                                <div style={{ width: "50%" }}>{index + 1}. {order.product.name} / {order.color.toUpperCase()}, {order.size}</div>
                                                <div style={{ width: "20%" }}>${order.unit_price}</div>
                                                <div style={{ width: "20%" }}>x {order.quantity}</div>
                                                <div style={{ width: "10%", display: "flex", justifyContent: "flex-end" }}>${order.total_price}</div>
                                            </div>
                                            <Divider style={{ margin: "10px 0" }} />

                                        </>
                                    )
                                })}
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>Total:</div>
                                    <div>${dataOrderDetail.total_price}</div>
                                </div>
                            </>
                        </Descriptions.Item>
                        <Descriptions.Item label="Shipping Fee" span={3}>
                            ${dataOrderDetail.shipping_fee}
                        </Descriptions.Item>
                        <Descriptions.Item label="Total Price" span={3}>
                            ${parseFloat(dataOrderDetail.total_price) + parseFloat(dataOrderDetail.shipping_fee)}.00
                        </Descriptions.Item>
                    </Descriptions>
                </>
            ) : (
                <div>No data</div>
            )}
        </Drawer>
    )
}

export default ViewDetail