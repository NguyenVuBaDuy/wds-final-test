import { Outlet } from "react-router-dom";
import AppHeader from "./header/app.header";
import AppFooter from "./footer/app.footer";
import Home from "../../client/home/home";
import History from "../../client/history/history";
import "../../../assets/style/global.css";

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
