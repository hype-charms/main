import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { store, useAppSelector } from "../+state";
import { Provider } from 'react-redux'
import fontawesome from '@fortawesome/fontawesome'
import { faBars } from "@fortawesome/fontawesome-free-solid";
import { useRouter } from "next/router";
import { FC, useEffect, useMemo, useState } from "react";
import { useLoadAppSearchReferences, useLoadCartFromLocal } from "../+state/hooks";
import { LoadProvider } from "../context/load.context";
import { NotificationProvider } from "../context/notification.context";
import { MobileProdiver } from "../context/mobile.context";
import dynamic from "next/dynamic";
import { EmailListNotificationProps } from "../components/notifications/email-notification.component";
import { CheckoutNotificationProps } from "../components/notifications/checkout-notifications.component";
import { StripeItemReference, SubState } from "@hype-commerce/types";

const EmailListNotificationComponent = dynamic<EmailListNotificationProps>(() => import("../components/notifications/email-notification.component").then((data) => data.EmailListNotificationComponent))
const CheckoutNotificationComponent = dynamic<CheckoutNotificationProps>(() => import("../components/notifications/checkout-notifications.component").then((data) => data.CheckoutNotificationComponent))

fontawesome.library.add(faBars)

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter()
  const [query, setQuery] = useState<{ verified?: SubState, checkout?: string }>({});
  useEffect(() => {
    setQuery(router.query)
  }, [])
  return (
    <Provider store={store}>
      <NotificationProvider>
        <MobileProdiver>
          <SearchRefLoader pageProps={pageProps}>
            <CartLoader>
              <LoadProvider>
                <>
                  <Component {...pageProps} />
                  {"verified" in query && <EmailListNotificationComponent subStatus={query.verified} />}
                  {"checkout" in query && <CheckoutNotificationComponent status={query.checkout} />}
                </>
              </LoadProvider>
            </CartLoader>
          </SearchRefLoader>
        </MobileProdiver>
      </NotificationProvider>
    </Provider>
  )
};

export default MyApp;

// TODO move to server
// -->
const CartLoader: FC<{ children: JSX.Element }> = ({ children }) => {
  const loadCart = useLoadCartFromLocal()
  const state = useAppSelector((state) => state.cartReducer)
  useEffect(() => loadCart(), [])
  useEffect(() => {
    if (state.loaded) {
      window.localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  }, [state]);
  return <>{children}</>
}
const SearchRefLoader: FC<{ children: JSX.Element, pageProps: {} }> = ({ children, pageProps }) => {
  const loadSearchRefs = useLoadAppSearchReferences()
  useMemo(() => {
    const props = pageProps as { products: StripeItemReference[], packs: StripeItemReference[] }
    if (props?.products && props.packs && props?.packs.length > 0 && props?.products.length > 0) {
      loadSearchRefs([...props.packs, ...props.products])
    }
  }, [pageProps])
  return <>{children}</>
}
// <--

