import Image from "next/image"
import { FC, useState, useEffect, useCallback } from "react"
import { ProductFilters } from "../../models"
import dynamic from "next/dynamic";
import { ModuleProps } from "../../components/layout/module.component";
import { StripeItemReference } from "@hype-charms/types";
import { filterProducts } from "../../utils/products/filter-products";
import { ProductDisplay } from "../../components/products/product-display";

const Module = dynamic<ModuleProps>(() => import("../../components/layout/module.component").then((data) => data.Module))

type ProductWrapperProps = {
    items?: StripeItemReference[],
    loadedItemQuantity: number,
    title: string,
    description: string,
    image: string,
    children?: JSX.Element
}
export const ProductPageWrapperComponent: FC<ProductWrapperProps> = ({ items, loadedItemQuantity, title, description, image, children }) => {

    const [filter, setFilter] = useState<ProductFilters>();
    const [filteredItems, setFilteredItems] = useState<StripeItemReference[] | undefined>(items)
    useEffect(() => setFilteredItems(filterProducts(items, filter)), [filter])
    return (
        <ProductPageLayout
            title={title}
            description={description}
            image={image}
            loadedItemQuantity={loadedItemQuantity}
            onSetFilter={(key) => setFilter(key)}
        >
            {filteredItems ? <Module>
                <main id="products-main" className="w-full">
                    {filteredItems.map((product, idx) => <ProductDisplay id=" product-page" key={idx} product={product} />)}
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
        <section className={classes.bannerContainer}>
            <div className={classes.bannerTextContainer}>
                <h2 className="text-4xl text-secondary-dark">{title}</h2>
                <p className="text-xl text-secondary">
                    {description}
                </p>
            </div>
            <div className={classes.bannerImageContainer}>
                <Image src={image ? image : "/assets/main-backgrounds/rick-and-morty-grad.jpg"} alt="" height={350} width={700} />
            </div>
        </section>
        <section className={classes.headerContainer}>
            <p className={classes.headerTextContainer}>{loadedItemQuantity} PRODUCTS</p>
            <select className={classes.headerSelect}>
                {Object.values(ProductFilters).map(x => <option onClick={() => setFilter(x)} key={x} className="rounded-none text-secondary-light text-opacity-80">{x}</option>)}
            </select>
        </section>
        {children}
    </div>)
}

const classes = {
    bannerContainer: ` bg-secondary-light w-screen h-fit min-w-[90vw] flex-row flex flex-wrap justify-between`,
    bannerTextContainer: ` xl:min-w-[26rem] lg:min-w-[26rem] w-[30vw] min-w-[100vw] h-fit-content max-h-80 xl:p-12 lg:p-12 md:p-12 p-4 flex flex-col justify-center`,
    bannerImageContainer: ` xl:min-w-[40rem] lg:min-w-[40rem] w-[30vw] min-w-[100vw] h-fit-content max-h-80 overflow-clip flex items-center justify-center`,
    headerContainer: ` xl:py-8 lg:py-8 md:py-8 xl:w-[80vw] lg:w-[80vw] md:w-[80vw] flex flex-row justify-between items-end w-[80vw] flex-wrap gap-y-4 pt-4`,
    headerTextContainer: ` text-secondary text-xl xl:w-60 lg:w-60 md:w-60`,
    headerSelect: ` rounded-none xl:w-60 lg:w-60 md:w-60 w-full h-12 px-3 bg-secondary-dark text-secondary-light text-opacity-80`
}
