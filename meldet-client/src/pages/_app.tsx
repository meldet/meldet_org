import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../theme";
import createEmotionCache from "../createEmotionCache";
import { UiContext } from "../lib/context";
import useMediaQuery from "@mui/material/useMediaQuery";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import "mapbox-gl/dist/mapbox-gl.css";
import '../styles/globals.css'
import nlBE from "date-fns/locale/nl-BE";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  const [state, setState] = React.useState({ isMobile: true });
  const isMobile = useMediaQuery("(max-width:800px)", { noSsr: true });

  React.useEffect(() => {
    setState({ ...state, isMobile });
  }, [isMobile]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Meldet.org</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider locale={nlBE} dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <UiContext.Provider value={state}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Component {...pageProps} />

          </UiContext.Provider>
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
}
