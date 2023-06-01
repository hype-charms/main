import React, { FC, useEffect, useState } from "react";
import Image from 'next/image'
import { Currency, StripeItemReference } from "@hype-charms/types";
import { formatPrice, useThemeContext } from "@hype-charms/client";
import { ProductContainer, ClipperContainer, ImageWrapper, TextContainer, TextCard, HeadingText, ParagraphText } from "./template";

export interface StripeProductDisplayProps {
    product: StripeItemReference,
    id: string,
    size: "md" | "lg" | "xl"
}
export const StripeProductDisplayComponent: FC<StripeProductDisplayProps> = ({ product, id, size }): JSX.Element => {

    const [itemState, setItemState] = useState(true);
    const theme = useThemeContext();

    useEffect(() => {
        const hasInventory = !product.inventory || product.inventory === 0
        const hasPrice = !product?.unit_amount
        setItemState(hasInventory || hasPrice)
    }, [product])

    return (
        <ProductContainer theme={theme} key={product.id}>
            <ClipperContainer>
                <ImageWrapper theme={theme} id={product.name + id}
                    type="button"
                    aria-label={`opens a product page for the product ${product.name}`}
                    key={product.id}
                    disabled={itemState}
                    onClick={console.log}
                >
                    <span className="xl:hidden lg:hidden md:hidden block">
                        <Image src={product?.images ? product.images[0] ?? '' : ''} alt={product.description} height={140} width={140} />
                    </span>
                    <span className="xl:block lg:block md:flex hidden">
                        <Image src={product?.images ? product.images[0] ?? '' : ''} alt={product.description} height={230} width={230} />
                    </span>
                </ImageWrapper>
            </ClipperContainer>
            <TextContainer theme={theme}>
                {product.inventory && product.inventory > 0 ? <TextCard>
                    <div className="w-full">
                        <HeadingText theme={theme}>{`${product.name?.slice(0, 12)}${product.name?.split('')[12] !== undefined ? '...' : ''}`}</HeadingText>
                        {
                            product?.unit_amount ?
                                <ParagraphText theme={theme}>{formatPrice(product.unit_amount, Currency.AUD, 1)}</ParagraphText>
                                : <ParagraphText theme={theme}>sold out</ParagraphText>
                        }
                    </div>
                </TextCard> : <TextCard>
                    <div className="w-full">
                        <HeadingText theme={theme}>{`${product.name?.slice(0, 12)}${product.name?.split('')[12] !== undefined ? '...' : ''}`}</HeadingText>
                        <ParagraphText theme={theme}>sold out</ParagraphText>
                    </div>
                </TextCard>}
            </TextContainer>
        </ProductContainer>
    )
}
