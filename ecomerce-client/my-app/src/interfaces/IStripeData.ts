interface PriceData {
    currency: string;
    product_data: {
        name: string;
        images: string[];
    };
    unit_amount: number;
}

export interface IStripeData {
    price_data: PriceData;
    quantity: number;
}


export interface IStripeSession {
    status: string;
    payment_status: string;
    customer_email: string;
}