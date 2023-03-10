import { StripeItemReference } from "@hype-commerce/types"
import { FC, useEffect } from "react"
import { ProductDisplay } from "../../components/products/product-display"

export interface ProductsPageProps {
    products: StripeItemReference[]
}
export const ProductsPage: FC<ProductsPageProps> = ({ products }): JSX.Element => {
    if (products) {
        return (
            <main id="products-main" className={ProductsClasses.products}>
                {products.length > 0 && products.map((product, idx) => <ProductDisplay key={idx} product={product} />)}
            </main>
        )
    } else {
        return (
            <main className={ProductsClasses.products}>
                failed to load products
            </main>
        )
    }
}

const ProductsClasses = {
    products: ` w-full`,
}
