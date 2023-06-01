import { GetServerSideProps } from 'next'
import React from "react";
import { ShopifyItemReference } from "@hype-charms/types";
import { LayoutComponent, ProductPageWrapperComponent } from '@hype-charms/client';
import { eventheader_content, header_content, subheader_content } from '../../constants/header';

export const getServerSideProps: GetServerSideProps = async () => {
  // const products = await shop.products.fetchAllProducts(100).catch();
  const products = null;
  return { props: { products } }
}
interface ProductPageProps {
  products: { node: ShopifyItemReference }[] | null
}
export default function ProductsPage({ products }: ProductPageProps) {

  if (!products) return (
    <LayoutComponent
      eventheader_content={eventheader_content}
      subheader_content={subheader_content}
      header_content={header_content}>
      <ProductPageWrapperComponent
        loadedItemQuantity={0}
        title="ALL ITEMS"
        description=""
        image=""
      >
        <>no items</>
      </ProductPageWrapperComponent>
    </LayoutComponent>
  )
  return (
    <>
      <LayoutComponent
        eventheader_content={eventheader_content}
        subheader_content={subheader_content}
        header_content={header_content}>
        <>
          {products && <ProductPageWrapperComponent
            items={products.map(({ node }) => node)}
            loadedItemQuantity={products.length}
            title="ALL ITEMS"
            description="Add some interdimensional flair to your accessories with five Rick and
            Morty-themed charms! Includes characters and symbols from the show.
            Durable resin and silver-tone keyring. Perfect for fans of the animated series."
            image=""
          />}
        </>
      </LayoutComponent>
    </>
  );

}
