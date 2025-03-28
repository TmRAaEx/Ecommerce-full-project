import {useOrders} from "@hooks/useOrders.ts";
import OrderCard from "@components/Admin/Order/Order.tsx";
import LoadingOrder from "@components/Admin/Order/LoadingOrder.tsx";
import {SubmitButton} from "@ui/Buttons.tsx";

export default function ManageOrders() {
    const {orders = [], error, loading, deleteOrder, updateOrder, refreshOrders} = useOrders()


    if (error) return <>{error}</>


    return <>
        <div className={"max-w-lg mx-auto mb-3"}>
            <SubmitButton onClick={refreshOrders}>Refresh</SubmitButton>
        </div>
        <ul className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 mx-auto">
            {loading && orders.length === 0 && (
                <li className="col-span-full">
                    <LoadingOrder/>
                </li>
            )}

            {orders?.map((order) => (
                <li key={order.id}>
                    <OrderCard order={order} deleteOrder={deleteOrder} updateOrder={updateOrder}/>
                </li>
            ))}
        </ul>
    </>

}