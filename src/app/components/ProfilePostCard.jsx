"use client";
import React from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import profile from "../../../public/Images/empty.webp";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Ensure it's imported
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { delPostApi, LikePostApi } from "../api/PostApi";
import { MdDelete } from "react-icons/md";

const ProfilePostCard = ({
  post,
  likedPosts,
  bookmarkedPosts,
  deletePostMutation,
  isLoading,
  profileData,
  LikeMutation,
  onToggleLike,
  onToggleBookmark,
}) => {
  return (
    <div
      key={post.id}
      className="bg-white/10 backdrop-blur-md lg:w-[500px] rounded-xl shadow-sm flex items-center justify-center border border-gray-400 p-4 sm:p-6 mb-4 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start w-full space-x-3">
        <div className="flex items-center justify-center flex-col w-full min-w-0">
          <div className="flex gap-3 w-full items-center">
            {isLoading ? (
              <Skeleton circle width={48} height={48} />
            ) : (
              <Image
                src={profileData?.data?.[0]?.image || profile}
                width={70}
                height={70}
                alt={post?.user}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
              />
            )}

            <div className="flex flex-col">
              <h3 className="font-semibold text-gray-900 truncate">
                {isLoading ? <Skeleton width={100} /> : post?.user?.username}
              </h3>
              <span className="text-gray-500 text-sm">
                {isLoading ? <Skeleton width={80} /> : post.timestamp}
              </span>
            </div>
          </div>

          <div className="mt-3 mb-3 w-full">
            {isLoading ? (
              <Skeleton count={2} />
            ) : (
              <p className="text-gray-800 leading-relaxed break-words">
                {post?.about}
              </p>
            )}
          </div>

          {isLoading ? (
            <Skeleton height={220} className="rounded-lg mb-4" />
          ) : (
            post?.image && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <Image
                  loading="lazy"
                  src={post.image}
                  alt="Post content"
                  className="rounded-lg object-cover hover:scale-105 transition-transform duration-300"
                  width={700} // Or actual image dimensions
                  height={400}
                />
              </div>
            )
          )}

          <div className="flex items-center justify-between pt-3 border-t border-gray-100 w-full">
            {isLoading ? (
              <Skeleton width={120} height={32} />
            ) : (
              <div className="flex items-center justify-between  w-full ">
                <button
                  onClick={() => {
                    LikeMutation.mutate(post?.id);

                    onToggleLike(post?.id);
                  }}
                  className={`flex items-center space-x-2 hover:text-red-500 ${
                    likedPosts?.has(post?.id) ? "text-red-500" : "text-white"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 sm:w-8 sm:h-8 ${
                      likedPosts?.has(post?.id) ? "fill-current" : ""
                    }`}
                  />
                  <span className="text-lg">{post?.likes}</span>
                  <p>{post?.like_count}</p>
                </button>
                <button
                  className="text-red-500 text-2xl"
                  onClick={() => {
                    deletePostMutation.mutate(post.id);
                  }}
                >
                  <MdDelete />
                </button>
              </div>
            )}

            {/* Bookmark and menu (optional) */}
            {/* You can conditionally render skeleton or show actual buttons here as well */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePostCard;
