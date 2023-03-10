import { StripeItemReference } from "@hype-commerce/types";
import { createAction } from "@reduxjs/toolkit";
import { PackMetadata } from "../../models/product.model";

export const loadProductPacks = createAction<StripeItemReference<PackMetadata>[]>('[Packs] Load Product Packs')
export const loadProductPackSuccess = createAction('[Packs] Load Product Pack Success')