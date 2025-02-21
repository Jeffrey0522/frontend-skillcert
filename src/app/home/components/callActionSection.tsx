import React from "react";

const staticText = {
	heading: "Ready to Start Learning?",
	subText: "Join thousands of students and instructors in our growing community.",
};

const CallActionSection = () => {
	return (
		<section className="flex flex-col items-center gap-5 justify-center p-5 bg-gray-900">
			<h2 className=" text-purple-700 text-3xl font-medium">{staticText.heading}</h2>
			<p className=" text-gray-400 text-xl">{staticText.subText}</p>
		</section>
	);
};

export default CallActionSection;
