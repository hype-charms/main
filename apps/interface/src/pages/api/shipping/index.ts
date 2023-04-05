import { CartProduct, Geolocation } from "@hype-charms/types";
import { bookings } from "@hype-charms/util";
import { NextApiRequest, NextApiResponse } from "next";

export const shippingHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method) {
        case "GET":
            break;
        case "POST":
            console.log('request');
            const { items, location } = req.body as { items: CartProduct[], location: Geolocation };
            const booking = await bookings.generateBookingDto(items, location)
                .then(data => data && bookings.getQuotes(data))
                .then(data => data && bookings.findBestPrice(data))
                .catch(err => console.log(err));
            console.log(booking)
            res.status(200).send(booking);
            break;
        default: res.status(404).send(null)
    }
}

export default shippingHandler