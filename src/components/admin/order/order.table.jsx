import { ExportOutlined } from "@ant-design/icons";
import { ProTable } from "@ant-design/pro-components";
import { Button } from "antd";
import { useEffect, useRef, useState } from "react";
import { getAllOrdersAPI } from "../../../services/api.service";
import moment from "moment";
import ViewOrderDetail from "./view.order.detail";
import * as XLSX from "xlsx";


const color = ["#314659", "#979797"];


const OrderTable = () => {

    const actionRef = useRef();
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(null);
    const [isOpenOrderDetail, setIsOpenOrderDetail] = useState(false)
    const [dataOrderDetail, setDataOrderDetail] = useState(null)
    const [dataOrders, setDataOrders] = useState([])


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
            key: "name",
            title: "Customer",
            dataIndex: "user_name",
            valueType: "text",
            align: "left",
            hideInSearch: true,
        },
        {
            key: "phone_number",
            title: "Phone Number",
            dataIndex: "user_phone_number",
            valueType: "text",
            align: "left",
            hideInSearch: true,
        },
        {
            key: "shipping_address",
            title: "Shipping Address",
            dataIndex: "shipping_address",
            hideInSearch: true,
            align: "left",
        },
        {
            key: "createdAt",
            title: "Order Date",
            dataIndex: "createdAt",
            hideInSearch: true,
            align: "left",
            render: (text, record) => (
                <>{moment(record.createdAt).format('YYYY-MM-DD | HH:MM:SS')}</>
            )
        },
        {
            key: "action",
            title: "Action",
            hideInSearch: true,
            render: (_, record) => (
                <Button type="primary" onClick={() => {
                    setIsOpenOrderDetail(true);
                    setDataOrderDetail(record);
                }}>View Detail</Button>
            ),
            align: "left",
        },
    ];


    const handleDataOrders = () => {
        const indexStart = (current - 1) * pageSize;
        const currentDataOrders = dataOrders.slice(
            indexStart,
            indexStart + pageSize
        );
        return currentDataOrders;
    };


    const handleExport = () => {
        if (dataOrders && dataOrders.length > 0) {
            const data = handleDataOrders();
            if (data && data.length) {
                const worksheet = XLSX.utils.json_to_sheet(data);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
                XLSX.writeFile(workbook, "DataOrders.xlsx");
            }
        }
    };

    return (
        <>
            <ProTable
                columns={columns}
                actionRef={actionRef}
                cardBordered
                search={false}
                request={async () => {

                    const res = await getAllOrdersAPI()
                    if (res.data) {
                        setDataOrders(res.data)
                        setTotal(res.data.length)
                    }

                    return {
                        data: res.data.map(order => {
                            return {
                                ...order,
                                user_name: order.user.name,
                                user_phone_number: order.user.phone_number
                            }

                        })
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
                headerTitle="Table Order"
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<ExportOutlined />}
                        onClick={() => {
                            handleExport();
                        }}
                        type="primary"
                    >
                        Export
                    </Button>,
                ]}
            />
            <ViewOrderDetail
                setIsOpenOrderDetail={setIsOpenOrderDetail}
                isOpenOrderDetail={isOpenOrderDetail}
                dataOrderDetail={dataOrderDetail}
                setDataOrderDetail={setDataOrderDetail}
            />
        </>
    )
}

export default OrderTable