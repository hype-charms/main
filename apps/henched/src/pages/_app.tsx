/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CommerceProvider, LoadProvider, MobileProdiver, NotificationProvider, ThemeProvider } from "@hype-charms/client";
import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { Router } from "next/router";
import { hype } from "../../theme";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <NotificationProvider exitButtonSource="/white-eye.svg">
    <LoadProvider router={Router}>
      <CommerceProvider provider="shopify">
        <MobileProdiver>
          {/* @ts-expect-error */}
          <ThemeProvider theme={{ ...hype.theme.extend, ui_theme: hype.ui_theme }}>
            <Component {...pageProps} />
          </ThemeProvider>
        </MobileProdiver>
      </CommerceProvider>
    </LoadProvider>
  </NotificationProvider>;
};

export default MyApp;
