import {redirect} from "react-router";
import Cookies from "js-cookie";

export default function AdminLoader({isLoginroute}: { isLoginroute: boolean }) {

    const adminUser = Cookies.get("adminUser");

    if (!isLoginroute && !adminUser) {
        return redirect("/admin/login");
    }

    if (adminUser && isLoginroute) {
        return redirect("/admin/manage-orders");
    }

    return null;
}