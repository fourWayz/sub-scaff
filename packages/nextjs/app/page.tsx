"use client";

import type { NextPage } from "next";
import SocialMedia from "~~/components/SocialMedia";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <SocialMedia />
      </div>
    </>
  );
};

export default Home;
