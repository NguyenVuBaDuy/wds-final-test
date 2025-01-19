import { Outlet } from "react-router-dom";
import AppHeader from "./header/app.header";
import AppFooter from "./footer/app.footer";
import "../../../assets/style/global.css";
const AppLayout = () => {
    return (
        <div className="layout">
            <AppHeader />
<<<<<<< HEAD

            <Outlet />

=======
            <Outlet />
>>>>>>> e14b6654c442a4a054be3a4e85a7ab47440d7570
            <AppFooter />
        </div>
    );
};

export default AppLayout;
