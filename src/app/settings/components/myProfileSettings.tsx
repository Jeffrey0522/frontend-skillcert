"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Edit, Save } from "lucide-react"

export default function MyProfileSettings() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1118] via-[#1a1e2e] to-[#1e2235] text-white">
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-lg font-medium text-gray-300 mb-4">My profile settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-[#1e2235]/80 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm border border-[#2a2e42]/50">

          <div className="bg-[#1e2235]/90 p-6 border-r border-[#2a2e42]">
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <Avatar className="w-28 h-28 mb-4 bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] p-1 ring-2 ring-[#a855f7]/30 transition-all duration-300 group-hover:ring-[#a855f7]">
                  <AvatarImage src="/placeholder.svg?height=112&width=112" alt="User avatar" className="rounded-full" />
                  <AvatarFallback className="bg-[#252a3d] text-[#a855f7] text-xl">UN</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-4 right-0 bg-[#a855f7] p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  <Camera size={16} className="text-white" />
                </div>
              </div>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] text-lg font-semibold">
                User name
              </p>
            </div>

            <div className="space-y-1 border-t border-[#2a2e42] pt-6">
              <Link
                href="/settings/profile"
                className="flex items-center px-3 py-2.5 text-[#a855f7] font-medium rounded-lg bg-[#2a2e42]/30 hover:bg-[#2a2e42]/50 transition-colors"
              >
                My Profile
              </Link>
              <Link
                href="/settings/password"
                className="flex items-center px-3 py-2.5 text-[#a855f7]/80 font-medium rounded-lg hover:bg-[#2a2e42]/30 transition-colors"
              >
                Password
              </Link>
              <Link
                href="/settings/general"
                className="flex items-center px-3 py-2.5 text-[#a855f7]/80 font-medium rounded-lg hover:bg-[#2a2e42]/30 transition-colors"
              >
                Settings
              </Link>
              <Link
                href="/settings/notifications"
                className="flex items-center px-3 py-2.5 text-[#a855f7]/80 font-medium rounded-lg hover:bg-[#2a2e42]/30 transition-colors"
              >
                Settings
              </Link>
            </div>
          </div>


          <div className="col-span-1 md:col-span-3 p-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] mb-6">
              My Profile
            </h2>
            <div className="border-b border-[#2a2e42] mb-10"></div>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div>
                <h3 className="text-xl text-[#a855f7] mb-5 flex items-center">
                  Information
                  <div className="h-px flex-grow bg-gradient-to-r from-[#a855f7]/20 to-transparent ml-4"></div>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <div className="relative">
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Name"
                        className="bg-[#252a3d] border-[#3a3f52] rounded-lg h-12 text-white pl-4 pr-10 transition-all focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]/30"
                      />
                      <Edit
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a855f7]/50 group-hover:text-[#a855f7] transition-colors"
                      />
                    </div>
                  </div>
                  <div className="group">
                    <div className="relative">
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Lastname"
                        className="bg-[#252a3d] border-[#3a3f52] rounded-lg h-12 text-white pl-4 pr-10 transition-all focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]/30"
                      />
                      <Edit
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a855f7]/50 group-hover:text-[#a855f7] transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl text-[#a855f7] mb-5 flex items-center">
                  Description
                  <div className="h-px flex-grow bg-gradient-to-r from-[#a855f7]/20 to-transparent ml-4"></div>
                </h3>
                <div className="group relative">
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Write about yourself..."
                    className="bg-[#252a3d] border-[#3a3f52] rounded-lg min-h-[200px] text-white resize-none p-4 transition-all focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7]/30"
                  />
                  <Edit
                    size={16}
                    className="absolute right-3 top-4 text-[#a855f7]/50 group-hover:text-[#a855f7] transition-colors"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#8b5cf6] to-[#ec4899] hover:from-[#7c3aed] hover:to-[#db2777] text-white px-8 py-2 rounded-full shadow-lg shadow-[#a855f7]/20 transition-all hover:shadow-[#a855f7]/40 hover:scale-105 flex items-center gap-2"
                >
                  <Save size={18} />
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

