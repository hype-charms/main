import { Layout } from "../../components/layout/layout.component";
import { CharmPageComponent } from "../../containers/charm/desktop-charm.page.component";
import { GetServerSideProps } from "next/types";
import { ProductMetadata, ProductType } from "../../models";
import { AllProductsModule } from "../../containers/home/all-products.component";
import { EventHeaderComponent } from "../../components/layout/event-header/event-header.component";
import { MobileCharmPageComponent } from "../../containers/charm/mobile-charm.page.component";
import { useMobileContext } from "../../context/mobile.context";
import { StripeItemReference } from "@hype-charms/types";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const product = await fetch(`${process.env.CLIENT_URL}/api/product?productId=${query.productId}`).then(result => result.json());
  const [products] = await Promise.all([
    fetch(`${process.env.CLIENT_URL}/api/product/type/${ProductType.PRODUCT}`),
  ]).then(results => results.map(async x => await x.json()));
  return { props: { product: await product, products: await products } }
}
export default function ProductPage({ product, products }: { product: StripeItemReference<ProductMetadata>, products: StripeItemReference<ProductMetadata>[] }) {
  const mobile = useMobileContext()
  return (
    <>
      <Layout>
        <>
          <EventHeaderComponent />
          {product && mobile ? <MobileCharmPageComponent product={product} /> : <CharmPageComponent product={product} />}
          {products ? <div className="m-auto xl:max-w-[95vw] lg:max-w-[95vw] md:max-w-[95vw] max-w-full ">
            <AllProductsModule products={products} />
          </div> : <></>}
        </>
      </Layout>
    </>
  );
}

