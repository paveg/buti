import { type FC } from "react";
import { CreateGameForm } from "~/components/form/createGameForm";
import { Button } from "~/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/ui/dialog";

export const CreateGameDialog: FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex">
          <Button className="ml-auto" size="sm">
            戦績を追加
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>戦績を作成</DialogTitle>
        </DialogHeader>
        <CreateGameForm>
          <DialogFooter>
            <Button type="submit">作成</Button>
          </DialogFooter>
        </CreateGameForm>
      </DialogContent>
    </Dialog>
  );
};
