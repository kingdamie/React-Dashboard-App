import React, { useState } from "react";
import { CgMenuLeft } from "react-icons/cg";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import {
	IconButton,
	Badge,
	Menu,
	MenuItem,
	Tooltip,
	Button,
	Box,
	Typography,
	Modal,
} from "@mui/material";
import { MdNotificationsActive } from "react-icons/md";
import SearchBar from "./SearchBar";
import { useTheme as useCustomTheme } from "../ThemeContext";
import { IoLogoXing } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import routes from "../routes";

interface NavbarProps {
	toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
	const navigate = useNavigate();
	const { theme } = useCustomTheme();
	// Notification
	const [notifAnchorEl, setNotifAnchorEl] = useState<null | HTMLElement>(null);
	const notifOpen = Boolean(notifAnchorEl);

	const handleNotifClick = (event: React.MouseEvent<HTMLElement>) => {
		setNotifAnchorEl(event.currentTarget);
	};

	const handleNotifClose = () => {
		setNotifAnchorEl(null);
	};

	// Profile Avatar
	const [profileAnchorEl, setProfileAnchorEl] = useState<null | HTMLElement>(
		null
	);
	const profileOpen = Boolean(profileAnchorEl);

	const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
		setProfileAnchorEl(event.currentTarget);
	};

	const handleProfileClose = () => {
		setProfileAnchorEl(null);
	};

	// Mobile search modal
	const [openSearchModal, setOpenSearchModal] = useState(false);
	const handleOpenSearchModal = () => setOpenSearchModal(true);
	const handleCloseSearchModal = () => setOpenSearchModal(false);

	return (
		<header className="sticky top-0 z-40 bg-gray-100 dark:bg-[#19191C] dark:text-white text-black px-3 py-3 flex justify-between items-center border-b border-gray-600">
			<div className="flex gap-3 md:hidden ">
				{/* Sidebar toggle */}
				<button className="md:hidden text-2xl" onClick={toggleSidebar}>
					<CgMenuLeft />
				</button>
				<div className="flex gap-3 items-center justify-center mx-1.5 ">
					<IoLogoXing className="text-3xl" />
				</div>
			</div>

			{/* SearchBar - hidden on small screens */}
			<div className="hidden md:block">
				<SearchBar />
			</div>

			{/* Right section: Notification + Avatar */}
			<div className="flex items-center gap-4">
				{/* Mobile Search Button */}
				<div className="block md:hidden">
					<IconButton
						onClick={handleOpenSearchModal}
						sx={{
							width: "40px",
							height: "40px",
							minWidth: "40px",
							color: theme === "light" ? "#000" : "#fff",
						}}
					>
						<IoIosSearch />
					</IconButton>
				</div>
				{/* Notification */}
				<IconButton onClick={handleNotifClick} color="inherit">
					<Badge badgeContent={3} color="error">
						<MdNotificationsActive />
					</Badge>
				</IconButton>
				<Menu
					anchorEl={notifAnchorEl}
					open={notifOpen}
					onClose={handleNotifClose}
					anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
					transformOrigin={{ vertical: "top", horizontal: "right" }}
					PaperProps={{
						sx: {
							backgroundColor: theme === "light" ? "#fff" : "#19191C",
							width: 280,
							padding: 2,
							borderWidth: "1px",
							borderColor: "gray",
							borderStyle: "solid",
							boxShadow: 1,
							color: theme === "light" ? "#000" : "#fff",
						},
					}}
				>
					<Box>
						<Box
							display="flex"
							justifyContent="space-between"
							alignItems="center"
							mb={1}
						>
							<Typography fontWeight="bold">Notifications</Typography>
							<Box
								sx={{
									backgroundColor: "#4f46e5",
									color: "white",
									borderRadius: 1,
									px: 1,
									py: 0.3,
									fontSize: "0.75rem",
								}}
							>
								3 Unread
							</Box>
						</Box>

						<div className="flex flex-col gap-1 overflow-auto custom-scrollbar">
							<MenuItem
								onClick={handleNotifClose}
								sx={{
									":hover": {
										backgroundColor: theme === "light" ? "#f3f4f6" : "#202947", // Light hover vs dark hover
									},
								}}
							>
								New message received
							</MenuItem>
							<MenuItem
								onClick={handleNotifClose}
								sx={{
									":hover": {
										backgroundColor: theme === "light" ? "#f3f4f6" : "#202947", // Light hover vs dark hover
									},
								}}
							>
								Server reboot at 3 AM
							</MenuItem>
							<MenuItem
								onClick={handleNotifClose}
								sx={{
									":hover": {
										backgroundColor: theme === "light" ? "#f3f4f6" : "#202947", // Light hover vs dark hover
									},
								}}
							>
								Comment on your post
							</MenuItem>
						</div>

						<Box mt={2}>
							<Button
								variant="contained"
								fullWidth
								onClick={handleNotifClose}
								sx={{
									textTransform: "capitalize",
									backgroundColor: "#4f46e5",
									color: "white",
									"&:hover": {
										backgroundColor: "#4f41f6",
									},
									"&:active": {
										backgroundColor: "#f3f4f6",
									},
								}}
							>
								View All
							</Button>
						</Box>
					</Box>
				</Menu>

				{/* Avatar Icon using React Icons */}
				<Tooltip title="Open settings">
					<IconButton
						onClick={handleProfileClick}
						color="inherit"
						sx={{ fontSize: "26px" }}
					>
						<FaUserCircle />
					</IconButton>
				</Tooltip>

				<Menu
					anchorEl={profileAnchorEl}
					open={profileOpen}
					onClose={handleProfileClose}
					anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
					transformOrigin={{ vertical: "top", horizontal: "right" }}
					PaperProps={{
						sx: {
							backgroundColor: theme === "light" ? "#fff" : "#19191C", // dynamic background color based on the theme
							width: 200,
							padding: 1,
							borderWidth: "1px",
							borderColor: "gray",
							borderStyle: "solid",
							boxShadow: 1,
							color: theme === "light" ? "#000" : "#fff", // text color change
						},
					}}
				>
					<Box>
						{/* Profile Section */}
						<Box
							display="flex"
							flexDirection="column"
							alignItems="center"
							mb={2}
						>
							<Typography
								variant="h6"
								fontWeight="bold"
								textAlign={"center"}
								sx={{
									fontSize: "1rem",
								}}
							>
								Olaniyan Damilare
							</Typography>
							<Box
								sx={{
									borderRadius: 1,
									px: 1,
									py: 0.3,
									fontSize: "0.75rem",
									backgroundColor: theme === "light" ? "#e5e5e5" : "#333",
									color: theme === "light" ? "#000" : "#fff",
								}}
							>
								Frontend Developer
							</Box>
						</Box>

						{/* Menu Items */}
						{/* Menu Items with Hover Effect Based on Theme */}
						<Box>
							<MenuItem
								onClick={() => {
									handleProfileClose();
									navigate(routes.profile); // Adjust the path as needed
								}}
								sx={{
									display: "flex",
									alignItems: "center",
									gap: 1,
									":hover": {
										backgroundColor: theme === "light" ? "#f3f4f6" : "#202947", // Light hover vs dark hover
									},
								}}
							>
								<FaUserCircle />
								<Typography ml={1}>Profile</Typography>
							</MenuItem>
							<MenuItem
								onClick={handleProfileClose}
								sx={{
									display: "flex",
									alignItems: "center",
									gap: 1,
									color: "red",
									":hover": {
										backgroundColor: theme === "light" ? "#f3f4f6" : "#202947", // Light hover vs dark hover
									},
								}}
							>
								<FaSignOutAlt />
								<Typography ml={1}>Logout</Typography>
							</MenuItem>
						</Box>
					</Box>
				</Menu>
			</div>
			{/* Mobile Search Modal */}
			<Modal open={openSearchModal} onClose={handleCloseSearchModal}>
				<Box
					sx={{
						position: "absolute",
						top: 20,
						left: "50%",
						transform: "translateX(-50%)",
						width: "90%",
						bgcolor: theme === "dark" ? "#19191C" : "#fff",
						boxShadow: 24,
						p: 2,
						borderRadius: 2,
					}}
				>
					<input
						type="text"
						placeholder="Search..."
						autoFocus
						className="w-full p-2 rounded border outline-none bg-transparent text-black dark:text-white dark:border-gray-700 dark:bg-[#1F1F22]"
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleCloseSearchModal();
							}
						}}
					/>
				</Box>
			</Modal>
		</header>
	);
};

export default Navbar;
