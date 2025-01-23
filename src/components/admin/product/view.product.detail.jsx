import { Badge, Descriptions, Divider, Drawer, Modal, Upload } from "antd";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });


const ViewProductDetail = (props) => {
    const [fileList, setFileList] = useState([])
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [previewImageTitle, setPreviewImageTitle] = useState('')
    const {
        isOpenProductDetail,
        dataProductDetail,
        setIsOpenProductDetail,
        setDataProductDetail,
    } = props;

    useEffect(() => {
        const setImage = () => {
            const image = [{
                uid: uuidv4(),
                name: dataProductDetail?.name,
                status: 'done',
                url: dataProductDetail?.image_url
            }]

            setFileList(image)
        }
        setImage()
    }, [dataProductDetail])

    const handlePreview = async (file) => {
        console.log(file)
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setIsPreviewOpen(true);
        setPreviewImageTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
    };


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
                                {dataProductDetail.category?.name || "N/A"}
                            </Badge>
                        </Descriptions.Item>
                        <Descriptions.Item label="Created At" span={2}>
                            {dataProductDetail.createdAt}
                        </Descriptions.Item>
                        <Descriptions.Item label="Last Updated" span={2}>
                            {dataProductDetail.updatedAt}
                        </Descriptions.Item>
                    </Descriptions>
                    <Divider orientation="left">Product Image</Divider>

                    <>
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            showUploadList={{
                                showRemoveIcon: false
                            }}
                        >
                        </Upload>
                        <Modal
                            title={previewImageTitle}
                            open={isPreviewOpen}
                            onCancel={() => {
                                setPreviewImage('')
                                setIsPreviewOpen(false)
                                setPreviewImageTitle('')
                            }}
                            footer={null}
                            centered
                        >
                            <img src={previewImage} style={{ width: '100%' }} />
                        </Modal>
                    </>
                </>
            ) : (
                <div>No data</div>
            )}
        </Drawer>
    );
};

export default ViewProductDetail;
