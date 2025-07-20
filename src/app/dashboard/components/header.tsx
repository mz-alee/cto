"use client"
// Create Post Component
import { Image as ImageIcon, Smile, Video } from "lucide-react";
import React, { useState } from "react";
import profile from '../../../../public/Images/empty.webp'
import Image from "next/image";
import dynamic from "next/dynamic";
import { CreatePostApi } from "../../api/CreatePostApi";
interface CreatePostProps {
  currentUser: any;
  profile: any;
}
interface CreatePost {
  profile: any;
}
export const CreatePost: React.FC<CreatePostProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false)
  const PostModal = dynamic(() => import("../../components/PostModal"), {
    ssr: false,
  });


  return (
    <>
      <div className="bg-gray-50 text-gray-800 rounded-xl p-4 mb-6">
        <div className="flex items-center space-x-3">
          <Image
            src={profile}
            alt="Your Avatar"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
          />
          <input
            type="text"
            placeholder="What's on your mind?"
            className="flex-1 bg-white rounded-full px-4 py-2 border text-black border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="flex items-center space-x-1 sm:space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
              <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm hidden sm:inline">Photo</span>
            </button>
            <button className="flex items-center space-x-1 sm:space-x-2 text-gray-500 hover:text-green-500 transition-colors">
              <Video className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm hidden sm:inline">Video</span>
            </button>
            <button className="flex items-center space-x-1 sm:space-x-2 text-gray-500 hover:text-yellow-500 transition-colors">
              <Smile className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm hidden sm:inline">Feeling</span>
            </button>
          </div>
          <button
            onClick={() => {
              setIsOpen(true)
              console.log('click');
            }}
            className="bg-blue-600 text-white px-4 py-2 sm:px-6 rounded-full hover:bg-blue-700 transition-colors text-sm sm:text-base">
            Post
          </button>
        </div>
      </div>
      <div id="root">
        <PostModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
    </>
  );
};
