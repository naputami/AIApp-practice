import { redirect } from "next/navigation";
import { auth } from "../../lib/auth"
import FormStory from "./formstory";

export default function Page() {
  const user = auth();
  console.log("Auth result:", user);

  if(!user){
    redirect("/login");
  }

  return (
    <>
    <FormStory />
    </>
  )
}
