import { Button, Input, message, Table } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";

const StepConfirmation = ({ totalPrice, next }) => {

    const [coupon, setCoupon] = useState("")
    const cart = useSelector(state => state.order.cart)

    const handleApplyCoupon = () => {
        // console.log("Coupon Code:", coupon)
    };

    const handleCheckout = async () => {
        next()
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

    const shippingFee = 5

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