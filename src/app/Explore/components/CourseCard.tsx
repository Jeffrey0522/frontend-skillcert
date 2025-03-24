import Image from 'next/image';
import {  Star } from "lucide-react"

export default function CourseCard() {
  return (
    <div className="bg-[#1F2937] border border-[#9CA3AF] rounded-xl overflow-hidden flex flex-col">
      {/* Course Image */}
      <div className="relative h-48 bg-gray-200">
        <div className="absolute top-2 right-2 bg-[#7E22CE] text-white text-xs px-2 py-1 rounded-full">Category</div>
        <Image
          src="/mock.png"
          alt="Course thumbnail"
          width={400}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Course Details */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-3xl font-semibold mb-1">Course Name</h3>
        <div className="flex items-center mb-2">
          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          <span className="text-md text-gray-300 ml-1">4.7 (100 students)</span>
        </div>
        <p className="text-md mb-4">
          Description of the course text. In this space users will see a brief annotation about course content.
        </p>

        <div className="mt-auto ">
          <div className="flex items-center gap-2 mb-3 border-b border-[#9CA3AF] pb-2">
            <span className="bg-[#111827] border border-[#38BDF8] text-[#38BDF8] text-md px-3 py-1 rounded-2xl font-semibold">Level</span>
            <span className="bg-[#111827] text-md border border-[#DB2777] text-[#DB2777] px-3 py-1 rounded-2xl flex items-center gap-1 text-semibold">
             <Image src="/clock.svg" width={200} height={200} alt="clock" className="w-4 h-4"/> X Weeks
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-bold">340.56 XLM</span>
            <button className="bg-[#9D174D] text-white px-5 py-3 rounded-full text-sm">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

