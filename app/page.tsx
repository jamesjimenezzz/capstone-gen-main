"use client";

import dynamic from "next/dynamic";
const Header = dynamic(() => import("@/components/Header"), { ssr: false });

import React from "react";

import Main from "./Main";
import Aside from "./LayoutSide";
import Footer from "./Footer";

import {
  useIndustry,
  useProjectType,
  useDifficulty,
} from "../store/useFilters";
import { useCapstones } from "@/hooks/useCapstones";

const HomePage = () => {
  const industry = useIndustry();
  const projectType = useProjectType();
  const difficulty = useDifficulty();

  const {
    data: ideas,
    refetch,
    isLoading,
    isFetching,
  } = useCapstones(industry, projectType, difficulty);

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="px-2 pt-3 max-w-[1200px] mx-auto ">
      <Header />
      <div className="flex gap-10 min-h-[85vh]">
        <Aside refetch={refetch} isFetching={isFetching} />

        {mounted && (
          <Main ideas={ideas} isFetching={isFetching} isLoading={isLoading} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
