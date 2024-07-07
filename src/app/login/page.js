"use client";
import { loginWithGoogleAction } from "./action-loginwithgoogle";
import { Button, Divider } from "@nextui-org/react";

export default function Page() {
  return (
    <main className="container mx-auto h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="font-bold text-4xl">Welcome to Bedtime Story Ai</h1>
      <Divider />
      <form action={loginWithGoogleAction}>
        <Button color="primary" type="submit">
          Login with Google
        </Button>
      </form>
    </main>
  );
}
