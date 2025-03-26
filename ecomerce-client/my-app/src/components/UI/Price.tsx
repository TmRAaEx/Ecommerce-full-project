export default function Price({price}: { price: number }) {

    const formatPrice = (price: number) => {
        const formated = new Intl.NumberFormat("sv-SV", {style: "currency", currency: "SEK"}).format(
            price,
        )
        return formated.split(",")[0]
    }
    return <>{formatPrice(price)} kr</>
}