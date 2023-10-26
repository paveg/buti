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
        <div className="flex h-14 items-center px-2 md:container">
          <nav
            className={cn(
              "item-center mx-4 flex space-x-4 md:mx-8 lg:space-x-6"
            )}
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
              className={router.asPath === "/players" ? "font-bold" : ""}
              variant="link"
              asChild
            >
              <Link href="/players">プレイヤー</Link>
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
