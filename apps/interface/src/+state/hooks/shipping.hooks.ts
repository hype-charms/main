import { BookingDto, BookingQuoteDto, Geolocation } from "@hype-charms/types";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "..";
import { loadLocation, loadShippingInfo } from "../actions";

export function useLoadGeolocation() {
    const dispatch = useDispatch();
    return useCallback(async () => {
        navigator.geolocation.getCurrentPosition(data => fetchLocation(data.coords), error => console.log(error), {});
        const fetchLocation = async (location: GeolocationCoordinates) => {
            const data = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/shipping/location?latitude=${location.latitude}&longitude=${location.longitude}`, {
                method: "GET",
                headers: { "content-type": "application/json" }
            }).then(data => data.json()).catch(err => console.log(err)) as Geolocation;
            dispatch(loadLocation(data))
        }
    }, [dispatch])
}

export function useFetchShippingInfo() {
    const dispatch = useDispatch();
    const location = useAppSelector(state => state.shippingReducer.geo_location);
    const cartItems = useAppSelector(state => state.cartReducer.cart.cartItems);
    return useCallback(async () => {
        if (!location || cartItems.length === 0) {
            return;
        }
        const data = await fetch(`/api/shipping`, {
            method: "POST",
            body: JSON.stringify({ items: cartItems, location }),
            headers: { "content-type": "application/json" }
        }).then(data => data.json()).catch(err => console.log(err)) as BookingQuoteDto;
        dispatch(loadShippingInfo(data));
    }, [dispatch])
}