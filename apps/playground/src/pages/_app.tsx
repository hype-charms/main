import { LoadProvider, MobileProdiver, NotificationProvider } from "@hype-charms/client";
import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { Router } from "next/router";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <NotificationProvider>
    <LoadProvider router={Router}>
      <MobileProdiver>
        <Component {...pageProps} />
      </MobileProdiver>
    </LoadProvider>
  </NotificationProvider>;
};

export default MyApp;
