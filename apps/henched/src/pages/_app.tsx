/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CommerceProvider, LoadProvider, MobileProdiver, NotificationProvider, ThemeProvider } from "@hype-charms/client";
import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { Router } from "next/router";
import { theme } from "../../tailwind.config.cjs";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <NotificationProvider exitButtonSource="/white-eye.svg">
    <LoadProvider router={Router}>
      <CommerceProvider provider="shopify">
        <MobileProdiver>
          {/* @ts-ignore */}
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </MobileProdiver>
      </CommerceProvider>
    </LoadProvider>
  </NotificationProvider>;
};

export default MyApp;
