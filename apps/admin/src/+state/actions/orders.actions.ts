import { createAction } from "@reduxjs/toolkit";

export const setBulkOrdersSelection = createAction<string>('[Orders] Set bulk Order Selection');