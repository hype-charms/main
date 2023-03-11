import { FC, useEffect, useState } from "react";
import { useNavigateToProduct } from "../../+state/hooks";
import Image from 'next/image'
import { Currency, ProductType, StripeItemReference } from "@hype-charms/types";
import { formatPrice } from "@hype-charms/client";

export interface ProductDisplayProps {
    product: StripeItemReference,
    bg_color?: string,
    width?: string,
    id: string
}
export const ProductDisplay: FC<ProductDisplayProps> = ({ product, bg_color, width, id }): JSX.Element => {

    const navigateToProduct = useNavigateToProduct();
    const [itemState, setItemState] = useState(true);

    useEffect(() => {
        const hasInventory = !product.inventory || product.inventory === 0
        const hasPrice = !product?.unit_amount
        setItemState(hasInventory || hasPrice)
    }, [product])

    const navigate = () => {
        if (product.type === ProductType.PRODUCT) {
            navigateToProduct(product.id);
        } else {
            navigateToProduct(product.id);
        }
    }

    return (
        <div key={product.id} className={ProductClasses.productContainer(bg_color, width)}>
            <div className={ProductClasses.clipper(width)} >
                <button id={product.name + id}
                    type="button"
                    aria-label={`opens a product page for the product ${product.name}`}
                    key={product.id}
                    className={ProductClasses.imageWrapper(itemState)}
                    disabled={itemState}
                    onClick={() => navigate()}
                >
                    <span className="xl:hidden lg:hidden md:hidden block">
                        <Image src={product?.images ? product.images[0] ?? '' : ''} alt={product.description} height={140} width={140} />
                    </span>
                    <span className="xl:block lg:block md:flex hidden">
                        <Image src={product?.images ? product.images[0] ?? '' : ''} alt={product.description} height={180} width={180} />
                    </span>
                </button>
            </div>
            <div className="w-full h-fit flex flex-row justify-between items-center p-2 bg-primary text-primary-text">
                {product.inventory && product.inventory > 0 ? <span className="w-full flex flex-row items-between justify-between">
                    <div className="w-full">
                        <h3 className={`text-left xl:text-xl lg:text-xl md:text-lg sm:text-md`}>{`${product.name?.slice(0, 12)}${product.name?.split('')[12] !== undefined ? '...' : ''}`}</h3>
                        {
                            product?.unit_amount ?
                                <p className="text-left xl:text-sm lg:text-sm md:text-xs sm:text-xs">{formatPrice(product.unit_amount, Currency.AUD, 1)}</p>
                                : <p className="text-black">sold out</p>
                        }
                    </div>
                </span> : <span className="w-full flex flex-row items-between justify-between">
                    <div className="w-full">
                        <h3 className={`text-left xl:text-xl lg:text-xl md:text-lg sm:text-md`}>{`${product.name?.slice(0, 12)}${product.name?.split('')[12] !== undefined ? '...' : ''}`}</h3>
                        <p className="text-left xl:text-sm lg:text-sm md:text-xs sm:text-xs">sold out</p>
                    </div>
                </span>}
            </div>
        </div>
    )
}

const ProductClasses = {
    products: ` `,
    imageWrapper: (disabled: boolean) => ` ${disabled ? 'opacity-50' : 'hover:scale-110'} 
    h-full w-full
     bg-secondary-light cursor-pointer transition-all flex justify-center items-center
       `,
    clipper: (width?: string) => `${width ? width : 'xl:w-[18rem]  lg:w-[18rem]'} h-full w-full overflow-clip min-w-[10rem]`,
    productContainer: (bg_color?: string, width?: string) => ` ${bg_color} ${width ? width : 'xl:w-[18rem]  lg:w-[18rem]'}
    flex flex-col justify-start items-start shadow 
    xl:h-[20rem] 
    lg:h-[20rem]
    `
}