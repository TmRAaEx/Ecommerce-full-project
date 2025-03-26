import {IProduct} from "@interfaces/IProduct.ts";
import Price from "@ui/Price.tsx";

export default function ProductPrice({product}: { product: IProduct }) {
    return <>
        <div className="mt-2 mb-5 flex justify-between flex-col">
            <p className={"flex flex-col"}>
                                <span
                                    className={`text-3xl font-bold ${Number(product.price) !== product.regular_price ? "text-red-500" : "text-slate-900"}`}>
                                    <Price price={product.price}/>
                                </span>

                {Number(product.price) !== product.regular_price ?

                    <span className="text-md text-slate-900 line-through">
                                    <Price price={product.regular_price}/>
                                    </span>
                    : null
                }
            </p>
        </div>
    </>
}