import useProducts from "@hooks/useProducts.ts";
import ProductGrid from "@components/Shop/ProductGrid.tsx";
import PageContainer from "@ui/PageContainer.tsx";

export default function Products() {
    const {products, loading, error} = useProducts();

    if (error) return <>{error}</>;
    return <>
        <PageContainer>
            <h1 className={"text-xl"}> Products</h1>
            <ProductGrid products={products} loading={loading}/>
        </PageContainer>
    </>
}