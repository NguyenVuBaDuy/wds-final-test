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
    Radio,
} from "antd";
import { StarOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Option } = Select;
const { Search } = Input;
const { Panel } = Collapse;

const products = new Array(20).fill(null).map((_, index) => ({
    id: index + 1,
    name: "VANS",
    rating: 4.2,
    price: 200,
    size: 36,
    brand: "Vans",
}));

const brands = [
    { name: "Adidas", logo: "src/assets/img/product-1.png" },
    { name: "Nike", logo: "src/assets/img/product-1.png" },
    { name: "Vans", logo: "src/assets/img/product-1.png" },
    { name: "Type 3", logo: "src/assets/img/product-1.png" },
    { name: "Type 4", logo: "src/assets/img/product-1.png" },
    { name: "Type 5", logo: "src/assets/img/product-1.png" },
    { name: "Type 6", logo: "src/assets/img/product-1.png" },
    { name: "Type 7", logo: "src/assets/img/product-1.png" },
    { name: "Type 8", logo: "src/assets/img/product-1.png" },
];

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedPriceRange, setSelectedPriceRange] = useState([20, 50]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const navigate = useNavigate();

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleClearFilters = () => {
        setSelectedBrand(null); 
        setSelectedRating(null); 
        setSelectedPriceRange([20, 50]); 
        setSelectedSizes([]); 

        const checkboxes = document.querySelectorAll(".ant-checkbox-input");
        checkboxes.forEach((checkbox) => (checkbox.checked = false));

        const slider = document.querySelector(".ant-slider");
        if (slider) {
            const rangeSlider = slider.querySelector(".ant-slider-rail");
            rangeSlider.style.left = "0%"; 
            rangeSlider.style.right = "100%";
        }

        const radioGroup = document.querySelectorAll(".ant-radio-input");
        radioGroup.forEach((radio) => (radio.checked = false));
    };

    const handleBrandClick = (brandName) => {
        setSelectedBrand(brandName);
    };

    return (
        <div className="container">
            <Layout style={{ minHeight: "100vh" }}>
                <Layout>
                    <Sider
                        width="20%"
                        style={{
                            background: "#fff",
                            borderRight: "1px solid #e0e0e0",
                        }}
                    >
                        {selectedBrand && (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "30px",
                                    fontWeight: "bold",
                                    fontSize: "30px",
                                }}
                            >
                                {selectedBrand}
                            </div>
                        )}
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

                            <Button
                                type="link"
                                style={{ marginLeft: "auto" }}
                                onClick={handleClearFilters}
                            >
                                Clear All
                            </Button>
                        </div>
                        <Collapse defaultActiveKey={[]} ghost>
                            <Panel header="Rating" key="1">
                                <Radio.Group
                                    value={selectedRating}
                                    onChange={(e) =>
                                        setSelectedRating(e.target.value)
                                    }
                                >
                                    <Radio value={4}>4 star or up</Radio>
                                    <Radio value={3}>3 star or up</Radio>
                                </Radio.Group>
                            </Panel>
                            <Panel header="Price" key="2">
                                <Slider
                                    range
                                    min={0}
                                    max={1000}
                                    value={selectedPriceRange}
                                    onChange={setSelectedPriceRange}
                                />
                            </Panel>
                            <Panel header="Size" key="3">
                                <Checkbox.Group
                                    value={selectedSizes}
                                    onChange={setSelectedSizes}
                                >
                                    <Checkbox value={36}>36</Checkbox>
                                    <Checkbox value={37}>37</Checkbox>
                                    <Checkbox value={38}>38</Checkbox>
                                </Checkbox.Group>
                            </Panel>
                        </Collapse>

                        <Button
                            type="primary"
                            style={{ width: "90%", marginTop: "16px" }}
                        >
                            Apply Filters
                        </Button>
                    </Sider>

                    <Content style={{ padding: "0 16px", background: "#fff" }}>
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
                                    onClick={() => handleBrandClick(brand.name)}
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
                                    <div
                                        style={{
                                            fontSize: "12px",
                                            marginTop: "8px",
                                            color: "#333",
                                        }}
                                    >
                                        {brand.name}
                                    </div>
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
                                    style={{ width: "100%" }}
                                />
                            </Col>
                            <Col span={6} style={{ textAlign: "right" }}>
                                <Select
                                    defaultValue="popular"
                                    style={{ width: 150 }}
                                >
                                    <Option value="popular">Popular</Option>
                                    <Option value="recommended">
                                        Recommended
                                    </Option>
                                    <Option value="price">Price</Option>
                                    <Option value="size">Size</Option>
                                </Select>
                            </Col>
                        </Row>

                        <Row gutter={[16, 16]}>
                            {products
                                .slice((currentPage - 1) * 8, currentPage * 8)
                                .map((product, index) => (
                                    <Col span={6} key={index}>
                                        <Card
                                            hoverable
                                            cover={
                                                <img
                                                    alt={product.name}
                                                    src="src/assets/img/product-1.png"
                                                />
                                            }
                                            onClick={() =>
                                                navigate(
                                                    `/product/${product.id}`
                                                )
                                            }
                                        >
                                            <h3>{product.name}</h3>
                                            <p>
                                                <StarOutlined />{" "}
                                                {product.rating}
                                            </p>
                                            <p>
                                                Price:{" "}
                                                {product.price.toLocaleString()}{" "}
                                                $
                                            </p>
                                        </Card>
                                    </Col>
                                ))}
                        </Row>

                        <Pagination
                            current={currentPage}
                            total={products.length}
                            pageSize={8}
                            onChange={handlePageChange}
                            style={{ textAlign: "center", marginTop: "16px" }}
                        />
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default Home;
