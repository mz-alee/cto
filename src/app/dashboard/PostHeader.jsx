"use client";

import React, { useState } from "react";
import { Image as ImageIcon, Smile, Video } from "lucide-react";
import Image from "next/image";
import profile from "../../../public/Images/empty.webp";
import CreatePostModal from "../components/CreatePostModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostApi } from "../api/PostApi";
import { toast, ToastContainer } from "react-toastify";

export const CreatePost = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: (data) => createPostApi(data),
    onSuccess: () => {
      toast("New post uploaded");
      queryClient.invalidateQueries(["postData"]);
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Post could not be uploaded");
    },
  });

  return (
    <>
      <ToastContainer />
      <div className="bg-white/30 rounded-lg px-4 py-3 mb-4 shadow-sm text-sm sm:text-base">
        {/* Top Section */}
        <div className="flex items-center gap-3">
          <Image
            src={profile}
            alt="Avatar"
            className="w-9 h-9 rounded-full object-cover"
          />
          <input
            type="text"
            placeholder="What's on your mind?"
            className="flex-1 text-sm bg-gray-100 rounded-full px-4 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Bottom Section */}
        <div className="flex items-center justify-between mt-3 flex-wrap sm:flex-nowrap gap-2">
          <div className="flex items-center gap-3 text-gray-500 text-xs sm:text-sm">
            <button className="flex items-center gap-1 hover:text-blue-500">
              <ImageIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Photo</span>
            </button>
            <button className="flex items-center gap-1 hover:text-green-500">
              <Video className="w-4 h-4" />
              <span className="hidden sm:inline">Video</span>
            </button>
            <button className="flex items-center gap-1 hover:text-yellow-500">
              <Smile className="w-4 h-4" />
              <span className="hidden sm:inline">Feeling</span>
            </button>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700 text-xs sm:text-sm"
          >
            Post
          </button>
        </div>
      </div>
      <div id='root'>
        <CreatePostModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          postMutation={postMutation}
        />
      </div>
    </>
  );
};
