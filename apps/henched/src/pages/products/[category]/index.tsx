import { GetServerSideProps } from 'next'
import React from "react";
import { HypeItemReference, ProductCategories } from "@hype-charms/types";
import { LayoutComponent, Module, PopoverComponent, ProductDisplayComponent, ProductPageWrapperComponent, useActiveProduct, useFilterProducts } from '@hype-charms/client';
import { eventheader_content, header_content, subheader_content } from '../../../constants/header';
import { PopoverPosition } from '@hype-charms/client/dist/src/react/models/popover';
import { useHeaderControls } from '../../../hooks/header-controls';

export const useProductsPage = (products: HypeItemReference[]) => {
    const { handleFilterChange, filteredProducts } = useFilterProducts(products)
    const { activeProduct, setActiveProduct } = useActiveProduct();
    return { handleFilterChange, filteredProducts, activeProduct, setActiveProduct }
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    if (!query.category || !Object.values(ProductCategories).some(x => x === query.category)) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
            props: {},
        };
    } else {
        //TODO - fetch items by category
        // const products: HypeItemReference[] | null = await shop.products.fetchAllProducts(100)
        //   .then(data => data.map((data) => MapShopifyProductReferencesToHypeItemReference(data.node)))
        //   .catch(err => {
        //     console.log(err);
        //     return null
        //   });
        const products = null;
        return { props: { products, category: null } }
    }
}
interface ProductCategoriesProps {
    products: HypeItemReference[] | null
    category: ProductCategories
}
export default function ProductCategoriesPage({ products, category }: ProductCategoriesProps) {
    const { handleFilterChange, filteredProducts, activeProduct, setActiveProduct } = useProductsPage(products);
    const { handleCartClick, handleProfileClick } = useHeaderControls();
    return (
        <LayoutComponent
            onCartClick={handleCartClick}
            onProfileClick={handleProfileClick}
            eventheader_content={eventheader_content}
            subheader_content={subheader_content}
            header_content={header_content}>
            <>
                <ProductPageWrapperComponent
                    title={category ?? ""}
                    description={categoryImages[category].description}
                    items={products}
                    loadedItemQuantity={products.length}
                    image={categoryImages[category].image}
                    onFilterChange={handleFilterChange}
                >
                    {products ? <Module>
                        <main id="products-main" className="w-full">
                            {filteredProducts.map((product, idx) => <ProductDisplayComponent
                                onClick={setActiveProduct}
                                size="md"
                                id="product-page"
                                key={idx}
                                product={product}
                            />)}
                        </main>
                    </Module> : <>no items</>}
                </ProductPageWrapperComponent>
                <PopoverComponent
                    title=""
                    open={!!activeProduct}
                    onClose={() => setActiveProduct(null)}
                    position={PopoverPosition.center}>
                    <div className="w-[60vw] h-[60vh]">
                        {activeProduct && <ProductDisplayComponent id="0" product={activeProduct} size={'md'} />}
                    </div>
                </PopoverComponent>
            </>
        </LayoutComponent>
    )
}

const categoryImages: { [key in ProductCategories]: { image: string, description: string } } = {
    'anime': { image: '/assets/main-backgrounds/anime-background.png', description: "Bring anime magic to your crocs with Naruto and Jujutsu Kaisen themed charms. A variety of options to suit your anime style. Upgrade your crocs game and show your love for anime. Shop now!" },
    'cartoons': { image: '/assets/main-backgrounds/cartoons-background.png', description: "Upgrade your crocs with our cartoon-themed charms. Choose from Rick and Morty and KAWS-inspired designs. Show off your love for cartoons with these fun and unique accessories. Shop now!" }
}