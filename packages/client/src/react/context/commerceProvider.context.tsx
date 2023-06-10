import React, { createContext, useContext } from "react";

const CommerceProviderContext = createContext<"shopify" | "stripe" | null>(null);
export const CommerceProvider = ({ children, provider }: { children: JSX.Element, provider: "shopify" | "stripe" }) => {
    return (
        <CommerceProviderContext.Provider value={provider}>
            {children}
        </CommerceProviderContext.Provider>
    );
}
export const useCommerceProviderContext = () => {
    return useContext(CommerceProviderContext);
}
