import { Box, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { JSX } from "react";
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { GoStack } from "react-icons/go";
import { useTheme as useCustomTheme } from "../ThemeContext";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import RecentJobsTable from "../components/RecentJobsTable";
import BasicBars from "../components/BasicBars";
import usePageMetadata from "../hooks/usePageMetadata";

// Reusable Stat Card
const StatCard = ({
	title,
	value,
	change,
	trendIcon,
	trendColor,
	icon,
}: {
	title: string;
	value: string;
	change: string;
	trendIcon: JSX.Element;
	trendColor: string;
	icon: JSX.Element;
}) => {
		const { theme } = useCustomTheme();
		usePageMetadata("Dashoard with TS")
	return (
		<Paper
			elevation={3}
			sx={{
				p: 3,
				borderRadius: 3,
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				minHeight: 130,
				backgroundColor: theme === "light" ? "#fff" : "#19191C",
				color: theme === "light" ? "#000" : "#fff",
			}}
		>
			<Box>
				<Typography variant="subtitle2" className="text-gray-400 uppercase">
					{title}
				</Typography>
				<Typography variant="h5" fontWeight={600} mt={1}>
					{value}
				</Typography>
				<Typography
					variant="body2"
					color={trendColor}
					display="flex"
					alignItems="center"
					gap={0.5}
					mt={1}
				>
					{change} {trendIcon}
				</Typography>
			</Box>
			<Box sx={{ fontSize: 40}}>{icon}</Box>
		</Paper>
	);
};

const Home = () => {

	return (
		<Box>
			{/* Title */}
			<Box mb={4}>
				<Typography variant="h4" fontWeight="bold">
					Dashboard
				</Typography>
			</Box>

			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					<Grid size={{ xs: 12, md: 6 }}>
						<StatCard
							title="Job Applications"
							value="47,356"
							change="Increased by 1.6%"
							trendIcon={<IoIosTrendingUp />}
							trendColor="success.main"
							icon={<GoStack className="text-fuchsia-600" />}
						/>
					</Grid>
					<Grid size={{ xs: 12, md: 6 }}>
						<StatCard
							title="Interview Schedule"
							value="5,356"
							change="Decreased by 3.1%"
							trendIcon={<IoIosTrendingDown />}
							trendColor="error.main"
							icon={<RiCalendarScheduleLine className="text-orange-600" />}
						/>
					</Grid>
					<Grid size={{ xs: 12, md: 6 }}>
						<StatCard
							title="Shortlisted"
							value="768"
							change="Increased by 1.3%"
							trendIcon={<IoIosTrendingUp />}
							trendColor="success.main"
							icon={<BsFillPersonLinesFill className="text-lime-600" />}
						/>
					</Grid>
					<Grid size={{ xs: 12, md: 6 }}>
						<StatCard
							title="Rejected Applications"
							value="47,356"
							change="Decreased by 0.3%"
							trendIcon={<IoIosTrendingDown />}
							trendColor="error.main"
							icon={<GiCancel className="text-indigo-600" />}
						/>
					</Grid>
				</Grid>
			</Box>


			<div className=" p-2 rounded-lg  bg-gray-100 dark:bg-[#19191C] mt-4">
				<BasicBars/>
			</div>

			

			<div className="min-h-screen">
				<h1 className="text-2xl font-bold p-4">Recent Jobs</h1>
				<RecentJobsTable />
			</div>
		</Box>
	);
};

export default Home;
