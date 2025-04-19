import { FaLongArrowAltRight } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Pagination,
	Skeleton,
	Snackbar,
	Alert,
	TableContainer,
	Table,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme as useCustomTheme } from "../ThemeContext";
import { IoMdPersonAdd } from "react-icons/io";
import usePageMetadata from "../hooks/usePageMetadata";

interface User {
	id: number;
	name: string;
	email: string;
	phone: string;
	company: {
		name: string;
	};
}

const TableData = () => {
	usePageMetadata('Table Data')
	const [users, setUsers] = useState<User[]>([]); // state to manage users
	const [search, setSearch] = useState(""); // state to manage search input
	const [filter, setFilter] = useState("Random"); // state to manage filter setting default as Random
	const [editUser, setEditUser] = useState<User | null>(null); // state to manage user being edited
	const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
	const [currentPage, setCurrentPage] = useState(1); // state to manage current page
	const usersPerPage = 5;
	const [loading, setLoading] = useState(true); // State to manage loading
	const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar visibility
	const [snackbarMessage, setSnackbarMessage] = useState(""); // Message to display in the Snackbar
	const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
		"success"
	); // Severity of the snackbar message
	const { theme } = useCustomTheme(); // to handle theme color changing
	const [addUserOpen, setAddUserOpen] = useState(false); // state to manage add user
	const [newUser, setNewUser] = useState<User>({
		id: Date.now(),
		name: "",
		email: "",
		phone: "",
		company: { name: "" },
	}); // state to manage new user

	// Fetch users from API
	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/users")
			.then((res) => res.json())
			.then((data) => {
				setUsers(data);
				setLoading(false); // Set loading to false once data is fetched
			});
	}, []);

	// Handle input change for edit user
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!editUser) return;
		setEditUser({ ...editUser, [e.target.name]: e.target.value });
	};

	// Handle edit user
	const handleEdit = (user: User) => {
		setEditUser(user);
	};

	// Handle save user after editing
	// Update the user in the users array and reset editUser state
	const handleSave = () => {
		if (!editUser) return;
		const updatedUsers = users.map((u) =>
			u.id === editUser.id ? editUser : u
		);
		setUsers(updatedUsers);
		setEditUser(null);
		setSnackbarMessage("User updated successfully");
		setSnackbarSeverity("success");
		setSnackbarOpen(true); // Show Snackbar
	};

	// Handle delete user
	const handleDeleteClick = (id: number) => {
		setConfirmDelete(id);
	};

	// Handle delete user confirmation
	const confirmDeleteUser = () => {
		setUsers(users.filter((user) => user.id !== confirmDelete));
		setConfirmDelete(null);
		setSnackbarMessage("User deleted successfully");
		setSnackbarSeverity("success");
		setSnackbarOpen(true); // Show Snackbar
	};

	// Handle filter
	const filters = ["Random", "Name Asc", "Name Desc"];
	const filteredUsers = users
		.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
		.sort((a, b) => {
			if (filter === "Name Asc") return a.name.localeCompare(b.name);
			if (filter === "Name Desc") return b.name.localeCompare(a.name);
			return 0;
		});

	// Pagination logic
	const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
	const indexOfLastUser = currentPage * usersPerPage;
	const indexOfFirstUser = indexOfLastUser - usersPerPage;
	const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

	// Handle Snackbar close
	const handleCloseSnackbar = () => {
		setSnackbarOpen(false);
	};

	return (
		<div>
			{/* Breadcrumb and Title */}
			<div className="space-y-2">
				<div className="flex items-center gap-2 text-sm">
					<span>Dashboard</span>
					<FaLongArrowAltRight className="text-gray-400" />
					<span className="capitalize">Table</span>
				</div>
				<h1 className="text-2xl md:text-3xl font-bold ">Table Data</h1>
			</div>
			{/* Add User Button */}
			<div className="w-full flex mt-2 items-center justify-end">
				<Button
					variant="contained"
					color="primary"
					sx={{
						backgroundColor: "#4f46e5",
						textTransform: "capitalize",
						display: "flex",
						alignItems: "center",
					}}
					onClick={() => {
						setNewUser({
							id: Date.now(),
							name: "",
							email: "",
							phone: "",
							company: { name: "" },
						});
						setAddUserOpen(true);
					}}
				>
					<IoMdPersonAdd className="mr-3" />
					Add User
				</Button>
			</div>

			<div className="p-2 w-full overflow-x-auto rounded-lg bg-white dark:bg-[#19191C] mt-4 shadow-lg">
				{/* Search & Filter */}
				<div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4 mt-4">
					<input
						type="text"
						placeholder="Search by name"
						className="border rounded px-3 py-1 w-full md:w-1/3"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>

					<select
						className="border rounded px-3 py-1 w-full md:w-1/4 bg-white dark:bg-[#19191C]"
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
					>
						{filters.map((option, idx) => (
							<option key={idx} value={option}>
								{option}
							</option>
						))}
					</select>
				</div>

				{/* Table */}
				<div className="overflow-x-auto w-full">
					<TableContainer className="w-full bg-white dark:bg-[#19191C] text-sm custom-scrollbar">
						<Table>
							<thead className="bg-gray-200 dark:bg-[#2c2c2e] text-left">
								<tr>
									<th className="px-4 py-2">S/N</th>
									<th className="px-4 py-2">Name</th>
									<th className="px-4 py-2">Email</th>
									<th className="px-4 py-2">Phone</th>
									<th className="px-4 py-2">Company</th>
									<th className="px-4 py-2">Action</th>
								</tr>
							</thead>
							<tbody>
								{loading ? (
									// Skeleton loader while data is fetching
									<tr>
										<td colSpan={6} className="py-4">
											<Skeleton variant="rectangular" height={40} />
										</td>
									</tr>
								) : currentUsers.length > 0 ? (
									currentUsers.map((user, index) => (
										<tr key={user.id} className="border-t">
											<td className="px-4 py-2">
												{(currentPage - 1) * usersPerPage + index + 1}
											</td>
											<td className="px-4 py-2">{user.name}</td>
											<td className="px-4 py-2">{user.email}</td>
											<td className="px-4 py-2">{user.phone}</td>
											<td className="px-4 py-2">{user.company.name}</td>
											<td className="px-4 py-2 space-x-2 flex">
												<Button
													onClick={() => handleEdit(user)}
													color="primary"
													size="small"
													sx={{
														width: "32px",
														minWidth: "32px",
														height: "32px",
														minHeight: "32px",
														marginRight: "4px",
													}}
													variant="outlined"
												>
													<EditIcon />
												</Button>
												<Button
													onClick={() => handleDeleteClick(user.id)}
													color="error"
													size="small"
													variant="outlined"
													sx={{
														width: "32px",
														minWidth: "32px",
														height: "32px",
														minHeight: "32px",
													}}
												>
													<DeleteIcon />
												</Button>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan={6} className="text-center py-4">
											No data found
										</td>
									</tr>
								)}
							</tbody>
						</Table>
					</TableContainer>
				</div>

				{/* MUI Pagination */}
				<div className="flex justify-center mt-4">
					<Pagination
						count={totalPages}
						page={currentPage}
						onChange={(_, page) => setCurrentPage(page)}
						sx={{
							"& .MuiPaginationItem-root": {
								color: theme === "light" ? "#000" : "#fff",
							},
							"& .Mui-selected": {
								backgroundColor: theme === "light" ? "#4f46e5" : "#FF33A1",
								color: "#fff",
							},
						}}
					/>
				</div>

				{/* Edit Dialog */}
				<Dialog
					open={editUser !== null}
					onClose={() => setEditUser(null)}
					maxWidth="sm"
					fullWidth
					PaperProps={{
						sx: {
							backgroundColor: theme === "light" ? "#fff" : "#19191C",
							color: theme === "light" ? "#000" : "#fff",
						},
					}}
				>
					<DialogTitle>Edit User</DialogTitle>
					<DialogContent dividers>
						{editUser && (
							<div className="flex flex-col gap-4 py-2">
								<label className="flex flex-col">
									<span className="mb-1 font-medium">Name</span>
									<input
										type="text"
										name="name"
										value={editUser.name}
										onChange={handleInputChange}
										className="border rounded px-3 py-2"
									/>
								</label>

								<label className="flex flex-col">
									<span className="mb-1 font-medium">Email</span>
									<input
										type="email"
										name="email"
										value={editUser.email}
										onChange={handleInputChange}
										className="border rounded px-3 py-2"
									/>
								</label>

								<label className="flex flex-col">
									<span className="mb-1 font-medium">Phone</span>
									<input
										type="text"
										name="phone"
										value={editUser.phone}
										onChange={handleInputChange}
										className="border rounded px-3 py-2"
									/>
								</label>
							</div>
						)}
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => setEditUser(null)}
							color="secondary"
							variant="outlined"
						>
							Cancel
						</Button>
						<Button
							onClick={handleSave}
							variant="contained"
							sx={{ backgroundColor: "#4f46e5" }}
						>
							Save
						</Button>
					</DialogActions>
				</Dialog>

				{/* Delete Confirmation Dialog */}
				<Dialog
					open={confirmDelete !== null}
					onClose={() => setConfirmDelete(null)}
					PaperProps={{
						sx: {
							backgroundColor: theme === "light" ? "#fff" : "#19191C",
							color: theme === "light" ? "#000" : "#fff",
						},
					}}
				>
					<DialogTitle>Are You Sure that you want to delete this?</DialogTitle>
					<DialogActions>
						<Button
							onClick={() => setConfirmDelete(null)}
							color="secondary"
							variant="contained"
							sx={{ backgroundColor: "#4f46e5" }}
						>
							Cancel
						</Button>
						<Button
							onClick={confirmDeleteUser}
							color="error"
							variant="contained"
						>
							Delete
						</Button>
					</DialogActions>
				</Dialog>

				<Dialog
					open={addUserOpen}
					onClose={() => setAddUserOpen(false)}
					maxWidth="sm"
					fullWidth
					PaperProps={{
						sx: {
							backgroundColor: theme === "light" ? "#fff" : "#19191C",
							color: theme === "light" ? "#000" : "#fff",
						},
					}}
				>
					<DialogTitle>Add New User</DialogTitle>
					<DialogContent dividers>
						<div className="flex flex-col gap-4 py-2">
							<label className="flex flex-col">
								<span className="mb-1 font-medium">Name</span>
								<input
									type="text"
									name="name"
									value={newUser.name}
									onChange={(e) =>
										setNewUser({ ...newUser, name: e.target.value })
									}
									className="border rounded px-3 py-2"
								/>
							</label>

							<label className="flex flex-col">
								<span className="mb-1 font-medium">Email</span>
								<input
									type="email"
									name="email"
									value={newUser.email}
									onChange={(e) =>
										setNewUser({ ...newUser, email: e.target.value })
									}
									className="border rounded px-3 py-2"
								/>
							</label>

							<label className="flex flex-col">
								<span className="mb-1 font-medium">Phone</span>
								<input
									type="text"
									name="phone"
									value={newUser.phone}
									onChange={(e) =>
										setNewUser({ ...newUser, phone: e.target.value })
									}
									className="border rounded px-3 py-2"
								/>
							</label>

							<label className="flex flex-col">
								<span className="mb-1 font-medium">Company</span>
								<input
									type="text"
									name="company"
									value={newUser.company.name}
									onChange={(e) =>
										setNewUser({
											...newUser,
											company: { name: e.target.value },
										})
									}
									className="border rounded px-3 py-2"
								/>
							</label>
						</div>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={() => setAddUserOpen(false)}
							color="secondary"
							variant="outlined"
						>
							Cancel
						</Button>
						<Button
							onClick={() => {
								setUsers([...users, { ...newUser, id: Date.now() }]);
								setAddUserOpen(false);
								setSnackbarMessage("User added successfully");
								setSnackbarSeverity("success");
								setSnackbarOpen(true);
							}}
							variant="contained"
							sx={{ backgroundColor: "#4f46e5" }}
						>
							Add
						</Button>
					</DialogActions>
				</Dialog>
			</div>

			{/* Snackbar for Edit/Delete actions */}
			<Snackbar
				open={snackbarOpen}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity={snackbarSeverity}
					variant="filled"
				>
					{snackbarMessage}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default TableData;
