import {IProduct} from "@interfaces/IProduct.ts";
import ProductCard from "@components/Shop/ProductCard.tsx";

export default function ProductGrid({products, loading}: { products: IProduct[], loading: boolean }) {
    return <>
        <ul className={"grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4 max-w-[900px]"}>
            {loading && products.length === 0 && "loading..."}
            {products?.map(product =>
                <li key={product.id}>
                    <ProductCard product={product}/>
                </li>
            )}
        </ul>
    </>
}