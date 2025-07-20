"use client";
import React from "react";
import Loader from "../components/Loader";
import { useQuery } from "@tanstack/react-query";
import { GetPostApi } from "../api/PostApi";
import { CreatePost } from "./PostHeader";
import PostCard from "../components/PostCard";
import { Sansita_Swashed } from "next/font/google";

const font = Sansita_Swashed({
  subsets: ["latin"],
  weight: ["300"],
});
const HomeScreen = ({
  likedPosts,
  bookmarkedPosts,
  onToggleLike,
  onToggleBookmark,
  currentUser,
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["postData"],
    queryFn: GetPostApi,
    retry: false,
  });

  if (isLoading) return <Loader color="black" />;

  return (
    <div className="flex  items-center h-screen w-full p-2">
      {/* Header */}
      {/* <div className="bg-white/20 shadow-smp-2 sm:p-2">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2"></h2>
          <CreatePost currentUser={currentUser} />
        </div>
      </div> */}

      {/* Posts */}
      <div className="p-4 bg-white/20 rounded-2xl w-full h-[600px] sm:p-6">
        <h1 className={`${font.className} italic capitalize text-center text-[15px] lg:text-[1.5vw] text-gray-800 border-b border-gray-500 pb-3`}>all post</h1>
        <div className="max-w-2xl mx-auto">
          {data?.data?.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              likedPosts={likedPosts}
              bookmarkedPosts={bookmarkedPosts}
              onToggleLike={onToggleLike}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
