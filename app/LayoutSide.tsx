import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ThemeIcon";
import {
  useIndustry,
  useSetIndustry,
  useProjectType,
  useSetProjectType,
  useDifficulty,
  useSetDifficulty,
  useResetFilters,
} from "@/store/useFilters";
import { useCapstones } from "@/hooks/useCapstones";
import { Sparkle } from "lucide-react";

interface AsideProps {
  refetch: () => void;
  isFetching: boolean;
}

const Aside = React.memo(({ refetch, isFetching }: AsideProps) => {
  const industry = useIndustry();
  const projectType = useProjectType();
  const difficulty = useDifficulty();

  const setIndustry = useSetIndustry();
  const setProjectType = useSetProjectType();
  const setDifficulty = useSetDifficulty();

  return (
    <>
      <aside className=" border flex-1 flex flex-col gap-4 dark:bg-neutral-900 bg-gray-100 max-w-xs p-5">
        <div>
          <div className="flex items-center justify-between">
            <h1 className="mb-1.5 font-bold text-xl">Capstone Generator</h1>
            <ModeToggle />
          </div>

          <p className="text-sm text-muted-foreground">
            Discover your next project ideas here!
          </p>
        </div>
        <div>
          <h2 className="text-base font-semibold">Filters</h2>
        </div>
        <div>
          <p className="text-sm mb-2 font-semibold">Industry</p>
          <Select onValueChange={setIndustry}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Industries</SelectLabel>
                <SelectItem value="computer_science">
                  Computer Science
                </SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="education">Education</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className="text-sm mb-2 font-semibold">Project Type </p>
          <Select onValueChange={setProjectType}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="All Project Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel></SelectLabel>
                <SelectItem value="capstone">Capstone</SelectItem>
                <SelectItem value="thesis">Thesis</SelectItem>
                <SelectItem value="research_project">
                  Research Project
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <h1 className="text-sm mb-3 font-semibold">Difficulty</h1>
          <div className="flex gap-1 mb-2 ">
            <Button
              onClick={() => setDifficulty("Beginner")}
              variant={difficulty === "Beginner" ? "default" : "outline"}
              className=" text-xs m-0 py-0 px-4"
            >
              Beginner
            </Button>
            <Button
              onClick={() => setDifficulty("Intermediate")}
              variant={difficulty === "Intermediate" ? "default" : "outline"}
              className="text-xs m-0 py-0 px-4"
            >
              Intermediate
            </Button>
            <Button
              onClick={() => setDifficulty("Advanced")}
              variant={difficulty === "Advanced" ? "default" : "outline"}
              className="text-xs m-0 py-0 px-4"
            >
              Advanced
            </Button>
          </div>
        </div>
        <div className=" ">
          <Button
            disabled={isFetching}
            onClick={() => refetch()}
            className="w-full"
          >
            <Sparkle className="w-4 h-4 mr-2" />
            Generate Ideas
          </Button>
        </div>
      </aside>
    </>
  );
});
Aside.displayName = "Aside";

export default Aside;
