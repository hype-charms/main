import { cache, products, product_cache } from "@hype-commerce/util";
import { NextApiRequest, NextApiResponse } from "next";

export default async function StripeRedis(req: NextApiRequest, res: NextApiResponse) {
    const { productId } = req.query as { productId: string }
    switch (req.method) {
        case "GET":
            if (productId) {
                const cachedItem = await product_cache.getProductById(productId);
                if (cachedItem) {
                    res.status(200).send(cachedItem)
                } else {
                    const product = await products.fetchProductReferenceById(productId)
                    res.status(200).send(product);
                }
            } else {
                const cachedItems = await product_cache.getCurrentRedisState()
                if (cachedItems) {
                    res.status(200).send(cachedItems);
                } else {
                    const result = await products.fetchAllProductReferences()
                        .then(data => product_cache.loadProductsIntoRedis(data)).catch(err => console.log(err))
                    res.status(200).send(result);
                }
                cache.disconnect();
            }
            break;
    }
}