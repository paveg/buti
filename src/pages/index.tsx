import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Buti</title>
        <meta
          name="description"
          content="Buti - Recording score of the Mahjong"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* TODO: Result list */}
        Result Page
        <div>
          <Button asChild>
            <Link href="/auth/signin">Sign In Page</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
