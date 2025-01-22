import { Button, Form, Input, Select, Table } from "antd"
import { useSelector } from "react-redux";
import { useState } from "react";

const vietNamData = [
    { value: 'Hà Nội', label: 'Hà Nội', cities: ['Ba Đình', 'Hoàn Kiếm', 'Hai Bà Trưng', 'Đống Đa', 'Cầu Giấy', 'Thanh Xuân', 'Tây Hồ', 'Long Biên', 'Bắc Từ Liêm', 'Nam Từ Liêm'] },
    { value: 'Hồ Chí Minh', label: 'Hồ Chí Minh', cities: ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 9', 'Quận 10', 'Quận 11', 'Quận 12', 'Thủ Đức', 'Bình Tân', 'Gò Vấp'] },
    { value: 'An Giang', label: 'An Giang', cities: ['Long Xuyên', 'Châu Đốc', 'Tân Châu', 'Châu Phú', 'Phú Tân', 'An Phú'] },
    { value: 'Bà Rịa – Vũng Tàu', label: 'Bà Rịa – Vũng Tàu', cities: ['Vũng Tàu', 'Bà Rịa', 'Long Điền', 'Đất Đỏ', 'Xuyên Mộc', 'Tân Thành'] },
    { value: 'Bắc Giang', label: 'Bắc Giang', cities: ['Bắc Giang', 'Sơn Động', 'Lục Ngạn', 'Lạng Giang', 'Hiệp Hòa', 'Việt Yên', 'Yên Thế'] },
    { value: 'Bắc Kạn', label: 'Bắc Kạn', cities: ['Bắc Kạn', 'Chợ Đồn', 'Chợ Mới', 'Na Rì', 'Ba Bể', 'Pác Nặm'] },
    { value: 'Bến Tre', label: 'Bến Tre', cities: ['Bến Tre', 'Châu Thành', 'Mỏ Cày Nam', 'Giồng Trôm', 'Ba Tri', 'Thạnh Phú'] },
    { value: 'Bình Dương', label: 'Bình Dương', cities: ['Thủ Dầu Một', 'Bến Cát', 'Tân Uyên', 'Dầu Tiếng', 'Phú Giáo', 'Bàu Bàng', 'Thuận An'] },
    { value: 'Bình Định', label: 'Bình Định', cities: ['Quy Nhơn', 'An Nhơn', 'Hoài Nhơn', 'Tây Sơn', 'Phù Cát', 'Vân Canh'] },
    { value: 'Bình Phước', label: 'Bình Phước', cities: ['Đồng Xoài', 'Bù Đăng', 'Chơn Thành', 'Bù Đốp', 'Phước Long', 'Lộc Ninh'] },
    { value: 'Bình Thuận', label: 'Bình Thuận', cities: ['Phan Thiết', 'La Gi', 'Bình Tân', 'Tánh Linh', 'Hàm Tân', 'Hàm Thuận Bắc', 'Hàm Thuận Nam'] },
    { value: 'Cà Mau', label: 'Cà Mau', cities: ['Cà Mau', 'U Minh', 'Thới Bình', 'Trần Văn Thời', 'Cái Nước', 'Đầm Dơi', 'Năm Căn'] },
    { value: 'Cao Bằng', label: 'Cao Bằng', cities: ['Cao Bằng', 'Bảo Lạc', 'Bảo Lâm', 'Hạ Lang', 'Quảng Uyên', 'Nguyên Bình'] },
    { value: 'Đắk Lắk', label: 'Đắk Lắk', cities: ['Buôn Ma Thuột', 'Ea H’Leo', 'Buôn Đôn', 'Cư M’gar', 'Krông Ana', 'Krông Pắc'] },
    { value: 'Đắk Nông', label: 'Đắk Nông', cities: ['Gia Nghĩa', 'Cư Jút', 'Đắk Mil', 'Đắk Song', 'Krông Nô', 'Tuy Đức'] },
    { value: 'Điện Biên', label: 'Điện Biên', cities: ['Điện Biên Phủ', 'Mường Lay', 'Mường Ảng', 'Tủa Chùa', 'Tuần Giáo', 'Điện Biên Đông'] },
    { value: 'Đồng Nai', label: 'Đồng Nai', cities: ['Biên Hòa', 'Long Khánh', 'Nhơn Trạch', 'Vĩnh Cửu', 'Định Quán', 'Tân Phú', 'Trảng Bom'] },
    { value: 'Đồng Tháp', label: 'Đồng Tháp', cities: ['Sa Đéc', 'Cao Lãnh', 'Hồng Ngự', 'Tam Nông', 'Thanh Bình', 'Châu Thành'] },
    { value: 'Gia Lai', label: 'Gia Lai', cities: ['Pleiku', 'An Khê', 'Ayun Pa', 'Chư Păh', 'Chư Sê', 'Krông Pa'] },
    { value: 'Hà Giang', label: 'Hà Giang', cities: ['Hà Giang', 'Quản Bạ', 'Yên Minh', 'Vị Xuyên', 'Bắc Mê', 'Hoàng Su Phì'] },
    { value: 'Hà Nam', label: 'Hà Nam', cities: ['Phủ Lý', 'Duy Tiên', 'Kim Bảng', 'Thanh Liêm', 'Lý Nhân'] },
    { value: 'Hà Tĩnh', label: 'Hà Tĩnh', cities: ['Hà Tĩnh', 'Hương Sơn', 'Nghi Xuân', 'Can Lộc', 'Kỳ Anh', 'Cẩm Xuyên'] },
    { value: 'Hải Dương', label: 'Hải Dương', cities: ['Hải Dương', 'Chí Linh', 'Kim Thành', 'Kinh Môn', 'Thanh Miện', 'Gia Lộc'] },
    { value: 'Hải Phòng', label: 'Hải Phòng', cities: ['Hải An', 'Lê Chân', 'Ngô Quyền', 'Kiến An', 'Đồ Sơn', 'Dương Kinh'] },
    { value: 'Hòa Bình', label: 'Hòa Bình', cities: ['Hòa Bình', 'Kim Bôi', 'Lạc Sơn', 'Lương Sơn', 'Mai Châu', 'Tân Lạc'] },
    { value: 'Hậu Giang', label: 'Hậu Giang', cities: ['Vị Thanh', 'Ngã Bảy', 'Long Mỹ', 'Châu Thành', 'Phụng Hiệp', 'Việt Quang'] },
    { value: 'Hưng Yên', label: 'Hưng Yên', cities: ['Hưng Yên', 'Phù Cừ', 'Kim Động', 'Ân Thi', 'Mỹ Hào', 'Tiên Lữ'] },
    { value: 'Khánh Hòa', label: 'Khánh Hòa', cities: ['Nha Trang', 'Cam Ranh', 'Vạn Ninh', 'Diên Khánh', 'Khánh Vĩnh', 'Ninh Hòa'] },
    { value: 'Kiên Giang', label: 'Kiên Giang', cities: ['Rạch Giá', 'Phú Quốc', 'Tây Yên', 'Giồng Riềng', 'Hòn Đất', 'Châu Thành'] },
    { value: 'Kon Tum', label: 'Kon Tum', cities: ['Kon Tum', 'Đắk Tô', 'Ngọc Hồi', 'Sa Thầy', 'Đắk Glei', 'Ia H’Drai'] },
    { value: 'Lai Châu', label: 'Lai Châu', cities: ['Lai Châu', 'Mường Lay', 'Tam Đường', 'Sìn Hồ', 'Phong Thổ', 'Tân Uyên'] },
    { value: 'Lâm Đồng', label: 'Lâm Đồng', cities: ['Đà Lạt', 'Bảo Lộc', 'Đạ Huoai', 'Đạ Tẻh', 'Lâm Hà', 'Di Linh'] },
    { value: 'Long An', label: 'Long An', cities: ['Tân An', 'Bến Lức', 'Châu Thành', 'Thủ Thừa', 'Cần Giuộc', 'Đức Hòa'] },
    { value: 'Nam Định', label: 'Nam Định', cities: ['Nam Định', 'Mỹ Lộc', 'Vụ Bản', 'Ý Yên', 'Trực Ninh', 'Giao Thủy'] },
    { value: 'Nghệ An', label: 'Nghệ An', cities: ['Vinh', 'Cửa Lò', 'Nghi Lộc', 'Thanh Chương', 'Quỳnh Lưu', 'Diễn Châu'] },
    { value: 'Ninh Bình', label: 'Ninh Bình', cities: ['Ninh Bình', 'Tam Điệp', 'Yên Khánh', 'Hoa Lư', 'Gia Viễn', 'Nho Quan'] },
    { value: 'Phú Thọ', label: 'Phú Thọ', cities: ['Việt Trì', 'Phù Ninh', 'Lâm Thao', 'Đoan Hùng', 'Cẩm Khê', 'Thanh Ba'] },
    { value: 'Phú Yên', label: 'Phú Yên', cities: ['Tuy Hòa', 'Sông Cầu', 'Đồng Xuân', 'Phú Hòa', 'Tuy An', 'Đại Lộc'] },
    { value: 'Quảng Bình', label: 'Quảng Bình', cities: ['Đồng Hới', 'Ba Đồn', 'Quảng Trạch', 'Lệ Thủy', 'Minh Hóa'] },
    { value: 'Quảng Nam', label: 'Quảng Nam', cities: ['Tam Kỳ', 'Hội An', 'Duy Xuyên', 'Quế Sơn', 'Thăng Bình', 'Tiên Phước'] },
    { value: 'Quảng Ngãi', label: 'Quảng Ngãi', cities: ['Quảng Ngãi', 'Mộ Đức', 'Sơn Tịnh', 'Tư Nghĩa', 'Bình Sơn', 'Trà Bồng'] },
    { value: 'Quảng Ninh', label: 'Quảng Ninh', cities: ['Hạ Long', 'Uông Bí', 'Cẩm Phả', 'Móng Cái', 'Vân Đồn', 'Đầm Hà'] },
    { value: 'Sóc Trăng', label: 'Sóc Trăng', cities: ['Sóc Trăng', 'Ngã Năm', 'Châu Thành', 'Kế Sách', 'Mỹ Xuyên', 'Long Phú'] },
    { value: 'Sơn La', label: 'Sơn La', cities: ['Sơn La', 'Mường La', 'Quỳnh Nhai', 'Thuận Châu', 'Mộc Châu', 'Yên Châu'] },
    { value: 'Tây Ninh', label: 'Tây Ninh', cities: ['Tây Ninh', 'Hòa Thành', 'Trảng Bàng', 'Dương Minh Châu', 'Châu Thành'] },
    { value: 'Thái Bình', label: 'Thái Bình', cities: ['Thái Bình', 'Quỳnh Phụ', 'Tiền Hải', 'Hưng Hà', 'Vũ Thư'] },
    { value: 'Thái Nguyên', label: 'Thái Nguyên', cities: ['Thái Nguyên', 'Sông Công', 'Phổ Yên', 'Đại Từ', 'Định Hóa'] },
    { value: 'Thanh Hóa', label: 'Thanh Hóa', cities: ['Thanh Hóa', 'Sầm Sơn', 'Bỉm Sơn', 'Hàm Rồng', 'Quảng Xương'] },
    { value: 'Thừa Thiên Huế', label: 'Thừa Thiên Huế', cities: ['Huế', 'Hương Thủy', 'Hương Trà', 'Phú Vang', 'Quảng Điền'] },
    { value: 'Tiền Giang', label: 'Tiền Giang', cities: ['Mỹ Tho', 'Gò Công', 'Cai Lậy', 'Cái Bè', 'Tân Phước'] },
    { value: 'Trà Vinh', label: 'Trà Vinh', cities: ['Trà Vinh', 'Cầu Kè', 'Châu Thành', 'Duyên Hải', 'Tiểu Cần'] },
    { value: 'Tuyên Quang', label: 'Tuyên Quang', cities: ['Tuyên Quang', 'Yên Sơn', 'Hàm Yên', 'Na Hang', 'Chiêm Hóa'] },
    { value: 'Vĩnh Long', label: 'Vĩnh Long', cities: ['Vĩnh Long', 'Mang Thít', 'Long Hồ', 'Trà Ôn', 'Vũng Liêm', 'Tam Bình'] },
    { value: 'Vĩnh Phúc', label: 'Vĩnh Phúc', cities: ['Vĩnh Yên', 'Phúc Yên', 'Sông Lô', 'Lập Thạch', 'Tam Dương'] },
    { value: 'Yên Bái', label: 'Yên Bái', cities: ['Yên Bái', 'Nghĩa Lộ', 'Trấn Yên', 'Văn Yên', 'Mù Cang Chải'] },
];


const StepShippingAddress = ({ form, next, setShippingAddress }) => {
    const cart = useSelector(state => state.order.cart)

    const [selectedProvince, setSelectedProvince] = useState(null)
    const [selectedCity, setSelectedCity] = useState(null)
    const [cities, setCities] = useState([])
    const [isDisable, setIsDisable] = useState(true)

    const handleProvinceChange = (province) => {
        setSelectedProvince(province);
        const selected = vietNamData.find((item) => item.value === province);
        setCities(selected ? selected.cities : []);
    };

    const onFinish = (values) => {
        const { country, province, city, address } = values
        const yourAddress = `${address}, ${city}, ${province}, ${country}`
        setShippingAddress(yourAddress)
        next()
    };

    const columns = [
        {
            title: "Product",
            dataIndex: "name",
            key: "name",
            className: "custom-align-center",
            render: (text, record) => (
                <div className="order__item">
                    <img
                        src={record?.detail?.image_url}
                        alt={text}
                        className="order__item-image"
                    />
                    <span className="order__item-name">{record?.detail?.name}</span>
                </div>
            ),
        },
        {
            title: "Color",
            dataIndex: "color",
            key: "color",
            className: "custom-align-center",
            render: (text, record) => (
                <div className="custom-color" style={{
                    width: "100%", height: "100%", display: "flex", justifyContent: "center",
                }}>
                    <div style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: record.color,
                    }}></div>
                </div>
            ),
        },
        {
            title: "Size",
            dataIndex: "size",
            key: "size",
            className: "custom-align-center",
            render: (text, record) => (
                <div className="custom-size" style={{
                    width: "100%", height: "100%",
                    display: "flex", justifyContent: "center",
                    fontSize: "18px",
                    fontWeight: "500"
                }}>
                    {record.size}
                </div>
            ),
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            className: "custom-align-center",
            render: (text, record) => (
                <span className="order__price">${record.detail.price.toLocaleString()}.00</span>
            ),
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            className: "custom-align-center",
            render: (text, record) => (
                <div className="order__quantity">
                    <span>{record.quantity}</span>
                </div>
            ),
        },
        {
            title: "Total Price",
            dataIndex: "price",
            key: "total",
            className: "custom-align-center",
            render: (text, record) => (
                <span className="order__price">
                    ${(record.detail.price * record.quantity).toLocaleString()}.00
                </span>
            ),
        },
    ];

    return (

        <section className="order__address">

            <Table
                dataSource={cart}
                columns={columns}
                pagination={false}
                bordered
            />
            <div className="order__address-form" style={{ marginTop: "30px" }}>

                <Form
                    onFinish={onFinish}
                    layout="vertical"
                    form={form}
                    initialValues={{ country: 'Việt Nam' }}
                >
                    <Form.Item
                        name="country"
                        label="Chose your country"

                    >
                        <Select
                            style={{ marginBottom: "10px" }}
                            defaultValue="Việt Nam"
                            className="order__address-item"
                            dropdownStyle={{ padding: "8px" }}
                        >
                            <Option value="Việt Nam" style={{ margin: "8px 0" }} selected>
                                Việt Nam
                            </Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="province"
                        label="Province"
                        rules={[{ required: true, message: 'Please choose province' }]}
                    >
                        <Select placeholder="Choose province" onChange={handleProvinceChange}>
                            {vietNamData.map((province) => (
                                <Option key={province.value} value={province.value}>
                                    {province.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="city"
                        label="City"
                        rules={[{ required: true, message: 'Please choose city' }]}
                    >
                        <Select placeholder="Choose city" disabled={!selectedProvince} onChange={() => { setIsDisable(false) }}>
                            {cities.map((city) => (
                                <Option key={city} value={city}>
                                    {city}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="Home address/Street"
                        rules={[{ required: true, message: 'Please enter home/street' }]}
                    >
                        <Input
                            placeholder="Enter home address/street"
                            className="order__address-item"
                            disabled={isDisable}
                        />
                    </Form.Item>

                </Form>

            </div>
        </section>
    )
}

export default StepShippingAddress