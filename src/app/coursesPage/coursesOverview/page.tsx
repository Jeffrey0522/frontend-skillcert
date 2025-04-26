import Navbar from "@/components/nabvar";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-between bg-gray-900">
        <div className="bg-[#1F2937] w-[25vw] h-screen">
          <div className="flex justify-center my-5 py-5 border-b-[5px] border-gray-900">
            <div className="flex flex-col w-fit text-left">
              <p className="font-medium text-[40px] text-purple-600">
                Course Name
              </p>
              <p className="font-medium text-[20px] text-purple-600">
                8/12 lessons
              </p>
            </div>
          </div>
          <div className="flex justify-center my-5 pb-5 border-b-[5px] border-gray-900">
            <div className="flex flex-col ">
              <p className="font-medium text-[24px] gap-6 flex  text-purple-600">
                Course home{" "}
                <Image src={"/arrow-right.svg"} alt="" width={35} height={40} />
              </p>
            </div>
          </div>
          <div className="flex justify-center my-5 pb-5 h-full bg-[#1F2937] ">
            <div className="flex flex-col ">
              <p className="font-medium text-[36px] gap-6 mb-7 flex  text-purple-600">
                Course content{" "}
              </p>

              {[1, 2, 3, 4, 5].map((i) => (
                <p
                  key={i}
                  className="font-light flex items-center gap-3 text-[30px] text-white ml-5 my-5"
                >
                  {" "}
                  <span className="pb-5">.</span> Course Section
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[40vw] h-[960px] mt-10 bg-gray-800 ">
          <div className="border-b-[15px] border-gray-900 p-5">
            <p className="font-medium text-[48px] text-purple-600">
              Course Overview
            </p>
            <div className="flex gap-[20px] mt-7 mb-5  mx-10 justify-between">
              <button className="w-[193px] text-[16px] h-[50px] bg-pink-900 flex items-center justify-center rounded-[25px] text-white">
                Overview
              </button>{" "}
              <button className="w-[193px] text-[16px] h-[50px] bg-pink-900 flex items-center justify-center rounded-[25px] text-white">
                Curriculum
              </button>{" "}
              <button className="w-[193px] text-[16px] h-[50px] bg-pink-900 flex items-center justify-center rounded-[25px] text-white">
                Resources
              </button>
            </div>
          </div>
        </div>
        <div className="w-[28vw] h-[862px] mt-10 bg-gray-800 mr-10">
          {" "}
          <div className="border-b-[15px] border-gray-900 p-5">
            <p className="font-medium text-[48px] text-purple-600">
              Your progress
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="font-medium text-[27px] mb-5 mt-5 text-white flex gap-24">
              <span>Overall progress</span> <span>55%</span>
            </p>
            <div className="w-[90%] bg-pink-900 h-[11px] rounded-[20px] overflow-hidden">
              <div className="bg-pink-700 h-full w-[66%] rounded-[20px]"></div>
            </div>
          </div>
          <div className="flex flex-col ml-8">
            <p className="font-medium text-[32px] mt-10 mb-7 text-purple-600">
              Modules
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="font-medium text-[27px] mb-5 mt-5 text-white flex gap-24">
              <span>Course section</span> <span>100%</span>
            </p>
            <div className="w-[90%] bg-pink-900 h-[11px] rounded-[20px] overflow-hidden">
              <div className="bg-pink-700 h-full w-[100%] rounded-[20px]"></div>
            </div>
          </div>{" "}
          <div className="flex flex-col items-center justify-center">
            <p className="font-medium text-[27px] mb-5 mt-5 text-white flex gap-24">
              <span>Course section</span> <span>95%</span>
            </p>
            <div className="w-[90%] bg-pink-900 h-[11px] rounded-[20px] overflow-hidden">
              <div className="bg-pink-700 h-full w-[95%] rounded-[20px]"></div>
            </div>
          </div>{" "}
          <div className="flex flex-col items-center justify-center">
            <p className="font-medium text-[27px] mb-5 mt-5 text-white flex gap-24">
              <span>Course section</span> <span>60%</span>
            </p>
            <div className="w-[90%] bg-pink-900 h-[11px] rounded-[20px] overflow-hidden">
              <div className="bg-pink-700 h-full w-[60%] rounded-[20px]"></div>
            </div>
          </div>{" "}
          <div className="flex flex-col items-center justify-center">
            <p className="font-medium text-[27px] mb-5 mt-5 text-white flex gap-24">
              <span>Course section</span> <span>20%</span>
            </p>
            <div className="w-[90%] bg-pink-900 h-[11px] rounded-[20px] overflow-hidden">
              <div className="bg-pink-700 h-full w-[20%] rounded-[20px]"></div>
            </div>
          </div>
          <div className="flex justify-center  text-center items-center">
          <p className="font-medium text-[32px] mx-10 mt-10 mb-7 text-white">
            Estimated Time Left: 3h 45m
          </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
