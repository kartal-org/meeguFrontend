import { useState } from "react";

import { Doughnut } from "react-chartjs-2";

//mui
import {
	Card,
	CardActions,
	CardContent,
	Divider,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";

//Icons
import { FaRegCommentAlt } from "react-icons/fa";

//Tour
import { Steps } from "intro.js-react";
import NewBannerComponent from "../../../../../../materialUI/components/reuseableComponents/newBannerComponent";
import DialogComponent from "../../../../../../materialUI/components/reuseableComponents/dialogComponent";

const data = {
	labels: ["Storage Used", "Storage Left"],
	datasets: [
		{
			label: "Storage Data",
			data: [34, 19],
			fill: false,
			backgroundColor: ["#904CB3", "#D2B6E0"],
			borderColor: ["#904CB3", "#D2B6E0"],
			borderWidth: 1,
			hoverOffset: 2,
			cutout: "80%",
			options: {
				animation: {
					animateScale: true,
				},
			},
		},
	],
};

function createData(date, plan, storage_add, price) {
	return { date, plan, storage_add, price };
}

const rows = [
	createData("DD-MM-YYYY", "Basic Subscription Plan", "2 GB", "250.00"),
	createData("DD-MM-YYYY", "Silver Subscription Plan", "5 GB", "500.00"),
	createData("DD-MM-YYYY", "Gold Subscription Plan", "10 GB", "1500.00"),
];

const ClassroomDashboard = () => {
	//tour
	const [stepsEnabled, setStepsEnabled] = useState("true");
	const [initialStep, setInitialStep] = useState(0);

	const tourSteps = [
		{
			element: ".storage",
			position: "right",
			intro: "Keep track of your storage here.",
		},
		{
			element: ".logs",
			position: "left",
			intro: "Keep track of your activities here.",
		},
	];

	const onExit = () => {
		setStepsEnabled(false);
	};

	function toggleSteps() {
		setStepsEnabled((prevState) => ({ stepsEnabled: !prevState.stepsEnabled }));
	}
	return (
		<>
			<Steps
				enabled={stepsEnabled}
				steps={tourSteps}
				initialStep={initialStep}
				onExit={onExit}
			/>

			<div class="grid grid-cols-4 gap-4">
				<div
					className="storage"
					style={{ maxHeight: "350px", minHeight: "350px" }}
				>
					<Card variant="outlined" sx={{ maxWidth: "100%" }}>
						<CardContent>
							<p className="text-lg text-center text-gray-400 mb-1">
								Storage Data
							</p>
							<Doughnut data={data} />
						</CardContent>
					</Card>
				</div>
				<div class="col-span-3 px-1 overflow-y-auto">
					<NewBannerComponent
						title=" Current Plan"
						subtitle="Keep track of your subscription transactions."
					>
						<DialogComponent
							maxWidth="md"
							title="Transaction History"
							button={
								<Button className="join" variant="contained">
									See transactions
								</Button>
							}
						>
							<TableContainer component={Paper}>
								<Table
									sx={{
										minWidth: 650,
										border: 1,
										borderColor: "#e8e8e8",
									}}
									aria-label="simple table"
								>
									<TableHead>
										<TableRow sx={{ backgroundColor: "#e3e3e3" }}>
											<TableCell
												align="center"
												sx={{
													fontWeight: "700",
													fontSize: "14px",
													color: "#383838",
												}}
											>
												DATE
											</TableCell>
											<TableCell
												align="center"
												sx={{
													fontWeight: "700",
													fontSize: "14px",
													color: "#383838",
												}}
											>
												SUBSCRIPTION PLAN
											</TableCell>
											<TableCell
												align="center"
												sx={{
													fontWeight: "700",
													fontSize: "14px",
													color: "#383838",
												}}
											>
												STORAGE ADDED
											</TableCell>
											<TableCell
												align="center"
												sx={{
													fontWeight: "700",
													fontSize: "14px",
													color: "#383838",
												}}
											>
												PRICE
											</TableCell>
										</TableRow>
									</TableHead>

									<TableBody>
										{rows.map((row) => (
											<TableRow
												key={row.name}
												sx={{
													"&:last-child td, &:last-child th": { border: 0 },
												}}
											>
												<TableCell component="th" scope="row" align="center">
													{row.date}
												</TableCell>
												<TableCell component="th" scope="row" align="center">
													{row.plan}
												</TableCell>
												<TableCell component="th" scope="row" align="center">
													{row.storage_add}
												</TableCell>
												<TableCell component="th" scope="row" align="center">
													₱ {row.price}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</DialogComponent>
					</NewBannerComponent>

					<div
						class="logs col-span-3 px-1 mt-5 overflow-y-auto"
						style={{ maxHeight: "650px", minHeight: "650px" }}
					>
						<Card
							sx={{
								maxHeight: 150,
								minHeight: 150,
								border: 1,
								borderColor: "#d4d4d4",
								mb: 2,
							}}
						>
							<div className="flex items-center px-2" style={{ height: 50 }}>
								<div className="flex flex-row bg-white w-full flex flex-row justify-between items-center">
									<div className="flex items-center">
										<FaRegCommentAlt className="text-xl text-gray-400 mr-2" />

										<p className="text-sm text-purple-400 mr-1">
											Name here dili username
										</p>
										<p className="text-sm text-gray-400 mr-1">commented on</p>
										<p className="text-sm text-gray-400">- Title Here -</p>
									</div>

									<div className="flex items-center">
										<p className="text-xs text-gray-400 mr-2">●</p>
										<p className="text-sm text-gray-400 mr-1">Date</p>
									</div>
								</div>
							</div>

							<Divider sx={{ m: 1 }} />
							<div className="flex flex-row" style={{ height: 100 }}>
								<div className="w-10 flex flex-col justify-center py-1">
									<p className="text-gray-400 text-sm flex justify-center -mt-1">
										┆
									</p>
									<p className="text-gray-400 text-sm flex justify-center -mt-1">
										┆
									</p>
									<p className="text-gray-400 text-sm flex justify-center -mt-1">
										┆
									</p>
									<p className="text-gray-400 text-sm flex justify-center -mt-1">
										┆
									</p>
									<p className="text-gray-400 text-sm flex justify-center -mt-1">
										┆
									</p>
									<p className="text-gray-400 text-sm flex justify-center -mt-1">
										┆
									</p>
								</div>
								<div className="bg-gray-200 w-full p-1">sdg</div>
							</div>
						</Card>
					</div>
				</div>
			</div>
			{/* <Card variant="outlined" sx={{ maxWidth: "20%" }}>
				<CardContent>
					<p className="text-lg text-center text-gray-400 mb-1">Storage Data</p>
					<Doughnut data={data} />
				</CardContent>
			</Card> */}
		</>
	);
};

export default ClassroomDashboard;
