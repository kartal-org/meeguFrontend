import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import queryString from "query-string";

import useFetch from "../../../../../hooks/useFetch";
import ProductDetailComponent from "../../../../../materialUI/components/reuseableComponents/dashboardComponent";
import DialogComponent from "../../../../../materialUI/components/reuseableComponents/dialogComponent";
import PageManagerComponent from "../../../../../materialUI/components/reuseableComponents/pageManagerComponent";
import { retrieveDepartment } from "../../../../../store/departmentSlice";

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

const JoinedDepartmentTabManager = () => {
	const location = useLocation();
	const history = useHistory();
	const { id } = useParams();
	const dispatch = useDispatch();
	const { tab } = queryString.parse(location.search);
	const departmentState = useFetch;

	//tabs
	const [value, setValue] = useState(tab);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	//fetch
	useEffect(() => {
		dispatch(retrieveDepartment(id));
	}, []);
	const fetchProfile = useSelector(
		(state) => state.department.currentDepartment
	);
	const status = useSelector((state) => state.department.status);
	const [department, setDepartment] = useState({});
	const [defaultImage, setDefaultImage] = useState();

	useEffect(() => {
		if (fetchProfile) {
			setDepartment({ ...fetchProfile, coverFile: fetchProfile.cover });
			setDefaultImage(fetchProfile.cover);
		}
	}, [fetchProfile]);

	const tabs = [
		{
			label: "Wall",
			link: `/institution/staff/department/${id}?tab=wall`,
			value: "wall",
			component: "<Wall />",
		},
		{
			label: "Articles",
			link: `/institution/staff/department/${id}?tab=articles`,
			value: "articles",
			component: "articles",
		},

		{
			label: "Staff",
			link: `/institution/staff/department/${id}?tab=staff`,

			value: "staff",
			component: "staff",
		},
		{
			label: "Resources",
			link: `/institution/staff/department/${id}?tab=resourcess`,
			value: "resources",
			component: "Resources",
		},
	];

	return (
		<>
			<div className="flex flex-col space-y-4">
				<ProductDetailComponent
					dialogTitle="Department Detail"
					isEdit={false}
					productType="Department"
					setProduct={setDepartment}
					product={department}
					image={department.image}
				>
					<div className="flex flex-col space-y-4 ml-4">
						<div className="grid grid-cols-4 gap-4">
							<div className="flex ">
								<p>
									<b>Name:</b>
								</p>
							</div>
							<div className="col-span-3">
								<p>{department.name}</p>
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

export default JoinedDepartmentTabManager;
