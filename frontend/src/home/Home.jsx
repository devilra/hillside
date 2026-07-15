import React from "react";
import Hero from "./Hero";
import FloatingLeaves from "../components/FloatingLeaves";
import FastMovingProjects from "./Fastmovingprojects";
import ExclusiveProjects from "./ExclusiveProjectcopy";
import LatestPropertyLaunches from "./LatestPropertyLaunches";

function Home() {
  return (
    <div className="relative bg-slate-950 pb-10 overflow-x-hidden ">
      {/* <FloatingLeaves /> */}
      <Hero />
      <ExclusiveProjects />
      <FastMovingProjects />
      {/* <EverythingYouNeed/> */}
      <LatestPropertyLaunches />
    </div>
  );
}

export default Home;
