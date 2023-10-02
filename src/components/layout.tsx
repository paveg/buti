import Head from "next/head";
import { FC } from "react";
import { Navigation } from "~/components/navigation";
import { Toaster } from "~/components/ui/toaster";

type Props = {
  children: React.ReactNode;
};

export const Layout: FC = ({ children }: Props) => {
  return (
    <>
      <Navigation />
      <div className="container my-8">{children}</div>
      <Toaster />
    </>
  );
};
