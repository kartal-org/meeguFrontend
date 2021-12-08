import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useFetch from "../../hooks/useFetch";

import BannerComponent from "../../materialUI/components/reuseableComponents/bannerComponent";
import DialogComponent from "../../materialUI/components/reuseableComponents/dialogComponent";
import CardHolder from "../../materialUI/components/reuseableComponents/cardHolder";
import CardComponent from "../../materialUI/components/reuseableComponents/cardComponent";

import { getInstitutions } from "../../store/newInstitutionSlice";

//mui
import { Button, TextField, Typography } from "@mui/material";

//Tour
import { Steps } from "intro.js-react";

//validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const InstitutionStaff = () => {
	const dispatch = useDispatch(); //gamiton para mu call to dispatch action reducer
	const institutionState = useFetch; //mu create ug instance sa useFetch

	const fetchedInstitutions = useSelector(
		(state) => state.institution.institutions
	);
	const { items: institutions, setItems: setInstitutions } =
		institutionState(fetchedInstitutions);

	useState(() => {
		dispatch(getInstitutions("/institution/staff"));
	}, []);

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
		// dispatch(joinClassroom(data.code));
	};

	//tour
	const [stepsEnabled, setStepsEnabled] = useState("true");
	const [initialStep, setInitialStep] = useState(0);

	const tourSteps = [
		{
			element: ".join",
			intro: "Join specific institution pages to your liking.",
		},
		{
			element: ".cards",
			intro: "Visit the institution here.",
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

			<div className="flex flex-col w-full space-y-4">
				<BannerComponent
					title=" Hello dear, Staff !"
					subtitle="Keep yourself updated with your instituion:"
				>
					<DialogComponent
						title="Join Institution"
						button={
							<Button className="join" variant="contained">
								Join Institution
							</Button>
						}
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
									Join
								</Button>
							</div>
						</form>
					</DialogComponent>
				</BannerComponent>

				<CardHolder tourIdentifier="cards">
					{institutions && institutions.length > 0 ? (
						<>
							{institutions.map((item) => (
								<CardComponent
									key={item.id}
									item={item}
									image={item.cover}
									link={`/institution/staff/${item.id}?tab=wall`}
								></CardComponent>
							))}
						</>
					) : (
						<div>You are not currently assigned to any institution.</div>
					)}
				</CardHolder>
			</div>
		</>
	);
};

export default InstitutionStaff;
