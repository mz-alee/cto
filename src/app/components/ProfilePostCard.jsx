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
  Image as ImageIcon
} from "lucide-react";
import profile from "../../../public/Images/empty.webp";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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
  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format duration helper
  const formatDuration = (duration) => {
    if (!duration) return '';
    return `${duration} min`;
  };

  return (
    <div className="bg-white/10 backdrop-blur-md lg:w-[500px] rounded-2xl shadow-lg border border-white/20 p-4 sm:p-6 mb-6 hover:shadow-xl hover:bg-white/15 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex flex-col w-full space-y-4">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isLoading ? (
              <Skeleton circle width={48} height={48} />
            ) : (
              <div className="relative">
                <Image
                  src={profileData?.data?.[0]?.image || profile}
                  width={48}
                  height={48}
                  alt={post?.user}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white/20"
                />
              </div>
            )}

            <div className="flex flex-col">
              <h3 className="font-semibold text-white text-sm sm:text-base">
                {isLoading ? <Skeleton width={100} /> : post?.user?.username || 'User'}
              </h3>
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
              {post?.post_type === 'image' && (
                <div className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" />
                  Image
                </div>
              )}
              {post?.post_type === 'video' && (
                <div className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <Play className="w-3 h-3" />
                  Video
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
                <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full flex items-center gap-1">
                  <Bird className="w-3 h-3" />
                  {post.bird_species}
                </div>
              )}
              {post?.activity && (
                <div className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full">
                  {post.activity}
                </div>
              )}
            </div>
          )}

          {/* Location & Duration Info */}
          {!isLoading && (post?.location || post?.duration) && (
            <div className="flex flex-wrap gap-3 text-white/70 text-xs sm:text-sm">
              {post?.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{post.location}</span>
                </div>
              )}
              {post?.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatDuration(post.duration)}</span>
                </div>
              )}
            </div>
          )}

          {/* Date/Time Info */}
          {!isLoading && post?.datetime && (
            <div className="text-white/60 text-xs">
              Event Date: {formatDate(post.datetime)}
            </div>
          )}

          {/* Media Section */}
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton height={220} className="rounded-xl" />
            </div>
          ) : (
            <>
              {/* Image */}
              {post?.image && (
                <div className="rounded-xl overflow-hidden bg-black/20">
                  <Image
                    loading="lazy"
                    src={post.image}
                    alt="Post content"
                    className="w-full h-auto max-h-96 object-cover hover:scale-105 transition-transform duration-300"
                    width={700}
                    height={400}
                  />
                </div>
              )}

              {/* Video */}
              {post?.video && (
                <div className="rounded-xl overflow-hidden bg-black/20">
                  <video
                    controls
                    className="w-full h-auto max-h-96 object-cover"
                    poster={post?.image} // Use image as poster if available
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
            <Skeleton width={150} height={32} />
          ) : (
            <div className="flex items-center justify-between w-full">
              {/* Like Button */}
              <button
                onClick={() => {
                  LikeMutation.mutate(post?.id);
                  onToggleLike(post?.id);
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-200 hover:bg-red-500/20 ${
                  likedPosts?.has(post?.id) 
                    ? "text-red-400 bg-red-500/10" 
                    : "text-white/70 hover:text-red-400"
                }`}
              >
                <Heart
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    likedPosts?.has(post?.id) ? "fill-current" : ""
                  }`}
                />
                <span className="text-sm font-medium">
                  {post?.like_count || post?.likes || 0}
                </span>
              </button>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleBookmark(post?.id)}
                  className={`p-2 rounded-full transition-all duration-200 hover:bg-blue-500/20 ${
                    bookmarkedPosts?.has(post?.id)
                      ? "text-blue-400 bg-blue-500/10"
                      : "text-white/70 hover:text-blue-400"
                  }`}
                >
                  <Bookmark className={`w-4 h-4 ${bookmarkedPosts?.has(post?.id) ? "fill-current" : ""}`} />
                </button>

                <button
                  className="p-2 rounded-full text-white/70 hover:text-red-400 hover:bg-red-500/20 transition-all duration-200"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this post?')) {
                      deletePostMutation.mutate(post.id);
                    }
                  }}
                >
                  <MdDelete className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePostCard;