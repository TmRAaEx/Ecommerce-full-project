import {ChangeEvent, FormEvent, useState} from "react";
import {SubmitButton} from "@ui/Buttons.tsx";
import {ICustomer} from "@interfaces/ICustomer.ts";

interface CustomerFormProps {
    toggleForm: () => void;
    createCustomer: (customer: ICustomer) => Promise<void>;
}

export default function CustomerForm({toggleForm, createCustomer}: CustomerFormProps) {
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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const newCustomer = {
            ...formData,
            id: null,
        };
        await createCustomer(newCustomer);
        toggleForm();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border border-gray-300 rounded bg-white">
            <div>
                <label htmlFor="firstname">First Name:</label>
                <input type="text" name="firstname" value={formData.firstname} onChange={handleChange}
                       className="border p-2 rounded w-full" required/>
            </div>

            <div>
                <label htmlFor="lastname">Last Name:</label>
                <input type="text" name="lastname" value={formData.lastname} onChange={handleChange}
                       className="border p-2 rounded w-full" required/>
            </div>

            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                       className="border p-2 rounded w-full" required/>
            </div>

            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange}
                       className="border p-2 rounded w-full" required/>
            </div>

            <div>
                <label htmlFor="phone">Phone:</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                       className="border p-2 rounded w-full" required/>
            </div>

            <div>
                <label htmlFor="street_address">Street Address:</label>
                <input type="text" name="street_address" value={formData.street_address} onChange={handleChange}
                       className="border p-2 rounded w-full" required/>
            </div>

            <div>
                <label htmlFor="postal_code">Postal Code:</label>
                <input type="text" name="postal_code" value={formData.postal_code} onChange={handleChange}
                       className="border p-2 rounded w-full" required/>
            </div>

            <div>
                <label htmlFor="city">City:</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange}
                       className="border p-2 rounded w-full" required/>
            </div>

            <div>
                <label htmlFor="country">Country:</label>
                <input type="text" name="country" value={formData.country} onChange={handleChange}
                       className="border p-2 rounded w-full" required/>
            </div>

            <SubmitButton type="submit">Register</SubmitButton>
        </form>
    );
}
