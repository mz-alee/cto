"use client";
import React from "react";
import { Edit3, MapPin, Calendar, Link } from "lucide-react";
import Sidebar from "../../components/Sidebar";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Sidebar /> */}
     
      {/* Profile Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
          {/* Cover Photo */}
          <div className="h-32 sm:h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-4" />

          {/* Profile Info */}
          <div className="relative -mt-16 sm:-mt-20">
            <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Profile Picture */}
              <img
                src="/avatar.png"
                alt="User"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />

              {/* Info and Edit */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">User Name</h1>
                    <p className="text-gray-600 text-lg">@username</p>
                    <p className="mt-2 text-gray-700 max-w-md">User bio goes here...</p>
                  </div>

                  <button className="mt-4 sm:mt-0 flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    <Edit3 className="w-5 h-5" />
                    <span>Edit Profile</span>
                  </button>
                </div>

                {/* Extra Info */}
                <div className="mt-4 flex flex-wrap items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>City, Country</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Link className="w-4 h-4" />
                    <a href="#" className="text-blue-600 hover:underline">website.com</a>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined July 2025</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-4 flex space-x-6 text-sm">
                  <div className="text-center">
                    <span className="font-bold text-gray-900 block">0</span>
                    <span className="text-gray-600">Posts</span>
                  </div>
                  <div className="text-center">
                    <span className="font-bold text-gray-900 block">0</span>
                    <span className="text-gray-600">Followers</span>
                  </div>
                  <div className="text-center">
                    <span className="font-bold text-gray-900 block">0</span>
                    <span className="text-gray-600">Following</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* No Posts Placeholder */}
      <div className="max-w-4xl mx-auto p-4 sm:p-6 text-center">
        <div className="py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Edit3 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-600">When you create posts, they will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
