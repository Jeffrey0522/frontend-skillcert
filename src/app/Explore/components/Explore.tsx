import { Search, Star } from "lucide-react"
import CourseCard from "./CourseCard"

export default function ExploreComp() {
  return (
    <main className="min-h-screen bg-[#1a1e2a] text-white py-16 px-16 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-8">
          {/* Page Title */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-[#9333EA]">Explore courses</h1>
            <div className="relative">
              <div className="flex items-center bg-[#2a2f3d] rounded-full pl-2 py-4">
                <Search className="h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent border-none focus:outline-none text-white ml-2 w-full"
                />
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="w-full h-2/4 md:w-64 bg-[#1F2937] rounded-lg p-4">
              <h2 className="font-bold mb-4">Filters</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Categories</h3>
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((num) => (
                     <div key={num} className="flex items-center">
                     <input
                       type="checkbox"
                       id={`category-${num}`}
                       className="h-5 w-5 appearance-none rounded border-2 border-gray-600 cursor-pointer focus:ring-0 relative 
                                  checked:bg-[#a56bff] checked:border-transparent checked:after:content-['✔'] 
                                  checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 
                                  checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:text-white"
                     />
                     <label htmlFor={`category-${num}`} className="ml-2 text-sm">
                       Category {num}
                     </label>
                   </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Level</h3>
                  <div className="space-y-2">
                    {["Beginner", "Intermediate", "Advanced"].map((level) => (
                      <div key={level} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`level-${level.toLowerCase()}`}
                          className="h-5 w-5 appearance-none rounded border-2 border-gray-600 cursor-pointer focus:ring-0 relative 
                                  checked:bg-[#a56bff] checked:border-transparent checked:after:content-['✔'] 
                                  checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 
                                  checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:text-white"
                        />
                        <label htmlFor={`level-${level.toLowerCase()}`} className="ml-2 text-sm">
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Course Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5].map((course) => (
                  <CourseCard key={course} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

