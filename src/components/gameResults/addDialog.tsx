import { Game } from "@prisma/client";
import { FC } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { AddGameResultForm } from "../forms/addGameResultForm";

type Props = {
  game: Game;
};

export const GameResultCreateDialog: FC<Props> = ({ game }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex">
          <Button className="ml-auto" size="sm">
            対局を追加
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>対局を追加</DialogTitle>
        </DialogHeader>
        <AddGameResultForm game={game} sequence={0}>
          <DialogFooter>
            <Button type="submit">追加</Button>
          </DialogFooter>
        </AddGameResultForm>
      </DialogContent>
    </Dialog>
  );
};
