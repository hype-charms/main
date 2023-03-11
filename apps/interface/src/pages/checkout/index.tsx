import Head from "next/head";
import { GetServerSideProps } from "next"
import { Layout } from "../../components/layout/layout.component";
import CheckoutPageComponent from '../../containers/checkout/checkout.page.component'
import { ProductMetadata, ProductType } from "../../models";
import { EventHeaderComponent } from "../../components/layout/event-header/event-header.component";
import MobileCheckoutPageComponent from "../../containers/checkout/mobile-checkout.page.component";
import { useMobileContext } from "../../context/mobile.context";
import dynamic from "next/dynamic";
import { AllProductsModuleProps } from "../../containers/home/all-products.component";
import { StripeItemReference } from "@hype-charms/types";

const AllProductsModule = dynamic<AllProductsModuleProps>(() => import("../../containers/home/all-products.component").then(data => data.AllProductsModule))

export const getServerSideProps: GetServerSideProps = async () => {
    const [products] = await Promise.all([
        fetch(`${process.env.CLIENT_URL}/api/product/type/${ProductType.PRODUCT}`)
    ]).then(results => results.map(async x => await x.json()));
    return { props: { products: await products } }
}
export default function CheckoutPage({ products }: { products: StripeItemReference<ProductMetadata>[] }) {
    const mobile = useMobileContext()
    return (
        <>
            <Layout>
                <>
                    <EventHeaderComponent />
                    {!mobile ? <CheckoutPageComponent /> : <MobileCheckoutPageComponent />}
                    {products ? <div className="m-auto xl:max-w-[95vw] lg:max-w-[95vw] md:max-w-[95vw] max-w-full ">
                        <AllProductsModule products={products} />
                    </div> : <></>}
                </>
            </Layout>
        </>
    );
}

