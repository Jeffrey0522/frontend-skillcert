"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface AddModuleModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (module: any) => void
}

export function AddModuleModal({ isOpen, onClose, onAdd }: AddModuleModalProps) {
  const [moduleTitle, setModuleTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    onAdd({
      title: moduleTitle,
      description: description,
      lessons: [],
    })
    setModuleTitle("")
    setDescription("")
    onClose()
  }

  return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="bg-[#0a0a16] border-[#1e1e3a] text-white sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="text-xl text-[#9d4edd]">
						Add New Module
					</DialogTitle>
				</DialogHeader>
				<div className="space-y-4 py-2">
					<div className="space-y-2">
						<Label htmlFor="moduleTitle">Module Title</Label>
						<Input
							id="moduleTitle"
							placeholder="Title"
							value={moduleTitle}
							onChange={(e) => setModuleTitle(e.target.value)}
							className="bg-[#131325] border-[#1e1e3a] text-white rounded-full"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							placeholder="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className="bg-[#131325] border-[#1e1e3a] text-white  rounded-full"
						/>
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
							Create Module
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
