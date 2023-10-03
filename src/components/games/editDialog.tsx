import { Game } from "@prisma/client";
import { FC } from "react";
import { GameForm } from "~/components/forms/gameForm";
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
import { api } from "~/utils/api";

type Props = {
  gameId: string;
};

export const GameEditDialog: FC<Props> = ({ gameId, year }: Props) => {
  const { data: game, isLoading } = api.game.getById.useQuery({ id: gameId });

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">編集</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{game.name}を編集</DialogTitle>
            </DialogHeader>
            <GameForm gameId={gameId}>
              <DialogFooter>
                <Button type="submit">保存</Button>
              </DialogFooter>
            </GameForm>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
