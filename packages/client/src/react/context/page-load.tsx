import nProgress from "nprogress";
import { createContext, FC, useEffect, useState } from "react";
import React from "react";

const LoadContext = createContext<null | boolean>(null);

export const LoadProvider: FC<{ children: JSX.Element, router: any }> = ({ children, router }): JSX.Element => {
    const [loading, setLoading] = useState(false);
    const handleRouteStart = () => {
        nProgress.start()
        setLoading(true)
    }
    const handleRouteDone = () => {
        setLoading(false)
        nProgress.done()
    }
    useEffect(() => {
        router.events.on("routeChangeStart", handleRouteStart)
        router.events.on("routeChangeComplete", handleRouteDone)
        router.events.on("routeChangeError", handleRouteDone)
        return () => {
            router.events.off("routeChangeStart", handleRouteStart);
            router.events.off("routeChangeComplete", handleRouteDone);
            router.events.off("routeChangeError", handleRouteDone);
        };
    }, [router])
    return (
        <LoadContext.Provider value={loading}>
            {children}
        </LoadContext.Provider>
    );
}