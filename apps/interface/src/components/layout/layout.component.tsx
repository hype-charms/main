import React, { FC, useEffect, useState } from "react"
import { Header } from "../header/header.component"
import { Popover } from "../popover/popover.component"
import { EmailListModule } from "../emails/email-list-modal"
import Head from "./head/Head"
import { FooterComponent } from "../footer/footer.component"
import { MetaProps } from "../../models"

export const Layout: FC<{ children: JSX.Element, customMeta?: MetaProps, shrinkHeader?: boolean }> = ({ children, customMeta, shrinkHeader }): JSX.Element => {

    const [marketingPopover, setMarketingPopover] = useState<boolean>(false);

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