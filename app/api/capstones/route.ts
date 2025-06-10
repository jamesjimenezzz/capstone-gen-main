import { NextResponse } from "next/server";
import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // move to .env for security!
});

export async function POST(req: Request) {
  try {
    const { industry, projectType, difficulty } = await req.json();

    const prompt = `Generate 4 ${difficulty} ${projectType} project ideas in the ${
      industry || "general"
    } industry. For each idea, include:
1. title  
2. feasibility (1 sentence)  
3. description (2 sentences)  
4. 3-5 short tags (single or two-word phrases only)

Format the response strictly as a JSON array:
[
  {
    "industry": industry,
    "project_type": projectType,
    "difficulty": difficulty,
    "capstone_id": "${uuidv4()}",
    "title": "",
    "feasibility": "",
    "description": "",
    "tags": ["", "", ""]
  }
]`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const content = completion.choices[0].message?.content;

    console.log(content);

    return NextResponse.json({ content });
  } catch (error) {
    console.error("❌ OpenAI Error:", error);
    return NextResponse.json({ error: "OpenAI failed" }, { status: 500 });
  }
}
