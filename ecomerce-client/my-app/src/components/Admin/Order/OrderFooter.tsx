import IOrder from "@interfaces/IOrder.ts";
import {useNavigate} from "react-router";


interface OrderCardFooterProps {
    order: IOrder;
    isExpanded: boolean;
    toggleExpanded: () => void;
}


export const OrderCardFooter = ({order, isExpanded, toggleExpanded}: OrderCardFooterProps) => {
    const total = order.order_items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);

    const navigate = useNavigate();
    return (
        <div className="flex justify-between items-center bg-gray-100 p-4 border-t">
            <span className="font-semibold text-lg text-gray-800">Total: {total} SEK</span>
            <div className="flex gap-4">
                {order.order_items.length > 2 && (
                    <button className="text-blue-500 hover:underline" onClick={toggleExpanded}>
                        {isExpanded ? "Show Less" : "Show More"}
                    </button>
                )}
                <button className="text-blue-500 font-semibold hover:underline" onClick={() => navigate(`${order.id}`)}>
                    Manage
                </button>
            </div>
        </div>
    );
};
