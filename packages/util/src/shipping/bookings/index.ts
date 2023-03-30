import { BookingDto, BookingItemDto, BookingQuoteDto, BookingQuotesResponseDto, Cart, CartProduct, couriers, Geolocation } from "@hype-charms/types";
import { order_dto } from "@prisma/client";
import axios from "axios"
import { sender_details } from "../constants";

export namespace bookings {

  export const generateBookingDto = async (items: CartProduct[], location: Geolocation) => {
    return parseOrderTable(items, location);
  }

  export const getQuotes = async (body: BookingDto): Promise<BookingQuotesResponseDto> => {
    return await axios.post('https://www.transdirect.com.au/api/bookings/v4', JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json',
        'Api-key': process.env.TRANSDIRECT_API_KEY
      }
    })
      .then(function (response) {
        console.log("QUOTES RESPONSE :: ", response.data)
        return response.data
      })
      .catch(function (error) {
        console.error(error.response.data.errors);
      });
  }

  export const findBestPrice = async (body: BookingQuotesResponseDto): Promise<BookingQuoteDto> => {
    const quotes = Object.values(body.quotes).map((x, i) => ({ ...x, provider: Object.keys(body.quotes)[i] }));
    const totals = quotes.map(x => x.total);
    return quotes[totals.indexOf(Math.min(...totals))];
  }


  export const createBooking = async (booking_id: string, courier: couriers, pickup_date: string): Promise<void> => {
    await axios.post(`https://www.transdirect.com.au/api/bookings/v4/${booking_id}/confirm`, JSON.stringify({ courier, "pickup-date": pickup_date }), {
      headers: {
        'Content-Type': 'application/json',
        'Api-key': process.env.TRANSDIRECT_API_KEY
      }
    })
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        console.error(error.response.data.errors);
      });
  }

  export const trackBooking = async (booking_id: string) => {
    return axios.get(`https://www.transdirect.com.au/api/bookings/track/v4/${booking_id}`, {
      headers: {
        'Content-Type:text/html': 'charset=UTF-8',
      }
    })
      .then(function (response) {
        console.log(response);
        return response.data
      })
      .catch(function (error) {
        console.error(error.response.data.errors);
      });
  }
}

const parseOrderTable = (_items: CartProduct[], location: Geolocation) => {

  const items = parseShippingItems(_items)
  const value = _items?.map(x => x.unit_amount! * x.quantity!).reduce((x, y) => x! + y!)!

  return new BookingDto({
    declared_value: value,
    referrer: "API",
    requesting_site: process.env.CLIENT_URL,
    tailgate_pickup: false,
    tailgate_delivery: false,
    items: [items
    ],
    sender: sender_details,
    receiver: {
      address: `${location.street_number} ${location.route?.toLowerCase()}`,
      company_name: "",
      email: "",
      name: "",
      postcode: location.postal_code,
      phone: "",
      state: location.administrative_area_level_1,
      suburb: location.locality?.toLowerCase(),
      type: "business",
      country: location.country
    }
  })
}

const parseShippingItems = (items: CartProduct[]): BookingItemDto[] => {
  return items.map(data => ({
    weight: data?.metadata?.weight ?? 1,
    height: data?.metadata?.height ?? 1,
    width: data?.metadata?.width ?? 1,
    length: data?.metadata?.length ?? 1,
    quantity: data?.metadata?.quantity ?? 1,
    description: data?.metadata?.shipping_description ?? ''
  }))
}