import Link from "next/link";
import { useRouter } from "next/router";
import { type FC } from "react";
import { cn } from "~/lib/utils";
import { Button } from "~/ui/button";

export const Navigation: FC = ({ ...props }) => {
  const router = useRouter();
  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="container flex h-14 items-center px-4">
          <nav
            className={cn("flex item-center space-x-4 lg:space-x-6 mx-6")}
            {...props}
          >
            <Button
              className={router.asPath === "/" ? "font-bold" : ""}
              variant="link"
              asChild
            >
              <Link href="/">戦績</Link>
            </Button>
            <Button
              className={router.asPath === "/members" ? "font-bold" : ""}
              variant="link"
              asChild
            >
              <Link href="/members">メンバー</Link>
            </Button>
            <Button
              className={router.asPath === "/rules" ? "font-bold" : ""}
              variant="link"
              asChild
            >
              <Link href="/rules">ルール</Link>
            </Button>
            <Button
              className={router.asPath === "/parlors" ? "font-bold" : ""}
              variant="link"
              asChild
            >
              <Link href="/parlors">雀荘</Link>
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
};
