import { Badge, Descriptions, Drawer } from "antd";
import { getUsersAPI } from "../../../services/api.service";

const ViewUserDetail = (props) => {
    const {
        dataUserDetail,
        isOpenUserDetail,
        setDataUserDetail,
        setIsOpenUserDetail,
    } = props;
    console.log(dataUserDetail);
    return (
        <Drawer
            title="User Detail"
            onClose={() => {
                setDataUserDetail(null);
                setIsOpenUserDetail(false);
            }}
            open={isOpenUserDetail}
            width="50vw"
        >
            {dataUserDetail ? (
                <Descriptions title="User Info" bordered>
                    <Descriptions.Item label="Id" span={2}>
                        {dataUserDetail?.id}
                    </Descriptions.Item>

                    <Descriptions.Item label="Full Name" span={2}>
                        {dataUserDetail?.name}
                    </Descriptions.Item>

                    <Descriptions.Item label="Email" span={2}>
                        {dataUserDetail?.email}
                    </Descriptions.Item>

                    <Descriptions.Item label="Phone" span={2}>
                        {dataUserDetail?.phone_number}
                    </Descriptions.Item>

                    <Descriptions.Item label="Role" span={3}>
                        <Badge status="processing" text={dataUserDetail.role} />
                    </Descriptions.Item>

                    <Descriptions.Item label="Created At" span={2}>
                        {dataUserDetail.createdAt}
                    </Descriptions.Item>

                    <Descriptions.Item label="Updated At" span={2}>
                        {dataUserDetail.createdAt}
                    </Descriptions.Item>
                </Descriptions>
            ) : (
                <div>No data</div>
            )}
        </Drawer>
    );
};

export default ViewUserDetail;
