import {NavLink, Outlet} from "react-router";
import {useLocation} from "react-router";


export default function AdminLayout() {

    const location = useLocation();

    console.log(location.pathname)

    const isLogin = location.pathname === "/admin/login" || location.pathname === "/admin/register";

    return <>
        <div className={"w-full bg-mainBG h-25 flex flex-col justify-between"}>
            <p className={"flex w-fit h-fit text-white text-2xl p-2"}>Admin</p>
            {!isLogin ? (
                <nav className={"bg-accent w-full flex-grow flex justify-evenly align-center"}>
                    <NavLink to={"/admin/manage-orders"}><p className={"text-white text-lg"}>Orders</p></NavLink>
                    <NavLink to={"/admin/manage-products"}><p className={"text-white text-lg"}>Products</p></NavLink>
                    <NavLink to={"/admin/manage-customers"}><p className={"text-white text-lg"}>Customers</p></NavLink>
                    <NavLink to={"/products"}><p className={"text-white text-lg"}>Store</p></NavLink>
                </nav>
            ) : null}
        </div>

        <main>
            <Outlet></Outlet>
        </main>
    </>
}