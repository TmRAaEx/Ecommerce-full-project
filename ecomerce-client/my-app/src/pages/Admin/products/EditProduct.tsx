import {Link, useParams, useNavigate} from "react-router";
import useProducts from "@hooks/useProducts.ts";
import {ChangeEvent, useEffect, useState} from "react";
import {IProduct} from "@interfaces/IProduct.ts";
import {SubmitButton} from "@ui/Buttons.tsx";
import {categories} from "@utils/categoryArray.ts";
import Price from "@ui/Price.tsx";

export default function EditProduct() {
    const {getProductById, updateProduct, loading, error} = useProducts();
    const [productData, setProductData] = useState<IProduct | null>(null);
    const {id} = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        if (!id) return;
        const fetchProduct = async () => {
            const product = await getProductById(id);
            if (!product) return;
            setProductData(product);
        };
        fetchProduct().then();
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (!productData) return;
        setProductData({...productData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async () => {
        if (productData) {
            await updateProduct(productData);
            navigate("/admin/manage-products");
        }
    };

    if (!productData) return null;

    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (loading) return <div className="text-center py-4">Loading...</div>;

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <Link to={"/admin/manage-products"} className={"text-lg mb-2 hover:underline"}> ⬅️ Back</Link>

            <div className="text-center">
                <img src={productData?.image} alt={productData?.name}
                     className="w-full h-64 object-scale-down rounded-lg"/>
            </div>
            <form className="space-y-4 mt-4">
                <div>
                    <label className="block text-gray-700">Image URL:</label>
                    <input type="text" name="image" value={productData?.image || ''} onChange={handleChange}
                           className="w-full p-2 border rounded"/>
                </div>
                <div>
                    <label className="block text-gray-700">Product Name:</label>
                    <input type="text" name="name" value={productData?.name || ''} onChange={handleChange}
                           className="w-full p-2 border rounded"/>
                </div>
                <div>
                    <label className="block text-gray-700">Description:</label>
                    <textarea name="description" value={productData?.description || ''}
                              onChange={handleChange}
                              className="w-full p-2 border rounded"/>
                </div>
                <div>
                    <label className="block text-gray-700">Price:</label>
                    <input type="number" name="regular_price" value={productData?.regular_price || ''}
                           onChange={handleChange}
                           className="w-full p-2 border rounded"/>
                </div>
                <div>
                    <label className="block text-gray-700">Discount:</label>
                    <select
                        name="price"
                        value={productData?.price}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value={productData.regular_price}>No Discount</option>
                        {[5, 10, 15, 20, 25, 30].map((discount) => (
                            <option key={discount} value={productData?.regular_price * (1 - discount / 100)}>
                                {discount}% = <Price
                                price={((productData?.regular_price || 0) * (1 - discount / 100))}/>
                            </option>
                        ))}
                    </select>

                </div>
                <div>
                    <label className="block text-gray-700">Category:</label>
                    <select name="category" className="w-full p-2 border rounded" value={productData?.category}
                            onChange={handleChange}>
                        {categories.map(category => (<option key={category} value={category}>{category}</option>))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700">Stock:</label>
                    <input type="number" name="stock" value={productData?.stock || ''} onChange={handleChange}
                           className="w-full p-2 border rounded"/>
                </div>
                <SubmitButton onClick={handleSubmit}>Update Product</SubmitButton>

            </form>
        </div>
    );
}
