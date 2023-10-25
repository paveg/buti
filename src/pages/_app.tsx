import { type Session } from 'next-auth';
import { SessionProvider } from "next-auth/react";
import { type AppProps } from "next/app";
import Head from "next/head";
import "~/styles/globals.css";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { api } from "~/utils/api";

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <>
      <Head>
        <title>Buti</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <meta
          name="description"
          content="Buti - Recording score of the Mahjong"
        />
      </Head>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </SessionProvider>
    </>
  );
}

export default api.withTRPC(MyApp);
