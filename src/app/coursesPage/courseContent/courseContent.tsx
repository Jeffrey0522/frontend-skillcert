"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddLessonModal } from "@/components/add-lesson-modal"
import { AddModuleModal } from "@/components/add-module-modal"

export default function CoursePage() {
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false)
  const [isAddLessonOpen, setIsAddLessonOpen] = useState(false)
  const [modules, setModules] = useState([
    {
      id: 1,
      title: "Module 1: Module name",
      lessons: [
        { id: 1, title: "Lesson Name" },
        { id: 2, title: "Lesson Name" },
      ],
    },
  ])
  const [currentModuleId, setCurrentModuleId] = useState(1)

  const handleAddModule = (newModule:any) => {
    setModules([...modules, { ...newModule, id: Date.now() }])
  }

  const handleAddLesson = (newLesson: any) => {
    setModules(
      modules.map((module) =>
        module.id === currentModuleId
          ? { ...module, lessons: [...module.lessons, { ...newLesson, id: Date.now() }] }
          : module,
      ),
    )
  }

  return (
		<div className="min-h-screen bg-gray-900 text-white font-poppins">
			<header className="max-w-5xl mx-auto flex justify-between items-center py-8 mb-8">
				<Link
					href="#"
					className="flex items-center text-3xl font-semibold text-[#9333EA] hover:text-[#b366f7]"
				>
					<ArrowLeft className="h-4 w-4 mr-2" />
					<span>Course name</span>
				</Link>
				<div className="flex gap-2">
					<Button
						variant="outline"
						className="bg-pink-800 text-white border-none rounded-full hover:bg-[#8338ec] hover:text-[#b366f7]"
					>
						Preview
					</Button>
					<Button className="bg-[#8338ec] text-white rounded-full hover:bg-[#7209b7] hover:text-[#b366f7] border-none">
						Publish
					</Button>
				</div>
			</header>

			<div className="max-w-5xl mx-auto mb-8 flex justify-center">
				<div className="bg-gray-800 rounded-md p-5 inline-flex gap-2">
					<Button
						variant="ghost"
						className="bg-pink-800 text-white hover:bg-[#8338ec] rounded-full"
					>
						Content
					</Button>
					<Button
						variant="ghost"
						className="bg-pink-800 text-white hover:bg-[#1e1e3a] rounded-full"
					>
						Settings
					</Button>
					<Button
						variant="ghost"
						className="bg-pink-800 text-white hover:bg-[#1e1e3a] rounded-full"
					>
						Pricing
					</Button>
				</div>
			</div>

			<main className="max-w-5xl mx-auto">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-xl font-medium text-[#9d4edd]">Course Content</h1>
					<Button
						className="bg-[#8338ec] text-white rounded-full hover:bg-[#7209b7] border-none"
						onClick={() => setIsAddModuleOpen(true)}
					>
						Add Module
					</Button>
				</div>

				{modules.map((module) => (
					<div key={module.id} className="bg-[#1e1e3a] rounded-lg p-6 mb-6">
						<div className="flex justify-between items-center mb-4">
							<div>
								<h2 className="text-lg font-medium">{module.title}</h2>
								<p className="text-sm text-gray-400">
									{module.lessons.length} lessons
								</p>
							</div>
							<div className="flex gap-2">
								<Button
									size="sm"
									className="bg-pink-800 text-white rounded-full hover:bg-[#8338ec] border-none px-4"
								>
									Edit
								</Button>
								<Button
									size="sm"
									variant="outline"
									className="bg-transparent text-[#8338ec] rounded-full border-[#8338ec] hover:bg-[#1e1e3a] px-4"
								>
									Delete
								</Button>
							</div>
						</div>

						<div className="mb-2">
							<h3 className="mb-2">Lessons</h3>
							<ul className="space-y-3">
								{module.lessons.map((lesson) => (
									<li
										key={lesson.id}
										className="flex justify-between items-center"
									>
										<div className="flex items-center">
											<span className="text-[#9d4edd] mr-2">•</span>
											<span>{lesson.title}</span>
										</div>
										<div className="flex gap-2">
											<Button
												size="sm"
												className="bg-pink-800 text-white rounded-full hover:bg-[#8338ec] border-none h-7 px-4"
											>
												Edit
											</Button>
											<Button
												size="sm"
												variant="outline"
												className="bg-transparent text-[#8338ec] rounded-full border-[#8338ec] hover:bg-[#1e1e3a] h-7 px-4"
											>
												Delete
											</Button>
										</div>
									</li>
								))}
							</ul>
						</div>

						<button
							className="text-[#9d4edd] hover:text-[#b366f7] flex items-center mt-4"
							onClick={() => {
								setCurrentModuleId(module.id);
								setIsAddLessonOpen(true);
							}}
						>
							<span className="text-[#9d4edd] mr-2">•</span>
							<span>Add Lesson</span>
						</button>
					</div>
				))}
			</main>
			<AddModuleModal
				isOpen={isAddModuleOpen}
				onClose={() => setIsAddModuleOpen(false)}
				onAdd={handleAddModule}
			/>

			<AddLessonModal
				isOpen={isAddLessonOpen}
				onClose={() => setIsAddLessonOpen(false)}
				onAdd={handleAddLesson}
			/>
    </div>
    
	);
}