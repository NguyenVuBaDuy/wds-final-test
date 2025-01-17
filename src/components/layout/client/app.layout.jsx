import { Outlet } from "react-router-dom";
import AppHeader from "./header/app.header";
import AppFooter from "./footer/app.footer";
import Home from "../../client/home/home";
import "../../../assets/style/global.css";

const AppLayout = () => {
    return (
        <div className="layout">
            <AppHeader />

            <Home />

            <AppFooter />

        </div>
    );
};

export default AppLayout;
