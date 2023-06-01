import { ProductFilters, ShopifyItemReference } from "@hype-charms/types";
import React, { FC, useCallback, useState } from "react";
import { Module } from "../module.component";
import { ShopifyProductDisplayComponent } from "../../shopify";
import Image from "next/image"

interface ProductWrapperProps {
    items?: ShopifyItemReference[],
    loadedItemQuantity: number,
    title: string,
    description: string,
    image: string,
    children?: JSX.Element
}
export const ProductPageWrapperComponent: FC<ProductWrapperProps> = ({ items, loadedItemQuantity, title, description, image, children }) => {

    const [filter, setFilter] = useState<ProductFilters>();
    return (
        <ProductPageLayout
            title={title}
            description={description}
            image={image}
            loadedItemQuantity={loadedItemQuantity}
            onSetFilter={(key) => setFilter(key)}
        >
            {items ? <Module>
                <main id="products-main" className="w-full">
                    <>{items.map((product, idx) => <ShopifyProductDisplayComponent size="md" id=" product-page" key={idx} product={product} />)}
                    </>
                </main>
            </Module>
                :
                <>{children}</>
            }
        </ProductPageLayout>
    )
}

interface ProductPageLayoutProps extends ProductWrapperProps {
    onSetFilter: (key: ProductFilters) => void
}
const ProductPageLayout: FC<ProductPageLayoutProps> = ({ children, title, description, image, loadedItemQuantity, onSetFilter }) => {
    const setFilter = useCallback((key: ProductFilters) => onSetFilter(key), [onSetFilter])
    return (<div className="px-40 flex flex-col items-center">
        <section className="">
            <div className="">
                <h2 className="text-4xl text-secondary-dark">{title}</h2>
                <p className="text-xl text-secondary">
                    {description}
                </p>
            </div>
            <div className="">
                <Image src={image ? image : "/assets/main-backgrounds/rick-and-morty-grad.jpg"} alt="" height={350} width={700} />
            </div>
        </section>
        <section className="">
            <p className="">{loadedItemQuantity} PRODUCTS</p>
            <select className="">
                {Object.values(ProductFilters).map(x => <option onClick={() => setFilter(x)} key={x} className="rounded-none text-secondary-light text-opacity-80">{x}</option>)}
            </select>
        </section>
        {children}
    </div>)
}