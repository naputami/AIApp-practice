"use client";
import { generateStoryAction, logoutAction } from "./action";
import { useActionState } from "react";
import { Input, Button, Radio, RadioGroup, Image } from "@nextui-org/react";

export default function FormStory() {
  const [state, formAction, pending] = useActionState(
    generateStoryAction,
    null
  );

  return (
    <main className="min-h-screen container mx-auto py-12">
      <h1 className="text-center font-bold text-slate-900 text-4xl">
        Bedtime Story Ai
      </h1>
      <div className="my-6 flex justify-end">
        <form action={logoutAction}>
          <Button type="submit" color="danger">
            Logout
          </Button>
        </form>
      </div>
      <form action={formAction} className="mt-4 space-y-4">
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Input
            type="text"
            name="prompt"
            label="prompt"
            placeholder="Enter your prompt"
            isRequired
          />
        </div>
        <RadioGroup
          label="Select languange"
          name="languange"
          orientation="horizontal"
          isRequired
        >
          <Radio value="indonesian">Indonesian</Radio>
          <Radio value="english">English</Radio>
        </RadioGroup>
        <Button type="submit" color="primary" isLoading={pending}>
          Generate Story
        </Button>
      </form>
      {state?.success === false && (
        <div className="bg-rose-100 p-3 rounded-lg mt-4">
          <p className="text-rose-500">{state?.message}</p>
        </div>
      )}
      {state?.success && (
        <div className="mt-4 space-y-4">
          <h2 className="font-bold text-2xl">{state?.story?.title}</h2>
          <Image width={300} alt="cover story image" src={state?.image} />
          <div>
            {state?.story?.story.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
          </div>
          <div>
            <p className="font-bold">
              {state?.languange === "indonesian" ? "Tokoh-tokoh" : "Characters"}
            </p>
            <div>
              {state?.story?.characters.map((item, index) => {
                return <p key={index}>{item}</p>;
              })}
            </div>
          </div>
          <div>
            <p className="font-bold">
              {state?.languange === "indonesian"
                ? "Pesan Moral"
                : "Moral Lessons"}
            </p>
            <div>
              {state?.story?.moralLessons.map((item, index) => {
                return <p key={index}>{item}</p>;
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
