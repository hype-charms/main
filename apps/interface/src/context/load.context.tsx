import nProgress from "nprogress";
import { createContext, FC, useEffect, useState } from "react";
import Router from "next/router";

const LoadContext = createContext<null | boolean>(null);

export const LoadProvider: FC<{ children: JSX.Element }> = ({ children }): JSX.Element => {
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
        Router.events.on("routeChangeStart", handleRouteStart)
        Router.events.on("routeChangeComplete", handleRouteDone)
        Router.events.on("routeChangeError", handleRouteDone)
        return () => {
            Router.events.off("routeChangeStart", handleRouteStart);
            Router.events.off("routeChangeComplete", handleRouteDone);
            Router.events.off("routeChangeError", handleRouteDone);
        };
    }, [])
    return (
        <LoadContext.Provider value={loading}>
            {children}
        </LoadContext.Provider>
    );
}