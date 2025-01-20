import { CloseOutlined, DeleteOutlined, EditOutlined, ExportOutlined, ImportOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, notification, Popconfirm } from 'antd';
import { useEffect, useRef, useState } from 'react';
import * as XLSX from 'xlsx'
import CreateUser from './create.user';
import ViewUserDetail from './view.user.detail';
import ImportUsers from './data/import.users';
import { getUsersAPI } from '../../../services/api.service';

const color = ['#314659', '#979797']

const UserTable = () => {
    const actionRef = useRef()
    const [dataUsers, setDataUsers] = useState([])
    const [editableKeys, setEditableKeys] = useState([])
    const [isOpenModalCreateUser, setIsOpenModalCreateUser] = useState(false)
    const [isOpenUserDetail, setIsOpenUserDetail] = useState(false)
    const [dataUserDetail, setDataUserDetail] = useState(null)
    const [isOpenModalImportUsers, setIsOpenModalImportUsers] = useState(false)

    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(null)

    useEffect(() => {
        const getUsers = async () => {
            const res = await getUsersAPI()
            if (res.data) {
                setDataUsers(res.data)
                setTotal(res.data.length)
            }
        }
        getUsers()
    }, [])

    const handleDataUsers = () => {
        const indexStart = (current - 1) * pageSize
        const currentDataUsers = dataUsers.slice(indexStart, indexStart + pageSize)
        return currentDataUsers
    }

    const columns = [
        {
            title: "No.",
            key: "no.",
            render: (text, record, index, action) => [
                <div style={{
                    backgroundColor: index <= pageSize / 2 ? color[0] : color[1],
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: '22px',
                    height: "22px",
                    borderRadius: "50%",
                    color: "white"
                }}
                >{(pageSize * (current - 1)) + (index + 1)}</div>
            ],
            hideInSearch: true,
            editable: false
        },

        {
            key: "id",
            title: 'Id',
            dataIndex: 'id',
            render: (text, record, _, action) => [
                <a href='#' onClick={() => {
                    setDataUserDetail(record)
                    setIsOpenUserDetail(true)
                }}>{record.id}</a>
            ],
            hideInSearch: true,
            editable: false
        },
        {
            key: "name",
            title: 'Name',
            dataIndex: 'name',
        },
        {
            key: "phone_number",
            title: 'Phone Number',
            dataIndex: 'phone_number',
            hideInSearch: true,
        },
        {
            key: "email",
            title: 'Email',
            dataIndex: 'email',
            copyable: true,
            editable: false
        },
        {
            key: "createdAt",
            title: 'Created At',
            dataIndex: 'createdAt',
            valueType: 'date',
            hideInSearch: true,
            sorter: true,
            editable: false
        },
        {
            key: "action",
            title: 'Action',
            render: (text, record, _, action) => {
                const isEdit = record.id === editableKeys[0]
                return (
                    <>
                        {isEdit ?
                            <div style={{ display: "flex", gap: "15px" }}>
                                <SaveOutlined
                                    style={{ cursor: 'pointer', color: "blue" }}
                                    onClick={async () => { handleSave() }}
                                />
                                <CloseOutlined
                                    style={{ cursor: 'pointer', color: "red" }}
                                    onClick={() => { setEditableKeys([]) }}
                                />
                            </div>
                            :
                            <div style={{ display: "flex", gap: "15px" }}>
                                <EditOutlined
                                    style={{ cursor: 'pointer', color: "orange" }}
                                    onClick={() => { action?.startEditable?.(record.id) }}
                                />
                                <Popconfirm
                                    title="Delete the user"
                                    description="Are you sure to delete this user?"
                                    onConfirm={() => { handleDelete(record.id) }}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <DeleteOutlined style={{ cursor: 'pointer', color: "red" }} />
                                </Popconfirm>
                            </div>
                        }
                    </>
                )
            },
            search: false,
            editable: false
        },
    ];

    const handleExport = () => {
        if (dataUsers && dataUsers.length > 0) {
            const data = handleDataUsers()
            if (data && data.length) {
                const worksheet = XLSX.utils.json_to_sheet(data);
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
                XLSX.writeFile(workbook, "DataUsers.xlsx");
            }
        }
    }

    const handleSave = async () => {
        //call api update user
    }

    const handleDelete = async (_id) => {
        //call api delete user
    }

    return (
        <>
            <ProTable
                columns={columns}
                actionRef={actionRef}
                cardBordered
                dataSource={handleDataUsers()}
                rowKey="id"
                pagination={{
                    current: current,
                    pageSize: pageSize,
                    total: total,
                    showSizeChanger: true,
                    onChange: (page, pageSize) => {
                        setCurrent(page)
                        setPageSize(pageSize)
                    }
                }}
                headerTitle="Table User"
                toolBarRender={() => [
                    <Button
                        key="button"
                        icon={<ExportOutlined />}
                        onClick={() => { handleExport() }}
                        type="primary"
                    >
                        Export
                    </Button>,
                    <Button
                        key="button"
                        icon={<ImportOutlined />}
                        onClick={() => { setIsOpenModalImportUsers(true) }}
                        type="primary"
                    >
                        Import
                    </Button>,
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={() => { setIsOpenModalCreateUser(true) }}
                        type="primary"
                    >
                        Add new
                    </Button>,
                ]}
                editable={{
                    type: 'single',
                    editableKeys,
                    onChange: (editableKeys) => {
                        setEditableKeys(editableKeys)
                    },
                    onValuesChange: (values) => {
                        //handle data update
                    }
                }}
            />

            <CreateUser
                isOpenModalCreateUser={isOpenModalCreateUser}
                setIsOpenModalCreateUser={setIsOpenModalCreateUser}
                actionRef={actionRef}
            />

            <ViewUserDetail
                isOpenUserDetail={isOpenUserDetail}
                setIsOpenUserDetail={setIsOpenUserDetail}
                dataUserDetail={dataUserDetail}
                setDataUserDetail={setDataUserDetail}
            />

            <ImportUsers
                isOpenModalImportUsers={isOpenModalImportUsers}
                setIsOpenModalImportUsers={setIsOpenModalImportUsers}
                actionRef={actionRef}
            />
        </>
    )
}

export default UserTable
