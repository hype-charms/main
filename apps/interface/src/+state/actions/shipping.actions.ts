import { BookingQuoteDto, Geolocation } from "@hype-charms/types";
import { createAction } from "@reduxjs/toolkit";

// move to cart actions
export const loadShippingInfo = createAction<BookingQuoteDto>('[Shipping] Load Shipping Info')

// move to app actions
export const loadLocation = createAction<Geolocation>('[Shipping] Load Loaction')