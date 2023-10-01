import Head from "next/head";
import { FC } from "react";
import { Toaster } from "~/components/ui/toaster";

type Props = {
  children: React.ReactNode;
};

export const Layout: FC = ({ children }: Props) => {
  // TODO: Implement navigation bar
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};
