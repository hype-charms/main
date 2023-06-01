import { GetServerSideProps } from 'next'
import React from "react";
import { ProductCategories, ShopifyItemReference } from "@hype-charms/types";
import { LayoutComponent, ProductPageWrapperComponent } from '@hype-charms/client';
import { eventheader_content, header_content, subheader_content } from '../../../constants/header';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    // const products = await shop.products.fetchAllProducts(100).catch();
    const products = null;
    return { props: { products, category: null } }
}
interface ProductCategoriesProps {
    products: { node: ShopifyItemReference }[] | null
    category: ProductCategories
}
export default function ProductCategoriesPage({ products, category }: ProductCategoriesProps) {
    if (!category || !products || !Object.values(ProductCategories).some(x => x === category)) {
        return (
            <LayoutComponent
                eventheader_content={eventheader_content}
                subheader_content={subheader_content}
                header_content={header_content}>
                <ProductPageWrapperComponent
                    title={""}
                    description={""}
                    loadedItemQuantity={0}
                    image={""}>
                    <p>loading</p>
                </ProductPageWrapperComponent>
            </LayoutComponent>
        )
    } else {
        return (
            <>
                <LayoutComponent
                    eventheader_content={eventheader_content}
                    subheader_content={subheader_content}
                    header_content={header_content}>
                    <>
                        {products ? <ProductPageWrapperComponent
                            title={category ?? ""}
                            description={categoryImages[category].description}
                            items={products.map(({ node }) => node)}
                            loadedItemQuantity={products.length}
                            image={categoryImages[category].image} /> : <></>}
                    </>
                </LayoutComponent>
            </>
        );
    }
}

const categoryImages: { [key in ProductCategories]: { image: string, description: string } } = {
    'anime': { image: '/assets/main-backgrounds/anime-background.png', description: "Bring anime magic to your crocs with Naruto and Jujutsu Kaisen themed charms. A variety of options to suit your anime style. Upgrade your crocs game and show your love for anime. Shop now!" },
    'cartoons': { image: '/assets/main-backgrounds/cartoons-background.png', description: "Upgrade your crocs with our cartoon-themed charms. Choose from Rick and Morty and KAWS-inspired designs. Show off your love for cartoons with these fun and unique accessories. Shop now!" }
}