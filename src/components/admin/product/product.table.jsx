
import { DeleteOutlined, EditOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, notification, Popconfirm } from 'antd';
import { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx'
import './product.css'
import ViewProductDetail from './view.product.detail';
import CreateProduct from './create.product';
import UpdateProduct from './update.product';
import { getAllCategoriesAPI, getAllProductAPI } from '../../../services/api.service';

const color = ['#314659', '#979797']



const ProductTable = () => {

    const actionRef = useRef()
    const [dataProducts, setDataProducts] = useState([])
    const [isOpenProductDetail, setIsOpenProductDetail] = useState(false)
    const [dataProductDetail, setDataProductDetail] = useState(null)
    const [isOpenModalCreateProduct, setIsOpenModalCreateProduct] = useState(false)
    const [isOpenModalUpdateProduct, setIsOpenModalUpdateProduct] = useState(false)
    const [dataUpdateProduct, setDataUpdateProduct] = useState(null)
    const [listCategories, setListCategories] = useState([])

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(null);


    useEffect(() => {
        const getAllCategories = async () => {
            const res = await getAllCategoriesAPI()
            if (res.data) {
                const categories = res.data.map(category => {
                    return category.name
                })
                setListCategories(categories)
            }
        }
        getAllCategories()
    }, [])

    const handleDataProducts = () => {
        const indexStart = (current - 1) * pageSize;
        const currentDataUsers = dataUsers.slice(
            indexStart,
            indexStart + pageSize
        );
        return currentDataUsers;
    };

    const columns = [
        {
            title: "No.",
            key: "no.",
            render: (text, record, index) => [
                <div
                    style={{
                        backgroundColor:
                            index <= pageSize / 2 ? color[0] : color[1],
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        color: "white",
                    }}
                >
                    {pageSize * (current - 1) + (index + 1)}
                </div>,
            ],
            hideInSearch: true,
            editable: false,
        },
        {
            key: "id",
            title: 'Id',
            dataIndex: 'id',
            hideInSearch: true,
            render: (_, record) => (
                <a href="#" onClick={() => {
                    setIsOpenProductDetail(true)
                    setDataProductDetail(record)
                }}>{record.id}</a>
            ),
            align: 'left',
        },
        {
            key: "name",
            title: 'Product Name',
            dataIndex: 'name',
            valueType: 'text',
            align: 'left',
        },
        {
            key: "category",
            title: 'Category',
            dataIndex: 'category_name',
            valueType: 'select',
            valueEnum: listCategories,
            align: 'left',
        },
        {
            key: "code",
            title: 'Brand',
            dataIndex: 'code',
            hideInSearch: true,
            align: 'left',
        },
        {
            key: "price",
            title: "Price",
            dataIndex: "price",
            render: (_, record) => (
                <>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(record.price)}</>
            ),
            hideInSearch: true,
            align: 'left',
        },
        {
            key: "updatedAt",
            title: "Last Updated",
            dataIndex: "updatedAt",
            valueType: "date",
            hideInSearch: true,
            align: 'left',
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
            const data = handleDataProducts()
            if (data && data.length) {
                const worksheet = XLSX.utils.json_to_sheet(dataProducts);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
                XLSX.writeFile(workbook, "DataProducts.xlsx");
            }
        }
    }


    return (

        <>
            <ProTable
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params) => {

                    const res = await getAllProductAPI()
                    if (res.data) {
                        if (res.data) {
                            setDataProducts(res.data);
                            setTotal(res.data.length);
                        }
                    }

                    return {
                        data: res.data.map((product) => {
                            return { ...product, category_name: product.category.name }
                        }),
                    };
                }}
                rowKey="id"
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    total: total,
                    showSizeChanger: true,
                    onChange: (page, pageSize) => {
                        setCurrent(page);
                        setPageSize(pageSize);
                    },
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