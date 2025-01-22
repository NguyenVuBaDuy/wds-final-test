import { Button, Input, Table } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { doUpdateQuantityAction } from "../../../redux/order/orderSlice";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";

const StepCart = ({ totalPrice, items }) => {

    const cart = useSelector(state => state.order.cart)
    const dispatch = useDispatch()
    const columns = [
        {
            title: "",
            dataIndex: "delete",
            key: "delete",
            render: () => (
                <div className="order__delete-icon">
                    <DeleteOutlined />
                </div>
            ),
        },
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
                <span className="order__price">${record.detail.price.toLocaleString()}</span>
            ),
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            className: "custom-align-center",
            render: (text, record) => (
                <div className="order__quantity">
                    <button className="order__quantity-btn" onClick={() => { handleUpdateQuantity(record, 'minus') }}><MinusOutlined /></button>
                    <span>{record.quantity}</span>
                    <button className="order__quantity-btn" onClick={() => { handleUpdateQuantity(record, 'plus') }}><PlusOutlined /></button>
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

    const handleUpdateQuantity = (item, type) => {
        if (type === 'plus') {
            if (item.quantity + 1 <= +item.detail.stock_quantity) {
                dispatch(doUpdateQuantityAction({ id: item._id, quantity: item.quantity + 1, color: item.color, size: item.size, detail: item.detail }))
            }
        } else if (type === 'minus') {
            if (item.quantity - 1 >= 1) {
                dispatch(doUpdateQuantityAction({ id: item._id, quantity: item.quantity - 1, color: item.color, size: item.size, detail: item.detail }))
            }
        }
    }

    return (
        <section className="order__items">
            <Table
                dataSource={cart}
                columns={columns}
                pagination={false}
                bordered
            />

            <section className="order__summary" style={{ marginTop: "30px" }}>
                <h2 className="order__summary-title">Order Summary</h2>
                <div className="order__summary-item">
                    <span>Items</span>
                    <span>{items}</span>
                </div>
                <div className="order__summary-total">
                    <span>Total</span>
                    <span>${totalPrice.toLocaleString()}.00</span>
                </div>
            </section>

            <Button className="order__update">Update Cart</Button>

        </section>
    )
}

export default StepCart