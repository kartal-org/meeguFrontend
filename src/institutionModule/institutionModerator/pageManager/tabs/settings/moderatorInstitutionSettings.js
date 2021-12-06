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
import DialogComponent from "../../../../../materialUI/components/reuseableComponents/dialogComponent";
import NewBannerComponent from "../../../../../materialUI/components/reuseableComponents/newBannerComponent";

function createData(date, plan, storage_add, price) {
	return { date, plan, storage_add, price };
}

const rows = [
	createData("DD-MM-YYYY", "Basic Subscription Plan", "2 GB", "250.00"),
	createData("DD-MM-YYYY", "Silver Subscription Plan", "5 GB", "500.00"),
	createData("DD-MM-YYYY", "Gold Subscription Plan", "10 GB", "1500.00"),
];

const ModeratorInstitutionSettings = () => {
	return (
		<>
			<div className="bg-red-100">
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
			</div>
		</>
	);
};

export default ModeratorInstitutionSettings;
