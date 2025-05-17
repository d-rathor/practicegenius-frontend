// Import core-js polyfills
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
