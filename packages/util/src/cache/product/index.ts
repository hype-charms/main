import { StripeItemReference } from "../../../../../packages/types";
import Redis from "ioredis";
import { client, serializeProductData } from "..";

export type ProductStore = { [id: string]: StripeItemReference }



export namespace product_cache {

  /**
   * 
   * @returns all products stored in redis or null
   */
  export const getCurrentRedisState = async (): Promise<StripeItemReference[] | null> => {
    const isConnected = client.status === "ready" || client.status === "connecting";
    if (!isConnected) {
      await client.connect();
    }
    const store = await client.get('product_ids')
      .then(data => data && JSON.parse(data))
      .then(async data => serializeProductData(data))
      .catch(err => { console.log(err); return null })
    return store
  }

  /**
   * 
   * @param id stripe product id
   * @returns stripe item reference
   */
  export const getProductById = async (id: string): Promise<StripeItemReference | null> => {
    const isConnected = client.status === "ready" || client.status === "connecting";
    if (!isConnected) {
      await client.connect();
    }
    const data = await client.get(id).then(data => data && JSON.parse(data))
      .catch(err => { console.log(err); return null });
    return data
  }

  /**
   * Loads all items provided into redis. Does not remove ids
   * @param products items to be added to redis
   * @returns true if items are added successfully
   */
  export const loadProductsIntoRedis = async (products: StripeItemReference[] | null): Promise<StripeItemReference[] | null> => {
    const isConnected = client.status === "ready" || client.status === "connecting";
    if (!isConnected) {
      await client.connect();
    }
    if (products) {
      await client.set('product_ids', JSON.stringify(products.map((x) => x.id))).catch(err => console.log(err));
      products.map(async (data) => await client.set(data.id!, JSON.stringify(data)).catch(err => { console.log(err); return null }))
      return products;
    }
    return null
  }

} 