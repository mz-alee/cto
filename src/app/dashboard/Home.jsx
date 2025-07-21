"use client";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetPostApi, LikePostApi } from "../api/PostApi";
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
  const [mainData, setMainData] = useState();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["postData"],
    queryFn: GetPostApi,
    retry: false,
  });
  useEffect(() => {
    setMainData(data);
  }, [data]);
  // if (isLoading) return <Loader color="black" />;
  const LikeMutation = useMutation({
    mutationFn: (data) => LikePostApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["like-post"]);
      // toast("liked");
    },
    onError: (err) => {
      // console.log(err);
    },
  });
  console.log(mainData?.data);

  return (
    <div className="flex   lg:items-center h-screen w-full p-2">
      {/* Header */}
      {/* <div className="bg-white/20 shadow-smp-2 sm:p-2">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2"></h2>
          <CreatePost currentUser={currentUser} />
        </div>
      </div> */}

      {/* Posts */}
      <div className="p-4 bg-white/20   flex flex-col gap-5 rounded-2xl w-full h-[85vh] lg:h-[600px]  sm:p-6">
        <h1
          className={`${font.className}  italic capitalize text-center text-[15px] lg:text-[1.5vw] text-gray-800 border-b border-gray-500 pb-3`}
        >
          all post
        </h1>
        <div className="w-full flex overflow-y-scroll  justify-center  h-[80vh] lg:h-[70vh]">
          {isLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Loader color="black" />
            </div>
          ) : !data?.data?.length ? (
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-gray-500 text-[13px]">no data</p>
            </div>
          ) : (
            <div className="max-w-2xl  mx-auto">
              {mainData?.data?.map((post) => (
                <PostCard
                  isLoading={isLoading}
                  key={post.id}
                  LikeMutation={LikeMutation}
                  post={post}
                  likedPosts={likedPosts}
                  bookmarkedPosts={bookmarkedPosts}
                  onToggleLike={onToggleLike}
                  onToggleBookmark={onToggleBookmark}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
