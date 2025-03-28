import React, {useState} from "react";
import {useNavigate} from "react-router";
import apiClient from "../../services/requests"; // Update the path to your API client if necessary

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        street_address: "",
        postal_code: "",
        city: "",
        country: "",
    });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Clear previous errors

        // Simple validation
        for (let key in formData) {
            if (!formData[key as keyof typeof formData]) {
                setError("Please fill in all fields.");
                return;
            }
        }

        try {
            const response = await apiClient.post("/customers/register", formData);
            console.log("Registration successful:", response);

            // Redirect to login page or dashboard
            navigate("/login");
        } catch (err) {
            setError("There was an error during registration. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>

                <form onSubmit={handleSubmit}>
                    {[
                        {label: "First Name", name: "firstname"},
                        {label: "Last Name", name: "lastname"},
                        {label: "Email", name: "email", type: "email"},
                        {label: "Password", name: "password", type: "password"},
                        {label: "Phone", name: "phone"},
                        {label: "Street Address", name: "street_address"},
                        {label: "Postal Code", name: "postal_code"},
                        {label: "City", name: "city"},
                        {label: "Country", name: "country"},
                    ].map(({label, name, type = "text"}) => (
                        <div key={name} className="mb-4">
                            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                                {label}
                            </label>
                            <input
                                type={type}
                                name={name}
                                value={formData[name as keyof typeof formData]}
                                onChange={handleChange}
                                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder={label}
                            />
                        </div>
                    ))}

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Register
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Login here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
