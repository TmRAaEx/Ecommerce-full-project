import useProducts from "@hooks/useProducts.ts";
import {useParams} from "react-router";
import ProductGrid from "@components/Shop/ProductGrid.tsx";
import PageContainer from "@ui/PageContainer.tsx";

export default function Category() {
    const {products, loading, error} = useProducts();
    const {category} = useParams();


    const filteredProducts = products.filter(product => product.category === category);

    if (error) return <>{error}</>;
    return <>
        <PageContainer>
            <h1 className={"text-xl capitalize"}>{category}</h1>
            <ProductGrid products={filteredProducts} loading={loading}/>
        </PageContainer>
    </>


}