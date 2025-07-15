"use client"
import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Image,
  Video,
  Smile,
  Menu,
} from "lucide-react";
import Sidebar from "../components/Sidebar";
// Types
interface User {
  name: string;
  username: string;
  avatar: string;
}

interface Post {
  id: number;
  user: User;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
}

interface PostCardProps {
  post: Post;
  likedPosts: Set<number>;
  bookmarkedPosts: Set<number>;
  onToggleLike: (postId: number) => void;
  onToggleBookmark: (postId: number) => void;
}

interface CreatePostProps {
  currentUser: User;
}

interface HomeScreenProps {
  posts: Post[];
  likedPosts: Set<number>;
  bookmarkedPosts: Set<number>;
  onToggleLike: (postId: number) => void;
  onToggleBookmark: (postId: number) => void;
  currentUser: User;
}

// Post Card Component
const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  likedPosts, 
  bookmarkedPosts, 
  onToggleLike, 
  onToggleBookmark 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-start space-x-3">
        <img
          src={post.user.avatar}
          alt={post.user.name}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2 flex-wrap">
            <h3 className="font-semibold text-gray-900 truncate">{post.user.name}</h3>
            <span className="text-gray-500 text-sm truncate">{post.user.username}</span>
            <span className="text-gray-400 hidden sm:inline">•</span>
            <span className="text-gray-500 text-sm">{post.timestamp}</span>
          </div>

          <p className="text-gray-800 mb-3 leading-relaxed break-words">{post.content}</p>

          {post.image && (
            <div className="mb-4 rounded-lg overflow-hidden">
              <img
                src={post.image}
                alt="Post content"
                className="w-full h-48 sm:h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <button
                onClick={() => onToggleLike(post.id)}
                className={`flex items-center space-x-1 sm:space-x-2 hover:text-red-500 transition-colors ${
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

              <button className="flex items-center space-x-1 sm:space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm">{post.comments}</span>
              </button>

              <button className="flex items-center space-x-1 sm:space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm hidden sm:inline">{post.shares}</span>
              </button>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={() => onToggleBookmark(post.id)}
                className={`p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors ${
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

              <button className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Create Post Component
const CreatePost: React.FC<CreatePostProps> = ({ currentUser }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-4 mb-6">
      <div className="flex items-center space-x-3">
        <img
          src={currentUser.avatar}
          alt="Your Avatar"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
        />
        <input
          type="text"
          placeholder="What's on your mind?"
          className="flex-1 bg-white rounded-full px-4 py-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="flex items-center space-x-1 sm:space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
            <Image className="w-4 h-4 sm:w-5 sm:h-5" />
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
        <button className="bg-blue-600 text-white px-4 py-2 sm:px-6 rounded-full hover:bg-blue-700 transition-colors text-sm sm:text-base">
          Post
        </button>
      </div>
    </div>
  );
};

// Home Screen Component
const HomeScreen: React.FC<HomeScreenProps> = ({ 
  posts, 
  likedPosts, 
  bookmarkedPosts, 
  onToggleLike, 
  onToggleBookmark,
  currentUser 
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4 sm:p-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Home Feed</h2>
          <CreatePost currentUser={currentUser} />
        </div>
      </div>

      {/* Posts Feed */}
      <div className="p-4 sm:p-6">
        <div className="max-w-2xl mx-auto">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              likedPosts={likedPosts}
              bookmarkedPosts={bookmarkedPosts}
              onToggleLike={onToggleLike}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const SocialDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const currentUser: User = {
    name: "John Doe",
    username: "@johndoe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  };

  const posts: Post[] = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        username: "@sarahj",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      },
      content: "Just finished an amazing sunset hike! 🌅 The view from the top was absolutely breathtaking. Nature has a way of putting everything into perspective.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      timestamp: "2h ago",
      likes: 124,
      comments: 18,
      shares: 5,
    },
    {
      id: 2,
      user: {
        name: "Alex Chen",
        username: "@alexchen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      content: "Working on a new project! 🚀 Excited to share more details soon. The tech stack is looking solid - Next.js, TypeScript, and Tailwind CSS are such a powerful combination.",
      timestamp: "4h ago",
      likes: 89,
      comments: 12,
      shares: 3,
    },
    {
      id: 3,
      user: {
        name: "Emma Davis",
        username: "@emmad",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
      content: "Coffee and code - the perfect combination ☕️ Starting the day with some React components. What's everyone working on today?",
      image: "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?w=600&h=400&fit=crop",
      timestamp: "6h ago",
      likes: 156,
      comments: 24,
      shares: 8,
    },
  ];

  const toggleLike = (postId: number): void => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const toggleBookmark = (postId: number): void => {
    setBookmarkedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">SocialHub</h1>
          <div className="w-10" /> {/* Spacer for centering */}
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
            posts={posts}
            likedPosts={likedPosts}
            bookmarkedPosts={bookmarkedPosts}
            onToggleLike={toggleLike}
            onToggleBookmark={toggleBookmark}
            currentUser={currentUser}
          />
        )}
        {activeTab !== "home" && (
          <div className="p-4 sm:p-6">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 capitalize">
                {activeTab} Page
              </h2>
              <p className="text-gray-600">
                This is the {activeTab} section. Content will be implemented here.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialDashboard;