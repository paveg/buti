import { Card } from "~/ui/card";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "~/ui/button";
import { AuthLayout } from "./layout";

export default function SignIn() {
  const { data: sessionData } = useSession();

  return (
    <AuthLayout>
      <Card className="mx-auto text-center w-[350px]">
        <Button
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Logout" : "Login"}
        </Button>
      </Card>
    </AuthLayout>
  );
}
