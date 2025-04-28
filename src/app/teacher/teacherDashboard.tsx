"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

interface CourseCardProps {
  name: string;
  rating: number;
  students: number;
  description: string;
  level: string;
  duration: string;
  price: string;
  category: string;
  imageUrl?: string;
}

const CourseCard = ({
  name,
  rating,
  students,
  description,
  level,
  duration,
  price,
  category,
  imageUrl = "/placeholder.png",
}: CourseCardProps) => {
  return (
    <div className="bg-[#1a1f2e] rounded-lg overflow-hidden">
      <div className="relative h-48 w-full bg-gray-200">
        <Image src={imageUrl} alt={name} fill className="object-cover" />
        <span className="absolute top-4 right-4 bg-[#9333EA] text-white px-3 py-1 rounded-full text-xs">
          {category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-white text-lg font-semibold mb-2">{name}</h3>
        <div className="flex items-center mb-2">
          <span className="text-yellow-400 mr-1">★</span>
          <span className="text-white text-sm">{rating}</span>
          <span className="text-gray-400 text-sm ml-1">
            ({students} students)
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center gap-2 mb-4">
          <span className="border border-blue-500 text-blue-500 px-2 py-0.5 rounded-sm text-xs">
            {level}
          </span>
          <span className="text-pink-500 text-xs">
            <span className="inline-block w-4 h-4 mr-1">⏱</span>
            {duration}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white font-semibold">{price} XLM</span>
          <button className="bg-[#9333EA] text-white px-4 py-1.5 rounded-[25px] hover:bg-[#7e22ce] transition-colors text-sm">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({
  icon,
  value,
  label,
}: {
  icon: string;
  value: string;
  label: string;
}) => (
  <div className="bg-[#1F2937] rounded-lg p-4 w-full flex items-center gap-4 shadow-md hover:shadow-lg transition-all">
    <div className="text-[#BE185D] text-3xl">{icon}</div>{" "}
    {/* Updated icon color here */}
    <div>
      <h3 className="text-[20px] font-bold text-purple-400">{value}</h3>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  </div>
);




// Tab component for the stats section
interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab = ({ label, isActive, onClick }: TabProps) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-full text-sm font-medium transition-colors bg-pink-600 text-white`}
  >
    {label}
  </button>
);

// Stats section with tabs
const StatsTabs = () => {
  const [activeTab, setActiveTab] = useState("Enrollment");

  return (
    <div>
      {/* Title and tabs moved outside the box */}
      <h2 className="text-xl font-semibold text-[#9333EA] mb-4">
        Course Statistics
      </h2>

      <div className="flex gap-3 mb-6">
        <Tab
          label="Enrollment"
          isActive={activeTab === "Enrollment"}
          onClick={() => setActiveTab("Enrollment")}
        />
        <Tab
          label="Revenue"
          isActive={activeTab === "Revenue"}
          onClick={() => setActiveTab("Revenue")}
        />
        <Tab
          label="Ratings"
          isActive={activeTab === "Ratings"}
          onClick={() => setActiveTab("Ratings")}
        />
      </div>

      {/* The main content box */}
      <div className="bg-[#1a1f2e] rounded-lg p-6">
        <div className="h-64 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-3xl font-medium text-white mb-4">
              Information
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

// Quick actions section
const QuickActions = () => {
  const actions = [
    "Create New Course",
    "Update Course Content",
    "Respond to Messages",
    "Manage Students",
    "View Analytics",
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-[#9333EA] mb-6">
        Quick Actions
      </h2>

      <div className="bg-[#1a1f2e] rounded-lg p-6">
        <div className="flex flex-col gap-3">
          {actions.map((action, index) => (
            <motion.button
              key={index}
              className="bg-[#9333EA] hover:bg-[#7e22ce] text-white py-3 px-6 rounded-full transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {action}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function TeacherDashboard() {
const stats = [
  { icon: "👥", value: "1000+", label: "Total Students" }, // Keep this as is
  { icon: "📚", value: "6", label: "Total Courses" }, // Use 📚 for these three
  { icon: "📚", value: "$12,580", label: "Total Revenue" },
  { icon: "📚", value: "78%", label: "Completion Rate" },
];



  const courses = [
    {
      name: "Course Name",
      rating: 4.7,
      students: 100,
      description:
        "Description of the course text. In this space users will see a brief annotation about course content.",
      level: "Level",
      duration: "X weeks",
      price: "340.56",
      category: "Category",
    },
    {
      name: "Course Name",
      rating: 4.7,
      students: 100,
      description:
        "Description of the course text. In this space users will see a brief annotation about course content.",
      level: "Level",
      duration: "X weeks",
      price: "340.56",
      category: "Category",
    },
    {
      name: "Course Name",
      rating: 4.7,
      students: 100,
      description:
        "Description of the course text. In this space users will see a brief annotation about course content.",
      level: "Level",
      duration: "X weeks",
      price: "340.56",
      category: "Category",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#9333EA]">
                Welcome back, Alex Johnson
              </h1>
              <p className="text-gray-400">
                Here's what's happening with your courses today
              </p>
            </div>
          </div>
          <Link
            href="/teacher/create-course"
            className="bg-[#9333EA] text-white px-4 py-2 rounded-md hover:bg-[#7e22ce] transition-colors"
          >
            Create Course
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </div>

        {/* Courses Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-[#9333EA]">
              Your Top Courses
            </h2>
            <Link
              href="/teacher/courses"
              className="text-[#9333EA] hover:text-[#7e22ce] transition-colors"
            >
              All Courses →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <CourseCard {...course} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Statistics and Quick Actions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-3">
            <StatsTabs />
          </div>
          <div className="lg:col-span-2">
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
}
