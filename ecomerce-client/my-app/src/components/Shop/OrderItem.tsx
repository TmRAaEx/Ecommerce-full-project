import Price from "@ui/Price.tsx";
import IOrderItem from "@interfaces/IOrderItem.ts";

export default function OrderItem({item}: { item: IOrderItem }) {
    return (
        <div className="flex items-center gap-4 p-4 bg-gray-300 shadow-md rounded-lg w-full">
            {/* Product Image */}
            <img
                src={item.image_url}
                alt={item.product_name}
                className="w-20 h-20 object-contain rounded-lg"
            />

            {/* Product Details */}
            <div className="flex flex-col flex-grow">
                <p className="text-md font-semibold line-clamp-2">{item.product_name}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>

            {/* Price */}
            <p className="font-semibold text-lg text-gray-800">
                <Price price={item.unit_price}/>
            </p>
        </div>
    );
}
