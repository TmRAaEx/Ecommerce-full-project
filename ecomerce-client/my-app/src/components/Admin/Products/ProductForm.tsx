import {ChangeEvent, FormEvent, useState} from "react";
import {SubmitButton} from "@ui/Buttons.tsx";
import {categories} from "@utils/categoryArray.ts";
import {IProduct} from "@interfaces/IProduct.ts";


interface ProductFormProps {
    toggleForm: () => void;
    createProduct: (product: IProduct) => Promise<void>;
}


export default function ProductForm({toggleForm, createProduct}: ProductFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        image: "",
        stock: "",
        category: categories[0] || "", // Default to first category if available
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const parsedForm = {
            name: formData.name,
            description: formData.description,
            price: parseInt(formData.price),
            regular_price: parseInt(formData.price),
            image: formData.image,
            stock: parseInt(formData.stock),
            category: formData.category,
            id: null,
        }
        await createProduct(parsedForm);
        toggleForm();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border border-gray-300 rounded bg-white">
            <div>
                <label htmlFor="name">Product Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange}
                       className="border p-2 rounded w-full" required/>
            </div>

            <div>
                <label htmlFor="image">Product Image URL:</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange}
                       className="border p-2 rounded w-full" required/>
            </div>

            <div>
                <label htmlFor="description">Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange}
                          className="border p-2 rounded w-full" required/>
            </div>

            <div>
                <label htmlFor="price">Price:</label>
                <input type="number" min={0} name="price" value={formData.price} onChange={handleChange}
                       className="border p-2 rounded w-full" required/>
            </div>

            <div>
                <label htmlFor="stock">Stock:</label>
                <input type="number" min={0} name="stock" value={formData.stock} onChange={handleChange}
                       className="border p-2 rounded w-full" required/>
            </div>

            <div>
                <label htmlFor="category">Category:</label>
                <select name="category" value={formData.category} onChange={handleChange}
                        className="border p-2 rounded w-full" required>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <SubmitButton type="submit">Create</SubmitButton>
        </form>
    );
}
