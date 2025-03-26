import {ICustomer} from "@interfaces/ICustomer.ts";

import {ChangeEvent, FormEvent, useState} from "react";

export default function CustomerCard({customer, update, deleteHandler}: {
    customer: ICustomer,
    update: (customer: ICustomer, e: FormEvent) => Promise<void>
    deleteHandler: (id: ICustomer["id"]) => Promise<void>
}) {

    const [formData, setFormData] = useState<ICustomer>({
        email: customer.email,
        password: customer.password || "",
        firstname: customer.firstname,
        lastname: customer.lastname,
        phone: customer.phone,
        postal_code: customer.postal_code,
        street_address: customer.street_address,
        city: customer.city,
        country: customer.country,
        id: customer.id,
    })


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prevState => ({...prevState, [name]: value}));
    }


    return <>
        <form className={"w-full bg-white p-3 rounded"} onSubmit={(e: FormEvent) => update(formData, e)}>
            <div className="flex flex-row justify-between">
                <h3>{formData.firstname} {formData.lastname}</h3>
                <h2>ID: {customer.id}</h2>
            </div>

            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}
                       className="border p-2 rounded w-full"/>

                <label>Phone:</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                       className="border p-2 rounded w-full"/>
            </div>

            <section className="flex flex-col gap-1">
                <label>Street Address:</label>
                <input type="text" name="street_address" value={formData.street_address} onChange={handleChange}
                       className="border p-2 rounded w-full"/>

                <div className="flex flex-col md:flex-row gap-2">
                    <div className="w-full md:w-1/2">
                        <label>Postal Code:</label>
                        <input type="text" name="postal_code" value={formData.postal_code}
                               onChange={handleChange} className="border p-2 rounded w-full"/>
                    </div>
                    <div className="w-full md:w-1/2">
                        <label>City:</label>
                        <input type="text" name="city" value={formData.city}
                               onChange={handleChange} className="border p-2 rounded w-full"/>
                    </div>
                </div>


                <label>Country:</label>
                <input type="text" name="country" value={formData.country} onChange={handleChange}
                       className="border p-2 rounded w-full"/>
            </section>

            <div className={"flex flex-row gap-3 p-2"}>
                <button type="submit" className={"text-blue-500 hover:underline"}>Update</button>
                <button type="button" className={"text-red-500 hover:underline"}
                        onClick={() => deleteHandler(customer.id)}>delete
                </button>
            </div>
        </form>
    </>

}