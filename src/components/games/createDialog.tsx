import { Game } from "@prisma/client";
import { FC } from "react";
import { CreateGameForm } from "~/components/forms/createGameForm";
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

export const GameCreateDialog: FC = () => {
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
