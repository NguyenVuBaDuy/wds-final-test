
import { CloseOutlined, DeleteOutlined, EditOutlined, ExportOutlined, ImportOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, notification, Popconfirm } from 'antd';
import { useRef, useState } from 'react';
import * as XLSX from 'xlsx'
import CreateUser from './create.user';
import ViewUserDetail from './view.user.detail';
import ImportUsers from './data/import.users';

const color = ['#314659', '#979797']

const fakeDataUser = [
    {
        _id: 'ajdhajksdhasdhas',
        fullName: 'data fake',
        email: 'datafake@gmail.com',
        phone: '0132131567',
        createdAt: '2024-01-16',
        updatedAt: '2024-01-16',
        role: 'USER'
    },
    {
        _id: 'fasdasdfasdf',
        fullName: 'data fake',
        email: 'datafake@gmail.com',
        phone: '0132131567',
        createdAt: '2024-01-16',
        updatedAt: '2024-01-16',
        role: 'USER'
    },
    {
        _id: 'rqwerqwerwertwert',
        fullName: 'data fake',
        email: 'datafake@gmail.com',
        phone: '0132131567',
        createdAt: '2024-01-16',
        updatedAt: '2024-01-16',
        role: 'USER'
    },
    {
        _id: 'wersdfbsdfhbxcvb',
        fullName: 'data fake',
        email: 'datafake@gmail.com',
        phone: '0132131567',
        createdAt: '2024-01-16',
        updatedAt: '2024-01-16',
        role: 'USER'
    },
    {
        _id: 'ertwertwerxvbxcvb',
        fullName: 'data fake',
        email: 'datafake@gmail.com',
        phone: '0132131567',
        createdAt: '2024-01-16',
        updatedAt: '2024-01-16',
        role: 'USER'
    },
    {
        _id: 'xvbxcbsdghshhsdf',
        fullName: 'data fake',
        email: 'datafake@gmail.com',
        phone: '0132131567',
        createdAt: '2024-01-16',
        updatedAt: '2024-01-16',
        role: 'USER'
    }
]

const UserTable = () => {
    const actionRef = useRef()
    const [dataUsers, setDataUsers] = useState(fakeDataUser)
    const [editableKeys, setEditableKeys] = useState([])
    const [isOpenModalCreateUser, setIsOpenModalCreateUser] = useState(false)
    const [isOpenUserDetail, setIsOpenUserDetail] = useState(false)
    const [dataUserDetail, setDataUserDetail] = useState(null)
    const [isOpenModalImportUsers, setIsOpenModalImportUsers] = useState(false)

    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    })




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
                    color: "white"
                }}
                >{(meta.pageSize * (meta.current - 1)) + (index + 1)}</div>
            ],
            hideInSearch: true,
        },

        {
            key: "id",
            title: 'Id',
            dataIndex: '_id',
            render: (text, record, _, action) => [
                <a href='#' onClick={() => {
                    setDataUserDetail(record)
                    setIsOpenUserDetail(true)
                }}>{record._id}</a>
            ],
            hideInSearch: true,
            editable: false
        },
        {
            key: "fullName",
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            key: "phone",
            title: 'Phone Number',
            dataIndex: 'phone',
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
            title: 'Created At',
            dataIndex: 'createdAtRange',
            valueType: 'dateRange',
            hideInTable: true,
            editable: false
        },
        {
            key: "action",
            title: 'Action',
            render: (text, record, _, action) => {
                const isEdit = record._id === editableKeys[0]

                return (
                    <>
                        {isEdit ?
                            <div style={{
                                display: "flex",
                                gap: "15px"
                            }}>
                                <SaveOutlined
                                    style={{ cursor: 'pointer', color: "blue" }}
                                    onClick={async () => {
                                        handleSave()
                                    }}
                                />
                                <CloseOutlined
                                    style={{ cursor: 'pointer', color: "red" }}
                                    onClick={() => {
                                        setEditableKeys([])
                                    }}
                                />
                            </div>
                            :
                            <div style={{
                                display: "flex",
                                gap: "15px"
                            }}>
                                <EditOutlined
                                    style={{ cursor: 'pointer', color: "orange" }}
                                    key="editable"
                                    onClick={() => {
                                        action?.startEditable?.(record._id)
                                    }}
                                />
                                <Popconfirm
                                    title="Delete the user"
                                    description="Are you sure to delete this user?"
                                    onConfirm={() => { handleDelete(record._id) }}
                                    onCancel={() => { }}
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
            const worksheet = XLSX.utils.json_to_sheet(dataUsers);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "DataUsers.xlsx");
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
                request={async (params, sorter) => {

                    //call api get user and query

                    return {
                        data: fakeDataUser,
                        page: 1,
                        success: true,
                        total: 10
                    }
                }}
                rowKey="_id"
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    total: meta.total,
                    showSizeChanger: true
                }}
                headerTitle="Table User"
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
                        icon={<ImportOutlined />}
                        onClick={() => {
                            setIsOpenModalImportUsers(true)
                        }}
                        type="primary"
                    >
                        Import
                    </Button>,
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setIsOpenModalCreateUser(true)
                        }}
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