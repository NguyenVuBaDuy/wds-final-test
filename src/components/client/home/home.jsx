import React, { useState } from "react";
import {
    Layout,
    Card,
    Row,
    Col,
    Select,
    Pagination,
    Slider,
    Checkbox,
    Input,
    Collapse,
    Button,
} from "antd";
import { StarOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
const { Option } = Select;
const { Search } = Input;
const { Panel } = Collapse;

// Mock dữ liệu sản phẩm
const products = new Array(20).fill({
    name: "VANS",
    rating: 4.2,
    price: 2000000,
});

// Mock dữ liệu thương hiệu
const brands = [
    { name: "Adidas", logo: "https://via.placeholder.com/50" },
    { name: "Nike", logo: "https://via.placeholder.com/50" },
    { name: "Vans", logo: "https://via.placeholder.com/50" },
    { name: "Type 3", logo: "https://via.placeholder.com/50" },
    { name: "Type 4", logo: "https://via.placeholder.com/50" },
    { name: "Type 5", logo: "https://via.placeholder.com/50" },
    { name: "Type 6", logo: "https://via.placeholder.com/50" },
    { name: "Type 7", logo: "https://via.placeholder.com/50" },
    { name: "Type 8", logo: "https://via.placeholder.com/50" },
];

const App = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Layout>
                <Sider
                    width="20%"
                    style={{
                        background: "#fff",
                        padding: "16px",
                        borderRight: "1px solid #e0e0e0",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <h3
                            style={{
                                fontSize: "20px",
                                fontWeight: "600",
                            }}
                        >
                            Filters
                        </h3>

                        <Button type="link" style={{ marginLeft: "auto" }}>
                            Clear All
                        </Button>
                    </div>
                    <Collapse
                        style={{
                            padding: "20px 0",
                        }}
                        defaultActiveKey={["1"]}
                        ghost
                    >
                        <Panel header="Rating" key="1">
                            <Checkbox.Group>
                                <Checkbox value="4">4 star or up</Checkbox>
                                <Checkbox value="3">3 star or up</Checkbox>
                            </Checkbox.Group>
                        </Panel>
                        <Panel header="Price" key="2">
                            <Slider
                                range
                                min={1000000}
                                max={5000000}
                                defaultValue={[2000000, 4000000]}
                            />
                        </Panel>
                        <Panel header="Size" key="3">
                            <Checkbox.Group>
                                <Checkbox value="36">36</Checkbox>
                                <Checkbox value="37">37</Checkbox>
                                <Checkbox value="38">38</Checkbox>
                            </Checkbox.Group>
                        </Panel>
                    </Collapse>
                </Sider>

                <Content style={{ padding: "16px", background: "#fff" }}>
                    <div
                        style={{
                            background: "#fff",
                            display: "flex",
                            gap: "16px",
                            overflowX: "auto",
                            padding: "8px 0",
                            marginBottom: "16px",
                        }}
                    >
                        {brands.map((brand, index) => (
                            <div
                                key={index}
                                style={{
                                    textAlign: "center",
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: "50%",
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    <Row
                        justify="space-between"
                        style={{ marginBottom: "16px" }}
                    >
                        <Col span={6}>
                            <Search
                                placeholder="Search..."
                                allowClear
                                onSearch={(value) => setSearchTerm(value)}
                                style={{ width: "100%" }}
                            />
                        </Col>
                        <Col span={6} style={{ textAlign: "right" }}>
                            <Select
                                defaultValue="popular"
                                style={{ width: 150 }}
                            >
                                <Option value="popular">Popular</Option>
                                <Option value="recommended">Recommended</Option>
                                <Option value="price">Price</Option>
                                <Option value="size">Size</Option>
                            </Select>
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                        {filteredProducts
                            .slice((currentPage - 1) * 8, currentPage * 8)
                            .map((product, index) => (
                                <Col span={6} key={index}>
                                    <Card
                                        hoverable
                                        cover={
                                            <img
                                                alt={product.name}
                                                src="src\assets\img\product-1.png"
                                            />
                                        }
                                    >
                                        <h3>{product.name}</h3>
                                        <p>
                                            <StarOutlined /> {product.rating}
                                        </p>
                                        <p>
                                            Giá:{" "}
                                            {product.price.toLocaleString()} VNĐ
                                        </p>
                                    </Card>
                                </Col>
                            ))}
                    </Row>

                    <Pagination
                        current={currentPage}
                        total={filteredProducts.length}
                        pageSize={8}
                        onChange={handlePageChange}
                        style={{ textAlign: "center", marginTop: "16px" }}
                    />
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
