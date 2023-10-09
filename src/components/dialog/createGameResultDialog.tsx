import { type Game } from "@prisma/client";
import { type FC } from "react";
import { AddGameResultForm } from "~/components/form/addGameResultForm";
import { Button } from "~/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/ui/dialog";

type Props = {
  game: Game;
};

export const CreateGameResultDialog: FC<Props> = ({ game }: Props) => {
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
