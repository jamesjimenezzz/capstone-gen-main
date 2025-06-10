import React from "react";

import { BookOpenText } from "lucide-react";
import SpinnerCircle2 from "@/components/spinner-08";

import Ideas from "./Ideas";
import { type CapstoneIdea } from "@/services/capstone-service";

interface MainProps {
  ideas: CapstoneIdea[] | undefined;
  isFetching: boolean;
  isLoading: boolean;
}

const Main = ({ ideas, isFetching, isLoading }: MainProps) => {
  return (
    <>
      <main className="flex mx-auto items-center">
        <div className=" space-y-2  ">
          {isLoading || isFetching ? (
            <>
              <SpinnerCircle2 />
            </>
          ) : ideas?.length ? (
            <div className="grid grid-cols-2 gap-4">
              {ideas.map((idea, index) => (
                <Ideas key={index} idea={idea} />
              ))}
            </div>
          ) : (
            <div className="text-center flex flex-col gap-2">
              <span className="flex justify-center">
                <BookOpenText className="w-16 h-16" />
              </span>
              <h1 className="font-semibold text-xl">
                Your capstone ideas will be shown here
              </h1>
              <p className="text-muted-foreground text-base">
                {" "}
                Select your industry and difficulty level, then click Generate
                Ideas to get started.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Main;
