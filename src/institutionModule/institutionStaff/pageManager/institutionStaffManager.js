import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import queryString from "query-string";

import useFetch from "../../../hooks/useFetch";
import ProductDetailComponent from "../../../materialUI/components/reuseableComponents/dashboardComponent";
import DialogComponent from "../../../materialUI/components/reuseableComponents/dialogComponent";
import PageManagerComponent from "../../../materialUI/components/reuseableComponents/pageManagerComponent";

import JoinedInstitutionStaff from "./tabs/staff/joinedInstitutionStaff";
import JoinedInstitutionDepartment from "./tabs/department/joinedInstitutionDepartment";

import { retrieveInstitution } from "../../../store/newInstitutionSlice";

import {
	Avatar,
	Button,
	Card,
	CardMedia,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	PhotoCamera,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
	display: "none",
});

const InstitutionStaffManager = () => {
	const location = useLocation();
	const history = useHistory();
	const { id } = useParams();
	const dispatch = useDispatch();
	const { tab } = queryString.parse(location.search);
	const institutionState = useFetch;

	const tabs = [
		{
			label: "Wall",
			link: `/institution/staff/${id}?tab=wall`,
			value: "wall",
			component: "<Wall />",
		},
		{
			label: "Departments",
			link: `/institution/staff/${id}?tab=department`,
			value: "department",
			component: <JoinedInstitutionDepartment />,
		},

		{
			label: "Staff",
			link: `/institution/staff/${id}?tab=staff`,

			value: "staff",
			component: <JoinedInstitutionStaff />,
		},
		{
			label: "Resources",
			link: `/institution/staff/${id}?tab=resourcess`,
			value: "resources",
			component: "Resources",
		},

		{
			label: "Settings",
			link: `/institution/staff/${id}?tab=settings`,
			value: "settings",
			component: "<ModeratorInstitutionSettings />",
		},
	];

	//tabs
	const [value, setValue] = useState(tab);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	//fetch
	useEffect(() => {
		dispatch(retrieveInstitution(`/institution/change/${id}`));
	}, []);
	const fetchProfile = useSelector(
		(state) => state.institution.currentInstitution
	);
	const status = useSelector((state) => state.institution.status);
	const [institution, setInstitution] = useState({});
	const [defaultImage, setDefaultImage] = useState();

	useEffect(() => {
		if (fetchProfile) {
			setInstitution({ ...fetchProfile, coverFile: fetchProfile.cover });
			setDefaultImage(fetchProfile.cover);
		}
	}, [fetchProfile]);

	return (
		<>
			<div className="flex flex-col space-y-4">
				<ProductDetailComponent
					dialogTitle="Institution Detail"
					isEdit={false}
					productType="Institution"
					setProduct={setInstitution}
					product={institution}
				>
					<div className="flex flex-col space-y-4 ml-4">
						<div className="grid grid-cols-4 gap-4">
							<div className="flex ">
								<p>
									<b>Name:</b>
								</p>
							</div>
							<div className="col-span-3">
								<p>{institution.name}</p>
							</div>
						</div>

						<div className="grid grid-cols-4 gap-4">
							<div className="flex ">
								<p>
									<b>Address:</b>
								</p>
							</div>
							<div className="col-span-3">
								<p>{institution.address}</p>
							</div>
						</div>

						<div className="grid grid-cols-4 gap-4">
							<div className="flex ">
								<p>
									<b>E-mail:</b>
								</p>
							</div>
							<div className="col-span-3">
								<p>{institution.email}</p>
							</div>
						</div>

						<div className="grid grid-cols-4 gap-4">
							<div className="flex ">
								<p>
									<b>Contact:</b>
								</p>
							</div>
							<div className="col-span-3">
								<p>{institution.contact}</p>
							</div>
						</div>
					</div>
				</ProductDetailComponent>

				<PageManagerComponent
					tabs={tabs}
					value={value}
					handleChange={handleChange}
				/>
			</div>
		</>
	);
};

export default InstitutionStaffManager;
