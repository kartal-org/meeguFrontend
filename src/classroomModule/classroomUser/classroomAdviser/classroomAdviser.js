import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BannerComponent from "../../../materialUI/components/reuseableComponents/bannerComponent";
import DialogStepperComponent from "../../../materialUI/components/reuseableComponents/dialogStepperComponent";
import CardHolder from "../../../materialUI/components/reuseableComponents/cardHolder";
import CardComponent from "../../../materialUI/components/reuseableComponents/cardComponent";
import useFetch from "../../../hooks/useFetch";
import ClassroomDetail from "./createSteps/classroomDetail";
import ClassroomAffliate from "./createSteps/classroomAffliate";
import ClassroomSubscriptionPlan from "./createSteps/classroomSubscriptionPlan";
import {
	getAdviserClassroom,
	getClassrooms,
} from "../../../store/newClassroomSlice";
//Tour
import { Steps } from "intro.js-react";

const ClassroomAdviser = () => {
	const dispatch = useDispatch();
	// api call
	useEffect(() => {
		dispatch(getClassrooms(`/classroom/?search=adviser`));
	}, []);
	// get from redux
	const { classes } = useSelector((state) => state.newClass);
	// const [classrooms, setClassrooms] = useState([]);
	// useEffect(() => {
	// 	setClassrooms(classes);
	// }, [classes]);
	// console.log(classrooms);

	const { items: classrooms, setItems: setClassrooms } = useFetch(classes);

	// stepper

	const steps = [
		{
			label: "Classroom Details",
			component: <ClassroomDetail />,
		},
		{
			label: "Classroom Affliate",
			component: <ClassroomAffliate />,
		},
		// {
		// 	label: 'Choose a Subscription Plan',
		// 	component: <ClassroomSubscriptionPlan />,
		// },
	];

	//tour
	const [stepsEnabled, setStepsEnabled] = useState("true");
	const [initialStep, setInitialStep] = useState(0);

	const tourSteps = [
		{
			element: ".create",
			intro: "You can create a new classroom here.",
		},
		{
			element: ".cards",
			intro: "Manage your classroom here.",
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
					title=" Hello dear, Adviser !"
					subtitle="Here is what’s happening with your projects today:"
				>
					<DialogStepperComponent
						maxWidth="lg"
						button="Create Classroom"
						title="Create Classroom"
						steps={steps}
						tourIdentifier="create"
					></DialogStepperComponent>
				</BannerComponent>
				<CardHolder tourIdentifier="cards">
					{classrooms && classrooms.length > 0 ? (
						<>
							{classrooms.map((item) => (
								<CardComponent
									key={item.id}
									item={item}
									image={item.cover}
									link={`/classroom/adviser/${item.id}?tab=dashboard`}
								></CardComponent>
							))}
						</>
					) : (
						<div>You don't have a classroom yet.</div>
					)}
				</CardHolder>
			</div>
		</>
	);
};

export default ClassroomAdviser;
