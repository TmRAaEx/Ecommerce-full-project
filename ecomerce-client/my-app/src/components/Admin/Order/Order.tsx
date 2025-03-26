import IOrder from "@interfaces/IOrder.ts";
import {useState} from "react";
import IOrderItem from "@interfaces/IOrderItem.ts";
import {OrderItemRow} from "@components/Admin/Order/OrderItem.tsx";
import ConfirmModal from "@components/ConfirmModal.tsx";
import {OrderCardHeader} from "@components/Admin/Order/OrderHead.tsx";
import {OrderCardFooter} from "@components/Admin/Order/OrderFooter.tsx";
import {updateOrderItem, deleteOrderItem} from "@hooks/useOrderItem.ts";

interface OrderProps {
    order: IOrder;
    deleteOrder: (id: IOrder["id"]) => void;
    updateOrder: (newOrder: IOrder) => void;

}

export default function OrderCard({order, deleteOrder, updateOrder}: OrderProps) {
    const [editingState, setEditingState] = useState<{ id: string | null; quantity: { [key: string]: number } }>({
        id: null,
        quantity: {},
    });

    const [isExpanded, setIsExpanded] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<{ id: number; type: "order" | "orderItem" } | null>(null);

    const updateQuantity = async (id: IOrderItem["id"], value: number) => {
        setEditingState((prev) => ({
            ...prev,
            quantity: {...prev.quantity, [id as number]: Math.max(1, value)},
        }));
    };

    const saveQuantity = async (id: IOrderItem["id"]) => {
        order.order_items = order.order_items.map((item) =>
            item.id === id ? {...item, quantity: editingState.quantity[id as number]} : item
        );
        await updateOrderItem(id, editingState.quantity[id as number])
        updateOrder(order)
        setEditingState({id: null, quantity: {}});
    };

    const confirmDelete = () => {
        if (!deleteTarget) return;
        if (deleteTarget.type === "orderItem") {
            deleteOrderItem(deleteTarget.id as IOrderItem["id"]).then();
            order.order_items = order.order_items.filter((item) => item.id !== deleteTarget.id);
            if (order.order_items.length === 0) {
                deleteOrder(order.id);
            }
        } else if (deleteTarget.type === "order") {
            deleteOrder(deleteTarget.id);
        }
        setDeleteTarget(null);
    };

    const cancelDelete = () => {
        setDeleteTarget(null);
    };

    const toggleExpanded = () => setIsExpanded(!isExpanded);

    return (
        <div
            className="w-full max-w-lg min-w-[360px] lg:min-w-[400px] mx-auto border rounded-lg shadow-lg bg-white overflow-hidden">
            {deleteTarget && (
                <ConfirmModal
                    deleteText={`Are you sure you want to delete ${deleteTarget.type === "order" ? "this order" : "this item"}?`}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}

            <OrderCardHeader order={order}/>

            <div className="overflow-x-auto max-w-full">
                <table className="table-auto w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="p-3 text-sm font-semibold text-gray-700">Product</th>
                        <th className="p-3 text-sm font-semibold text-gray-700 text-center">Quantity</th>
                        <th className="p-3 text-sm font-semibold text-gray-700 text-center">Price</th>
                        <th className="p-3 text-sm font-semibold text-gray-700 text-center">Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order.order_items.slice(0, isExpanded ? order.order_items.length : 2).map((item) => (
                        <OrderItemRow
                            key={item.id}
                            item={item}
                        />
                    ))}
                    </tbody>
                </table>
            </div>

            <OrderCardFooter
                order={order}
                isExpanded={isExpanded}
                toggleExpanded={toggleExpanded}
            />
        </div>
    );
};

