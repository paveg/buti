import { type FC } from "react";
import { EditGameForm } from "~/components/form/editGameForm";
import { Button } from "~/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/ui/dialog";
import { api } from "~/utils/api";

type Props = {
  gameId: string;
};

export const EditGameDialog: FC<Props> = ({ gameId }: Props) => {
  const { data: game, isLoading } = api.game.getById.useQuery({ id: gameId });

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm">
              基本情報を編集
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{game?.name}を編集</DialogTitle>
            </DialogHeader>
            <EditGameForm gameId={gameId}>
              <DialogFooter>
                <Button type="submit">保存</Button>
              </DialogFooter>
            </EditGameForm>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
