"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface AddLessonModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (lesson: any) => void
}

export function AddLessonModal({ isOpen, onClose, onAdd }: AddLessonModalProps) {
  const [lessonTitle, setLessonTitle] = useState("")
  const [lessonType, setLessonType] = useState("video")
  const [duration, setDuration] = useState("")

  const handleSubmit = () => {
    onAdd({
      title: lessonTitle,
      type: lessonType,
      duration: duration,
    })
    setLessonTitle("")
    setLessonType("video")
    setDuration("")
    onClose()
  }

  return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="bg-[#0a0a16] border-[#1e1e3a] text-white sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="text-xl text-[#9d4edd]">
						Add New Lesson
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-4 py-2">
					<div className="space-y-2">
						<Label htmlFor="lessonTitle">Lesson Title</Label>
						<Input
							id="lessonTitle"
							placeholder="Title"
							value={lessonTitle}
							onChange={(e) => setLessonTitle(e.target.value)}
							className="bg-[#131325] border-[#1e1e3a] text-white rounded-full"
						/>
					</div>

					<div className="space-y-2">
						<Label>Lesson Type</Label>
						<RadioGroup
							value={lessonType}
							onValueChange={setLessonType}
							className="flex space-x-4"
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="video"
									id="video"
									className="border-[#9d4edd]"
								/>
								<Label htmlFor="video">Video</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="text"
									id="text"
									className="border-[#9d4edd]"
								/>
								<Label htmlFor="text">Text</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="quiz"
									id="quiz"
									className="border-[#9d4edd]"
								/>
								<Label htmlFor="quiz">Quiz</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="assignment"
									id="assignment"
									className="border-[#9d4edd]"
								/>
								<Label htmlFor="assignment">Assignment</Label>
							</div>
						</RadioGroup>
					</div>

					<div className="space-y-2">
						<Label htmlFor="duration">Duration (Optional)</Label>
						<Input
							id="duration"
							placeholder="e.g. 10:00"
							value={duration}
							onChange={(e) => setDuration(e.target.value)}
							className="bg-[#131325] border-[#1e1e3a] text-white rounded-full"
						/>
						<p className="text-xs text-gray-400">
							Estimated time to complete this lesson.
						</p>
					</div>

					<div className="flex justify-end space-x-2 pt-4">
						<Button
							variant="outline"
							onClick={onClose}
							className="bg-pink-800 text-white border-[#1e1e3a] hover:bg-[#1e1e3a] rounded-full"
						>
							Cancel
						</Button>
						<Button
							onClick={handleSubmit}
							className="bg-[#9d4edd] text-white hover:bg-[#8338ec] border-none rounded-full"
						>
							Create Lesson
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
