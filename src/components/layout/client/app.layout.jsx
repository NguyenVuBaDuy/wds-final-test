import { Outlet } from "react-router-dom";
import AppHeader from "./header/app.header";
import AppFooter from "./footer/app.footer";
import Home from "../../client/home/home";
import "../../../assets/style/global.css";

const AppLayout = () => {
    return (
        <div className="layout">
            <AppHeader />
<<<<<<< HEAD
            {/* <Outlet />
            <AppFooter /> */}
            <AppFooter />
=======

            <Home />

            <AppFooter />

>>>>>>> 207da7379ba8245cbb345ed7214d50cf8f6b9204
        </div>
    );
};

export default AppLayout;
