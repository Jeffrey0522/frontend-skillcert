"use client"

import React from "react"
import { motion } from "framer-motion"
import MyProfileSettings from "../settings/components/myProfileSettings"
import Navbar from "@/components/nabvar"
import Footer from "@/components/footer"

export default function ProfileSettingsPage() {
  return (
    <>
      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="min-h-screen bg-gradient-to-br from-[#0f1118] via-[#1a1e2e] to-[#1e2235] pt-20"
      >
        <MyProfileSettings />
      </motion.main>

      <Footer />
    </>
  )
}
