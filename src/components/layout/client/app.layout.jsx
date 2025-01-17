import { Outlet } from "react-router-dom";
import AppHeader from "./header/app.header";
import AppFooter from "./footer/app.footer";
import Home from "../../client/home/home";
import ProductPage from "../../client/product/product";
import RelatedProducts from "../../client/product/related-product";
import "../../../assets/style/global.css";
import History from "../../client/history/history";

const AppLayout = () => {
    return (
        <div className="layout">
            <AppHeader />

            <History />

            <AppFooter />
        </div>
    );
};

export default AppLayout;
