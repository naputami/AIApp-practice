"use server";
import { openai } from "@/utils/openai";
import { replicate } from "@/utils/replicate";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function generateStoryAction(_, formData) {
  const prompt = formData.get("prompt");
  const languange = formData.get("languange");

  if (!prompt || !languange) {
    return {
      success: false,
      message: "Prompt and languange are required!",
    };
  }

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-16k",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: "You are a great bedtime story writer. You always write story with meaningful moral lessons\n\nIMPORTANT\n The story should consists of 8 -12 sentences\n\nIMPORTANT\nWrite result in JSON format with following attributes\ntitle: string\nstory: array of string\ncharacters: array of string\nmoralLessons: array of string\nimagePrompt: string\n\nIMPORTANT\nimagePrompt is prompt for generating image for story cover. imagePrompt should generate image with kids cartoon style. Include the style in the generated imagePrompt\n\nIMPORTANT\nimagePrompt should be concise and clear and always include \"in kids comic style and vibrant color\". Don't include character's name in the imagePrompt. ",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `${prompt}. Generate the story in ${languange}. ${
              languange === "indonesian"
                ? "however, generate imagePrompt in english"
                : ""
            }`,
          },
        ],
      },
    ],
    temperature: 1,
    max_tokens: 10000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  const data = JSON.parse(response.choices[0].message.content);
  const {imagePrompt} = data;

  const output = await replicate.run(
    "playgroundai/playground-v2.5-1024px-aesthetic:a45f82a1382bed5c7aeb861dac7c7d191b0fdf74d8d57c4a0e6ed7d4d0bf7d24",
    {
      input: {
        width: 1024,
        height: 1024,
        prompt: `${imagePrompt}`,
        scheduler: "DPMSolver++",
        num_outputs: 1,
        guidance_scale: 3,
        apply_watermark: true,
        negative_prompt: "ugly, deformed, noisy, blurry, distorted",
        prompt_strength: 0.8,
        num_inference_steps: 25
      }
    }
  );
  console.log(output);

  return {
    success: true,
    story: data,
    languange,
    image: output
  };
}

export async function logoutAction(){
  cookies().delete("token");
  cookies().delete("codeVerifier");

  redirect("/login")
}