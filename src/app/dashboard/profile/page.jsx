"use client";
import React, { useState } from "react";
import { Edit3, MapPin, Calendar, Link } from "lucide-react";
import profile from "../../../../public/Images/empty.webp";
import Image from "next/image";
import ProfileEditModal from "@/app/components/ProfileModal";
import { CreatePost } from "../PostHeader";
import CreatePostModal from "@/app/components/CreatePostModal";
import { useMutation } from "@tanstack/react-query";
import { createPostApi } from "@/app/api/PostApi";
const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);
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
    <div className="min-h-screen bg-white/20 p-4 ">
      {/* Header */}
      {/* <div className="w-full h-24 bg-gradient-to-r from-blue-500 to-purple-600"></div> */}

      {/* Profile Container */}
      <div className="max-w-3xl mx-auto px-4">
        {/* Profile Top Section */}
        <div className=" bg-gray-600/40 w-[90vw] md:w-[80vw] lg:w-[60vw] gap-3 py-4 px-2 rounded-2xl  flex items-center ">
          <Image
            src={profile}
            alt="User"
            className="w-24 h-24 rounded-full border-4 border-white object-cover shadow"
          />
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-800">User Name</h1>
            <p className="text-sm text-gray-500">@username</p>
            <p className="text-sm mt-1 text-gray-600">
              This is a short user bio...
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-blue-600 text-sm text-white cursor-pointer px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              <Edit3 size={16} className="inline-block mr-1" />
              Edit
            </button>
            <button
              onClick={() => setIsPostOpen(true)}
              className="bg-green-400 cursor-pointer text-sm text-white px-4 py-2 rounded hover:bg-green-500 transition"
            >
              <Edit3 size={16} className="inline-block mr-1" />
              post
            </button>
          </div>
          {/* Meta Info */}
          <div className="mt-4 flex flex-wrap text-sm text-gray-600 gap-4"></div>
        </div>
        {/* Stats */}
        {/* <div className="mt-4 flex justify-around text-center text-sm">
          <div>
            <p className="font-semibold text-gray-800">0</p>
            <p className="text-gray-500">Posts</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">0</p>
            <p className="text-gray-500">Followers</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">0</p>
            <p className="text-gray-500">Following</p>
          </div>
        </div> */}

        {/* No Posts Placeholder */}
        <div className="mt-10 text-center text-sm text-gray-500">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-2">
            <Edit3 size={20} className="text-gray-400" />
          </div>
          <p className="font-medium text-gray-700">No posts yet</p>
          <p className="text-xs">Your posts will appear here once published.</p>
        </div>
      </div>
      <div id="root">
        <ProfileEditModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div id="root">
        <CreatePostModal
          isOpen={isPostOpen}
          setIsOpen={setIsPostOpen}
          postMutation={postMutation}
        />
      </div>
    </div>
  );
};

export default Profile;
