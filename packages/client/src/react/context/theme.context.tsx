import React, { createContext, useContext } from "react";
import { HypeTheme } from "../models";

const ThemeContext = createContext<HypeTheme | null>(null);
export const ThemeProvider = ({ children, theme }: { children: JSX.Element, theme: HypeTheme }) => {
    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
}
export const useThemeContext = () => {
    return useContext(ThemeContext)
}
