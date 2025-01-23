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
    InputNumber,
    notification,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
    getProfileAPI,
    getAllProductAPI,
    getAllCategoriesAPI,
} from "../../../services/api.service";
import { useDispatch } from "react-redux";
import { doGetProfileAction } from "../../../redux/profile/profileSlice";

const { Sider, Content } = Layout;
const { Option } = Select;
const { Search } = Input;
const { Panel } = Collapse;

const Home = () => {
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(12)
    const [dataProducts, setDataProducts] = useState([])
    const [filterPrice, setFilterPrice] = useState([])
    const [filterSize, setFilterSize] = useState([])
    const [filterRating, setFilterRating] = useState(0)
    const [filterSort, setFilterSort] = useState('default')
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        getProfile()
        getProductAPI()
    }, [])

    const getProfile = async () => {
        const res = await getProfileAPI();
        if (res.data) {
            dispatch(doGetProfileAction(res.data));
        }
    }

    const getProductAPI = async () => {
        const res = await getAllProductAPI()
        if (res.data) {
            setDataProducts(res.data)
        } else {
            notification.error({
                message: "Failed",
                description: res.message
            })
        }
    }


    const handlePagination = (page, pageSize) => {
        setCurrent(page)
        setPageSize(pageSize)
    }

    const handleClearFilters = () => {
        setFilterPrice([])
        setFilterSize([])
        setFilterRating(0)
        setCurrent(1)
    }


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
                                    // value={selectedRating}
                                    onChange={(event) => { setFilterRating(event.target.value) }
                                    }
                                >
                                    <Radio value={4}>4 star or up</Radio>
                                    <Radio value={3}>3 star or up</Radio>
                                    <Radio value={2}>2 star or up</Radio>
                                </Radio.Group>
                            </Panel>
                            <Panel header="Price" key="2">
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        marginBottom: "8px",
                                    }}
                                >
                                    <span>From:</span>
                                    <InputNumber
                                        min={0}
                                        max={1000}
                                        value={filterPrice[0]}
                                        onChange={(value) => {
                                            setFilterPrice([value, filterPrice[1]])
                                        }}
                                    />
                                    <span>To:</span>
                                    <InputNumber
                                        min={0}
                                        max={1000}
                                        value={filterPrice[1]}
                                        onChange={(value) => {
                                            setFilterPrice([filterPrice[0], value])

                                        }}
                                    />
                                </div>
                                <Slider
                                    range
                                    min={0}
                                    max={1000}
                                    defaultValue={[0, 1000]}
                                    onChange={(value) => {
                                        setFilterPrice((value))
                                    }
                                    }
                                />
                            </Panel>

                            <Panel header="Size" key="3">
                                <Checkbox.Group
                                    onChange={(values) => {
                                        setFilterSize(values)
                                    }}
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
                        <Row
                            justify="space-between"
                            style={{ marginBottom: "16px" }}
                        >
                            <Col span={6}>
                                <Search
                                    placeholder="Search"
                                    onSearch={() => { }}
                                    style={{ width: 250, marginBottom: "16px" }}
                                />
                            </Col>
                            <Col span={6} style={{ textAlign: "right" }}>
                                <Select
                                    value={filterSort}
                                    onChange={(values) => { setFilterSort(values) }}
                                    style={{ width: 150 }}
                                >
                                    <Option value="default">
                                        Default
                                    </Option>
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
                            {dataProducts
                                .filter((product, index) => {
                                    if (filterPrice.length === 0) return true
                                    return product.price >= filterPrice[0]
                                        && product.price <= filterPrice[1]

                                })
                                .filter((product, index) => {
                                    if (filterSize.length === 0) return true
                                    for (let i = 0; i < product.sizes.length; i++) {
                                        for (let j = 0; j < filterSize; j++) {
                                            if (product.sizes[i] === filterSize[j]) {
                                                return true;
                                            }
                                        }
                                    }
                                    return false
                                })
                                .filter((product, index) => {
                                    return product.ratings_number >= filterRating
                                })
                                .filter((product, index) => {
                                    return index >= (current - 1) * pageSize
                                        && index < ((current - 1) * pageSize) + pageSize

                                })
                                .sort((a, b) => {
                                    if (filterSort === "recommended") {
                                        return b.ratings_number - a.ratings_number;
                                    } else if (filterSort === "price") {
                                        return a.price - b.price;
                                    } else if (filterSort === "priceDesc") {
                                        return b.price - a.price;
                                    } else {
                                        return 0;
                                    }
                                }

                                )
                                .map((product, index) => {
                                    return (
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
                                    )
                                })}
                        </Row>

                        <Pagination
                            current={current}
                            pageSize={pageSize}
                            total={dataProducts.length}
                            onChange={handlePagination}
                            style={{ textAlign: "center", marginTop: "16px" }}
                        />
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default Home;
