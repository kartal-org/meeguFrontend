import { Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFetch from "../../../hooks/useFetch";

import BannerComponent from "../../../materialUI/components/reuseableComponents/bannerComponent";
import CardComponent from "../../../materialUI/components/reuseableComponents/cardComponent";
import CardHolder from "../../../materialUI/components/reuseableComponents/cardHolder";
import DialogComponent from "../../../materialUI/components/reuseableComponents/dialogComponent";
import {
	getClassrooms,
	getStudentClassroom,
	joinClassroom,
} from "../../../store/newClassroomSlice";

//Tour
import { Steps } from "intro.js-react";

//validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const ClassroomResearcher = () => {
	const dispatch = useDispatch();
	const classroomState = useFetch;
	const [code, setCode] = useState("");
	const onChange = (e) => {
		setCode(e.target.value);
	};
	useEffect(() => {
		dispatch(getClassrooms(`/classroom/?search=student`));
	}, []);
	const fetchedClassrooms = useSelector((state) => state.newClass.classes);
	const { user } = useSelector((state) => state.auth);
	const { items: classrooms, setItems: setClassrooms } =
		classroomState(fetchedClassrooms);
	// const [classrooms, setClassrooms] = useState([]);
	// const handleSubmit = () => {
	// 	dispatch(joinClassroom(code));
	// };
	// const handleSubmitCode = () => {
	// 	dispatch(joinClassroom(code));
	// };

	//validation
	const validationMsg = Yup.object().shape({
		code: Yup.string()
			.required("Code is required.")
			.min(8, "Must be exactly 8 characters")
			.max(8, "Must be exactly 8 characters"),
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
		let formData = new FormData();
		formData.append("classroom", data.code);
		formData.append("user", user.id);
		dispatch(joinClassroom("/classroom/member/create/", formData));
	};

	//tour
	const [stepsEnabled, setStepsEnabled] = useState("true");
	const [initialStep, setInitialStep] = useState(0);

	const tourSteps = [
		{
			element: ".join",
			intro: "Join classrooms here.",
		},
		{
			element: ".cards",
			intro: "Visit the classrooms here.",
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

			<div class="flex flex-col w-full p-4 space-y-4">
				<BannerComponent
					title=" Hello there, Researcher !"
					subtitle="Check what is happening in your classrooms:"
				>
					<DialogComponent
						title="Join Classroom"
						button={
							<Button className="join" variant="contained">
								Join Classroom
							</Button>
						}
						// action={{ label: "Join", handler: handleSubmitCode }}
						// action={{ label: "Join" }}
					>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="flex flex-col space-y-4"
						>
							<div className="mt-4">
								<TextField
									fullWidth
									id="outlined-search"
									label="Code"
									variant="outlined"
									name="code"
									// value={code}
									// onChange={(e) => onChange(e)}
									{...register("code")}
									error={errors.code ? true : false}
								/>
								<Typography
									sx={{ fontSize: "12px", color: "red", fontStyle: "italic" }}
								>
									{errors.code?.message}
								</Typography>
							</div>

							<div>
								<Button type="submit" variant="contained">
									Join Classroom
								</Button>
							</div>
						</form>
					</DialogComponent>
				</BannerComponent>

				<CardHolder tourIdentifier="cards">
					{classrooms && classrooms.length > 0 ? (
						<>
							{classrooms.map((item) => (
								<CardComponent
									key={item.id}
									item={item}
									image={item.cover}
									link={`/classroom/researcher/${item.id}?tab=dashboard`}
								></CardComponent>
							))}
						</>
					) : (
						<div>You haven't joined a classroom yet.</div>
					)}
				</CardHolder>
			</div>
		</>
	);
};

export default ClassroomResearcher;
