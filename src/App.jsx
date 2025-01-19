import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/client/home.page/home.page.jsx";
import ProductPage from "./pages/client/product.page/product.page.jsx";
import OrderPage from "./pages/client/order.page/order.page.jsx";
import HistoryPage from "./pages/client/history.page/history.page.jsx";
import AppLayout from "./components/layout/client/app.layout.jsx";
import LoginPage from "./pages/client/login.page/login.page.jsx";
import RegisterPage from "./pages/client/register.page/register.page.jsx";
import AdminLayout from "./components/layout/admin/admin.layout.jsx";
import DashboardManagement from "./pages/admin/dashboard.management/dashboard.management.jsx";
import UserManagement from "./pages/admin/user.management/user.management.jsx";
import OrderManagement from "./pages/admin/order.management/order.management.jsx";
import ProductManagement from "./pages/admin/product.management/product.management.jsx";
import { ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";
import { useEffect, useState } from "react";
import { getProfileAPI } from "./services/api.service.js";
import { useDispatch } from "react-redux";
import { doGetProfileAction } from "./redux/profile/profileSlice.js";
import Loading from "./components/client/loading/loading.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "/product/:id",
                element: <ProductPage />,
            },
            {
                path: "/order",
                element: <OrderPage />,
            },
            {
                path: "/history",
                element: <HistoryPage />,
            },
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <DashboardManagement />,
            },
            {
                path: "/admin/user",
                element: <UserManagement />,
            },
            {
                path: "/admin/order",
                element: <OrderManagement />,
            },
            {
                path: "/admin/product",
                element: <ProductManagement />,
            },
        ],
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
]);

const App = () => {

    const dispatch = useDispatch()
    const [isAppLoading, setIsAppLoading] = useState(false)

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async () => {

        if (window.location.pathname === '/login'
            || window.location.pathname === '/register'
        ) return

        setIsAppLoading(true)
        const res = await getProfileAPI()
        if (res.data) {
            dispatch(doGetProfileAction(res.data))
        }
        setTimeout(() => {
            setIsAppLoading(false)
        }, 1000)
    }

    return (
        <>
            {isAppLoading === false
                || window.location.pathname === '/'
                || window.location.pathname === '/login'
                || window.location.pathname === '/register'
                ?
                <ConfigProvider locale={enUS}>
                    <RouterProvider router={router} />
                </ConfigProvider>
                :
                <Loading />
            }
        </>

    );
};

export default App;
