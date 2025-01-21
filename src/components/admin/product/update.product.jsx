import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Divider, Form, Input, InputNumber, message, Modal, notification, Row, Select, Upload } from "antd"
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { updateProductAPI, uploadProductImageAPI } from "../../../services/api.service";
import { v4 as uuidv4 } from 'uuid';


const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    })


const UpdateProduct = (props) => {

    const { setDataUpdateProduct, dataUpdateProduct,
        setIsOpenModalUpdateProduct, isOpenModalUpdateProduct,
        actionRef } = props

    const [form] = Form.useForm()
    const [image, setImage] = useState([])
    const [isLoadingImage, setIsLoadingImage] = useState(false)
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewTitle, setPreviewTitle] = useState('')
    const [previewImage, setPreviewImage] = useState('')

    useEffect(() => {
        if (dataUpdateProduct) {
            form.setFieldsValue({
                id: dataUpdateProduct.id,
                name: dataUpdateProduct.name,
                code: dataUpdateProduct.code,
                price: Math.floor(parseFloat(dataUpdateProduct.price)),
                stock_quantity: dataUpdateProduct.stock_quantity,
                id: dataUpdateProduct.id,
                description: dataUpdateProduct.description
            })
            setImage([{
                uid: uuidv4(),
                status: 'done',
                name: dataUpdateProduct.image_url,
                url: `${dataUpdateProduct.image_url}`
            }])
        }
    }, [dataUpdateProduct])

    const handleChangeImage = async (values) => {
        const { file, onSuccess, onError } = values
        const res = await uploadProductImageAPI(file)
        if (res && res.data) {
            setImage([{
                uid: file.uid,
                name: res.data.url,
                status: 'done',
                url: `${res.data.url}`
            }])
            onSuccess("ok")
            setIsLoadingImage(false)
        } else onError('Error')
    }

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const handleUpdateProduct = async (values) => {
        if (image.length === 0) {
            notification.error({
                message: "Where is Thumbnail???",
                description: "Please add thumbnail:)))"
            })
            return
        }

        const image_url = image[0].name

        const { id, name, description, code, stock_quantity, price } = values
        const res = await updateProductAPI(id, image_url, name, description, code, stock_quantity, price)
        if (res.data) {
            message.success("Update Product Successfully")
            actionRef.current?.reload()
            form.resetFields();
            setImage([])
            setIsOpenModalUpdateProduct(false);
        } else {
            notification.error({ message: "Update Book Failed", description: res.message })
        }
    }

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setIsLoadingImage(true)
            return;
        }
    }


    const handlePreview = async (file) => {
        console.log(file)
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    }



    return (
        <>
            <Modal
                title="Update Product"
                open={isOpenModalUpdateProduct}
                onOk={() => { form.submit() }}
                onCancel={() => {
                    setIsOpenModalUpdateProduct(false)
                    setDataUpdateBook(null)
                    form.resetFields()

                }}
                centered
                width={"60vw"}
            >
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleUpdateProduct}
                    autoComplete="off"
                >

                    <Form.Item
                        name="id"
                        hidden
                    >
                    </Form.Item>
                    <Row style={{ display: "flex", justifyContent: "space-between" }}>
                        <Col style={{ width: "calc(50% - 10px)" }}>
                            <Form.Item
                                name="name"
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
                                name="code"
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
                        <Col style={{ width: "calc(50% - 10px)" }}>
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



                        <Col style={{ width: "calc(50% - 10px)" }}>
                            <Form.Item
                                name="stock_quantity"
                                label="Stock Quantity"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter stock quantity"
                                    },
                                ]}
                            >
                                <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Col style={{ width: "100%" }}>
                        <Form.Item
                            name="description"
                            label="Description"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter description"
                                },
                            ]}
                        >
                            <TextArea rows={3} placeholder="A short description of this product" maxLength={6} />
                        </Form.Item>
                    </Col>

                    <Row style={{ display: "flex", justifyContent: "space-between" }}>
                        <Col style={{ width: "50%" }}>
                            <Divider orientation="left">Thumbnail</Divider>

                        </Col>
                    </Row>
                    <Row style={{ display: "flex", justifyContent: "space-between" }}>
                        <Col style={{ width: "calc(50% - 10px)" }}>
                            <Form.Item
                                name="image"
                            >
                                <Upload
                                    name="image"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    fileList={image}
                                    maxCount={1}
                                    multiple={false}
                                    customRequest={handleChangeImage}
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                    onPreview={handlePreview}
                                    onRemove={() => setImage([])}
                                >
                                    <button
                                        style={{
                                            border: 0,
                                            background: 'none',
                                        }}
                                        type="button"
                                    >
                                        {isLoadingImage ? <LoadingOutlined /> : <PlusOutlined />}
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

            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                centered
                onCancel={() => setPreviewOpen(false)}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>

        </>
    )
}

export default UpdateProduct