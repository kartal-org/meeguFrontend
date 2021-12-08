import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Steps } from "intro.js-react";
import { Doughnut } from "react-chartjs-2";
import { format } from "date-fns";

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

import Paypal from "../../../../../../materialUI/components/paypal";
import NewBannerComponent from "../../../../../../materialUI/components/reuseableComponents/newBannerComponent";
import CardComponent from "../../../../../../materialUI/components/reuseableComponents/cardComponent";
import DialogComponent from "../../../../../../materialUI/components/reuseableComponents/dialogComponent";
import {
	getMySubscriptions,
	getClassroomPlans,
} from "../../../../../../store/subscriptionSlice";
import useFetch from "../../../../../../hooks/useFetch";

function createData(date, plan, storage_add, price) {
	return { date, plan, storage_add, price };
}

const rows = [
	createData("DD-MM-YYYY", "Basic Subscription Plan", "2 GB", "250.00"),
	createData("DD-MM-YYYY", "Silver Subscription Plan", "5 GB", "500.00"),
	createData("DD-MM-YYYY", "Gold Subscription Plan", "10 GB", "1500.00"),
];

const ClassroomDashboard = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const subscriptionState = useFetch;
	const classroomState = useFetch;
	const planStates = useFetch;

	const currentClassroom = useSelector(
		(state) => state.newClass.currentClassroom
	);
	useEffect(() => {
		dispatch(getClassroomPlans());
	}, []);
	const fetchedPlans = useSelector((state) => state.subscription.plans);
	const { items: plans, setItems: setPlans } = planStates(fetchedPlans);
	console.log(fetchedPlans);

	useEffect(() => {
		dispatch(getMySubscriptions(`/subscription/buy/classroom/${id}`));
	}, []);

	const fetchedSubscription = useSelector(
		(state) => state.subscription.subscriptions
	);
	const { items: subscriptions } = subscriptionState(fetchedSubscription);
	// const { items: classroom } = subscriptionState(currentClassroom);
	const [data, setData] = useState({
		labels: ["Storage Used", "Storage Left"],
		datasets: [
			{
				label: "Storage Data",
				data: [0, 0],
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
	});

	useEffect(() => {
		if (currentClassroom) {
			const totalSize = currentClassroom.storage_left / 1000000000;
			const usedSize = currentClassroom.storage_used / 1000000000;

			setData({
				...data,
				labels: [
					`Storage Left ${totalSize.toFixed(2)}GB`,
					`Storage Used ${usedSize.toFixed(2)}GB`,
				],
				datasets: [
					{
						label: "Storage Data",
						data: [totalSize, usedSize],
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
			});
		}
	}, currentClassroom);
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
			{/* <Steps
				enabled={stepsEnabled}
				steps={tourSteps}
				initialStep={initialStep}
				onExit={onExit}
			/> */}

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
				{subscriptions[0] && (
					<div class="col-span-3 px-1 overflow-y-auto">
						<NewBannerComponent
							title={
								subscriptions[0].plan.name ? subscriptions[0].plan.name : ""
							}
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
											{subscriptions.map((row) => (
												<TableRow
													key={row.plan.name}
													sx={{
														"&:last-child td, &:last-child th": { border: 0 },
													}}
												>
													<TableCell component="th" scope="row" align="center">
														{format(
															new Date(row.dateCreated),
															"MMM-dd-yyyy h:m b"
														)}
													</TableCell>
													<TableCell component="th" scope="row" align="center">
														{row.plan.name}
													</TableCell>
													<TableCell component="th" scope="row" align="center">
														+{row.plan.limitations.storage / 1000000000} GB
													</TableCell>
													<TableCell component="th" scope="row" align="center">
														₱ {row.plan.price}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>

								<div className="mt-5">
									<DialogComponent
										maxWidth="md"
										title="Upgrade Your Subscription"
										button={
											<Button className="join" variant="contained">
												Upgrade Subscription
											</Button>
										}
									>
										<div className="flex w-full justify-center items-center mt-5">
											{plans.map((item) => (
												<DialogComponent
													title="Pay Thru:"
													button={<CardComponent item={item} />}
												>
													{currentClassroom ? (
														<Paypal
															item={item}
															productID={currentClassroom.id}
															productlabel="classroom"
															dispatchLink={`/subscription/buy/classroom/${currentClassroom.id}`}
														/>
													) : null}
												</DialogComponent>
											))}
										</div>
									</DialogComponent>
								</div>
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
									<div className=" bg-white w-full flex flex-row justify-between items-center">
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
				)}
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
