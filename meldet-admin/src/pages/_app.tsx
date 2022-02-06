import '../styles/globals.css';
import type { AppProps } from 'next/app';

/* --- <AppLayout/> ---------------------------------------------------------------------------- */

function AppLayout({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
};

/* --- Exports --------------------------------------------------------------------------------- */

export default AppLayout;
