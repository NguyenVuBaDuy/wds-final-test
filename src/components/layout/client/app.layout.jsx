import { Outlet } from "react-router-dom";
import AppHeader from "./header/app.header";
import AppFooter from "./footer/app.footer";
import Home from "../../client/home/home";
import Product from "../../client/product/product";
import RelatedProducts from "../../client/product/related-product";
import "../../../assets/style/global.css";
import History from "../../client/history/history";
import Order from "../../client/order/order";
const AppLayout = () => {
    return (
        <div className="layout">
            <AppHeader />

            <Outlet />

            <AppFooter />
        </div>
    );
};

export default AppLayout;
