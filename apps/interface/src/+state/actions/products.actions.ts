import { StripeItemReference } from "@hype-commerce/types";
import { createAction } from "@reduxjs/toolkit";
import { ProductMetadata } from "../../models/product.model";

export const loadProducts = createAction<StripeItemReference<ProductMetadata>[]>('[Products] Load products')
export const loadProductsSuccess = createAction('[Products] Load Products Success')
