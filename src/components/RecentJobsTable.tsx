import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { useTheme as useCustomTheme } from "../ThemeContext";

const jobData = [
	{
		title: "Sr. Mobile App Developer",
		applicants: "56 Applicants",
		date: "27 May 2024",
		location: "Georgia, XY",
	},
	{
		title: "Data Scientist Trainee",
		applicants: "784 Applicants",
		date: "03 Jun 2024",
		location: "Siberia, PQ",
	},
	{
		title: "React Developer",
		applicants: "421 Applicants",
		date: "18 Jun 2024",
		location: "Italy, Rs",
	},
	{
		title: "AWS Engineer",
		applicants: "257 Applicants",
		date: "15 Jun 2024",
		location: "Georgia, XY",
	},
	{
		title: "UI Developer",
		applicants: "87 Applicants",
		date: "20 Jun 2024",
		location: "Canada, UK",
	},
	{
		title: "Angular Developer",
		applicants: "86 Applicants",
		date: "23 Jun 2024",
		location: "Germany, US",
	},
];

const RecentJobsTable = () => {
	const { theme } = useCustomTheme();
	const textColor = theme === "light" ? "#000" : "#fff";
	const borderColor = theme === "light" ? "#e0e0e0" : "#444"; 

	return (
		<div className="w-full overflow-x-auto rounded-lg bg-gray-100 dark:bg-[#19191C] mt-4 shadow-lg">
			<TableContainer className="custom-scrollbar">
				<Table>
					<TableHead>
						<TableRow>
							{[
								"Job Title",
								"Applicants",
								"Openings End",
								"Location",
							].map((header) => (
								<TableCell
									key={header}
									sx={{ color: textColor, fontWeight: "700" }}
								>
									{header}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{jobData.map((job, index) => (
							<TableRow
								key={index}
								sx={{ borderBottom: `2px solid ${borderColor}` }}
							>
								{Object.values(job).map((value, idx) => (
									<TableCell key={idx} sx={{ color: textColor }}>
										{value}
									</TableCell>
								))}
								{/* <TableCell>
									<div className="flex gap-2">
										<Button
											color="secondary"
											variant="outlined"
											size="small"
											sx={{
												width: "25px",
												minWidth: "25px",
												height: "25px",
												minHeight: "25px",
											}}
										>
											<EditIcon fontSize="small" />
										</Button>
										<Button
											color="error"
											variant="contained"
											size="small"
											sx={{
												width: "25px",
												minWidth: "25px",
												height: "25px",
												minHeight: "25px",
											}}
										>
											<DeleteIcon fontSize="small" />
										</Button>
									</div>
								</TableCell> */}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default RecentJobsTable;
