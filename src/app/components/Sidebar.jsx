"use client";

import React from "react";
import { Home, User, Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import profile from "../../../public/Images/empty.webp";
import Image from "next/image";
import { ProfileGetData } from "../api/PostApi";
const Sidebar = ({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
  currentUser,
}) => {
  const sidebarItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["profiledata"],
    queryFn: ProfileGetData,
    onSuccess: (data) => {
      toast("data fetch successfully");
    },
    retry: "false",
    onError: (error) => {
      console.error(error);
    },
  });
  // console.log(data?.data?.[0]?.image);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black text-white bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white/10 shadow-lg   z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold lg:text-gray-900">
              Conservation Through Observation
            </h1>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100"
            >
              {/* You can add an X icon here if you want */}
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false); // Close sidebar on mobile after selection
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-white/20 lg:text-gray-800 border-r-2 border-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* User Profile Section */}
        <div className="absolute bottom-0 w-full p-6 ">
          <div className="flex items-center space-x-3 mb-4">
            <Image
              src={data?.data?.[0]?.image || profile}
              width={70}
              height={70}
              alt="Your Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium lg:text-gray-900 truncate">
                {isLoading ? (
                  <Skeleton count={1} height={15} width={150} />
                ) : data?.data?.[0].username ? (
                  data?.data?.[0].username
                ) : (
                  "null"
                )}
              </p>
              {/* <p className="text-sm text-gray-500 truncate">
                {currentUser.username}
              </p> */}
            </div>
          </div>
          <button
            onClick={() => {
              router.push("/login");
              deleteCookie("token");
            }}
            className="flex items-center space-x-2 lg:text-gray-500 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
