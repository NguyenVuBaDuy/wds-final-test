
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Descriptions, Divider, Form, Input, InputNumber, message, Modal, notification, Rate, Row, Select, Space, Upload } from "antd";
import { useEffect, useRef, useState } from "react";
import { createCategoryAPI, createProductAPI, getAllCategoriesAPI, uploadProductImageAPI } from "../../../services/api.service";

const { TextArea } = Input;


const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    })


const options = []
for (let i = 30; i <= 50; i++) {
    options.push({
        label: i,
        value: i,
    });
}

const CreateProduct = (props) => {
    const { setIsOpenModalCreateProduct, isOpenModalCreateProduct, actionRef } = props
    const [image, setImage] = useState([])
    const [isLoadingImage, setIsLoadingImage] = useState(false)

    const [form] = Form.useForm()

    const [items, setItems] = useState(['jack', 'lucy']);
    const [newCategory, setNewCategory] = useState('');
    const inputRef = useRef(null)
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewTitle, setPreviewTitle] = useState('')
    const [previewImage, setPreviewImage] = useState('')


    const [listColors, setListColors] = useState([])
    const [color, setColor] = useState('')
    const colorRef = useRef(null)
    const onColorChange = (event) => {
        setColor(event.target.value)
    }
    const addColor = (e) => {
        e.preventDefault()
        setListColors([...listColors, color || `New item ${index++}`])
        setColor('')
        setTimeout(() => {
            colorRef.current?.focus();
        }, 0)
    }


    const onCategoryChange = (value) => {
        setNewCategory(value);
    };

    useEffect(() => {
        getAllCategories()
    }, [])

    const getAllCategories = async () => {
        const res = await getAllCategoriesAPI()
        if (res.data) {
            const categories = res.data.map(category => {
                return {
                    name: category.name,
                    id: category.id
                }
            })
            setItems(categories)
            setNewCategory('')
        }
    }

    const addNewCategory = async (e) => {
        e.preventDefault()
        const res = await createCategoryAPI(newCategory, "description")
        if (res.data) {
            getAllCategories()
        } else {
            notification.error({
                message: "Create New Category Failed!",
                description: res.message
            })
        }
    };

    const handleCreateProduct = async (values) => {
        console.log(image)
        if (image.length === 0) {
            notification.error({
                message: "Where is a product image???",
                description: "Please add a product image:)))"
            })
            return
        }

        const image_url = image[0].name
        const { name, description, price, sizes, colors, stock, stock_quantity, ratings_number, code, category_id } = values

        const res = await createProductAPI(image_url, name, description, price, sizes, colors,
            stock, stock_quantity, ratings_number, code, category_id)
        console.log(res)
        if (res.data) {
            form.resetFields()
            message.success("Create Product Successfully")
            setImage([])
            setIsOpenModalCreateProduct(false)
            actionRef?.current.reload()
        } else {
            notification.error({ message: "Create Product Failed", description: res.message })
        }
    }


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
                                name="name"
                                label="Product Name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Add name of product"
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
                                        message: "Add brand of product"
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
                                name="category_id"
                                label="Category"
                                rules={[
                                    {
                                        required: true,
                                        message: "Add category of product"
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Search to Select"
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider
                                                style={{
                                                    margin: '8px 0',
                                                }}
                                            />
                                            <Space
                                                style={{
                                                    padding: '0 8px 4px',
                                                }}
                                            >
                                                <Input
                                                    placeholder="???"
                                                    ref={inputRef}
                                                    value={newCategory}
                                                    onChange={(event) => { onCategoryChange(event.target.value) }}
                                                    onKeyDown={(e) => e.stopPropagation()}
                                                />
                                                <Button type="text" icon={<PlusOutlined />} onClick={addNewCategory}>
                                                    Add new category
                                                </Button>
                                            </Space>
                                        </>
                                    )}
                                    options={items.map((item) => ({
                                        label: item.name,
                                        value: item.id,
                                    }))}
                                />
                            </Form.Item>
                        </Col>
                        <Col style={{ width: "calc(100%/3 - 10px)" }}>
                            <Form.Item
                                name="price"
                                label="Price"
                                rules={[
                                    {
                                        required: true,
                                        message: "Add price of product"
                                    },
                                ]}

                            >
                                <InputNumber
                                    min={0}
                                    addonAfter="$"
                                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>

                        <Col style={{ width: "calc(100%/3 - 10px)" }}>
                            <Form.Item
                                name="stock_quantity"
                                label="Stock Quantity"
                                rules={[
                                    {
                                        required: true,
                                        message: "Add stock quantity of product"
                                    },
                                ]}
                            >
                                <InputNumber style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row style={{ display: "flex", justifyContent: "space-between" }}>


                        <Col style={{ width: "calc(50% - 10px)" }}>
                            <Form.Item
                                name="colors"
                                label="Color"
                                rules={[
                                    {
                                        required: true,
                                        message: "Add the colors of the product"
                                    },
                                ]}
                            >
                                <Select
                                    mode="multiple"
                                    placeholder="What are the colors of your product?"
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider
                                                style={{
                                                    margin: '8px 0',
                                                }}
                                            />
                                            <Space
                                                style={{
                                                    padding: '0 8px 4px',
                                                }}
                                            >
                                                <Input
                                                    placeholder="???"
                                                    ref={colorRef}
                                                    value={color}
                                                    onChange={onColorChange}
                                                    onKeyDown={(e) => e.stopPropagation()}
                                                />
                                                <Button type="text" icon={<PlusOutlined />} onClick={addColor}>
                                                    Add color
                                                </Button>
                                            </Space>
                                        </>
                                    )}
                                    options={listColors.map((item) => ({
                                        label: item,
                                        value: item,
                                    }))}
                                />
                            </Form.Item>
                        </Col>

                        <Col style={{ width: "calc(50% - 10px)" }}>
                            <Form.Item
                                name="sizes"
                                label="Sizes"
                                rules={[
                                    {
                                        required: true,
                                        message: "Choose the sizes of the product"
                                    },
                                ]}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="What are the sizes of your product?"
                                    defaultValue={[]}
                                    onChange={handleChange}
                                    options={options}
                                />
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
                            <TextArea rows={3} placeholder="A short description of this product"/>
                        </Form.Item>
                    </Col>

                    <Col style={{ width: "100%" }}>
                        <Form.Item
                            name="ratings_number"
                            label="Rate"
                            rules={[
                                {
                                    required: true,
                                    message: "What is the rating of this product?"
                                },
                            ]}
                        >
                            <Rate />
                        </Form.Item>
                    </Col>



                    <Row style={{ display: "flex", justifyContent: "space-between" }}>
                        <Col style={{ width: "50%" }}>
                            <Divider orientation="left">Product Image</Divider>

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

export default CreateProduct 