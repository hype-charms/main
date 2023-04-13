import React, { createContext, useContext, useEffect, useState } from "react";

const MobileContext = createContext<boolean>(true)
export const MobileProdiver = ({ children }: { children: JSX.Element }) => {
    const [mobile, setMobile] = useState<boolean>(false);
    useEffect(() => setMobile(window.innerWidth < 800), [])
    const handleResize = () => {
        if (window.innerWidth > 800) {
            setMobile(false);
        } else {
            setMobile(true);
        }
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])
    return (
        <MobileContext.Provider value={mobile}>
            {children}
        </MobileContext.Provider>
    );
}
export const useMobileContext = () => {
    return useContext(MobileContext)
}
