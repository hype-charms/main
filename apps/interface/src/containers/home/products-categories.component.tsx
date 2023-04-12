import { FC, useState } from "react"
import { useRouter } from 'next/router'
import { EmailListModule } from "../../components/emails/email-list-modal";
import { Module } from "../../components/layout/module.component";
import { Popover } from "../../components/popover/popover.component";

export interface ProductCategoriesProps {
    categories: {
        href: string,
        title: string
    }[]
}
export const ProductsCategories: FC<ProductCategoriesProps> = ({ categories }): JSX.Element => {

    const router = useRouter();
    const [marketingPopover, setMarketingPopover] = useState(false);

    const closePopover = () => setMarketingPopover(false)
    const openPopover = () => setMarketingPopover(true)

    return (
        <Module height="w-screen" title="CATEGORIES">
            <div className={CategoryClasses.productContainer}>
                {categories.map((category, idx) => {
                    return (
                        <div key={idx} className={CategoryClasses.clipper}>
                            <div onClick={() => router.push(category.href)} id="" className={CategoryClasses.imageWrapper}>
                                <h2 className={CategoryClasses.titleText}>{category.title.slice(0, 1).toUpperCase()}{category.title.slice(1)}</h2>
                                <h2 className={CategoryClasses.titleTextSmall}>{category.title.slice(0, 1).toUpperCase()}{category.title.slice(1)}</h2>
                            </div>
                        </div>
                    )
                })}
                {categories.length < 3 &&
                    <div className={`${CategoryClasses.clipper}`}>
                        <div
                            onClick={() => openPopover()}
                            className={`overflow-clip hover:scale-105 transition-all cursor-pointer h-full w-full flex flex-col justify-center items-center xl:p-8 xl:py-12 lg:p-8 lg:py-12 bg-accent-one `}>
                            <h2 className="text-3xl text-primary">More Coming Soon!</h2>
                            <p className=" text-center text-md text-primary xl:block lg:block hidden">Join our mail list to recieve updates</p>
                        </div>
                    </div>}
                {marketingPopover && <Popover position="bottom-right" title="" closePopover={() => closePopover()}>
                    <div className="px-8">
                        <EmailListModule size="big" title={"Welcome to Hype Charms"} description={"Signup to recieve 15% off"} onClose={() => closePopover()} />
                    </div>
                </Popover>}
            </div>
        </Module>
    )
}
const CategoryClasses = {
    products: ` `,
    addToCart: ` `,
    clipper: ` xl:h-[300px] lg:h-[300px] h-20 xl:w-[300px] lg:w-[300px] w-[500px] overflow-clip shadow-xl rounded max-w-[90vw]`,
    imageWrapper: ` 
    overflow-clip bg-secondary bg-opacity-80 hover:scale-105 transition-all cursor-pointer h-full w-full xl:block lg:block flex justify-center items-center
    `,
    productContainer: ` flex flex-row justify-center items-center flex-wrap gap-y-12 gap-x-12 max-w-[100vw]`,
    titleText: `
     text-3xl rounded absolute w-20 h-20 flex justify-center items-center translate-x-[6.5rem] translate-y-[7.5rem]
    xl:flex lg:flex hidden
    `,
    titleTextSmall: `
    text-3xl rounded text-white
   xl:hidden lg:hidden block
   `
}