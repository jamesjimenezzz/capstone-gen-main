import { create } from "zustand";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "";
export type ProjectType = "Thesis" | "Capstone" | "";
export type Industry = string;

interface FilterState {
  industry: Industry;
  projectType: ProjectType;
  difficulty: Difficulty;
  setIndustry: (industry: Industry) => void;
  setProjectType: (projectType: ProjectType) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  resetFilters: () => void;
}

export const useFilterState = create<FilterState>((set) => ({
  industry: "",
  projectType: "",
  difficulty: "",
  setIndustry: (industry) => set({ industry }),
  setProjectType: (projectType) => set({ projectType }),
  setDifficulty: (difficulty) => set({ difficulty }),
  resetFilters: () => set({ industry: "", projectType: "", difficulty: "" }),
}));

export const useIndustry = () => useFilterState((s) => s.industry);
export const useSetIndustry = () => useFilterState((s) => s.setIndustry);

export const useProjectType = () => useFilterState((s) => s.projectType);
export const useSetProjectType = () => useFilterState((s) => s.setProjectType);

export const useDifficulty = () => useFilterState((s) => s.difficulty);
export const useSetDifficulty = () => useFilterState((s) => s.setDifficulty);

export const useResetFilters = () => useFilterState((s) => s.resetFilters);
