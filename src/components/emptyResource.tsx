import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "~/ui/alert";

export const EmptyResource = ({ subject }: { subject: string }) => {
  return <Alert>
    <RocketIcon className="h-4 w-4" />
    <AlertTitle>{subject}が存在しません</AlertTitle>
    <AlertDescription>
      {subject}を追加してください
    </AlertDescription>
  </Alert>
}
