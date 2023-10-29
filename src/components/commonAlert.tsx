import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "~/ui/alert";

export const CommonAlert = ({ message }: { message: string }) => {
  return <Alert className="m-4" variant="destructive">
    <ExclamationTriangleIcon className="h-4 w-4" />
    <AlertTitle>エラー</AlertTitle>
    <AlertDescription>{message}</AlertDescription>
  </Alert>
}
