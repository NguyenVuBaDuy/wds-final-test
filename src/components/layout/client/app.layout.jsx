import { Outlet } from "react-router-dom";
import AppHeader from "./header/app.header";
import AppFooter from "./footer/app.footer";
import "../../../assets/style/global.css";

const AppLayout = () => {
    return (
        <div className="layout">
            <AppHeader />
            {/* <Outlet />
            <AppFooter /> */}
        </div>
    );
};

export default AppLayout;
