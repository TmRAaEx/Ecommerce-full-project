import {useOrders} from "@hooks/useOrders.ts";
import {useParams, useNavigate} from "react-router";
import {useState, useEffect, ChangeEvent} from "react";
import PageContainer from "@ui/PageContainer.tsx";
import IOrder from "@interfaces/IOrder.ts";
import {SubmitButton} from "@ui/Buttons.tsx";
import IOrderItem from "@interfaces/IOrderItem.ts";

export default function OrderPage() {
    const {getOrderById, updateOrder, loading, error} = useOrders();
    const {id} = useParams();
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState<IOrder | null>(null);

    useEffect(() => {
        if (!id) return;
        const fetchOrder = async () => {
            const order = await getOrderById(Number(id));
            if (order) setOrderData(order);
        };
        fetchOrder();
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!orderData) return;
        setOrderData({...orderData, [e.target.name]: e.target.value});
    };

    const handleOrderItemChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        if (!orderData) return;
        const updatedItems = [...orderData.order_items];
        updatedItems[index] = {...updatedItems[index], [e.target.name]: e.target.value};
        setOrderData({...orderData, order_items: updatedItems});
    };

    const handleSubmit = async () => {
        if (orderData) {
            await updateOrder(orderData);
            navigate("/admin/manage-orders");
        }
    };


    if (loading) return <PageContainer>Loading...</PageContainer>;
    if (error) return <PageContainer className="text-red-500">{error}</PageContainer>;
    if (!orderData) return null;

    const total_price = orderData.order_items.reduce((sum: number, item: IOrderItem) => sum + item.unit_price * item.quantity, 0);
    return (
        <PageContainer>

            <div className={"bg-white p-3 rounded-md flex flex-col gap-3 max-w-[900px] w-full"}>
                <h2 className="text-2xl font-bold mb-4">Edit Order #{orderData.id}</h2>

                {/* Customer Info - Read Only */}
                <div className="bg-gray-300 p-4 rounded-md">
                    <h3 className="text-lg font-semibold">Customer Information</h3>
                    <p>{orderData.customer_firstname} {orderData.customer_lastname}</p>
                    <p>{orderData.customer_email}</p>
                    <p>{orderData.customer_phone}</p>
                    <p>{orderData.customer_street_address}, {orderData.customer_city}, {orderData.customer_country}</p>
                </div>

                {/* Editable Order Details */}
                <div className="mt-4">
                    <label className="block text-gray-700">Total Price:</label>
                    <input
                        type="number"
                        name="total_price"
                        value={total_price}
                        onChange={handleChange}
                        disabled
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-gray-700">Payment Status:</label>
                    <select
                        name="payment_status"
                        value={orderData.payment_status}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="unpaid">Unpaid</option>
                        <option value="paid">Paid</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>

                <div className="mt-4">
                    <label className="block text-gray-700">Payment ID (Read-Only):</label>
                    <input
                        type="text"
                        name="payment_id"
                        value={orderData.payment_id || "n/a"}
                        disabled
                        className="w-full p-2 border rounded bg-gray-200 text-gray-600 cursor-not-allowed"
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-gray-700">Order Status:</label>
                    <input
                        type="text"
                        name="order_status"
                        value={orderData.order_status}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Editable Order Items */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold">Order Items</h3>
                    {orderData.order_items.map((item: IOrderItem, index: number) => (
                        <div key={item.id} className="p-4 border rounded mt-2">
                            <label className="block text-gray-700">Product Name:</label>
                            <input
                                type="text"
                                name="product_name"
                                value={item.product_name}
                                onChange={(e) => handleOrderItemChange(index, e)}
                                className="w-full p-2 border rounded"
                            />

                            <label className="block text-gray-700 mt-2">Quantity:</label>
                            <input
                                type="number"
                                name="quantity"
                                value={item.quantity}
                                onChange={(e) => handleOrderItemChange(index, e)}
                                className="w-full p-2 border rounded"
                            />

                            <label className="block text-gray-700 mt-2">Price:</label>
                            <input
                                type="number"
                                name="price"
                                value={item.unit_price}
                                onChange={(e) => handleOrderItemChange(index, e)}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    ))}
                </div>

                <SubmitButton onClick={handleSubmit}>Update Order</SubmitButton>
            </div>
        </PageContainer>

    );
}
