import { geo } from "@hype-charms/util";
import { NextApiRequest, NextApiResponse } from "next"

export default async function (req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            const { latitude, longitude } = req.query as { latitude: string, longitude: string }
            const location = await geo.getCityFromCoords(Number(latitude), Number(longitude));
            if (location) {
                res.status(200).send(location)
            } else {
                res.status(500).send('')
            }
            break;
    }
}