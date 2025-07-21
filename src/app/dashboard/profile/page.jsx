"use client";
import React, { useEffect, useState } from "react";
import { Edit3, MapPin, Calendar, Link } from "lucide-react";
import profile from "../../../../public/Images/empty.webp";
import Image from "next/image";
import ProfileEditModal from "@/app/components/ProfileModal";
import { CreatePost } from "../PostHeader";
import CreatePostModal from "@/app/components/CreatePostModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPostApi,
  delPostApi,
  ProfileGetData,
  ProfilePostApi,
} from "@/app/api/PostApi";
import { toast, ToastContainer } from "react-toastify";
import PostCard from "@/app/components/PostCard";
import { Sansita_Swashed } from "next/font/google";
import Loader from "@/app/components/Loader";
import { ProfileEditApi } from "@/app/api/profileApi";
import ProfilePostCard from "@/app/components/ProfilePostCard";

const font = Sansita_Swashed({
  subsets: ["latin"],
  weight: ["300"],
});
const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [mainData, setMainData] = useState();
  const queryClient = useQueryClient();

  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ["profile data"],
    queryFn: ProfileGetData,
    onSuccess: (data) => [console.log(data?.data?.[0].username)],
  });
  console.log(profileData?.data?.[0]);

  const postMutation = useMutation({
    mutationFn: (data) => createPostApi(data),
    onSuccess: () => {
      setIsPostOpen(false);
      toast("New post uploaded");
      queryClient.invalidateQueries(["postData"]);
    },
    onError: (err) => {
      if (err) {
        toast.error("Post could not  uploaded");
      }
    },
  });

  const profileMutation = useMutation({
    mutationFn: (data) => ProfileEditApi(data),
    onSuccess: () => {
      toast("profile Editr");
      queryClient.invalidateQueries(["edit-profile"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const deletePostMutation = useMutation({
    mutationFn: (data) => delPostApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["del post"]);
      toast("post deleted");
    },
    onError: (err) => {
      console.log(err);
    },
  });
  const { data, isLoading } = useQuery({
    queryKey: ["postData"],
    queryFn: ProfilePostApi,
    retry: false,
  });
  useEffect(() => {
    setMainData(data);
  }, [data]);
  console.log("profile data", profileData);

  return (
    <div className="min-h-screen bg-white/20 p-4 ">
      <ToastContainer />
      {/* Header */}
      {/* <div className="w-full h-24 bg-gradient-to-r from-blue-500 to-purple-600"></div> */}

      {/* Profile Container */}
      <div className="max-w-3xl mx-auto flex  flex-col justify-center items-center px-4">
        {/* Profile Top Section */}
        <div className=" bg-gray-600/40 w-full  lg:w-[60vw] gap-3 py-4 px-2 rounded-2xl  flex items-center ">
          <Image
            src={profileData?.data?.[0]?.image || profile}
            width={70}
            height={70}
            alt="User"
            className="w-24 h-24 rounded-full border-4 border-white object-cover shadow"
          />
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-800">User Name</h1>
            <p className="text-sm text-gray-300">
              @{profileData?.data?.[0]?.username}
            </p>
            <p className="text-sm mt-1 text-gray-600">
              {profileData?.data?.[0]?.about || "add bio"}
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
        <div className="p-4 bg-white/20   flex flex-col gap-5 rounded-2xl w-full lg:w-[60vw] mt-5 h-[85vh] lg:h-[70vh]  sm:p-6">
          <h1
            className={`${font.className} w-fit italic capitalize text-center text-[15px] lg:text-[1.5vw] text-gray-800 border-b border-gray-500 pb-3`}
          >
            your post
          </h1>
          <div className="w-full flex overflow-y-scroll  justify-center  h-[80vh] lg:h-[60vh]">
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
                  <ProfilePostCard
                    isLoading={isLoading}
                    profileData={profileData}
                    key={post.id}
                    post={post}
                    deletePostMutation={deletePostMutation}
                    // likedPosts={likedPosts}
                    // bookmarkedPosts={bookmarkedPosts}
                    // onToggleLike={onToggleLike}
                    // onToggleBookmark={onToggleBookmark}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        {/* <div className="mt-10 text-center  text-sm text-gray-500">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-2">
            <Edit3 size={20} className="text-gray-400" />
          </div>
          <p className="font-medium text-gray-700">No posts yet</p>
          <p className="text-xs">Your posts will appear here once published.</p>
        </div> */}
      </div>
      <div id="root">
        <ProfileEditModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          profileMutation={profileMutation}
          profileData={profileData}
        />
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
