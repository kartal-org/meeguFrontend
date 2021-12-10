import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Button, Card, CardMedia, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import useFetch from "../../../../../hooks/useFetch";
import BannerComponent from "../../../../../materialUI/components/reuseableComponents/bannerComponent";
import CardComponent from "../../../../../materialUI/components/reuseableComponents/cardComponent";
import CardHolder from "../../../../../materialUI/components/reuseableComponents/cardHolder";
import DialogComponent from "../../../../../materialUI/components/reuseableComponents/dialogComponent";
import {
	createDepartment,
	getDepartments,
} from "../../../../../store/departmentSlice";

import { styled } from "@mui/material/styles";

//Tour
import { Steps } from "intro.js-react";

//validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const Input = styled("input")({
	display: "none",
});

const ModeratorInstitutionDepartmentTab = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const departmentState = useFetch;
	useEffect(() => {
		dispatch(getDepartments(`/institution/department/${id}`));
	}, []);
	const fetchedDepartments = useSelector(
		(state) => state.department.departments
	);
	const { items: departments, setItems: setDepartments } =
		departmentState(fetchedDepartments);

	const defaultImage =
		"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

	const [inputForm, setInputForm] = useState({
		name: "",
		description: "",
		cover: defaultImage,
		coverFile: defaultImage,
	});
	const onChange = (e) => {
		e.preventDefault();
		if (e.target.name == "cover") {
			let reader = new FileReader();
			let file = e.target.files[0];

			reader.onloadend = () => {
				setInputForm({
					...inputForm,
					coverFile: file,
					cover: reader.result,
				});
			};
			reader.readAsDataURL(file);
		} else {
			setInputForm({ ...inputForm, [e.target.name]: e.target.value });
		}
	};
	const handleCreate = () => {
		let form_data = new FormData();
		const { name, description, cover, coverFile } = inputForm;
		if (coverFile != defaultImage) {
			form_data.append("cover", coverFile, coverFile.name);
		}
		form_data.append("name", name);
		form_data.append("description", description);
		dispatch(createDepartment(id, form_data));
	};

	//validation
	const validationMsg = Yup.object().shape({
		name: Yup.string().required("Department name is required."),
	});

	const {
		register, // register inputs
		handleSubmit, // handle form submit
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationMsg),
	});

	const onSubmit = (data) => {
		console.log(JSON.stringify(data, null, 2));

		let form_data = new FormData();
		const { description, cover, coverFile } = inputForm;
		if (coverFile != defaultImage) {
			form_data.append("cover", coverFile, coverFile.name);
		}
		form_data.append("name", data.name);
		form_data.append("description", description);
		dispatch(createDepartment(id, form_data));
	};

	//tour
	const [stepsEnabled, setStepsEnabled] = useState("true");
	const [initialStep, setInitialStep] = useState(0);

	const tourSteps = [
		{
			element: ".create",
			intro: "You can create your departments here.",
		},
		{
			element: ".cards",
			intro: "You'll find your department list here.",
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
			<div className="flex flex-col space-y-4">
				<BannerComponent
					title="Welcome to Departments"
					subtitle="The little houses of your institutions"
				>
					<DialogComponent
						title="Create Department"
						button={
							<Button className="create" variant="contained">
								Create Department
							</Button>
						}
						// action={{ label: 'Create Department', handler: handleCreate }}
					>
						<div className="flex flex-col w-full  space-y-4 mt-4">
							<Card sx={{ maxWidth: "100%" }}>
								<CardMedia
									component="div"
									image={inputForm.cover}
									className="flex justify-end items-center"
									sx={{
										height: "190px",
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
							<form
								onSubmit={handleSubmit(onSubmit)}
								className="flex flex-col space-y-3"
							>
								<TextField
									label="Department Name"
									variant="outlined"
									name="name"
									// value={inputForm.name}
									// onChange={(e) => onChange(e)}
									{...register("name")}
									error={errors.name ? true : false}
								/>
								<Typography
									sx={{ fontSize: "12px", color: "red", fontStyle: "italic" }}
								>
									{errors.name?.message}
								</Typography>

								<TextField
									label="Description"
									variant="outlined"
									name="description"
									multiline
									minRows={4}
									value={inputForm.description}
									onChange={(e) => onChange(e)}
								/>

								<div>
									<Button type="submit" variant="contained">
										Create
									</Button>
								</div>
							</form>
						</div>
					</DialogComponent>
				</BannerComponent>

				<CardHolder tourIdentifier="cards">
					{departments.map((item) => (
						<CardComponent
							link={`/institutions/moderator/department/${item.id}?tab=wall`}
							image={item.image}
							item={item}
						></CardComponent>
					))}
				</CardHolder>
			</div>
		</>
	);
};

export default ModeratorInstitutionDepartmentTab;
