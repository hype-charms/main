import { FC, useMemo, useState } from "react"
import Image from 'next/image'
import { ProductDetail } from "./product-detail.component"
import { StripeItemReference } from "@hype-charms/types";

export const MobileCharmPageComponent: FC<{ product: StripeItemReference }> = ({ product }): JSX.Element => {

    const [images, setImages] = useState<string[]>([]);
    useMemo(() => {
        if (product.images) {
            const imageArr = product.images
            if (typeof imageArr !== "string" && product.images) {
                setImages([...product.images, ...imageArr]);
            } else if (typeof imageArr !== "string") {
                setImages(imageArr)
            }
        }
    }, [product])

    if (product) {
        return (
            <main className={ProductsClasses.products}>
                <div className="w-screen overflow-x-scroll pb-8">
                    <div className="flex flex-row w-fit justify-center items-center h-[27rem]">
                        {images?.map((image, idx) =>
                            <div key={idx} className=" items-center w-[40rem] max-w-[90vw] mx-[5vw] flex flex-col justify-center shadow-lg bg-secondary-light h-full">
                                <Image src={image} alt="" height={300} width={300} />
                            </div>)}
                    </div>
                </div>
                <div className="w-[40rem] max-w-[100vw] flex flex-col justify-center items-stretch px-[5vw] ">
                    <ProductDetail product={product} />
                </div>
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
    products: ` w-full flex flex-col py-12 items-center`,
    addToCart: ` h-12 hover:opacity-80 transition-all`,
    imageWrapper: ` h-[500px] w-[500px] cursor-pointer -translate-x-12`,
    clipper: ` h-[430px] w-[330px] overflow-clip`,
    productContainer: ` flex flex-col justify-center items-center my-16 py-12`
}
