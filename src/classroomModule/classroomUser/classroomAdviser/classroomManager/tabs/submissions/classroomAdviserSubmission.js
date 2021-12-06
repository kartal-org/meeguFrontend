import React, { useEffect } from "react";

import {
	Box,
	Card,
	CardActions,
	CardContent,
	Divider,
	Button,
	IconButton,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
} from "@mui/material";

//icons
import {
	MdOutlinePlagiarism,
	MdOutlineSpeakerNotes,
	MdRecommend,
} from "react-icons/md";
import { CgFileDocument } from "react-icons/cg";
import { BiLike } from "react-icons/bi";
import { HiOutlineClock } from "react-icons/hi";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../../../../../hooks/useFetch";
import { getSubmissions } from "../../../../../../store/submissionSlice";

import DialogComponent from "../../../../../../materialUI/components/reuseableComponents/dialogComponent";

const items = [
	{
		id: 1,
		title: "Capstone 2",
		date: "MM-DD-YYYY",
		workspace: "Thania",
		status: "Draft",
		abstract:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed risus euismod, vestibulum nunc sit amet, fringilla mauris. Etiam hendrerit velit vitae sollicitudin pulvinar.",
	},
	{
		id: 2,
		title: "Capstone 2",
		date: "MM-DD-YYYY",
		workspace: "Thania",
		status: "Draft",
		abstract:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed risus euismod, vestibulum nunc sit amet, fringilla mauris. Etiam hendrerit velit vitae sollicitudin pulvinar.",
	},
];

const ClassroomSubmission = () => {
	const [open, setOpen] = React.useState(false);
	const history = useHistory();
	const dispatch = useDispatch();
	const submissionsState = useFetch;
	const { id } = useParams();

	useEffect(() => {
		dispatch(getSubmissions(`/submission/classroom?search=${id}`));
	}, []);
	const fetchedSubmissions = useSelector(
		(state) => state.submission.submissions
	);
	const { items: submissions, setItems: setSubmissions } =
		submissionsState(fetchedSubmissions);

	const handleClickOpen = (item) => {
		if (item.isPdf) {
			history.push(`/classroom/adviser/submission/pdf/${item.id}`);
		} else {
			history.push(`/classroom/adviser/submission/${item.id}`);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	//select
	const [status, setStatus] = React.useState("");

	const handleChange = (event) => {
		setStatus(event.target.value);
	};

	return (
		<>
			<div
				className="px-1 overflow-y-auto"
				style={{ maxHeight: "600px", minHeight: "600px" }}
			>
				{/* Cards Here */}
				{submissions.map((item) => (
					<Card
						item={item}
						sx={{
							maxHeight: 180,
							minHeight: 180,
							border: 1,
							borderColor: "#d4d4d4",
							mb: 1,
							p: 2,
						}}
					>
						<div className="flex justify-end">
							<DialogComponent
								title="Submission Detail Preview"
								button={<Button variant="contained">Check Submission</Button>}
							>
								{/* Thania Please ko butang ug mga read only textfields for submission title, description, dateCreated, workspace name, then responds dropdown for accept, reject, and revise. Finally comment for the submission.  */}
								{/* Note: Please use real data kay gi map mani sila gamita ang item.title etc sa mga text fields. */}
								{/* Why this?: Even though redundant siya mao rani ang ato way for responding for PDF File */}
								{/* {items.map((item) => (
									<Box> */}
								<TextField
									id="outlined-read-only-input"
									label="Submission Title"
									value={item.title}
									InputProps={{
										readOnly: true,
									}}
								/>

								<TextField
									id="outlined-read-only-input"
									label="Submission Description"
									value={item.description}
									multiline
									maxRows={4}
									InputProps={{
										readOnly: true,
									}}
								/>

								<TextField
									id="outlined-read-only-input"
									label="Date Created"
									value={item.date}
									InputProps={{
										readOnly: true,
									}}
								/>

								<TextField
									id="outlined-read-only-input"
									label="Workspace Name"
									value={item.workspace}
									InputProps={{
										readOnly: true,
									}}
								/>

								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">Verdict</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={item.status}
										label="Verdict"
										onChange={handleChange}
									>
										<MenuItem value={10}>Accept</MenuItem>
										<MenuItem value={20}>Reject</MenuItem>
										<MenuItem value={30}>Revise</MenuItem>
									</Select>
								</FormControl>

								<TextField
									id="outlined-basic"
									label="Comment"
									value={item.comment}
									multiline
									maxRows={4}
								/>
								{/* </Box>
								))} */}
								<Button
									variant="contained"
									onClick={() => handleClickOpen(item)}
								>
									View File
								</Button>
							</DialogComponent>
						</div>
						<div className="flex justify-between items-center">
							<p className="text-3xl tracking-wider font-semibold">
								{item.title}
							</p>
							<p className="text-xs text-gray-400">{item.date}</p>
						</div>
						<p
							className="text-sm tracking-wider truncate"
							style={{
								maxHeight: "40px",
								minHeight: "40px",
								maxWidth: "1210px",
								minWidth: "1210px",
								padding: 5,
							}}
						>
							{item.abstract}
						</p>
						<div className="mt-2 px-2 flex space-x-2">
							<div className="flex items-center space-x-1">
								<CgFileDocument className="text-gray-500" />
								<p className="text-sm text-gray-500">Workspace Name ●</p>
								<p className="text-xs text-purple-500">{item.workspace} </p>
							</div>
							<div className="flex items-center space-x-1">
								<HiOutlineClock className="text-gray-500" />
								<p className="text-sm text-gray-500">Status ●</p>
								<p className="text-xs text-purple-500">{item.status} </p>
							</div>
						</div>
					</Card>
				))}
				{/* <Card
					sx={{
						maxHeight: 150,
						minHeight: 150,
						border: 1,
						borderColor: "#d4d4d4",
						mb: 2,
						p: 2,
					}}
				>
					<div className="flex justify-end">
						<Button variant="contained" onClick={handleClickOpen}>
							View Submission
						</Button>
					</div>

					<p className="text-3xl tracking-wider font-semibold">{item.title}</p>
					<p
						className="text-sm tracking-wider truncate"
						style={{
							maxHeight: "40px",
							minHeight: "40px",
							maxWidth: "1210px",
							minWidth: "1210px",
							padding: 5,
						}}
					>
						{item.abstract}
					</p>
				</Card> */}
			</div>

			{/* Dialog Here  */}
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
				<DialogTitle>Title</DialogTitle>
				<DialogContent>
					<DialogContentText>Author/s</DialogContentText>

					<div className="mt-1 space-x-3 flex justify-end">
						{/* <Button variant="contained">Plagiarism Check</Button> */}
						<Button variant="text" endIcon={<MdOutlinePlagiarism />}>
							Plagiarism Check
						</Button>
						<Button variant="text" endIcon={<MdOutlineSpeakerNotes />}>
							Call for Revision
						</Button>
					</div>

					<Divider sx={{ m: 2 }} />
					<div
						className="mt-1 text-sm text-justify overflow-y-auto"
						style={{
							maxHeight: "450px",
							minHeight: "450px",
						}}
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed
						risus euismod, vestibulum nunc sit amet, fringilla mauris. Etiam
						hendrerit velit vitae sollicitudin pulvinar. Vivamus dictum magna
						sit amet ligula sollicitudin maximus.
					</div>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						onClick={handleClose}
						endIcon={<BiLike />}
						sx={{
							mb: 2,
							mr: 2,
						}}
					>
						Recommend
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ClassroomSubmission;
