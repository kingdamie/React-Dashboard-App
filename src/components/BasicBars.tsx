import { BarChart } from "@mui/x-charts/BarChart";

export default function BasicBars() {
	return (
		<BarChart
			xAxis={[
				{
					scaleType: "band",
					data: ["group A", "group B", "group C"],
					tickLabelStyle: { fill: "#FF5733" },
				},
			]}
			yAxis={[
				{
					tickLabelStyle: { fill: "#33FF57" }, // <-- y-axis label color
				},
			]}
			series={[
				{ data: [4, 3, 5] },
				{ data: [2, 5, 6] },
				{ data: [1, 6, 3] },
				{ data: [2, 5, 6] },
				{ data: [4, 3, 5] },
			]}
			// width={500}
			height={300}
			colors={["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF"]}
		/>
	);
}
