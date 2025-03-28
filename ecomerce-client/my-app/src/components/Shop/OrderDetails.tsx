import IOrderItem from "@interfaces/IOrderItem.ts";
import Price from "@ui/Price.tsx";

interface OrderProps {
    order_items: IOrderItem[];
    order_status: string;
    total_price: number;
}

export default function OrderDetails({order_items, order_status, total_price}: OrderProps) {
    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

            {/* Order Status */}
            <div className="mb-4">
                <span className="font-medium text-lg">Order Status:</span>
                <span className="ml-2 text-blue-500">{order_status}</span>
            </div>

            {/* Order Items List */}
            <ul className="space-y-4">
                {order_items.map((item) => (
                    <li key={item.id} className="flex justify-between items-center p-4 border-b">
                        <div className="flex items-center">
                            <span className="font-medium text-lg">{item.product_name}</span>
                            <span className="ml-2 text-sm text-gray-600">x{item.quantity}</span>
                        </div>
                        <span className="text-xl font-semibold text-green-500">
              <Price price={item.unit_price * item.quantity}/>
            </span>
                    </li>
                ))}
            </ul>

            {/* Total Price */}
            <div className="mt-4 flex justify-between items-center font-semibold text-xl">
                <span>Total:</span>
                <span className="text-blue-600"><Price price={total_price}/></span>
            </div>
        </div>
    );
};

