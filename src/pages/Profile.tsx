import { FaLongArrowAltRight } from "react-icons/fa";
import usePageMetadata from "../hooks/usePageMetadata";
import ForegroundImage from "../assets/media-3.jpg"
import Dp from "../assets/profile.jpg"

export const Profile = () => {
    usePageMetadata("My Profile - Template")
  return (
		<div className="space-y-6">
			{/* Breadcrumb and Title */}
			<div className="space-y-2">
				<div className="flex items-center gap-2 text-sm">
					<span>Dashboard</span>
					<FaLongArrowAltRight className="text-gray-400" />
					<span className="capitalize">Profile</span>
				</div>
				<h1 className="text-2xl md:text-3xl font-bold ">Profile</h1>
			</div>

			{/* Body Section */}
			<div className="pb-4 rounded-lg bg-gray-100 dark:bg-[#19191C] mt-4 relative">
				<div
					style={{
						backgroundImage: `url(${ForegroundImage})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						height: "120px", // Adjust height as needed
					}}
					className="rounded-t-lg"
				></div>
				<div className="p-4 rounded-lg bg-gray-100 dark:bg-[#19191C] z-50 mt-[-50px] border-1 border-gray-200 w-[80%] m-auto shadow">
					<div className="flex items-center justify-center flex-col gap-3 text-center">
						<img
							src={Dp}
							alt="Profile Pic"
							className="rounded-full"
							style={{ width: "80px", height: "80px" }}
						/>
						<h2 className="text-2xl font-extrabold">
							Olaniyan Damilare Ridwan
						</h2>
						<p className="text-gray-600 dark:text-gray-300">
							Frontend Developer
						</p>
					</div>
					<div className="mt-4 pt-4 border-t-1 border-dashed flex flex-col gap-2">
						<h2>Basic Info:</h2>
						<div className="flex gap-2">
							<b>Name:</b>
							<span>Olaniyan Damilare Ridwan</span>
						</div>
						<div className="flex gap-2">
							<b>Profession:</b>
							<span>Frontend Developer</span>
						</div>
						<div className="flex gap-2">
							<b>Email:</b>
							<span>Olaniyandamilareridwan@gmail.com</span>
						</div>
						<div className="flex gap-2">
							<b>Phone:</b>
							<span>08011112222</span>
						</div>
						<div className="flex gap-2">
							<b>Experience:</b>
							<span>3 years</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
