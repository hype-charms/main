import { Layout } from "../../../components/layout/layout.component";
import { PackMetadata, ProductCategories, ProductMetadata } from "../../../models/product.model";
import { ProductPageWrapperComponent } from "../../../containers/products/product-page-wrapper.component";
import { GetServerSideProps } from "next";
import { PageLoaderComponent } from "../../../components/loader/loader.component";
import { StripeItemReference } from "@hype-commerce/types";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    if ('category' in query) {
        const [products, packs] = await Promise.all([
            fetch(`${process.env.CLIENT_URL}/api/product/category/${query.category}`),
            fetch(`${process.env.CLIENT_URL}/api/product/category/${query.category}`),
        ]).then(results => results.map(async x => await x.json()));
        return { props: { products: await products, packs: await packs, category: query.category } }
    } else {
        return { props: { products: null, packs: null, category: null } }
    }
}
interface ProductCategoriesProps {
    products: StripeItemReference<ProductMetadata>[];
    packs: StripeItemReference<PackMetadata>[];
    category: ProductCategories
}
export default function ProductCategoriesPage({ products, packs, category }: ProductCategoriesProps) {
    if (!category || !products || !packs || !Object.values(ProductCategories).some(x => x === category)) {
        return (
            <Layout>
                <ProductPageWrapperComponent
                    title={""}
                    description={""}
                    loadedItemQuantity={0}
                    image={""}>
                    <PageLoaderComponent height="h-[30vh]" />
                </ProductPageWrapperComponent>
            </Layout>
        )
    } else {
        return (
            <>
                <Layout>
                    <>
                        {[...products, ...packs] ? <ProductPageWrapperComponent
                            title={category ?? ""}
                            description={categoryImages[category].description}
                            items={[...products, ...packs]}
                            loadedItemQuantity={[...products, ...packs].length}
                            image={categoryImages[category].image} /> : <></>}
                    </>
                </Layout>
            </>
        );
    }
}

const categoryImages: { [key in ProductCategories]: { image: string, description: string } } = {
    'anime': { image: '/assets/main-backgrounds/anime-background.png', description: "Bring anime magic to your crocs with Naruto and Jujutsu Kaisen themed charms. A variety of options to suit your anime style. Upgrade your crocs game and show your love for anime. Shop now!" },
    'cartoons': { image: '/assets/main-backgrounds/cartoons-background.png', description: "Upgrade your crocs with our cartoon-themed charms. Choose from Rick and Morty and KAWS-inspired designs. Show off your love for cartoons with these fun and unique accessories. Shop now!" }
}