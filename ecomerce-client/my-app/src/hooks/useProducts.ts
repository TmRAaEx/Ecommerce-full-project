import {useEffect, useState} from "react";
import {IProduct} from "@interfaces/IProduct.ts";
import errorChecker from "../utils/errorLogger.ts";
import apiClient from "../services/requests.ts";
import {IPostResponse} from "@interfaces/IPostResponse.ts";


export default function useProducts() {
    const [loading, setLoading] = useState(false);
    const cachedProducts = localStorage.getItem("products") || "";
    const [products, setProducts] = useState<IProduct[]>(cachedProducts ? JSON.parse(cachedProducts) : []);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);

        apiClient.get<IProduct[]>("/products")
            .then((data) => {
                setProducts(data);
            })
            .catch(error => {
                console.error(error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);

    const getProductById = async (id: string) => {
        if (products.length > 0) {
            return products.find((product) => product.id === parseInt(id)) || null;
        }
        setLoading(true);
        try {
            return await apiClient.get<IProduct>(`/products/${id}`);
        } catch (error) {
            console.error(error);
            setError(errorChecker(error));
            return null;
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async (product: IProduct) => {
        const oldProducts = [...products];
        try {
            setProducts(prevState =>
                prevState.map(current => (current.id !== product.id ? {...current} : product))
            );
            await apiClient.patch(`/products/${product.id}`, product);
        } catch (error) {
            console.error(error);
            setError(errorChecker(error));
            rollback(oldProducts);
        }
    };

    const createProduct = async (product: IProduct) => {
        setLoading(true);
        try {
            const response = await apiClient.post<IPostResponse>("/products", product);
            setProducts(prevState => [...prevState, {...product, id: response.insertedID as number}]);
        } catch (error) {
            console.error(error);
            setError(errorChecker(error));
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id: IProduct["id"]) => {
        const oldProducts = [...products];
        try {
            setProducts(prevState => prevState.filter(current => current.id !== id));
            await apiClient.delete(`/products/${id}`);
        } catch (error) {
            console.error(error);
            setError(errorChecker(error));
            rollback(oldProducts);
        }
    };

    const rollback = (oldProducts: IProduct[]) => {
        setProducts(oldProducts);
    };

    return {products, loading, error, getProductById, updateProduct, createProduct, deleteProduct};
}
