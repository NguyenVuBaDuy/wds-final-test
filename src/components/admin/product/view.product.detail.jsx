import { Badge, Descriptions, Divider, Drawer } from "antd";

const ViewProductDetail = (props) => {
    const {
        isOpenProductDetail,
        dataProductDetail,
        setIsOpenProductDetail,
        setDataProductDetail,
    } = props;

    return (
        <Drawer
            title="Product Detail"
            onClose={() => {
                setDataProductDetail(null);
                setIsOpenProductDetail(false);
            }}
            open={isOpenProductDetail}
            width="50vw"
        >
            {dataProductDetail ? (
                <>
                    <Divider orientation="left">Product Info</Divider>
                    <Descriptions bordered>
                        <Descriptions.Item label="Id" span={3}>
                            {dataProductDetail?._id || dataProductDetail?.id}
                        </Descriptions.Item>
                        <Descriptions.Item label="Product Name" span={3}>
                            {dataProductDetail?.name}
                        </Descriptions.Item>
                        <Descriptions.Item label="Brand" span={2}>
                            {dataProductDetail?.code}
                        </Descriptions.Item>
                        <Descriptions.Item label="Price" span={2}>
                            <>
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(dataProductDetail.price)}
                            </>
                        </Descriptions.Item>
                        <Descriptions.Item label="Category" span={3}>
                            <Badge>
                                {dataProductDetail.category?.name ||
                                    dataProductDetail.category ||
                                    "N/A"}
                            </Badge>
                        </Descriptions.Item>
                        <Descriptions.Item label="Created At" span={2}>
                            {dataProductDetail.createdAt}
                        </Descriptions.Item>
                        <Descriptions.Item label="Last Updated" span={2}>
                            {dataProductDetail.updatedAt}
                        </Descriptions.Item>
                        <Descriptions.Item label="Product Image" span={2}>
                            {dataProductDetail.image_url ? (
                                <img
                                    src={dataProductDetail.image_url}
                                    alt={
                                        dataProductDetail?.name ||
                                        "Product Image"
                                    }
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "200px",
                                        objectFit: "contain",
                                    }}
                                />
                            ) : (
                                "No image available"
                            )}
                        </Descriptions.Item>
                    </Descriptions>
                </>
            ) : (
                <div>No data</div>
            )}
        </Drawer>
    );
};

export default ViewProductDetail;
