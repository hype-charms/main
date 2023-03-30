import axios from "axios"
import { geo_client } from ".."

export namespace geo {
    export const getCityFromCoords = async (lat: number, lng: number): Promise<any> => {
        const address: { [k: string]: any } = {};
        return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GEOLOCATION_API_KEY}`)
            .then(({ data }) => {
                data.results[0].address_components.map((short: { long_name: string, short_name: string; types: string[] }) => {
                    address[short.types[0]] = short.short_name;
                })
                return address;
            })
            .catch(err => console.log(err))
    }

}