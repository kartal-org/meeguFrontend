import { Avatar, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import useFetch from "../../../../../../../hooks/useFetch";
import ProductDetailComponent from "../../../../../../../materialUI/components/reuseableComponents/dashboardComponentCopy";
import DialogComponent from "../../../../../../../materialUI/components/reuseableComponents/dialogComponent";
import { retrieveResource } from "../../../../../../../store/newResourceSlice";
import AdviserResourceContent from "../../../../../classroomAdviser/classroomManager/tabs/resources/resourceManager/component/adviserResourceContent";
import FileMenu from "../../../../../classroomAdviser/classroomManager/tabs/resources/resourceManager/component/fileMenu";
import FolderMenu from "../../../../../classroomAdviser/classroomManager/tabs/resources/resourceManager/component/folderMenu";
import ResearcherResourceContent from "./component/researcherResourceContent";

import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

const ResearcherResourceManager = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const useResource = useFetch;

	useEffect(() => {
		dispatch(retrieveResource(`resource/classroom/change/${id}`));
	}, []);
	const fetchedResource = useSelector(
		(state) => state.newResource.currentResource
	);
	const { items: resource, setItems: setResource } =
		useResource(fetchedResource);
	const EditDialog = () => {
		return <div className="flex flex-col space-y-4 ">Hi</div>;
	};

	//select default
	const [workspace, setWorkspace] = useState("");

	const handleChange = (event) => {
		setWorkspace(event.target.value);
	};
	return (
		<>
			<div className="flex flex-col space-y-4">
				<ProductDetailComponent product={resource}>
					<div className="grid grid-cols-2 w-full gap-2 ">
						<div className="flex flex-col space-y-4 ">
							<h5 className="text-2xl font-bold text-gray-700">
								{resource.name}
							</h5>
							<div className="mt-1 flex flex-row items-center">
								<Avatar
									alt="Remy Sharp"
									src="https://images.unsplash.com/photo-1579783483458-83d02161294e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
								/>
								<p className="text-sm text-gray-600 ml-2">{resource.owner} </p>
							</div>
							<p>{resource.description}</p>
						</div>
						<div className="flex flex-col justify-between items-end space-y-4">
							<div className="flex justify-between"></div>
							<div className="flex justify-between space-x-2 ">
								<DialogComponent
									title="Resource Package Info"
									button={<Button>Resource Info</Button>}
								>
									Hi
								</DialogComponent>
								<DialogComponent
									title="Select Workspace"
									button={
										<Button variant="contained">Use This Resource</Button>
									}
								>
									<div className="mt-3">
										<FormControl fullWidth>
											<InputLabel id="demo-simple-select-label">
												Select workspace
											</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												label="Select workspace"
												value={workspace}
												onChange={handleChange}
											>
												<MenuItem value={10}>1</MenuItem>
												<MenuItem value={20}>2</MenuItem>
												<MenuItem value={30}>3</MenuItem>
											</Select>
										</FormControl>
									</div>
								</DialogComponent>
							</div>
						</div>
					</div>
				</ProductDetailComponent>

				<ResearcherResourceContent />
			</div>
		</>
	);
};

export default ResearcherResourceManager;
