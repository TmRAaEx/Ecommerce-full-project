import IOrder from "@interfaces/IOrder.ts";

interface OrderCardHeaderProps {
    order: IOrder;
}

export const OrderCardHeader = ({order}: OrderCardHeaderProps) => {
    const statusColors: { [key: string]: string } = {
        unpaid: "text-orange-600 bg-orange-100",
        paid: "text-green-600 bg-green-100",
        canceled: "text-red-600 bg-red-100",
        pending: "text-white bg-gray-500",
        received: "text-orange-600 bg-orange-100",
        packed: "text-blue-600 bg-blue-100",
        shipped: "text-green-600 bg-green-100",
    };

    return (
        <div className="flex justify-between items-center bg-gray-200 p-4 border-b">
            <span className="font-semibold text-lg text-gray-700">ID: {order.id}</span>
            <span
                className="font-semibold text-lg text-gray-700">{order.customer_firstname} {order.customer_lastname}
            </span>
            <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${statusColors[order.payment_status]}`}>{order.payment_status.toUpperCase()}
            </span>
            <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${statusColors[order.order_status]}`}>{order.order_status.toUpperCase()}
            </span>
        </div>
    );
};
