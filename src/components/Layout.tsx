import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className="flex h-screen">
			{/* Sidebar */}
			<Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

			{/* Main content area */}
			<div className="flex-1 flex flex-col overflow-auto custom-scrollbar">
				<Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
				<main className="flex-1 bg-white dark:bg-[#2D2D30] p-2 md:p-4 text-black dark:text-white">
					{children}
				</main>
			</div>
		</div>
	);
};

export default Layout;
