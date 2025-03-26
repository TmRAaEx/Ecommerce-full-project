import useProducts from "@hooks/useProducts.ts";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {IProduct} from "@interfaces/IProduct.ts";
import {AddToCartButton} from "@ui/Buttons.tsx";
import PageContainer from "@ui/PageContainer.tsx";
import ProductPrice from "@ui/ProductPrice.tsx";

export default function ProductPage() {

    const {getProductById, loading, error} = useProducts();
    const {id} = useParams();

    const [product, setProduct] = useState<IProduct | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await getProductById(id ? id : "");
            setProduct(productData ? productData : null)
        }
        fetchProduct().then();
    }, [id])

    console.log(product);

    if (loading) return <>Loading....</>
    if (error) return <>{error}</>

    if (!product) {
        return null;
    }
    return <>

        <PageContainer className={"bg-white p-3 gap-3 max-w-xl lg:max-w-3xl mx-auto"}>
            <div>
                <h1 className={"text-3xl font-semibold"}>{product.name}</h1>
                <p className={"text-md text-gray-600 capitalize"}>{product.category}</p>
            </div>
            <div className={"flex items-center justify-center w-full"}>
                <img src={product.image} alt={product.name} className={"w-4/5"}/>
            </div>
            <div className={"flex flex-col gap-2"}>
                <ProductPrice product={product}/>

                <AddToCartButton product={product}/>
            </div>
            <div>
                <p className={"text-xl text-black font-medium"}>Description:</p>
                <p className={"text-lg text-black font-medium"}>{product.description}</p>
            </div>
        </PageContainer>
    </>
}