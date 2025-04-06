import ThemeToggle from "../components/ThemeToggle";
import { FaLongArrowAltRight } from "react-icons/fa";

const Settings = () => {
	return (
		<div className="space-y-6">
			{/* Breadcrumb and Title */}
			<div className="space-y-2">
				<div className="flex items-center gap-2 text-sm">
					<span>Dashboard</span>
					<FaLongArrowAltRight className="text-gray-400" />
					<span className="capitalize">Settings</span>
				</div>
				<h1 className="text-2xl md:text-3xl font-bold ">
					Settings
				</h1>
			</div>

			{/* Body Section */}
			<div className=" p-5 rounded-lg  bg-gray-100 dark:bg-[#19191C] mt-4">
				<h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
					Appearance
				</h2>
				<div className="flex items-center justify-between">
					<span className="text-gray-600 dark:text-gray-300">Theme Mode</span>
					<ThemeToggle />
				</div>
			</div>
		</div>
	);
};

export default Settings;
