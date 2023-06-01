import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import { ShopifyItemReference, ShopifyNode, ShopifyProductResponse } from '@hype-charms/types';

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY!,
  apiSecretKey: process.env.SHOPIFY_API_SECRET_KEY!,
  apiVersion: LATEST_API_VERSION!,
  isCustomStoreApp: true,
  scopes: ['read_products'],
  hostName: process.env.STOREFRONT_URL!,
  isEmbeddedApp: false,
});

const client = new shopify.clients.Storefront({
  domain: process.env.STOREFRONT_URL!,
  storefrontAccessToken: process.env.STOREFRONT_KEY!,
})

export const fetchAllProducts = async (limit: number): Promise<ShopifyNode<ShopifyItemReference>[] | null | undefined> => {
  const data = await client.query({
    data: `{
    products (first: ${limit}) {
      edges {
        node {
          id
          title
          description
          images(first: 1) {
            edges {
              node {
                id
                src
              }
            }
          }
        }
      }
    }
  }`
  }) as ShopifyProductResponse;
  return data?.body?.data?.products?.edges
};
