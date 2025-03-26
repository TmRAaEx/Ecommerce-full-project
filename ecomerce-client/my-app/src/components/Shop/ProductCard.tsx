import {AddToCartButton} from "@ui/Buttons.tsx";
import {Link} from "react-router";
import {IProduct} from "@interfaces/IProduct.ts";
import ProductPrice from "@ui/ProductPrice.tsx";

export default function ProductCard({product}: { product: IProduct }) {
    {/*Modified version of https://componentland.com/component/product-card-2*/
    }
    const discount = (100 * (1 - (product.price / product.regular_price))).toFixed(0)
    return (
        <div
            className="relative flex w-full p-3 flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md ">
            {Number(discount) > 0 && (
                <span
                    className="absolute top-2 left-2 bg-red-500 text-white text-md font-bold px-2 py-1 rounded-full z-999">
            -{discount}%
        </span>
            )}
            <Link to={`/products/${product.id}`}>
                <div className={"flex w-full h-96 justify-around flex-col"}>
                                <span
                                    className="relative  w-full p-1 flex h-60 overflow-hidden rounded-xl flex justify-center align-center">
                                    <img className="object-scale-down"
                                         src={product.image}
                                         alt="product image"/>

                                </span>
                    <div className="mt-4 px-5 pb-5">
                        <span>
                        <h5 className="text-xl tracking-tight text-slate-900 line-clamp-2">{product.name}</h5>
                        <h6 className={"text-md text-gray-600"}>{product.category}</h6>
                        </span>
                        <ProductPrice product={product}/>
                    </div>
                </div>
            </Link>
            <AddToCartButton product={product}/>
        </div>
    )
}