import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type AppType from "next/app";
import Head from "next/head";
import { Layout } from "~/components/layout";
import "~/styles/globals.css";

import { api } from "~/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
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
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
