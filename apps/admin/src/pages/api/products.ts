import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { stripe } from "../../shared-util/context/stripe"

const products = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const { category } = req.query
        if (category && typeof category !== "string") {
            res.status(500).send({ error: new Error('ERROR_PARSING_QUERY_PARAMS') })
            return;
        }
        const products = await fetchItemsFromStripe(undefined)
        if (products) {
            res.status(200).send(products)
        } else {
            res.status(500).send({ error: new Error('FAILED_TO_LOAD_RESOURCES') })
        }
        return;
    }
}

export const fetchItemsFromStripe = async (category: string | undefined): Promise<Stripe.Product[]> => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { data } = await stripe.products.list({ limit: 50 });
    if (category) {
        return data.map(data => ({ ...data, prices: null })).filter(item => item.metadata.category === category)
    } else {
        return data.map(data => ({ ...data, prices: null })).filter(item => item.metadata.type);
    }
}

export default products