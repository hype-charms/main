import { CartProduct, Geolocation } from "@hype-charms/types";
import { bookings, geo, orders } from "@hype-charms/util";
import { NextApiRequest, NextApiResponse } from "next";
import { Cart } from "../../../models";

// const data = fetch(`/shipping`, {
//     method: "POST",
//     body: JSON.stringify({ items: cartItems, location}),
//     headers: { "content-type": "application/json" }
// }).then(data => data.json()).catch(err => console.log(err)) as Geolocation;

export const shippingHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "GET":
            break;
        case "POST":
            const { items, location } = req.body as { items: CartProduct[], location: Geolocation };
            const booking = await bookings.generateBookingDto(items, location)
                .then(data => data && bookings.getQuotes(data))
                .then(data => data && bookings.findBestPrice(data))
                .then(data => { console.log(data);  return data})
                .catch(err => console.log(err));
            console.log(booking)
            res.status(200).send(booking);
            break;
        default: res.status(404).send(null)
    }
}

export default shippingHandler