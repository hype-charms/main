// import { products } from "@hype-charms/util";
import { ProductCategories } from "@hype-charms/types"
import { cache, products, product_cache } from "@hype-charms/util";
import { NextApiRequest, NextApiResponse } from "next";

export default async function retrieveCategorySpecificPRoducts(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            const { index } = req.query
            if (typeof index !== "string") {
                throw new Error("Query is not of tpe string")
            }
            const { byCategory } = await products.filter()
            const data = await product_cache.getCurrentRedisState()
                .then(data => data ? byCategory({ products: data, _category: index as ProductCategories }) : data)
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
    }
}