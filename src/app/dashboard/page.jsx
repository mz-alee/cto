"use client";
import React, { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Profile from "./profile/page";
import HomeScreen from "./Home";

const SocialDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentUser = {
    name: "John Doe",
    username: "@johndoe",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  };

  const toggleLike = (postId) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      newSet.has(postId) ? newSet.delete(postId) : newSet.add(postId);
      return newSet;
    });
  };

  const toggleBookmark = (postId) => {
    setBookmarkedPosts((prev) => {
      const newSet = new Set(prev);
      newSet.has(postId) ? newSet.delete(postId) : newSet.add(postId);
      return newSet;
    });
  };

  return (
    <div
      style={{
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        // padding: "10px 10px",
        width: "100%",
        position: "fixed",
      }}
      className=""
    >
      {/* Mobile Header */}
      <div className="lg:hidden  shadow-sm  p-4 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        currentUser={currentUser}
      />

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {activeTab === "home" && (
          <HomeScreen
            likedPosts={likedPosts}
            bookmarkedPosts={bookmarkedPosts}
            onToggleLike={toggleLike}
            onToggleBookmark={toggleBookmark}
            currentUser={currentUser}
          />
        )}
        {activeTab === "profile" && <Profile />}
        {activeTab !== "home" && activeTab !== "profile" && (
          <div className="p-4 sm:p-6">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 capitalize">
                {activeTab} Page
              </h2>
              <p className="text-gray-600">
                This is the {activeTab} section. Content will be implemented
                here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialDashboard;
