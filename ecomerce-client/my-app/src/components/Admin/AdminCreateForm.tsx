import {ChangeEvent, FormEvent, useState} from "react";
import apiClient from "../../services/requests.ts";
import {Link, useNavigate} from "react-router";
import {IPostResponse} from "@interfaces/IPostResponse.ts";
import errorChecker from "@utils/errorLogger.ts";

const AdminCreateForm = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        apiKey: "",
        confirmPassword: "",
    });

    const [error, setError] = useState<string | null>(null)

    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.password) {
            setError("Passwords don't match");
            return;
        }

        apiClient.setApiKey(formData.apiKey);

        try {
            await apiClient.post<IPostResponse>("/admin/register", {
                username: formData.username,
                password: formData.password,
            });

            // Cookies.set("adminUser", JSON.stringify({username: formData.username}), {expires: 7, secure: true});

            navigate("/admin/login");


        } catch (error) {
            setError(errorChecker(error));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-3">Create Admin</h2>
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

            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block w-full p-2 mb-3 border rounded"
                required
            />

            <input
                type="text"
                name="apiKey"
                placeholder="Enter Admin Key"
                value={formData.apiKey}
                onChange={handleChange}
                className="block w-full p-2 mb-3 border rounded"
                required
            />

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
                Create Admin
            </button>
            <p>
                Already have an admin account?
                <Link to={"/admin/login"} className={"underline"}>Log in!</Link>
            </p>
        </form>
    );
};

export default AdminCreateForm;
