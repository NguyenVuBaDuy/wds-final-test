
import { DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, notification, Popconfirm } from 'antd';
import { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx'
import './product.css'
import ViewProductDetail from './view.product.detail';
import CreateProduct from './create.product';
import UpdateProduct from './update.product';

const color = ['#314659', '#979797']
const category = ['Sneaker', 'Boot', 'Leather', 'Sandal']

const fakeDataProduct = [
    {
        _id: "a1f5e6d2-9b3c-4d8f-a2e1-1c2b3d4e5f6g",
        productName: "Air Max 270",
        category: "Sneaker",
        brand: "Nike",
        price: 150,
        quantity: 100,
        sold: 10,
        updatedAt: "2025-01-16",
        createdAt: "2025-01-16",
    },
    {
        _id: "b2g6f7e3-0c4d-5e9g-b3f2-2d3c4e5f6g7h",
        productName: "UltraBoost 22",
        category: "Sneaker",
        brand: "Adidas",
        price: 180,
        quantity: 100,
        sold: 10,
        updatedAt: "2025-01-15",
        createdAt: "2025-01-15",
    },
    {
        _id: "c3h7g8f4-1d5e-6f0h-c4g3-3e4d5f6g7h8i",
        productName: "Timberland 6-Inch",
        category: "Boot",
        brand: "Timberland",
        price: 200,
        quantity: 100,
        sold: 10,
        updatedAt: "2025-01-14",
        createdAt: "2025-01-14",
    },
    {
        _id: "d4i8h9g5-2e6f-7g1i-d5h4-4f5g6h7i8j9k",
        productName: "Dr. Martens 1460",
        category: "Boot",
        brand: "Dr. Martens",
        price: 190,
        quantity: 100,
        sold: 10,
        updatedAt: "2025-01-13",
        createdAt: "2025-01-13",
    },
    {
        _id: "e5j9i0h6-3f7g-8h2j-e6i5-5g6h7i8j9k0l",
        productName: "Oxford Classic",
        category: "Leather",
        brand: "Clarks",
        price: 120,
        quantity: 100,
        sold: 10,
        updatedAt: "2025-01-12",
        createdAt: "2025-01-12",
    },
    {
        _id: "f6k0j1i7-4g8h-9i3k-f7j6-6h7i8j9k0l1m",
        productName: "Derby Premium",
        category: "Leather",
        brand: "Gucci",
        price: 550,
        quantity: 100,
        sold: 10,
        updatedAt: "2025-01-11",
        createdAt: "2025-01-11",
    },
    {
        _id: "g7l1k2j8-5h9i-0j4l-g8k7-7i8j9k0l1m2n",
        productName: "Yeezy Slide",
        category: "Sandal",
        brand: "Adidas",
        price: 70,
        quantity: 100,
        sold: 10,
        updatedAt: "2025-01-10",
        createdAt: "2025-01-10",
    },
    {
        _id: "h8m2l3k9-6i0j-1k5m-h9l8-8j9k0l1m2n3o",
        productName: "Birkenstock Arizona",
        category: "Sandal",
        brand: "Birkenstock",
        price: 100,
        quantity: 100,
        sold: 10,
        updatedAt: "2025-01-09",
        createdAt: "2025-01-09",
    }
];


const ProductTable = () => {

    const actionRef = useRef()
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    })
    const [dataProducts, setDataProducts] = useState(fakeDataProduct)
    const [isOpenProductDetail, setIsOpenProductDetail] = useState(false)
    const [dataProductDetail, setDataProductDetail] = useState(null)
    const [isOpenModalCreateProduct, setIsOpenModalCreateProduct] = useState(false)
    const [isOpenModalUpdateProduct, setIsOpenModalUpdateProduct] = useState(false)
    const [dataUpdateProduct, setDataUpdateProduct] = useState(null)

    const columns = [
        {
            title: "No.",
            key: "no.",
            render: (text, record, index, action) => [
                <div style={{
                    backgroundColor: index <= meta.pageSize / 2 ? color[0] : color[1],
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: '22px',
                    height: "22px",
                    borderRadius: "50%",
                    color: "white",
                }}
                >{(meta.pageSize * (meta.current - 1)) + (index + 1)}</div>
            ],
            hideInSearch: true,
            width: "20px"
        },
        {
            key: "id",
            title: 'Id',
            dataIndex: '_id',
            hideInSearch: true,
            render: (_, record) => (
                <a href="#" onClick={() => {
                    setIsOpenProductDetail(true)
                    setDataProductDetail(record)
                }}>{record._id}</a>
            ),
        },
        {
            key: "productName",
            title: 'Product Name',
            dataIndex: 'productName',
            valueType: 'text',
        },
        {
            key: "category",
            title: 'Category',
            dataIndex: 'category',
            valueType: 'select',
            valueEnum: category
        },
        {
            key: "brand",
            title: 'Brand',
            dataIndex: 'brand',
        },
        {
            key: "price",
            title: "Price",
            dataIndex: "price",
            render: (_, record) => (
                <>{record.price}</>
            ),
            hideInSearch: true,
        },
        {
            key: "updatedAt",
            title: "Last Updated",
            dataIndex: "updatedAt",
            valueType: "date",
            hideInSearch: true,
        },
        {
            key: "action",
            title: 'Action',
            render: (text, record, _, action) => {
                return (
                    <div style={{
                        display: "flex",
                        gap: "15px"
                    }}>
                        <EditOutlined
                            style={{ cursor: 'pointer', color: "orange" }}
                            onClick={() => {
                                setIsOpenModalUpdateProduct(true)
                                setDataUpdateProduct(record)
                            }}
                        />
                        <Popconfirm
                            title="Delete the product"
                            description="Are you sure to delete this product?"
                            onConfirm={() => { handleDeleteProduct() }}
                            onCancel={() => { }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <DeleteOutlined style={{ cursor: 'pointer', color: "red" }} />
                        </Popconfirm>
                    </div>
                )
            },
            hideInSearch: true
        },
    ];

    const handleDeleteProduct = async (_id) => {
        //call api delete product
    }

    const handleExport = () => {
        if (dataProducts && dataProducts.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(dataProducts);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "DataProducts.xlsx");
        }
    }


    return (

        <>
            <ProTable
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params) => {

                    //handle query and call api

                    return {
                        data: fakeDataProduct,
                        page: 1,
                        success: true,
                        total: 8
                    }
                }}
                rowKey="_id"
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    total: meta.total,
                    showSizeChanger: true
                }}
                headerTitle="Table Product"
                toolBarRender={() => [

                    <Button
                        key="button"
                        icon={<ExportOutlined />}
                        onClick={() => {
                            handleExport()
                        }}
                        type="primary"
                    >
                        Export
                    </Button>,
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setIsOpenModalCreateProduct(true)
                        }}
                        type="primary"
                    >
                        Add new
                    </Button>,
                ]}
            />
            <ViewProductDetail
                dataProductDetail={dataProductDetail}
                setDataProductDetail={setDataProductDetail}
                isOpenProductDetail={isOpenProductDetail}
                setIsOpenProductDetail={setIsOpenProductDetail}
            />
            <CreateProduct
                isOpenModalCreateProduct={isOpenModalCreateProduct}
                setIsOpenModalCreateProduct={setIsOpenModalCreateProduct}
                actionRef={actionRef} />
            <UpdateProduct
                actionRef={actionRef}
                setDataUpdateProduct={setDataUpdateProduct}
                dataUpdateProduct={dataUpdateProduct}
                setIsOpenModalUpdateProduct={setIsOpenModalUpdateProduct}
                isOpenModalUpdateProduct={isOpenModalUpdateProduct}
            />
        </>
    )
}

export default ProductTable