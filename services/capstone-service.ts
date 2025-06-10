import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export type CapstoneIdea = {
  capstone_id: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: string;
  project_type: string;
  industry: string;
  feasibility: string;
};

export const fetchCapstones = async (
  industry: string,
  projectType: string,
  difficulty: string
): Promise<CapstoneIdea[]> => {
  const res = await fetch("/api/capstones", {
    method: "POST",
    body: JSON.stringify({ industry, projectType, difficulty }),
    headers: { "Content-Type": "application/json" },
  });

  const json = await res.json();
  let raw = json.content ?? "[]";

  if (raw.startsWith("```json")) {
    raw = raw.replace(/```json|```/g, "").trim();
  }

  try {
    return JSON.parse(raw);
  } catch {
    console.error("❌ Failed to parse OpenAI response:", raw);
    return [];
  }
};

export const insertFavorite = async (idea: CapstoneIdea) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase.from("capstones").insert({
    user_id: user.id,
    title: idea.title,
    description: idea.description,
    tags: idea.tags,
    difficulty: idea.difficulty,
    project_type: idea.project_type,
    industry: idea.industry,
    feasibility: idea.feasibility,
    capstone_id: idea.capstone_id,
  });

  if (error) throw new Error(error.message);
};

export const deleteFavorite = async (id: string) => {
  const { data, error } = await supabase
    .from("capstones")
    .delete()
    .eq("capstone_id", id);

  if (error) throw new Error(error.message);
};

export const fetchFavorites = async (user_id: string): Promise<CapstoneIdea[]> => {
  const { data, error } = await supabase
    .from("capstones")
    .select("*")
    .eq("user_id", user_id) as {
      data: CapstoneIdea[] | null;
      error: any;
    };

  if (error) {
    console.error("[Supabase] fetchFavorites error:", error);
    throw new Error("Failed to fetch favorites");
  }

  return data ?? [];
};