import { Layout } from "../../components/layout/layout.component";
import { GetServerSideProps } from 'next'
import React from "react";
import { ProductPageWrapperComponent } from "../../containers/products/products-page";
import fetch from 'isomorphic-fetch'
import { PackMetadata, ProductMetadata } from "../../models";
import { PageLoaderComponent } from "../../components/loader/loader.component";
import { StripeItemReference } from "@hype-charms/types";

export const getServerSideProps: GetServerSideProps = async () => {
  const [products, packs] = await Promise.all([
    fetch(`${process.env.CLIENT_URL}/api/product`),
    fetch(`${process.env.CLIENT_URL}/api/product`),
  ]).then(results => results.map(async x => await x.json()));
  return { props: { products: await products, packs: await packs } }
}
interface ProductPageProps {
  products: StripeItemReference<ProductMetadata>[],
  packs: StripeItemReference<PackMetadata>[]
}
export default function ProductsPage({ products, packs }: ProductPageProps) {

  if (!products || !packs) return (
    <Layout>
      <ProductPageWrapperComponent
        loadedItemQuantity={0}
        title="ALL ITEMS"
        description=""
        image=""
      >
        <PageLoaderComponent height="h-[30vh]" />
      </ProductPageWrapperComponent>
    </Layout>
  )
  return (
    <>
      <Layout shrinkHeader>
        <>
          {products && packs && <ProductPageWrapperComponent
            items={[...products, ...packs]}
            loadedItemQuantity={[...products, ...packs].length}
            title="ALL ITEMS"
            description="Add some interdimensional flair to your accessories with five Rick and
            Morty-themed charms! Includes characters and symbols from the show.
            Durable resin and silver-tone keyring. Perfect for fans of the animated series."
            image=""
          />}
        </>
      </Layout>
    </>
  );

}
