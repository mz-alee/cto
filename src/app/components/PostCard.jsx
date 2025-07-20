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
const PostCard = ({
  post,
  likedPosts,
  bookmarkedPosts,
  onToggleLike,
  onToggleBookmark,
}) => {
  return (
    <div
      key={post.id}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start space-x-3">
        <Image
          src={profile}
          alt={post.user}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2 flex-wrap">
            <h3 className="font-semibold text-gray-900 truncate">
              {post?.user}
            </h3>
            <span className="text-gray-500 text-sm truncate">{post.user}</span>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <span className="text-gray-500 text-sm">{post.timestamp}</span>
          </div>

          <p className="text-gray-800 mb-3 leading-relaxed break-words">
            {post?.about}
          </p>

          {post?.image && (
            <div className="mb-4 rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt="Post content"
                className="w-full h-48 sm:h-64 object-contain hover:scale-105 transition-transform duration-300"
                width={100}
                height={100}
              />
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <button
                onClick={() => onToggleLike(post.id)}
                className={`flex items-center space-x-2 hover:text-red-500 ${
                  likedPosts.has(post.id) ? "text-red-500" : "text-gray-500"
                }`}
              >
                <Heart
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    likedPosts.has(post.id) ? "fill-current" : ""
                  }`}
                />
                <span className="text-sm">{post.likes}</span>
              </button>

              {/* <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm">{post.comments}</span>
              </button> */}

              {/* <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500">
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm hidden sm:inline">{post.shares}</span>
              </button> */}
            </div>
{/* 
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onToggleBookmark(post.id)}
                className={`p-1.5 sm:p-2 rounded-full hover:bg-gray-100 ${
                  bookmarkedPosts.has(post.id)
                    ? "text-yellow-500"
                    : "text-gray-500"
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    bookmarkedPosts.has(post.id) ? "fill-current" : ""
                  }`}
                />
              </button>

              <button className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 text-gray-500">
                <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
