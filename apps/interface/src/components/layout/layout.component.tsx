import React, { FC, useEffect, useState } from "react"
import { Header } from "../header/header.component"
import { Popover } from "../popover/popover.component"
import { EmailListModule } from "../emails/email-list-modal"
import Head from "./head/Head"
import { FooterComponent } from "../footer/footer.component"
import { MetaProps } from "../../models"
import { useFetchShippingInfo, useLoadGeolocation } from "../../+state/hooks/shipping.hooks"
import { useAppSelector } from "../../+state"

export const Layout: FC<{ children: JSX.Element, customMeta?: MetaProps, shrinkHeader?: boolean }> = ({ children, customMeta, shrinkHeader }): JSX.Element => {

    const [marketingPopover, setMarketingPopover] = useState<boolean>(false);
    const loadLocation = useLoadGeolocation();
    const cart = useAppSelector(state => state.cartReducer);
    const loadShipping = useFetchShippingInfo();
    const shipping_data = useAppSelector(state => state.shippingReducer.shipping_data);

    useEffect(() => {
        loadShipping();
        console.log(shipping_data);
    }, [cart])
    useEffect(() => {
        loadLocation();
    }, [])

    useEffect(() => {
        const data = window.localStorage.getItem('first-visit');
        if (!data || data && !JSON.parse(data).hasVisited) {
            window.localStorage.setItem('first-visit', JSON.stringify({ hasVisited: true }))
            setTimeout(() => setMarketingPopover(true), 5000)
        }
    }, [])

    const closePopover = () => setTimeout(() => setMarketingPopover(false), 300);

    return (
        <>
            <Head customMeta={customMeta} />
            <Header shrink={shrinkHeader} />
            <div className="h-fit-content h-fit">
                {children}
            </div>
            <FooterComponent />
            {marketingPopover && <Popover position="bottom-right" title="" closePopover={() => closePopover()}>
                <div className="px-8">
                    <EmailListModule size="big" title={"Welcome to Hype Charms"} description={"Signup to recieve 15% off"} onClose={() => closePopover()} />
                </div>
            </Popover>}
        </>
    )
}