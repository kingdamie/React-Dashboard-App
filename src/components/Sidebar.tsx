import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoLogoXing } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { Button } from "@mui/material";
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { FaDatabase } from "react-icons/fa6";
import routes from "../routes";

interface SidebarProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
	const location = useLocation();

	return (
		<>
			{/* Sidebar Overlay for Mobile */}
			<div
				className={`fixed inset-0 bg-black bg-opacity-50 z-45 md:hidden ${
					isOpen ? "block" : "hidden"
				}`}
				onClick={() => setIsOpen(false)}
			></div>

			{/* Sidebar */}
			<aside
				className={`fixed z-50 top-0 left-0 h-full w-64 bg-indigo-950 dark:bg-[#19191C]  text-white transform transition-transform duration-300 ease-in-out ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				} md:relative md:block md:translate-x-0 border-r-1 border-gray-600`}
			>
				<div className="flex flex-row-reverse items-center justify-between md:justify-center px-2">
					<button
						className="text-3xl md:hidden"
						onClick={() => setIsOpen(false)}
					>
						<TbLayoutSidebarLeftCollapseFilled />
					</button>
					<div className="flex gap-3 items-center justify-center h-16">
						<IoLogoXing className="text-3xl" />
						<span className="text-2xl font-bold">Xing</span>
					</div>
				</div>

				<hr className="w-full mt-1 text-gray-600" />
				<nav className="p-4 ">
					<ul>
						<li className="mb-2">
							<Button
								component={Link}
								to={routes.dashoard}
								fullWidth
								sx={{
									padding: "0.5rem 1rem",
									justifyContent: "flex-start",
									textTransform: "capitalize",
									color:
										location.pathname === routes.dashoard ? "white" : "#f7f8f9",
									backgroundColor:
										location.pathname === routes.dashoard
											? "#4f46e5"
											: "transparent",
									"&:active": {
										backgroundColor: "#f3f4f6",
									},
								}}
								startIcon={<MdDashboard />}
								onClick={() => setIsOpen(false)}
							>
								Dashboard
							</Button>
						</li>
						<li className="mb-2">
							<Button
								component={Link}
								to={routes.Datatable}
								fullWidth
								sx={{
									padding: "0.5rem 1rem",
									justifyContent: "flex-start",
									textTransform: "capitalize",
									color:
										location.pathname === routes.Datatable
											? "white"
											: "#f7f8f9",
									backgroundColor:
										location.pathname === routes.Datatable
											? "#4f46e5"
											: "transparent",
									"&:active": {
										backgroundColor: "#f3f4f6",
									},
								}}
								startIcon={<FaDatabase />}
								onClick={() => setIsOpen(false)}
							>
								Data Table
							</Button>
						</li>
						<li className="mb-2">
							<Button
								component={Link}
								to={routes.setting}
								fullWidth
								sx={{
									padding: "0.5rem 1rem",
									justifyContent: "flex-start",
									textTransform: "capitalize",
									color:
										location.pathname === routes.setting ? "white" : "#f7f8f9",
									backgroundColor:
										location.pathname === routes.setting
											? "#4f46e5"
											: "transparent",
									"&:active": {
										backgroundColor: "#f3f4f6",
									},
								}}
								startIcon={<IoMdSettings />}
								onClick={() => setIsOpen(false)}
							>
								Settings
							</Button>
						</li>
					</ul>
				</nav>
			</aside>
		</>
	);
};

export default Sidebar;
