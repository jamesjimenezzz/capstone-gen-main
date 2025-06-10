import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import { CapstoneIdea } from "../services/capstone-service";
import { useInsertFavorite } from "@/hooks/useCapstones";
import { useDeleteFavorite } from "@/hooks/useCapstones";

const Ideas = ({ idea }: { idea: CapstoneIdea }) => {

  const [isFavorite, setIsFavorite] = useState(false);

  const { mutate: insertFavorite } = useInsertFavorite();
  const { mutate: deleteFavorite } = useDeleteFavorite();

  return (
    <>
      <Card>
        <CardHeader className="">
          <div className="flex  justify-between">
            <CardTitle>{idea.capstone_id}</CardTitle>
            <CardTitle className=" ">
              <Star
                className={`w-4 h-4 text-muted-foreground  hover:text-foreground cursor-pointer ${
                  isFavorite ? "text-yellow-500" : ""
                }`}
                onClick={() => {
                  if (isFavorite) {
                    deleteFavorite(idea.capstone_id);
                    setIsFavorite(false);
                  } else {
                    insertFavorite(idea);
                    setIsFavorite(true);
                  }
                }}
              />
            </CardTitle>
          </div>

          <CardDescription>{idea.feasibility}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <p>{idea.description}</p>
        </CardContent>
        <CardFooter className="text-xs flex gap-3">
          {idea.tags.map((idea, i) => (
            <span
              className="dark:bg-stone-900 bg-gray-200 rounded-xl text-center px-2.5 py-1.5"
              key={i}
            >
              {idea}
            </span>
          ))}
        </CardFooter>
      </Card>
    </>
  );
};

export default Ideas;
