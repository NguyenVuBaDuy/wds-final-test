import React, { useEffect, useState } from "react";
import { Table, Button, Select, Input, Steps, message, Form } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../../assets/style/app.order.css";
import "../../../assets/style/global.css";
import RelatedProducts from "../product/related-product";
import { useDispatch, useSelector } from "react-redux";
import { doUpdateQuantityAction } from "../../../redux/order/orderSlice";
import StepCart from "./step.cart";
import StepShippingAddress from "./step.shipping.address";
import StepConfirmation from "./step.confirmation,";
import StepSuccess from "./step.success";

const { Step } = Steps;

const Order = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [items, setItems] = useState(0)
    const dispatch = useDispatch()
    const cart = useSelector(state => state.order.cart)
    const [form] = Form.useForm()
    const [homeAddress, setHomeAddress] = useState('')

    useEffect(() => {

        const total = cart.reduce((acc, cur) => {
            acc += cur.quantity * cur.detail.price
            return acc
        }, 0)

        const items = cart.reduce((acc, cur) => {
            acc += cur.quantity
            return acc
        }, 0)

        setTotalPrice(total)
        setItems(items)

    }, [cart])

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };


    const stepsContent = [

        <StepCart totalPrice={totalPrice} items={items} />,

        <StepShippingAddress form={form} next={next} setHomeAddress={setHomeAddress} />,

        <StepConfirmation totalPrice={totalPrice} next={next} />,

        <StepSuccess />
    ];

    return (
        <div className="container">
            <div className="order">
                <Steps current={current} style={{ marginBottom: "20px" }}>
                    <Step title="Cart" />
                    <Step title="Shipping Address" />
                    <Step title="Confirmation" />
                    <Step title="Success" />
                </Steps>
                <div className="steps-content">{stepsContent[current]}</div>
                <div style={{ marginTop: "20px" }} className="steps-action">

                    {current === 0 &&

                        <>
                            <Button className="order__next-btn" onClick={next}>
                                Next
                            </Button>
                        </>}

                    {current === 1 &&

                        <>
                            <Button style={{ marginRight: 8 }} onClick={prev}>
                                Previous
                            </Button>
                            <Button className="order__next-btn" onClick={() => {
                                form.submit()
                            }}>
                                Next
                            </Button>
                        </>}

                    {current === 2 &&

                        <>
                            <Button style={{ marginRight: 8 }} onClick={prev}>
                                Previous
                            </Button>
                        </>}
                    {current === 3 &&

                        <>

                        </>}
                </div>
            </div>
            <RelatedProducts />
        </div>
    );
};

export default Order;
