import {ICustomer} from "@interfaces/ICustomer.ts";
import {ChangeEvent, FormEvent, useState, useEffect} from "react";
import apiClient from "../../../services/requests.ts";
import {IPostResponse} from "@interfaces/IPostResponse.ts";
import {useNavigate} from "react-router";
import {SubmitButton} from "@ui/Buttons.tsx";
import {useOrders} from "@hooks/useOrders.ts";
import {useContext} from "react";
import {CartContext} from "@context/CartContext.ts";
import Cookies from "js-cookie";

export default function PersonalInfo() {
    const [formData, setFormData] = useState<ICustomer>({
        id: null,
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        street_address: "",
        postal_code: "",
        city: "",
        country: "",
    });

    const {cartItems} = useContext(CartContext);

    const [errors, setErrors] = useState<Partial<ICustomer>>({});

    const {createOrder, loading, error} = useOrders();

    const navigate = useNavigate();

    // Use effect to auto-fill customer info from cookie (if exists)
    useEffect(() => {
        const customerCookie = Cookies.get("customer");
        if (customerCookie) {
            const {customer} = JSON.parse(customerCookie);
            const {email, id} = customer
            if (email && id) {
                // Fetch customer details from backend using email
                const getData = async () => {
                    try {
                        const customer = await apiClient.get<ICustomer>(`/customers/${id}`);
                        if (customer) {
                            setFormData(customer);
                        }
                    } catch (error) {
                        console.error("Error fetching customer data", error);
                    }
                };
                getData();
            }
        }
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const validateForm = () => {
        const newErrors: Partial<ICustomer> = {};
        if (!formData.firstname) newErrors.firstname = "First name is required";
        if (!formData.lastname) newErrors.lastname = "Last name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        if (!formData.street_address) newErrors.street_address = "Address is required";
        if (!formData.postal_code) newErrors.postal_code = "Postal code is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.country) newErrors.country = "Country is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                let customer: ICustomer | null = null;

                // Check if the customer exists in the system by email
                try {
                    const isCustomer = await apiClient.get<ICustomer>(`/customers/email/${formData.email}`);
                    if (isCustomer) {
                        customer = isCustomer;
                    }
                } catch (error: any) {
                    if (error.status !== 404) {
                        console.error("Error fetching customer:", error);
                        throw error;
                    }
                }

                // If the customer doesn't exist, create one
                if (!customer) {
                    const response = await apiClient.post<IPostResponse>("/customers", formData);
                    customer = {...formData, id: response.insertedID as number};
                }

                // Proceed with creating the order
                const orderResponse = await createOrder(customer, cartItems);

                // Store the customer in localStorage and cookie
                localStorage.setItem("customer", JSON.stringify(customer));

                // Navigate to the checkout page
                navigate(`/checkout?orderID=${orderResponse.id}`);
            } catch (error) {
                console.error("Error processing checkout:", error);
            }
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {[
                    {label: "First Name", name: "firstname"},
                    {label: "Last Name", name: "lastname"},
                    {label: "Email", name: "email", type: "email"},
                    {label: "Phone", name: "phone"},
                    {label: "Street Address", name: "street_address"},
                    {label: "Postal Code", name: "postal_code"},
                    {label: "City", name: "city"},
                    {label: "Country", name: "country"},
                ].map(({label, name, type = "text"}) => (
                    <div key={name}>
                        <label className="block text-sm font-medium">{label}</label>
                        <input
                            type={type}
                            name={name}
                            value={formData[name as keyof ICustomer] as string}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {errors[name as keyof ICustomer] && (
                            <p className="text-red-500 text-sm">{errors[name as keyof ICustomer]}</p>
                        )}
                    </div>
                ))}

                {error ? <div className="text-red-500">Error creating order! Try again later</div> : null}

                <SubmitButton onClick={handleSubmit} loading={loading}>
                    Continue to payment
                </SubmitButton>
            </form>
        </div>
    );
}
