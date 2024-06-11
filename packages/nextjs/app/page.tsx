"use client";

import type { NextPage } from "next";
import LatestPost from "~~/components/LatestPost";
import SocialMedia from "~~/components/SocialMedia";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <LatestPost />
        <SocialMedia />
      </div>
    </>
  );
};

export default Home;
