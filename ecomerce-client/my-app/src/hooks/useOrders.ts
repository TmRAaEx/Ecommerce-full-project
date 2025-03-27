import {useEffect, useState} from "react";
import IOrder from "@interfaces/IOrder.ts";
import errorChecker from "../utils/errorLogger.ts";
import apiClient from "../services/requests.ts";
import {ICustomer} from "@interfaces/ICustomer.ts";
import {ICartItem} from "@interfaces/IProduct.ts";
import IOrderItem from "@interfaces/IOrderItem.ts";
import {IPostResponse} from "@interfaces/IPostResponse.ts";

export const useOrders = () => {
    const cachedOrders: string = localStorage.getItem("orders") || "";
    const [orders, setOrders] = useState<IOrder[]>(cachedOrders ? JSON.parse(cachedOrders) : []);


    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);


    useEffect(() => {
        setLoading(true);

        apiClient.get<IOrder[]>("/orders")
            .then((data) =>
                Promise.all(data.map((order: IOrder) => getOrderById(order.id as IOrder["id"])))
            )
            .then((allOrders) => {
                setOrders(allOrders);
            })
            .catch((error) => {
                console.error(error);
                setError(errorChecker(error));
            })
            .finally(() => setLoading(false));
    }, []);


    const createOrder = async (customer: ICustomer, cartItems: ICartItem[]) => {
        setLoading(true);
        try {
            const orderItems: Partial<IOrderItem>[] = cartItems.map(item => ({
                product_id: item.id as number,
                product_name: item.name,
                quantity: item.quantity,
                unit_price: item.price,
                created_at: "",
                image_url: item.image
            }));

            const orderData = {
                customer_id: customer.id,
                payment_status: "unpaid",
                payment_id: null,
                order_status: "pending",
                order_items: [...orderItems]
            };




            //create order
            const response = await apiClient.post<IPostResponse>("/orders", orderData);
            // fetch full order data
            const fullOrder = await getOrderById(response.insertedID as IOrder["id"]);

            setOrders(prevState => [...prevState, fullOrder]);
            return fullOrder;
        } catch (error) {
            console.error(error);
            setError(errorChecker(error));
            throw error;
        } finally {
            setLoading(false)
        }

    }

    const getOrderByPaymentID = async (id: IOrder["payment_id"]) => {
        const orderInList = orders.find((order) => order.payment_id === id);
        if (orderInList) return orderInList;
        try {
            return await apiClient.get<IOrder>(`/orders/paymentID/${id}`);
        } catch (error) {
            console.error(error);
            setError((errorChecker(error)));
            throw error; // Re-throw the error to be caught by the outer promise chain
        }
    };

    const getOrderById = async (id: IOrder["id"]) => {
        const orderInList = orders.find((order) => order.id === id);
        if (orderInList) return orderInList;
        try {
            return await apiClient.get<IOrder>(`/orders/${id}`);
        } catch (error) {
            console.error(error);
            setError((errorChecker(error)));
            throw error; // Re-throw the error to be caught by the outer promise chain
        }
    };

    const deleteOrder = async (id: IOrder["id"]) => {
        const oldOrders = orders
        try {
            setOrders((prevState) =>
                prevState.filter(order => order.id !== id)
            )
            const response = await apiClient.delete(`/orders/${id}`);
            console.log(response);

        } catch (error) {
            console.error(error);
            rollback(oldOrders)
            setError((errorChecker(error)));
            throw error;
        }
    }

    const updateOrder = async (newOrder: IOrder) => {
        const oldOrders = orders;
        try {
            setOrders((prevState) => prevState.map(current => current.id === newOrder.id ? newOrder : current));
            await apiClient.patch(`/orders/${newOrder.id}`, newOrder);
        } catch (error) {
            console.error(error);
            rollback(oldOrders)
            setError(errorChecker(error))
            throw error;
        }
    }

    const rollback = (oldOrders: IOrder[]) => {
        setOrders(oldOrders);
        localStorage.setItem("orders", JSON.stringify(oldOrders));
    }


    return {orders, error, loading, deleteOrder, updateOrder, getOrderById, createOrder, getOrderByPaymentID};
};
