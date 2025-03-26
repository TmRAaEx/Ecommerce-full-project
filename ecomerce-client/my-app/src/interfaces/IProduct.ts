export interface IProduct {
    id: number | null;
    name: string;
    description: string;
    price: number;
    regular_price: number;
    stock: number;
    category: string;
    image: string;
}


export interface ICartItem {
    id: number | null;
    name: string;
    price: number;
    image: string;
    quantity?: number;
    category: string;
    stock: number;
}