import IOrderItem from "@interfaces/IOrderItem.ts";
import apiClient from "../services/requests.ts";

export const updateOrderItem = async (id: IOrderItem["id"], newQuantity: IOrderItem["quantity"]) => {
    try {
        await apiClient.patch(`/order-items/${id}`, {quantity: newQuantity})
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const deleteOrderItem = async (id: IOrderItem["id"]) => {
    try {
        await apiClient.delete(`/order-items/${id}`);
    } catch (error) {
        console.error(error);
        throw error;
    }
}