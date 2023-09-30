import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatISO } from "date-fns";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { api } from "~/utils/api";

export default function Home() {
  const { data: games, isLoading } = api.game.getAll.useQuery({
    initialData: [],
  });
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
        <div className="mx-auto m-12 container">
          {!isLoading &&
            games.map((game) => {
              return (
                <Table key={game.id} className="mx-auto">
                  <TableCaption>
                    {formatISO(game.date, { representation: "date" })} - 第1節
                    at {game.parlor.name}
                  </TableCaption>
                  <TableHeader>
                    <TableRow>
                      {game.results.map((result) => {
                        return (
                          <TableHead className="w-[100px]" key={result.id}>
                            {result.member.name}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow></TableRow>
                  </TableBody>
                </Table>
              );
            })}
        </div>
        <div>
          <Button variant="primary" asChild>
            <Link href="/auth/signin">Sign In Page</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
