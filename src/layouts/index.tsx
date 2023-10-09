import { type FC } from "react";
import { Navigation } from "~/layouts/navigation";
import { Toaster } from "~/ui/toaster";

type Props = {
  children: React.ReactNode;
};

export const Layout: FC<Props> = ({ children }: Props) => {
  return (
    <>
      <Navigation />
      <div className="container my-8">{children}</div>
      <Toaster />
    </>
  );
};
