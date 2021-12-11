import { useState, useEffect } from "react";
import { Link, Switch, useLocation } from "react-router-dom";
import { useParams, Route, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";

import {
	Button,
	Card,
	CardMedia,
	FormControl,
	InputLabel,
	Input,
	TextField,
	Select,
	MenuItem,
	Avatar,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";

import useFetch from "../../../../../../../../../hooks/useFetch";
import ProductDetailComponent from "../../../../../../../../../materialUI/components/reuseableComponents/dashboardComponentCopy";
import DialogComponent from "../../../../../../../../../materialUI/components/reuseableComponents/dialogComponent";
import FolderMenu from "./components/folderMenu";
import FileMenu from "./components/fileMenu";
import DepartmentResourceContent from "./components/departmentResourceContent";

import {
	deleteResource,
	editResource,
	retrieveResource,
} from "../../../../../../../../../store/newResourceSlice";

// const Input = styled("input")({
// 	display: "none",
// });

const DepartmentResourceManager = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const history = useHistory();
	const useResource = useFetch;

	useEffect(() => {
		dispatch(retrieveResource(`/resource/department/change/${id}`));
		// alert(id);
	}, []);
	const fetchedResource = useSelector(
		(state) => state.newResource.currentResource
	);
	const { status } = useSelector((state) => state.newResource);

	const { items: resource, setItems: setResource } =
		useResource(fetchedResource);
	useEffect(() => {
		if (fetchedResource) {
			setResource({ ...fetchedResource, coverFile: fetchedResource.cover });
		}
	}, [fetchedResource]);

	const onChange = (e) => {
		e.preventDefault();
		if (e.target.name == "cover") {
			let reader = new FileReader();
			let file = e.target.files[0];

			reader.onloadend = () => {
				setResource({
					...resource,
					coverFile: file,
					cover: reader.result,
				});
			};
			reader.readAsDataURL(file);
		} else {
			setResource({ ...resource, [e.target.name]: e.target.value });
		}
	};

	const handleEdit = () => {
		let form_data = new FormData();
		const { name, description, cover, coverFile, status } = resource;
		if (coverFile != cover) {
			form_data.append("cover", coverFile, coverFile.name);
		}
		form_data.append("name", name);
		form_data.append("description", description);
		form_data.append("status", status);
		dispatch(editResource(`/resource/department/change/${id}`, form_data));
	};

	const handleDelete = () => {
		dispatch(deleteResource(`/resource/department/change/${id}`));
	};

	useEffect(() => {
		if (status == "Resources Delete success") {
			history.goBack();
		}
	}, [status]);

	const EditDialog = () => {
		return (
			<div className="flex flex-col space-y-4 ">
				<Card sx={{ maxWidth: "100%" }}>
					<CardMedia
						component="div"
						image={resource.cover}
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
					label="Resource Name"
					variant="outlined"
					name="name"
					value={resource.name}
					onChange={(e) => onChange(e)}
				/>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Status</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={resource.status}
						label="Status"
						name="status"
						onChange={(e) => onChange(e)}
					>
						<MenuItem value={"draft"}>Draft</MenuItem>
						<MenuItem value={"publish"}>Publish</MenuItem>
					</Select>
				</FormControl>
				<TextField
					label="Description"
					variant="outlined"
					name="description"
					value={resource.description}
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
		);
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
								<p className="text-sm text-gray-600 ml-2">{resource.owner}</p>
							</div>
							{/* <p>{resource.description}</p> */}
						</div>

						<div className="flex flex-col justify-between items-end space-y-4">
							<div className="flex justify-between"></div>
							<div className="flex justify-between space-x-2">
								<DialogComponent
									title="Edit Resource Info"
									button={<Button variant="contained">Edit Resource</Button>}
								>
									<EditDialog />
								</DialogComponent>
								<FolderMenu />
								<FileMenu />
							</div>
						</div>
					</div>
				</ProductDetailComponent>

				<DepartmentResourceContent />
			</div>
		</>
	);
};

export default DepartmentResourceManager;
