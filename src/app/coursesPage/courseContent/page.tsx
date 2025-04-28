"use client"
import CoursePage from "./courseContent"
import Navbar from '@/components/nabvar'
import Footer from '@/components/footer'

export default function Course() {
    return (
			<div>
				<Navbar />
				<CoursePage />
				<Footer />
			</div>
		);
}