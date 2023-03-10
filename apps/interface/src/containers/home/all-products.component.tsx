import { FC } from "react"
import { Module } from "../../components/layout/module.component"
import { ProductMetadata } from "../../models/product.model"
import dynamic from "next/dynamic"
import { ProductDisplayProps } from "../../components/products/product-display"
import { StripeItemReference } from "@hype-charms/types"

const ProductDisplay = dynamic<ProductDisplayProps>(() => import("../../components/products/product-display").then(data => data.ProductDisplay))

export interface AllProductsModuleProps {
    products: StripeItemReference<ProductMetadata>[]
}
export const AllProductsModule: FC<AllProductsModuleProps> = ({ products }): JSX.Element => {
    return (
        <Module height="" title="FEATURED" href="/products">
            <div className="flex flex-row overflow-x-auto gap-14 pb-14 px-4">
                {products.length > 0 && products.map((product, idx) =>
                    <ProductDisplay id=" featured" bg_color="" key={idx} product={product} />
                )}
            </div>
        </Module>
    )
} 