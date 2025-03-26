import useProducts from "@hooks/useProducts.ts";
import {Link} from "react-router";
import {SubmitButton} from "@ui/Buttons.tsx";
import {useState} from "react";
import ProductForm from "@components/Admin/Products/ProductForm.tsx";
import {IProduct} from "@interfaces/IProduct.ts";
import ConfirmModal from "@components/ConfirmModal.tsx";


export default function ManageProducts() {
    const {products, loading, error, deleteProduct, createProduct} = useProducts()
    const [formVisible, setFormVisible] = useState<boolean>(false)
    const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

    if (loading && products.length === 0) return <>Loading...</>
    if (error) return <>{error}</>


    const handleDelete = async (id: IProduct["id"]) => {
        setDeleteTarget(id)
    }

    const toggleForm = () => {
        setFormVisible(!formVisible)
    }

    const confirmDelete = async () => {
        if (!deleteTarget) return;
        await deleteProduct(deleteTarget);
        setDeleteTarget(null);
    };

    const cancelDelete = () => {
        setDeleteTarget(null);
    };


    return (
        <>
            {deleteTarget && (
                <ConfirmModal
                    deleteText={`Are you sure you want to delete this product?`}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}

            <div className="w-1/2 mx-auto mb-1">
                <SubmitButton onClick={toggleForm}>{formVisible ? "Cancel" : "Create Product"}</SubmitButton>
            </div>

            {formVisible && (<ProductForm toggleForm={toggleForm} createProduct={createProduct}/>)}
            <ul className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-white divide-y-1 divide-grey-300 max-w-[1500px] mx-auto"}>
                {products.map(product =>
                    <li key={product.id}
                        className={"flex flex-row  p-2 justify-between w-full h-[130px]"}>
                        <img src={product.image} alt={product.name} className={"flex w-20 object-scale-down"}/>
                        <div className={"flex flex-col justify-between"}>
                            <div className={"flex flex-row gap-2"}>
                                <p>ID: {product.id}</p>
                                <p className={"line-clamp-2 max-w-[70%]"}>{product.name}</p>
                            </div>
                            <div className={"flex flex-row gap-2"}>
                                <p>Stock: {product.stock}</p>
                                <p>Price: {product.regular_price} sek</p>
                            </div>

                        </div>
                        <div className={"flex flex-col justify-around align-center"}>
                            <button className={"text-red-500 hover:underline"} onClick={() => {
                                handleDelete(product.id)
                            }}>Delete
                            </button>
                            <button className={"text-blue-500 hover:underline"}>
                                <Link to={`/admin/manage-products/${product.id}`}>Edit</Link></button>
                        </div>
                    </li>)}
            </ul>
        </>

    )

}