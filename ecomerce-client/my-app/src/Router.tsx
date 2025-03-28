import {createBrowserRouter} from "react-router";
import AdminLayout from "@pages/Admin/AdminLayout";
import ManageOrders from "@pages/Admin/orders/Mange-orders.tsx";
import ManageProducts from "@pages/Admin/products/Manage-products.tsx";
import EditProduct from "@pages/Admin/products/EditProduct.tsx";
import ManageCustomers from "@pages/Admin/Manage-customers.tsx";
import StoreLayout from "@pages/Store/StoreLayout.tsx";
import Home from "@pages/Home.tsx";
import Products from "@pages/Store/Products/Products.tsx";
import ProductPage from "@pages/Store/Products/ProductPage.tsx";
import Cart from "@pages/Store/cart.tsx";
import Categories from "@pages/Store/Categories/Categories.tsx";
import Category from "@pages/Store/Categories/Category.tsx";
import AdminLoader from "@utils/adminLoader.tsx";
import Login from "@pages/Admin/auth/Login.tsx";
import Register from "@pages/Admin/auth/Register.tsx";
import OrderPage from "@pages/Admin/orders/orderPage.tsx";
import Checkout from "@pages/Store/checkout/Checkout.tsx";
import PersonalInfo from "@pages/Store/checkout/PersonalInfo.tsx";
import OrderConfirmation from "@pages/Store/checkout/Order-confirmation.tsx";
import ErrorPage from "@pages/404.tsx";
import LoginPage from "@pages/Store/LoginPage.tsx";
import MyOrders from "@pages/Store/MyOrders.tsx";
import RegisterPage from "@pages/Store/RegisterPage.tsx";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <StoreLayout></StoreLayout>,
            children: [

                {
                    path: "/",
                    element: <Home/>
                },
                {
                    path: "products",
                    element: <Products/>
                },
                {
                    path: "products/:id",
                    element: <ProductPage/>
                },
                {
                    path: "categories",
                    element: <Categories/>
                },

                {
                    path: "categories/:category",
                    element: <Category/>
                }
                ,
                {
                    path: "cart",
                    element: <Cart/>
                },

                {
                    path: "checkout/personal-info",
                    element: <PersonalInfo></PersonalInfo>
                },
                {
                    path: "checkout",
                    element: <Checkout/>
                },
                {
                    path: "order-confirmation",
                    element: <OrderConfirmation/>
                },
                {
                    path: "login",
                    element: <LoginPage/>
                }, {
                    path: "signup",
                    element: <RegisterPage/>
                },
                {
                    path: "my-orders",
                    element: <MyOrders/>
                }
            ],
            errorElement: <ErrorPage/>
        },

        {
            path: "/admin",
            element:
                <AdminLayout/>,
            children:
                [
                    {
                        path: "/admin",
                        loader: () => AdminLoader({isLoginroute: false})
                    },
                    {
                        path: "login",
                        element: <Login/>,
                        loader: () => AdminLoader({isLoginroute: true})
                    },

                    {
                        path: "register",
                        element: <Register/>,
                        loader: () => AdminLoader({isLoginroute: true})
                    },

                    {
                        path: "manage-orders",
                        element: <ManageOrders/>,
                        loader: () => AdminLoader({isLoginroute: false}),

                    },

                    {
                        path: "manage-orders/:id",
                        element: <OrderPage/>,
                        loader: () => AdminLoader({isLoginroute: false})
                    },
                    {
                        path: "manage-products",
                        element: <ManageProducts/>,
                        loader: () => AdminLoader({isLoginroute: false}),

                    },
                    {

                        path: "manage-products/:id",
                        element: <EditProduct/>,
                        loader: () => AdminLoader({isLoginroute: false}),

                    }, {
                    path: "manage-customers",
                    element: <ManageCustomers/>,
                    loader: () => AdminLoader({isLoginroute: false}),

                }
                ],
            errorElement: <ErrorPage/>

        }
    ]
)