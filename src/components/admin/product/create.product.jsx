
import { PlusOutlined } from "@ant-design/icons";
import { Col, Divider, Form, Input, InputNumber, message, Modal, notification, Row, Select, Upload } from "antd";
import { useEffect, useState } from "react";

const category = [
    { value: 'Sneaker', label: 'Sneaker' },
    { value: 'Boot', label: 'Boot' },
    { value: 'Leather', label: 'Leather' },
    { value: 'Sandal', label: 'Sandal' }
]


const CreateProduct = (props) => {
    const { setIsOpenModalCreateProduct, isOpenModalCreateProduct, actionRef } = props

    const [form] = Form.useForm()


    const handleCreateProduct = async (values) => {
        //handle data and call api create product
    }



    return (
        <>
            <Modal
                title="Create Product"
                open={isOpenModalCreateProduct}
                onOk={() => { form.submit() }}
                onCancel={() => {
                    setIsOpenModalCreateProduct(false)
                    form.resetFields()

                }}
                centered
                width={"60vw"}
            >
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleCreateProduct}
                    autoComplete="off"
                >
                    <Row style={{ display: "flex", justifyContent: "space-between" }}>
                        <Col style={{ width: "calc(50% - 10px)" }}>
                            <Form.Item
                                name="productName"
                                label="Product Name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter product name"
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col style={{ width: "calc(50% - 10px)" }}>
                            <Form.Item
                                name="brand"
                                label="Brand"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter brand"
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row style={{ display: "flex", justifyContent: "space-between" }}>
                        <Col style={{ width: "calc(100%/3 - 10px)" }}>
                            <Form.Item
                                name="price"
                                label="Price"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter price"
                                    },
                                ]}

                            >
                                <InputNumber
                                    min={0}
                                    addonAfter="VND"
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>

                        <Col style={{ width: "calc(100%/3 - 10px)" }}>
                            <Form.Item
                                name="category"
                                label="Category"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter category"
                                    },
                                ]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Search to Select"
                                    optionFilterProp="label"
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={category}
                                />
                            </Form.Item>
                        </Col>

                        <Col style={{ width: "calc(100%/3 - 10px)" }}>
                            <Form.Item
                                name="quantity"
                                label="Quantity"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter quantity"
                                    },
                                ]}
                            >
                                <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row style={{ display: "flex", justifyContent: "space-between" }}>
                        <Col style={{ width: "50%" }}>
                            <Divider orientation="left">Thumbnail</Divider>

                        </Col>
                        <Col style={{ width: "50%" }}>
                            <Divider orientation="left">Sliders</Divider>

                        </Col>
                    </Row>
                    <Row style={{ display: "flex", justifyContent: "space-between" }}>
                        <Col style={{ width: "calc(50% - 10px)" }}>
                            <Form.Item
                                name="thumbnail"
                            >
                                <Upload
                                    name="thumbnail"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    maxCount={1}
                                    multiple={false}
                                >
                                    <button
                                        style={{
                                            border: 0,
                                            background: 'none',
                                        }}
                                        type="button"
                                    >
                                        <PlusOutlined />
                                        <div
                                            style={{
                                                marginTop: 8,
                                            }}
                                        >
                                            Upload
                                        </div>
                                    </button>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col style={{ width: "calc(50% - 10px)" }}>
                            <Form.Item
                                name="sliders"
                            >
                                <Upload
                                    name="sliders"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    maxCount={1}
                                    multiple={false}
                                >
                                    <button
                                        style={{
                                            border: 0,
                                            background: 'none',
                                        }}
                                        type="button"
                                    >
                                        <PlusOutlined />
                                        <div
                                            style={{
                                                marginTop: 8,
                                            }}
                                        >
                                            Upload
                                        </div>
                                    </button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal >

        </>
    )
}

export default CreateProduct 