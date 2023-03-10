import Image from "next/image"
import { FC, useState, useEffect } from "react"
import { ProductFilters } from "../../models"
import dynamic from "next/dynamic";
import { ModuleProps } from "../../components/layout/module.component";
import { ProductsPageProps } from "./products-page";
import { StripeItemReference } from "@hype-commerce/types";

const Module = dynamic<ModuleProps>(() => import("../../components/layout/module.component").then((data) => data.Module))
const ProductsPage = dynamic<ProductsPageProps>(() => import("./products-page").then((data) => data.ProductsPage))

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
    const [filteredItems, setFilteredItems] = useState<StripeItemReference[]>()

    useEffect(() => {
        setFilteredItems(items);
    }, [])

    useEffect(() => {
        let sorted: StripeItemReference[] | undefined
        let invalidPrices: StripeItemReference[] | undefined
        switch (filter) {
            case ProductFilters.A_TO_Z:
                sorted = items?.map(x => x).sort((a, b) => ('' + a.name).localeCompare(b.name!))
                setFilteredItems(sorted);
                break;
            case ProductFilters.Z_TO_A:
                sorted = items?.map(x => x).sort((a, b) => ('' + b.name).localeCompare(a.name!))
                setFilteredItems(sorted);
                break;
            case ProductFilters.FEATURED:
                sorted = items
                setFilteredItems(sorted);
                break;
            case ProductFilters.HIGH_TO_LOW:
                sorted = items?.filter(x => x.unit_amount).map(x => x).sort((a, b) => b.unit_amount! - a.unit_amount!)
                invalidPrices = items?.filter(x => !x.unit_amount)
                if (sorted && invalidPrices) {
                    setFilteredItems([...sorted, ...invalidPrices]);
                }
                break;
            case ProductFilters.LOW_TO_HIGH:
                sorted = items?.filter(x => x.unit_amount).map(x => x).sort((a, b) => a.unit_amount! - b.unit_amount!)
                invalidPrices = items?.filter(x => !x.unit_amount)
                setFilteredItems(sorted);
                if (sorted && invalidPrices) {
                    setFilteredItems([...sorted, ...invalidPrices]);
                }
                break;
            case ProductFilters.NEW_TO_OLD:
                sorted = items?.map(x => x).sort((a, b) => b.created! - a.created!)
                setFilteredItems(sorted);
                break;
            case ProductFilters.OLD_TO_NEW:
                sorted = items?.map(x => x).sort((a, b) => a.created! - b.created!)
                setFilteredItems(sorted);
                break;
        }
    }, [filter])

    return (<>
        {filteredItems ? <div className="px-40 flex flex-col items-center">
            <section className="bg-secondary-light w-screen h-fitmin-w-[90vw]">
                <div className=" m-auto flex flex-row flex-wrap justify-between w-5/6 min-w-[100vw]">
                    <div className="xl:min-w-[26rem] lg:min-w-[26rem] w-[30vw] min-w-[100vw] h-fit-content max-h-80 xl:p-12 lg:p-12 md:p-12 p-4 flex flex-col justify-center">
                        <h2 className="text-4xl text-secondary-dark">{title}</h2>
                        <p className="text-xl text-secondary">
                            {description}
                        </p>
                    </div>
                    <div className="xl:min-w-[40rem] lg:min-w-[40rem] w-[30vw] min-w-[100vw] h-fit-content max-h-80 overflow-clip flex items-center justify-center">
                        <Image src={image ? image : "/assets/main-backgrounds/rick-and-morty-grad.jpg"} alt="" height={350} width={700} />
                    </div>
                </div>
            </section>
            <span className="xl:py-8 lg:py-8 md:py-8 xl:w-[80vw] lg:w-[80vw] md:w-[80vw] flex flex-row justify-between items-end w-[80vw] flex-wrap gap-y-4 pt-4">
                <p className="text-secondary text-xl xl:w-60 lg:w-60 md:w-60">{loadedItemQuantity} PRODUCTS</p>
                <select className="rounded-none xl:w-60 lg:w-60 md:w-60 w-full h-12 px-3 bg-secondary-dark text-secondary-light text-opacity-80">
                    {Object.values(ProductFilters).map(x => <option onClick={() => setFilter(x)} key={x} className="rounded-none text-secondary-light text-opacity-80">{x}</option>)}
                </select>
            </span>
            <Module>
                <ProductsPage products={filteredItems} />
            </Module>
        </div> :
            <div className="px-40 flex flex-col items-center">
                <section className="bg-secondary-light w-screen h-fitmin-w-[90vw]">
                    <div className=" m-auto flex flex-row flex-wrap justify-between w-5/6 min-w-[100vw]">
                        <div className="xl:min-w-[26rem] lg:min-w-[26rem] w-[30vw] min-w-[100vw] h-fit-content max-h-80 xl:p-12 lg:p-12 md:p-12 p-4 flex flex-col justify-center">
                            <h2 className="text-4xl text-secondary-dark">{title}</h2>
                            <p className="text-xl text-secondary">
                                {description}
                            </p>
                        </div>
                        <div className="xl:min-w-[40rem] lg:min-w-[40rem] w-[30vw] min-w-[100vw] h-fit-content max-h-80 overflow-clip flex items-center justify-center">
                            <Image src={image ? image : "/assets/main-backgrounds/rick-and-morty-grad.jpg"} alt="" height={350} width={700} />
                        </div>
                    </div>
                </section>
                <span className="xl:py-8 lg:py-8 md:py-8 xl:w-[80vw] lg:w-[80vw] md:w-[80vw] flex flex-row justify-between items-end w-[80vw] flex-wrap gap-y-4 pt-4">
                    <p className="text-secondary text-xl xl:w-60 lg:w-60 md:w-60">{loadedItemQuantity} PRODUCTS</p>
                    <select className="rounded-none xl:w-60 lg:w-60 md:w-60 w-full h-12 px-3 bg-secondary-dark text-secondary-light text-opacity-80">
                        {Object.values(ProductFilters).map(x => <option onClick={() => setFilter(x)} key={x} className="rounded-none text-secondary-light text-opacity-80">{x}</option>)}
                    </select>
                </span>
                {children}
            </div>}
    </>
    )
}