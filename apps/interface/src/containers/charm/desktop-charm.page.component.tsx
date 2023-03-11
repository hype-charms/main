import { FC, useMemo, useState } from "react"
import Image from 'next/image'
import { ProductDetail } from "./product-detail.component"
import { StripeItemReference } from "@hype-charms/types";

export const CharmPageComponent: FC<{ product: StripeItemReference }> = ({ product }): JSX.Element => {

    const [activeImage, setActiveImage] = useState<string>('');
    const [images, setImages] = useState<string[]>([]);

    useMemo(() => {
        setActiveImage((product.images && product.images[0]) ?? "");
        if (product?.images) {
            const imageArr = product.images;
            if (typeof imageArr !== "string") {
                setImages(imageArr);
            }
        }
    }, [product])

    if (product) {
        return (
            <main id="single-product-page" className={ProductsClasses.products}>
                <div className="w-[30vw] flex flex-col justify-center items-stretch gap-4 pt-3">
                    <div className="w-full flex justify-center items-center pt-20 bg-secondary-light shadow">
                        <Image src={activeImage} alt="" height={400} width={400} />
                    </div>
                    {images?.map((image, idx) =>
                        <div key={idx} className="w-full flex justify-center items-center pt-20 bg-secondary-light shadow">
                            <Image src={image} alt="" height={400} width={400} />
                        </div>)}
                </div>
                <div className="w-[30vw] text-black flex flex-col max-w-[90vw] gap-y-6 h-fit pt-12 sticky top-20">
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
    products: ` w-[90vw] mx-[10vw] p-[5vw]`,
    addToCart: ` h-12 hover:opacity-80 transition-all`,
    imageWrapper: ` h-[500px] w-[500px] cursor-pointer -translate-x-12`,
    clipper: ` h-[430px] w-[330px] overflow-clip`,
    productContainer: ` flex flex-col justify-center items-center my-16 py-12`
}

