import { useState, useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";

import {
	addFolder,
	deleteFolder,
	editFolder,
	retrieveFolder,
} from "../../../../../../../../../../store/newFolderSlice";
import useFetch from "../../../../../../../../../../hooks/useFetch";
import DialogComponent from "../../../../../../../../../../materialUI/components/reuseableComponents/dialogComponent";

//mui
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled, alpha } from "@mui/material/styles";

import { TextField, Button, Menu, MenuItem, Typography } from "@mui/material";

//validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const FolderMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const location = useLocation();
	const history = useHistory();

	const { folder } = queryString.parse(location.search);
	const folderState = useFetch;

	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		if (folder) {
			dispatch(retrieveFolder(`/resource/department/folder/change/${folder}`));
		}
	}, [folder]);

	const currentFolderData = useSelector((state) => state.folder.currentFolder);
	const { status } = useSelector((state) => state.folder);
	const [inputForm, setInputForm] = useState({
		name: "",
	});

	const onChange = (e) =>
		setInputForm({ ...inputForm, [e.target.name]: e.target.value });

	useEffect(() => {
		if (currentFolderData) {
			setInputForm({ name: currentFolderData.name });
		}
	}, [currentFolderData]);

	const dispatch = useDispatch();
	const { id } = useParams();
	const handleCreateFolder = () => {
		let formData = new FormData();
		formData.append("name", inputForm.name);
		formData.append("resource", inputForm.name);
		dispatch(addFolder(`/resource/department/folder`));
	};

	const handleEditFolder = () => {
		let formData = new FormData();
		formData.append("name", inputForm.name);
		formData.append("resource", id);
		dispatch(
			editFolder(`/resource/department/folder/change/${folder}`, formData)
		);
	};

	const handleDeleteFolder = () => {
		dispatch(deleteFolder(`/resource/department/folder/change/${folder}`));
	};

	useEffect(() => {
		if (status == "Folder delete success") {
			history.replace("/institution/moderator/department/resources/" + id);
		}
	}, [status]);

	//validation
	const validationMsg = Yup.object().shape({
		name: Yup.string().required("Folder Name is required."),
	});

	const {
		register, // register inputs
		handleSubmit, // handle form submit
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationMsg),
	});

	const onSubmitAddFolder = (data) => {
		console.log(JSON.stringify(data, null, 2));
		let formData = new FormData();
		formData.append("name", data.name);
		formData.append("resource", id);
		dispatch(addFolder(`/resource/department/folder`, formData));
	};

	const onSubmitEditFolder = (data) => {
		console.log(JSON.stringify(data, null, 2));

		let formData = new FormData();
		formData.append("name", inputForm.name);
		formData.append("resource", id);
		dispatch(
			editFolder(`/resource/department/folder/change/${folder}`, formData)
		);
	};

	return (
		<>
			<div>
				<Button
					id="basic-button"
					aria-controls="basic-menu"
					aria-haspopup="true"
					aria-expanded={open ? "true" : undefined}
					onClick={handleClick}
					variant="outlined"
					endIcon={<KeyboardArrowDownIcon />}
				>
					Folder
				</Button>

				<Menu
					id="basic-menu"
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "right",
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						"aria-labelledby": "basic-button",
					}}
				>
					<MenuItem>
						<DialogComponent title="Add Folder" button={"Add Folder"}>
							<form
								onSubmit={handleSubmit(onSubmitAddFolder)}
								className="flex flex-col space-y-3"
							>
								<TextField
									name="name"
									label="Folder Name"
									type="text"
									fullWidth
									variant="outlined"
									sx={{ mt: 1 }}
									{...register("name")}
									error={errors.name ? true : false}
								/>
								<Typography
									sx={{ fontSize: "12px", color: "red", fontStyle: "italic" }}
								>
									{errors.name?.message}
								</Typography>

								<div>
									<Button type="submit" variant="contained">
										Add
									</Button>
								</div>
							</form>
						</DialogComponent>
					</MenuItem>

					<MenuItem>
						<DialogComponent title="Edit Folder" button={"Edit Folder"}>
							<form
								onSubmit={handleSubmit(onSubmitEditFolder)}
								className="flex flex-col space-y-3"
							>
								<TextField
									sx={{ mt: 1 }}
									name="name"
									label="Folder Name"
									type="text"
									fullWidth
									variant="outlined"
									{...register("name")}
									error={errors.name ? true : false}
								/>
								<Typography
									sx={{ fontSize: "12px", color: "red", fontStyle: "italic" }}
								>
									{errors.name?.message}
								</Typography>

								<div>
									<Button type="submit" variant="contained">
										Save Edit
									</Button>
								</div>
							</form>
						</DialogComponent>
					</MenuItem>

					<MenuItem>
						<DialogComponent
							title="Delete Folder"
							button={"Delete Folder"}
							action={{ label: "Proceed Delete", handler: handleDeleteFolder }}
						>
							<h4>
								Are you sure you want to delete this folder and its contents?
							</h4>
						</DialogComponent>
					</MenuItem>
				</Menu>
			</div>
		</>
	);
};

export default FolderMenu;
