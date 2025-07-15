


import React from 'react';
import {
  Home,
  User,
  Settings,
  LogOut,
  Users,
} from "lucide-react";
import Link from 'next/link';

interface User {
  name: string;
  username: string;
  avatar: string;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  src: string;
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentUser: User;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen, currentUser }) => {
  const sidebarItems: SidebarItem[] = [
    { src: '/dashboard', id: "home", label: "Home", icon: Home },
    { src: '/dashboard/profile', id: "profile", label: "Profile", icon: User },
    { src: '', id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}>
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Conservation Through Observation</h1>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 rounded-full hover:bg-gray-100"
            >
              {/* <X className="w-5 h-5" /> */}
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
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${activeTab === item.id
                  ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <item.icon className="w-6 h-6" />
                <Link href={item.src} className="font-medium">{item.label}</Link>
                {
                  item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                      {item.badge}
                    </span>
                  )
                }
              </button>
            ))}
          </nav>
        </div>

        {/* User Profile Section */}
        <div className="absolute bottom-0 w-full p-6 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={currentUser.avatar}
              alt="Your Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{currentUser.name}</p>
              <p className="text-sm text-gray-500 truncate">{currentUser.username}</p>
            </div>
          </div>
          <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </div>
      </div >
    </>
  );
};

export default Sidebar;