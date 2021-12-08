import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import queryString from "query-string";

import useFetch from "../../../../../../hooks/useFetch";
import ProductDetailComponent from "../../../../../../materialUI/components/reuseableComponents/dashboardComponent";
import DialogComponent from "../../../../../../materialUI/components/reuseableComponents/dialogComponent";
import PageManagerComponent from "../../../../../../materialUI/components/reuseableComponents/pageManagerComponent";

import { getCurrentWorkspace } from "../../../../../../store/workspaceSlice";

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

const AdviserWorkspaceManager = () => {
	const location = useLocation();
	const history = useHistory();
	const { id } = useParams();
	const dispatch = useDispatch();
	const { tab } = queryString.parse(location.search);
	const workspaceState = useFetch;

	//tabs
	const [value, setValue] = useState(tab);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const tabs = [
		{
			label: "Members",
			link: `/classroom/adviser/workspace/${id}?tab=members`,

			value: "members",
			component: "<JoinedInstitutionStaff />",
		},
		{
			label: "Resources",
			link: `/classroom/adviser/workspace/${id}?tab=resourcess`,
			value: "resources",
			component: "Resources",
		},

		{
			label: "Settings",
			link: `/classroom/adviser/workspace/${id}?tab=settings`,
			value: "settings",
			component: "<ModeratorInstitutionSettings />",
		},
	];

	//fetch
	useEffect(() => {
		dispatch(getCurrentWorkspace(id));
	}, []);
	const fetchProfile = useSelector((state) => state.works.currentWorkspace);
	const status = useSelector((state) => state.works.status);
	const [workspace, setWorkspace] = useState({});
	const [defaultImage, setDefaultImage] = useState();

	useEffect(() => {
		if (fetchProfile) {
			setWorkspace({ ...fetchProfile, coverFile: fetchProfile.cover });
			setDefaultImage(fetchProfile.cover);
		}
	}, [fetchProfile]);

	return (
		<>
			<div className="flex flex-col space-y-4">
				<ProductDetailComponent
					dialogTitle="Workspace Detail"
					isEdit={false}
					productType="Workspace"
					setProduct={setWorkspace}
					product={workspace}
				>
					<div className="flex flex-col space-y-4 ml-4">
						<div className="grid grid-cols-4 gap-4">
							<div className="flex ">
								<p>
									<b>Name:</b>
								</p>
							</div>
							<div className="col-span-3">
								<p>{workspace.name}</p>
							</div>
						</div>

						<div className="grid grid-cols-4 gap-4">
							<div className="flex ">
								<p>
									<b>Classroom:</b>
								</p>
							</div>
							<div className="col-span-3">
								<p>{workspace.classroom}</p>
							</div>
						</div>

						<div className="grid grid-cols-4 gap-4">
							<div className="flex ">
								<p>
									<b>Description:</b>
								</p>
							</div>
							<div className="col-span-3">
								<p>{workspace.description}</p>
							</div>
						</div>
					</div>
				</ProductDetailComponent>
				{/* <PageManagerComponent
					tabs={tabs}
					value={value}
					handleChange={handleChange}
				/> */}
			</div>
		</>
	);
};

export default AdviserWorkspaceManager;
