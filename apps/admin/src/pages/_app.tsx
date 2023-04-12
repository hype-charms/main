import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth";
import { ThemeProvider } from '@mui/material/styles';
import { themes } from "../styles/mui";
import { CssBaseline } from "@mui/material";
import { store, useAppSelector } from "../+state";
import { Provider } from 'react-redux'
import { createContext, FC, useContext, useEffect, useState } from "react";
import { ThemeColors } from "../+state/reducers";
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from "../server/router/_app";
import { withTRPC } from "@trpc/next";
import Router from "next/router";

interface AppProps {
  session: Session | null
}
const MyApp: AppType<AppProps> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return <Provider store={store}>
    <LoadProvider>
      <CustomThemeProvider>
        <SessionProvider session={session}>
          <CssBaseline />
          <Component {...pageProps} />
        </SessionProvider>
      </CustomThemeProvider>
    </LoadProvider>
  </Provider>
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 4000}`;
  // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    if (typeof window !== 'undefined') {
      // during client requests
      return {
        links: [
          httpBatchLink({
            url: '/api/trpc',
          }),
        ],
      };
    }
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            if (ctx?.req) {
              const {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                connection: _connection,
                ...headers
              } = ctx.req.headers;
              return {
                ...headers,
                'x-ssr': '1',
              };
            }
            return {};
          },
        }),
      ],
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  ssr: true,
})(MyApp);

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});

const CustomThemeProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const themeColor = useAppSelector(state => state.applicationReducer.theme);
  const [theme, setTheme] = useState<ThemeColors>(ThemeColors.light);
  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme && JSON.parse(localTheme) in ThemeColors) {
      setTheme(JSON.parse(localTheme));
    } else {
      setTheme(themeColor)
    }
  }, [themeColor])
  return <ThemeProvider theme={themes[theme]}>
    {children}
  </ThemeProvider>
}

const LoadContext = createContext<null | boolean>(null);

export const LoadProvider: FC<{ children: JSX.Element }> = ({ children }): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const handleRouteStart = () => setLoading(true)
  const handleRouteDone = () => setLoading(false)
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
export function useLoadContext() {
  return useContext(LoadContext);
}