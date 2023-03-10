import { StripeItemReference } from "@hype-commerce/types";
import { createAction } from "@reduxjs/toolkit";
import { NotificationReference, SearchReference } from "../../models";
import { ProductCategories } from "../../models/product.model";
// import { Currency } from "../../models";

// export const changeSiteCurrency = createAction<Currency>('[Application] Change Currency')

export const loadCategories = createAction<ProductCategories>('[Application] Load Categories')
export const navigateToProduct = createAction<StripeItemReference>('[Products] Navigate To Product')
export const loadSearchReferences = createAction<SearchReference[]>('[Search] Load Search References');
export const setNotifications = createAction<NotificationReference[] | null>('[Notification] Set Notifcations') 
