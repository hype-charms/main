import React, { FC, useState } from "react";
import Image from 'next/image'
import { ShopifyItemReference } from "@hype-charms/types";
import { ProductContainer, ClipperContainer, ImageWrapper, TextContainer, TextCard, HeadingText } from "./template";
import { useThemeContext } from "../../../context";

export interface ShopifyProductDisplayProps {
    product: ShopifyItemReference,
    id: string,
    size: "md" | "lg" | "xl"
}
export const ShopifyProductDisplayComponent: FC<ShopifyProductDisplayProps> = ({ product, id }): JSX.Element => {

    const [itemState] = useState(true);
    const theme = useThemeContext();

    return (
        <ProductContainer theme={theme} key={product.id}>
            <ClipperContainer>
                <ImageWrapper theme={theme} id={product.title + id}
                    type="button"
                    aria-label={`opens a product page for the product ${product.title}`}
                    key={product.id}
                    disabled={itemState}
                    onClick={console.log}
                >
                    <span className="xl:block lg:block md:flex hidden">
                        <Image src={product?.images ? product.images.edges[0].node.src ?? '' : ''} alt={product.description} height={230} width={230} />
                    </span>
                </ImageWrapper>
            </ClipperContainer>
            <TextContainer theme={theme}>
                <TextCard>
                    <div className="w-full">
                        <HeadingText theme={theme}>{`${product.title?.slice(0, 12)}${product.title?.split('')[12] !== undefined ? '...' : ''}`}</HeadingText>
                    </div>
                </TextCard>
            </TextContainer>
        </ProductContainer>
    )
}
