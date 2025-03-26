import {ChangeEvent, FormEvent, useState} from "react";
import apiClient from "../../services/requests.ts";
import {Link, useNavigate} from "react-router";
import Cookies from "js-cookie";
import {IPostResponse} from "@interfaces/IPostResponse.ts";
import errorChecker from "@utils/errorLogger.ts";

const AdminLoginForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState<string | null>(null)

    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await apiClient.post<IPostResponse>("/admin/login", {
                username: formData.username,
                password: formData.password,
            });

            if (response.success) {
                // Set the cookie for the logged-in user
                Cookies.set("adminUser", JSON.stringify({username: formData.username}), {
                    expires: 1, 
                    secure: false,
                });


                // Redirect to the admin dashboard
                navigate("/admin/manage-orders");
            } else {
                setError(response.message);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setError(errorChecker(error));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-3">Admin Login</h2>
            <h3 className={"text-red-500"}>{error}</h3>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="block w-full p-2 mb-3 border rounded"
                required
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full p-2 mb-3 border rounded"
                required
            />

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
                Log In
            </button>
            <p>
                Dont have an admin account yet?
                <Link to={"/admin/register"} className={"underline"}>Create now!</Link>
            </p>
        </form>
    );
};

export default AdminLoginForm;
