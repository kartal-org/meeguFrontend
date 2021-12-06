import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams, Route, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import ClassroomDashboard from "./tabs/dashboard/classroomAdviserDashboard";
import PageManagerComponent from "../../../../materialUI/components/reuseableComponents/pageManagerComponent";
import ProductDetailComponent from "../../../../materialUI/components/reuseableComponents/dashboardComponent";
import ClassroomSubmission from "./tabs/submissions/classroomAdviserSubmission";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

import {
	deleteAdviserClassroom,
	deleteClassroom,
	editAdviserClassroom,
	editClassroom,
	getCurrentClassroom,
	retrieveClassroom,
} from "../../../../store/newClassroomSlice";
import useFetch from "../../../../hooks/useFetch";
import {
	Button,
	Card,
	CardMedia,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import AdviserResourceTab from "./tabs/resources/adviserResourceTab";
import AdviserWorkspaceTab from "./tabs/workspaces/adviserWorkspaceTab";
import AdviserClassroomStudents from "./tabs/students/adviserClassroomStudents";
import AdviserRecommendations from "./tabs/recommendations/adviserRecommendations";
const Input = styled("input")({
	display: "none",
});

const AdviserClassroomManager = () => {
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const { tab } = queryString.parse(location.search);
	const { id } = useParams();
	const fetchClassroom = useFetch;

	const [value, setValue] = useState(tab);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	useEffect(() => {
		dispatch(retrieveClassroom(`/classroom/change/${id}`));
	}, []);
	const currentClassroom = useSelector(
		(state) => state.newClass.currentClassroom
	);
	const status = useSelector((state) => state.newClass.status);
	const [classroom, setClassroom] = useState({});
	useEffect(() => {
		if (currentClassroom) {
			setClassroom({ ...currentClassroom, coverFile: currentClassroom.cover });
		}
	}, [currentClassroom]);
	useEffect(() => {
		if (status == "Classroom delete success") {
			history.replace("/classroom?ref=adviser&navTab=classroom");
		}
	}, [status]);

	const onChange = (e) => {
		e.preventDefault();
		if (e.target.name == "cover") {
			let reader = new FileReader();
			let file = e.target.files[0];

			reader.onloadend = () => {
				setClassroom({
					...classroom,
					coverFile: file,
					cover: reader.result,
				});
			};
			reader.readAsDataURL(file);
		} else {
			setClassroom({ ...classroom, [e.target.name]: e.target.value });
		}
	};

	const handleEdit = () => {
		let form_data = new FormData();
		const { name, description, privacy, subject, cover, coverFile, code } =
			classroom;
		console.log(coverFile, cover);
		if (coverFile != cover) {
			form_data.append("cover", coverFile, coverFile.name);
		}
		form_data.append("name", name);
		form_data.append("code", code);
		form_data.append("description", description);
		form_data.append("privacy", privacy);
		form_data.append("subject", subject);
		dispatch(editClassroom(`/classroom/change/${classroom.id}`, form_data));
	};

	const handleDelete = () => {
		dispatch(deleteClassroom(`/classroom/change/${classroom.id}`));
	};

	const tabs = [
		{
			label: "Dashboard",
			link: `/classroom/adviser/${id}?tab=dashboard`,
			value: "dashboard",
			component: <ClassroomDashboard id={id} />,
		},
		{
			label: "Resources",
			link: `/classroom/adviser/${id}?tab=resources`,

			value: "resources",
			component: <AdviserResourceTab />,
		},
		{
			label: "People",
			link: `/classroom/adviser/${id}?tab=people`,

			value: "people",
			component: <AdviserClassroomStudents />,
		},
		{
			label: "Workspaces",
			link: `/classroom/adviser/${id}?tab=workspaces`,

			value: "workspaces",
			component: <AdviserWorkspaceTab />,
		},
		{
			label: "Submissions",
			link: `/classroom/adviser/${id}?tab=submissions`,
			value: "submissions",
			// component: <div className="min-h-screen">submissions</div>,
			component: <ClassroomSubmission />,
			// <ClassroomResources />,
		},
		{
			label: "Recommendations",
			link: `/classroom/adviser/${id}?tab=recommendations`,

			value: "recommendations",
			component: <AdviserRecommendations />,
		},
	];

	// console.log(location.pathname.split('/'), location.pathname);
	const [paths, setPaths] = useState(location.pathname.split("/"));
	console.log(paths);

	function handleClick(event) {
		event.preventDefault();
		console.info("You clicked a breadcrumb.");
	}
	return (
		<>
			<div role="presentation" onClick={handleClick}>
				<Breadcrumbs aria-label="breadcrumb">
					{paths.map((val) => {
						console.log(val);
						// if (val !== '' || Number(val)) {
						<Link underline="hover" color="inherit" href="/">
							{val}
						</Link>;
						// }
					})}

					{/* <Link underline='hover' color='inherit' href='/getting-started/installation/'>
						Core
					</Link>
					<Typography color='text.primary'>Breadcrumbs</Typography> */}
				</Breadcrumbs>
			</div>
			<div className="flex flex-col space-y-4">
				<ProductDetailComponent
					dialogTitle="Edit Classroom Detail"
					isEdit={true}
					productType="Classroom"
					setProduct={setClassroom}
					product={classroom}
				>
					<div className="flex flex-col space-y-4 ">
						<Card sx={{ maxWidth: "100%" }}>
							<CardMedia
								component="div"
								image={classroom.cover}
								className="flex justify-end items-center"
								sx={{
									height: "120px",
									display: "flex",
									justifyContent: "flex-end",
									alignItems: "end",
								}}
							>
								<label htmlFor="contained-button-file">
									<Input
										accept="image/*"
										id="contained-button-file"
										name="cover"
										onChange={onChange}
										type="file"
									/>
									<Button
										variant="contained"
										startIcon={<PhotoCamera />}
										style={{
											marginRight: "10px",
											marginBottom: "10px",
											backgroundColor: "white",
											color: "rgba(55, 65, 81, 1)",
											textTransform: "capitalize",
										}}
										component="span"
									>
										Change Cover Photo
									</Button>
								</label>
							</CardMedia>
						</Card>
						<TextField
							label="Classroom Name"
							variant="outlined"
							name="name"
							value={classroom.name}
							onChange={(e) => onChange(e)}
						/>
						<TextField
							label="Subject"
							variant="outlined"
							name="subject"
							value={classroom.subject}
							onChange={(e) => onChange(e)}
						/>
						<TextField
							label="Subject"
							variant="outlined"
							name="code"
							value={classroom.code}
							InputProps={{
								readOnly: true,
							}}
						/>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Privacy</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={classroom.privacy}
								label="Privacy"
								name="privacy"
								onChange={(e) => onChange(e)}
							>
								<MenuItem value={"public"}>Public</MenuItem>
								<MenuItem value={"private"}>Private</MenuItem>
							</Select>
						</FormControl>
						<TextField
							label="Description"
							variant="outlined"
							name="description"
							value={classroom.description}
							onChange={(e) => onChange(e)}
							multiline
							minRows={4}
						/>
						<div className="flex w-full space-x-2">
							<Button variant="contained" onClick={handleEdit}>
								Save Changes
							</Button>
							<Button color="error" onClick={handleDelete}>
								Delete
							</Button>
						</div>
					</div>
				</ProductDetailComponent>
				<PageManagerComponent
					value={value}
					handleChange={handleChange}
					tabs={tabs}
				/>
			</div>
		</>
	);
};

export default AdviserClassroomManager;
