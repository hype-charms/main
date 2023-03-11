import { product_cache, products, cache } from "@hype-charms/util";
import { NextApiRequest, NextApiResponse } from "next";

export default async function retrieveCategoryTypeProducts(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            const data = await product_cache.getCurrentRedisState()
                .catch(err => { console.log(err); return null });
            if (data) {
                res.status(200).send(data ?? []);
            } else {
                const filteredProductRefs = await products.fetchAllProductReferences()
                    .then(data => { if (!data) throw new Error("product data is undefined"); return data })
                    .then(data => product_cache.loadProductsIntoRedis(data))
                    .catch(err => { console.log(err); return null })
                res.status(200).send(filteredProductRefs ?? []);
            }
            setTimeout(async () => await cache.disconnect(), 100)
            break;
        case "PUT":
            res.status(200);
            // update redis store
            break;
    }
}

