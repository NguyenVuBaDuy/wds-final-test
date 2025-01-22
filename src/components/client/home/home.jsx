import React, { useEffect, useState } from "react";
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
    Rate,
} from "antd";
import { useNavigate } from "react-router-dom";
import { getProfileAPI, getAllProductAPI } from "../../../services/api.service";
import { useDispatch } from "react-redux";
import { doGetProfileAction } from "../../../redux/profile/profileSlice";

const { Sider, Content } = Layout;
const { Option } = Select;
const { Search } = Input;
const { Panel } = Collapse;

const brands = [
    { name: "Adidas", logo: "src/assets/img/product-1.png" },
    { name: "Nike", logo: "src/assets/img/product-1.png" },
    { name: "Vans", logo: "src/assets/img/product-1.png" },
    { name: "Type 3", logo: "src/assets/img/product-1.png" },
    { name: "Type 4", logo: "src/assets/img/product-1.png" },
];

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedPriceRange, setSelectedPriceRange] = useState([0, 100]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [sortBy, setSortBy] = useState("default");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getProfile = async () => {
        const res = await getProfileAPI();
        if (res.data) {
            dispatch(doGetProfileAction(res.data));
        }
    };

    const fetchProducts = async () => {
        const res = await getAllProductAPI();
        if (res.data) {
            setProducts(res.data);
            setFilteredProducts(res.data);
        }
    };

    useEffect(() => {
        getProfile();
        fetchProducts();
    }, []);

    const applyFilters = () => {
        let filtered = [...products];

        // Filter by brand
        if (selectedBrand) {
            filtered = filtered.filter(
                (product) => product.code === selectedBrand
            );
        }

        // Filter by rating
        if (selectedRating !== null) {
            filtered = filtered.filter(
                (product) => product.ratings_number >= selectedRating
            );
        }

        // Filter by price
        filtered = filtered.filter(
            (product) =>
                product.price >= selectedPriceRange[0] &&
                product.price <= selectedPriceRange[1]
        );

        // Filter by sizes
        if (selectedSizes.length > 0) {
            filtered = filtered.filter((product) =>
                product.sizes.some((size) => selectedSizes.includes(size))
            );
        }

        // Sort products
        if (sortBy === "price") {
            filtered = filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === "priceDesc") {
            filtered = filtered.sort((a, b) => b.price - a.price);
        } else if (sortBy === "recommended") {
            filtered = filtered.sort(
                (a, b) => (b.ratings_number || 0) - (a.ratings_number || 0)
            );
        }

        setFilteredProducts(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [
        selectedBrand,
        selectedRating,
        selectedPriceRange,
        selectedSizes,
        sortBy,
    ]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleClearFilters = () => {
        setSelectedBrand(null);
        setSelectedRating(null);
        setSelectedPriceRange([0, 100]);
        setSelectedSizes([]);
        setSortBy("default");
        setFilteredProducts(products);
    };

    const handleBrandClick = (brandName) => {
        setSelectedBrand(brandName);
    };

    const handleSortChange = (value) => {
        setSortBy(value);
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
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <h3 style={{ fontSize: "20px", fontWeight: "600" }}>
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
                                    <Radio value={2}>2 star or up</Radio>
                                </Radio.Group>
                            </Panel>
                            <Panel header="Price" key="2">
                                <Slider
                                    range
                                    min={0}
                                    max={100}
                                    value={selectedPriceRange}
                                    onChange={setSelectedPriceRange}
                                />
                            </Panel>
                            <Panel header="Size" key="3">
                                <Checkbox.Group
                                    value={selectedSizes}
                                    onChange={setSelectedSizes}
                                >
                                    {[...Array(16).keys()].map((i) => (
                                        <Checkbox key={i} value={i + 30}>
                                            {i + 30}
                                        </Checkbox>
                                    ))}
                                </Checkbox.Group>
                            </Panel>
                        </Collapse>
                    </Sider>

                    <Content style={{ padding: "0 16px", background: "#fff" }}>
                        <div
                            style={{
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
                                    placeholder="Search"
                                    onSearch={() => {}}
                                    style={{ width: 250, marginBottom: "16px" }}
                                />
                            </Col>
                            <Col span={6} style={{ textAlign: "right" }}>
                                <Select
                                    value={sortBy}
                                    onChange={handleSortChange}
                                    style={{ width: 150 }}
                                >
                                    <Option value="default">Default</Option>
                                    <Option value="recommended">
                                        Recommended
                                    </Option>
                                    <Option value="price">
                                        Price Ascending
                                    </Option>
                                    <Option value="priceDesc">
                                        Price Descending
                                    </Option>
                                </Select>
                            </Col>
                        </Row>

                        <Row gutter={[16, 16]}>
                            {filteredProducts
                                .slice((currentPage - 1) * 8, currentPage * 8)
                                .map((product, index) => (
                                    <Col
                                        span={6}
                                        key={index}
                                        style={{ height: "100%" }}
                                    >
                                        <Card
                                            hoverable
                                            cover={
                                                <img
                                                    src={product.image_url}
                                                    alt={
                                                        product.name ||
                                                        "Product Image"
                                                    }
                                                    style={{
                                                        maxWidth: "100%",
                                                        maxHeight: "200px",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            }
                                            onClick={() =>
                                                navigate(
                                                    `/product/${product.id}`
                                                )
                                            }
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                                height: "100%",
                                                minHeight: "380px",
                                            }}
                                        >
                                            <h3
                                                style={{
                                                    flex: 1,
                                                    marginBottom: "8px",
                                                    marginTop: "16px",
                                                }}
                                            >
                                                {product.name}
                                            </h3>
                                            <p style={{ marginBottom: "8px" }}>
                                                <Rate
                                                    disabled
                                                    value={
                                                        product.ratings_number
                                                    }
                                                />
                                            </p>
                                            <p style={{ marginBottom: "16px" }}>
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
                            total={filteredProducts.length}
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
