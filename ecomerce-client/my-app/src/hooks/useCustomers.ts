import {useEffect, useState} from "react";
import {ICustomer} from "@interfaces/ICustomer.ts";
import errorChecker from "@utils/errorLogger.ts";
import apiClient from "../services/requests.ts";
import {IPostResponse} from "@interfaces/IPostResponse.ts";

export const useCustomers = () => {
    const cachedCustomers = localStorage.getItem("customers") || "";
    const [customers, setCustomers] = useState<ICustomer[]>(cachedCustomers ? JSON.parse(cachedCustomers) : []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        localStorage.setItem("customers", JSON.stringify(customers));
    }, [customers]);

    useEffect(() => {
        if (customers.length > 0) return;
        setLoading(true);
        apiClient.get<ICustomer[]>("/customers")
            .then(setCustomers)
            .catch((error) => {
                console.error(error);
                setError(errorChecker(error));
            })
            .finally(() => setLoading(false));
    }, []);

    const updateCustomer = async (customer: ICustomer) => {
        const oldCustomers = customers;
        try {
            setCustomers(prevState => prevState.map(current => current.id === customer.id ? customer : current));
            await apiClient.patch(`/customers/${customer.id}`, customer);
        } catch (error) {
            console.error(error);
            setError(errorChecker(error));
            rollBack(oldCustomers);
        }
    };

    const deleteCustomer = async (id: ICustomer["id"]) => {
        const oldCustomers = customers;
        try {
            setCustomers(prevState => prevState.filter(current => current.id !== id));
            await apiClient.delete(`/customers/${id}`);
        } catch (error) {
            console.error(error);
            setError(errorChecker(error));
            rollBack(oldCustomers);
        } finally {
            setLoading(false);
        }
    };

    const createCustomer = async (customer: ICustomer) => {
        setLoading(true);
        try {
            const response = await apiClient.post<IPostResponse>("/customers", customer);
            setCustomers(prevState => [...prevState, {...customer, id: response.insertedID as number}]);
        } catch (error) {
            console.error(error);
            setError(errorChecker(error));
        } finally {
            setLoading(false);
        }
    };

    const rollBack = (oldCustomers: ICustomer[]) => {
        setCustomers(oldCustomers);
    };

    return {customers, loading, error, updateCustomer, deleteCustomer, createCustomer};
};
