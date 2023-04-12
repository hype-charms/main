import { createAction } from "@reduxjs/toolkit";
import { ThemeColors } from "../reducers";

export const updateTheme = createAction<ThemeColors>('[Application] Update Theme')