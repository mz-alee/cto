"use client";
import React from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  MapPin,
  Clock,
  Bird,
  Calendar,
  Play,
  Image as ImageIcon,
  User,
} from "lucide-react";
import profile from "../../../public/Images/empty.webp";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { LikePostApi, ProfileGetData } from "../api/PostApi";
import { toast, ToastContainer } from "react-toastify";

const PostCard = ({
  post,
  likedPosts,
  bookmarkedPosts,
  isLoading,
  LikeMutation,
  onToggleLike,
  onToggleBookmark,
}) => {
  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ["profile data"],
    queryFn: ProfileGetData,
    onSuccess: (data) => [console.log(data?.data?.[0].username)],
  });

  const isLiked = post?.is_liked || likedPosts?.has(post?.id) || false;
  const isBookmarked =
    post?.is_bookmarked || bookmarkedPosts?.has(post?.id) || false;

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (duration) => {
    if (!duration) return "";
    return `${duration} min`;
  };

  const handleLike = async () => {
    try {
      onToggleLike(post?.id);

      await LikeMutation.mutateAsync(post?.id);
    } catch (error) {
      onToggleLike(post?.id);
      console.error("Like error:", error);
    }
  };

  return (
    <div
      key={post.id}
      className="bg-white/10 backdrop-blur-md lg:w-[500px] rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 mb-6 hover:shadow-xl hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1"
    >
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="flex flex-col w-full space-y-4">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isLoading || profileLoading ? (
              <Skeleton circle width={48} height={48} />
            ) : (
              <div className="relative">
                <Image
                  src={
                    post?.user?.username === profileData?.data?.[0]?.username
                      ? profileData?.data?.[0]?.image || profile
                      : post?.user?.image || profile
                  }
                  width={48}
                  height={48}
                  alt={post?.user?.username || "User"}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white/20"
                />
                {/* Online indicator for current user */}
                {post?.user?.username === profileData?.data?.[0]?.username && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
            )}

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white text-sm sm:text-base">
                  {isLoading ? (
                    <Skeleton width={100} />
                  ) : (
                    post?.user?.username || "User"
                  )}
                </h3>
                {post?.user?.username === profileData?.data?.[0]?.username && (
                  <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full text-xs">
                    You
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-white/70 text-xs sm:text-sm">
                {isLoading ? (
                  <Skeleton width={80} />
                ) : (
                  <>
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(post?.created_at)}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Post Type Indicator */}
          {!isLoading && (
            <div className="flex items-center gap-2">
              {post?.post_type === "image" && (
                <div className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" />
                  Image
                </div>
              )}
              {post?.post_type === "video" && (
                <div className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <Play className="w-3 h-3" />
                  Video
                </div>
              )}
              {!post?.post_type && (
                <div className="bg-gray-500/20 text-gray-300 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  Text
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="space-y-3">
          {/* About Text */}
          {(post?.about || post?.content) && (
            <div>
              {isLoading ? (
                <Skeleton count={2} />
              ) : (
                <p className="text-white/90 leading-relaxed break-words text-sm sm:text-base">
                  {post?.about || post?.content}
                </p>
              )}
            </div>
          )}

          {/* Bird Species & Activity Info */}
          {!isLoading && (post?.bird_species || post?.activity) && (
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
              {post?.bird_species && (
                <div className="bg-green-500/20 text-green-300 px-3 py-1.5 rounded-full flex items-center gap-1 font-medium">
                  <Bird className="w-3 h-3" />
                  {post.bird_species}
                </div>
              )}
              {post?.activity && (
                <div className="bg-orange-500/20 text-orange-300 px-3 py-1.5 rounded-full font-medium">
                  {post.activity}
                </div>
              )}
            </div>
          )}

          {/* Location & Duration Info */}
          {!isLoading && (post?.location || post?.duration) && (
            <div className="flex flex-wrap gap-4 text-white/70 text-xs sm:text-sm">
              {post?.location && (
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full">
                  <MapPin className="w-3 h-3 text-red-400" />
                  <span>{post.location}</span>
                </div>
              )}
              {post?.duration && (
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full">
                  <Clock className="w-3 h-3 text-blue-400" />
                  <span>{formatDuration(post.duration)}</span>
                </div>
              )}
            </div>
          )}

          {/* Event Date/Time Info */}
          {!isLoading && post?.datetime && (
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
              <div className="flex items-center gap-2 text-purple-300 text-xs sm:text-sm">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">Event Date:</span>
                <span>{formatDate(post.datetime)}</span>
              </div>
            </div>
          )}

          {/* Media Section */}
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton height={280} className="rounded-xl" />
            </div>
          ) : (
            <>
              {/* Image */}
              {post?.image && (
                <div className="rounded-xl overflow-hidden bg-black/20 shadow-lg">
                  <Image
                    src={post.image}
                    alt="Post content"
                    layout="responsive"
                    width={700}
                    height={400}
                    className="w-full h-auto max-h-96 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Video */}
              {post?.video && (
                <div className="rounded-xl overflow-hidden bg-black/20 shadow-lg">
                  <video
                    controls
                    className="w-full h-auto max-h-96 object-cover"
                    poster={post?.image}
                  >
                    <source src={post.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </>
          )}
        </div>

        {/* Actions Section */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          {isLoading ? (
            <Skeleton width={200} height={40} />
          ) : (
            <div className="flex items-center justify-between w-full">
              {/* Left Actions */}
              <div className="flex items-center gap-1">
                {/* Like Button */}
                <button
                  onClick={handleLike}
                  disabled={LikeMutation.isLoading}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200 hover:bg-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed ${
                    isLiked
                      ? "text-red-400 bg-red-500/10 shadow-lg"
                      : "text-white/70 hover:text-red-400"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-200 ${
                      isLiked ? "fill-current scale-110" : ""
                    } ${LikeMutation.isLoading ? "animate-pulse" : ""}`}
                  />
                  <span className="text-sm font-medium">
                    {post?.like_count || post?.likes || 0}
                  </span>
                </button>

                {/* Comment Button */}
                <button className="flex items-center space-x-2 px-3 py-2 rounded-full text-white/70 hover:text-blue-400 hover:bg-blue-500/20 transition-all duration-200">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm font-medium">Comment</span>
                </button>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-1">
                {/* Share Button */}
                <button className="p-2 rounded-full text-white/70 hover:text-green-400 hover:bg-green-500/20 transition-all duration-200">
                  <Share2 className="w-4 h-4" />
                </button>

                {/* Bookmark Button */}
                <button
                  onClick={() => onToggleBookmark(post?.id)}
                  className={`p-2 rounded-full transition-all duration-200 hover:bg-yellow-500/20 ${
                    isBookmarked
                      ? "text-yellow-400 bg-yellow-500/10"
                      : "text-white/70 hover:text-yellow-400"
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 transition-all duration-200 ${
                      isBookmarked ? "fill-current scale-110" : ""
                    }`}
                  />
                </button>

                {/* More Options */}
                <button className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
