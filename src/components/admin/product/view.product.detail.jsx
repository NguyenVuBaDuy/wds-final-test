import { Badge, Descriptions, Divider, Drawer } from "antd"


const ViewProductDetail = (props) => {

    const { isOpenProductDetail, dataProductDetail, setIsOpenProductDetail, setDataProductDetail } = props

    return (
        <Drawer
            title="Product Detail"
            onClose={() => {
                setDataProductDetail(null)
                setIsOpenProductDetail(false)
            }}
            open={isOpenProductDetail}
            width="50vw"
        >
            {dataProductDetail ?


                <>
                    <Divider orientation="left">Product Info</Divider>
                    <Descriptions
                        bordered
                    >
                        <Descriptions.Item
                            label="Id"
                            span={3}
                        >
                            {dataProductDetail?._id}
                        </Descriptions.Item>

                        <Descriptions.Item
                            label="Product Name"
                            span={3}
                        >
                            {dataProductDetail?.productName}
                        </Descriptions.Item>


                        <Descriptions.Item
                            label="Brand"
                            span={2}
                        >
                            {dataProductDetail?.brand}
                        </Descriptions.Item>

                        <Descriptions.Item
                            label="Price"
                            span={2}
                        >
                            <>{dataProductDetail.price}</>
                        </Descriptions.Item>


                        <Descriptions.Item
                            label="Category"
                            span={3}
                        >
                            <Badge status="processing" text={dataProductDetail.category} />
                        </Descriptions.Item>

                        <Descriptions.Item
                            label="Created At"
                            span={2}
                        >
                            {dataProductDetail.createdAt}
                        </Descriptions.Item>

                        <Descriptions.Item
                            label="Last Updated"
                            span={2}
                        >
                            {dataProductDetail.updatedAt}
                        </Descriptions.Item>

                    </Descriptions>

                    <Divider orientation="left">Product Images</Divider>

                </>
                :
                <div>No data</div>
            }
        </Drawer >
    )
}

export default ViewProductDetail