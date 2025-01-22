import { Button, Input, message, notification, Table } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrderAPI } from "../../../services/api.service";
import { doClearCartAction } from "../../../redux/order/orderSlice";

const StepConfirmation = ({ totalPrice, next, shippingAddress, shippingFee }) => {

    const [coupon, setCoupon] = useState("")
    const cart = useSelector(state => state.order.cart)
    const user_id = useSelector(state => state.profile.user.id)
    const dispatch = useDispatch()

    const handleApplyCoupon = () => {
        console.log("Coupon Code:", coupon)
    };

    const handleCheckout = async () => {
        const shipping_address = shippingAddress
        const shipping_fee = shippingFee
        const code = coupon
        const orderDetails = cart.map(item => {
            return {
                quantity: item.quantity,
                size: item.size,
                color: item.color,
                product_id: item.detail.id
            }
        })
        const res = await createOrderAPI(totalPrice, shipping_address, shipping_fee, user_id, code, orderDetails)
        if (res.data) {
            message.success("Order Successfully")
            dispatch(doClearCartAction())
            next()
        } else {
            notification.error({
                message: "Order Failed",
                description: res.message
            })
        }

    }

    const columns = [
        {
            title: "Product",
            dataIndex: "name",
            key: "name",
            className: "custom-align-center",
            render: (text, record) => (
                <div className="order__item">
                    <img
                        src={record?.detail?.image_url}
                        alt={text}
                        className="order__item-image"
                    />
                    <span className="order__item-name">{record?.detail?.name}</span>
                </div>
            ),
        },
        {
            title: "Color",
            dataIndex: "color",
            key: "color",
            className: "custom-align-center",
            render: (text, record) => (
                <div className="custom-color" style={{
                    width: "100%", height: "100%", display: "flex", justifyContent: "center",
                }}>
                    <div style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: record.color,
                    }}></div>
                </div>
            ),
        },
        {
            title: "Size",
            dataIndex: "size",
            key: "size",
            className: "custom-align-center",
            render: (text, record) => (
                <div className="custom-size" style={{
                    width: "100%", height: "100%",
                    display: "flex", justifyContent: "center",
                    fontSize: "18px",
                    fontWeight: "500"
                }}>
                    {record.size}
                </div>
            ),
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            className: "custom-align-center",
            render: (text, record) => (
                <span className="order__price">${record.detail.price.toLocaleString()}.00</span>
            ),
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            className: "custom-align-center",
            render: (text, record) => (
                <div className="order__quantity">
                    <span>{record.quantity}</span>
                </div>
            ),
        },
        {
            title: "Total Price",
            dataIndex: "price",
            key: "total",
            className: "custom-align-center",
            render: (text, record) => (
                <span className="order__price">
                    ${(record.detail.price * record.quantity).toLocaleString()}.00
                </span>
            ),
        },
    ];


    return (
        <>
            <section className="order__summary" style={{ marginBottom: "30px" }}>
                <h2 className="order__summary-title">Order Summary</h2>
                <div className="order__summary-item">
                    <span>Subtotal</span>
                    <span>${totalPrice.toLocaleString()}.00</span>
                </div>
                <div className="order__summary-item">
                    <span>Shipping Fee</span>
                    <span>${shippingFee.toLocaleString()}</span>
                </div>
                <div className="order__summary-item">
                    <Input
                        placeholder="Enter Coupon Code"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                    />
                    <Button onClick={handleApplyCoupon}>Apply Coupon</Button>
                </div>
                <div className="order__summary-total">
                    <span>Total</span>
                    <span>{(totalPrice + shippingFee).toLocaleString()}₫</span>
                </div>
                <Button className="order__checkout" onClick={handleCheckout}>
                    Place Order
                </Button>
            </section>

            <Table
                dataSource={cart}
                columns={columns}
                pagination={false}
                bordered
            />
        </>

    )
}

export default StepConfirmation