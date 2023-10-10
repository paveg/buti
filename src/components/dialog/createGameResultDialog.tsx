import { type FC } from "react";
import { AddGameResultForm } from "~/components/form/addGameResultForm";
import { type GameWithResults } from "~/types/game";
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
  game: GameWithResults;
};

export const CreateGameResultDialog: FC<Props> = ({ game }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex">
          <Button className="ml-auto mr-4" size="sm">
            対局を追加
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="w-5/6">
        <DialogHeader>
          <DialogTitle>対局を追加</DialogTitle>
        </DialogHeader>
        <AddGameResultForm game={game}>
          <DialogFooter>
            <Button type="submit">追加</Button>
          </DialogFooter>
        </AddGameResultForm>
      </DialogContent>
    </Dialog>
  );
};
