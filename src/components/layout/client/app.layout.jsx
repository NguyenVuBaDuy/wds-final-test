import { Outlet } from "react-router-dom";
import AppHeader from "./header/app.header";
import AppFooter from "./footer/app.footer";
import Home from "../../client/home/home";
import ProductPage from "../../client/product/product";
import RelatedProducts from "../../client/product/related-product";
import "../../../assets/style/global.css";

const AppLayout = () => {
    return (
        <div className="layout">
            <AppHeader />

            <ProductPage />

            <RelatedProducts />

            <AppFooter />
        </div>
    );
};

export default AppLayout;
