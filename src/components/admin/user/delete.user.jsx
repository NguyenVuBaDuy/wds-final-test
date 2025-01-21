import { Modal, message, notification } from "antd";
import { deleteUserAPI } from "../../../services/api.service";

const DeleteUser = (props) => {
    const {
        isOpenModalDeleteUser,
        setIsOpenModalDeleteUser,
        actionRef,
        userId,
    } = props;

    const handleDeleteUser = async () => {
        try {
            const res = await deleteUserAPI(userId);
            if (res.data) {
                message.success("User deleted successfully");
                setIsOpenModalDeleteUser(false);
                actionRef.current?.reload();
            } else {
                notification.error({
                    message: "Delete User Failed!",
                    description: res.message || "Something went wrong",
                });
            }
        } catch (error) {
            notification.error({
                message: "Error",
                description:
                    error.response?.data?.message || "Failed to delete user",
            });
        }
    };

    return (
        <Modal
            title="Confirm Delete"
            open={isOpenModalDeleteUser}
            onOk={handleDeleteUser}
            onCancel={() => setIsOpenModalDeleteUser(false)}
            okText="Delete"
            cancelText="Cancel"
            centered
        >
            <p>Are you sure you want to delete this user?</p>
        </Modal>
    );
};

export default DeleteUser;
