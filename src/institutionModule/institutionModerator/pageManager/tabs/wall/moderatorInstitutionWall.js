import React, { useEffect, useState } from "react";

import {
	Card,
	CardActions,
	CardContent,
	Divider,
	Button,
	IconButton,
	Chip,
} from "@mui/material";

import { CgFileDocument } from "react-icons/cg";
import { BiLike } from "react-icons/bi";
import { BsBuilding } from "react-icons/bs";
import { HiOutlineClock } from "react-icons/hi";
import DialogComponent from "../../../../../materialUI/components/reuseableComponents/dialogComponent";
import DialogStepperComponent from "../../../../../materialUI/components/reuseableComponents/dialogStepperComponent";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useHistory, useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../../../../hooks/useFetch";
import queryString from "query-string";
import CreateArticle from "./components/createArticle";
import PublicationType from "./createSteps/publicationType";
import PublicationDetail from "./createSteps/publicationDetail";
import { getDepartments } from "../../../../../store/departmentSlice";
import { newGetArticles } from "../../../../../store/articleSlice";
import { CardActionArea } from "@mui/material";

//Tour
import { Steps } from "intro.js-react";

const Wall = ({ item, department }) => {
	const { id } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const articleStates = useFetch;
	const departmentStates = useFetch;
	const location = useLocation();

	useEffect(() => {
		dispatch(getDepartments(`/institution/department/${id}`));
	}, []);

	const fetchedDepartments = useSelector(
		(state) => state.department.departments
	);
	const fetchedArticles = useSelector((state) => state.article.articles);
	const fetchedInstitution = useSelector(
		(state) => state.institution.currentInstitution
	);

	useEffect(() => {
		if (fetchedInstitution) {
			dispatch(newGetArticles(`/post/?search=${fetchedInstitution.name}`));
		}
	}, [fetchedInstitution]);

	const { items: departments } = departmentStates(fetchedDepartments);
	const { items: articles } = articleStates(fetchedArticles);

	const handleClick = () => {};
	const [publishType, setPublishType] = useState("article");

	const handlePublishType = (event, publishType) => {
		setPublishType(publishType);
	};
	const steps = [
		{
			label: "Publication Method",
			component: <PublicationType />,
		},
		{
			label: "Publication Detail",
			component: <PublicationDetail />,
		},
	];

	//tour
	const [stepsEnabled, setStepsEnabled] = useState("true");
	const [initialStep, setInitialStep] = useState(0);

	const tourSteps = [
		{
			element: ".publish",
			position: "left",
			intro: "Add more articles to publish here.",
		},
		{
			element: ".articles",
			position: "right",
			intro: "Be updated on what your institution has recently published.",
		},
		{
			element: ".departments",
			position: "left",
			intro:
				"Here are list of departments that are currently in your institution.",
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

			<div className="flex w-full justify-end">
				<DialogComponent
					title="Publish"
					button={<Button variant="outlined">Add Publishing</Button>}
				>
					<PublicationDetail />
				</DialogComponent>
				{/* <DialogStepperComponent
					title='Publish'
					steps={steps}
					button='Add Publishing'
					maxWidth='md'
					tourIdentifier='publish'
				/> */}
			</div>

			<div class="grid grid-cols-3 gap-4">
				<div
					class="articles col-span-2 p-2 overflow-y-auto flex flex-col space-y-4"
					style={{ maxHeight: "650px", minHeight: "650px" }}
				>
					<div className="flex space-x-4 justify-end">
						<Chip label="Featured" color="primary" onClick={handleClick} />
						<Chip label="Recent" color="primary" onClick={handleClick} />
						<Chip label="Archives" color="primary" onClick={handleClick} />
					</div>
					{articles.map((item) => (
						<Card
							item={item}
							sx={{
								maxHeight: 140,
								minHeight: 140,
								border: 1,
								borderColor: "#d4d4d4",
								mb: 1,
								p: 2,
							}}
						>
							<CardActionArea
								onClick={() =>
									history.push(`/institutions/moderator/article/${item.id}`)
								}
							>
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
								<div className="mt-2 px-2 flex space-x-5">
									<div className="flex items-center space-x-1">
										<CgFileDocument className="text-gray-500" />
										<p className="text-sm text-gray-500">Created by</p>
										<p className="text-xs text-gray-500">●</p>
										<p className="text-sm text-purple-500">{item.author} </p>
									</div>
									<div className="flex items-center space-x-1">
										<BsBuilding className="text-gray-500" />
										<p className="text-sm text-gray-500">Department</p>
										<p className="text-xs text-gray-500">●</p>
										<p className="text-sm text-purple-500">
											{item.department && item.department.name}{" "}
										</p>
									</div>
								</div>
							</CardActionArea>
						</Card>
					))}
				</div>

				<div
					class=" departments px-3 py-2 overflow-y-auto border-l border-gray-200"
					style={{ maxHeight: "650px", minHeight: "650px" }}
				>
					{departments.map((department) => (
						<Card
							department={department}
							sx={{
								maxHeight: 70,
								minHeight: 70,
								border: 1,
								borderColor: "#d4d4d4",
								mb: 1,
								p: 2,
								display: "flex",
								alignItems: "center",
								cursor: "pointer",
							}}
						>
							<div className="flex items-center space-x-2 w-full">
								<BsBuilding className="text-gray-400 text-2xl" />

								<div className="flex items-center space-x-1">
									<p className="text-gray-500 text-center">{department.name}</p>
								</div>
							</div>
						</Card>
					))}
				</div>
			</div>
		</>
	);
};

export default Wall;
