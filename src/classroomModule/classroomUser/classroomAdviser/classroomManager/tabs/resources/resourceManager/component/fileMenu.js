import { useState } from "react";
import queryString from "query-string";
import { useParams, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import DialogComponent from "../../../../../../../../materialUI/components/reuseableComponents/dialogComponent";
import { addFile, getfiles } from "../../../../../../../../store/newFileSlice";
import useFetch from "../../../../../../../../hooks/useFetch";

//mui
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { TextField, Button, Menu, MenuItem, Typography } from "@mui/material";

//validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const Input = styled("input")({
	display: "flex",
});

const FileMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [inputForm, setInputForm] = useState({
		name: "",
		file: null,
	});
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const onChange = (e) => {
		e.preventDefault();
		if (e.target.name == "file") {
			setInputForm({ ...inputForm, file: e.target.files[0] });
		} else {
			setInputForm({ ...inputForm, [e.target.name]: e.target.value });
		}
	};

	const location = useLocation();
	const { folder } = queryString.parse(location.search);

	const dispatch = useDispatch();

	const handleCreateFile = () => {
		dispatch(addFile(`/resource/classroom/file/${folder}`, inputForm.name));
	};
	const handleUploadFile = () => {};

	//validation
	const validationMsg = Yup.object().shape({
		name: Yup.string().required("File Name is required."),
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
	};

	return (
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
				File
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
					{/* <label htmlFor='icon-button-file'>
						<Input accept='application/pdf' id='icon-button-file' type='file' />
						Upload File
					</label> */}
					<DialogComponent
						title="Upload File"
						button={"Upload File"}
						action={{ label: "Upload", handler: handleUploadFile }}
					>
						<input
							accept="application/pdf"
							onChange={onChange}
							name="file"
							id="icon-button-file"
							type="file"
						/>
					</DialogComponent>
				</MenuItem>
				<MenuItem>
					<DialogComponent
						title="Create File"
						button={"Create File"}
						// action={{ label: "Create", handler: handleCreateFile }}
					>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="flex flex-col space-y-3"
						>
							<TextField
								// value={inputForm.name}
								// onChange={(e) => onChange(e)}
								sx={{ mt: 1 }}
								name="name"
								label="File Name"
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
									Create
								</Button>
							</div>
						</form>
					</DialogComponent>
				</MenuItem>
			</Menu>
		</div>
	);
};

export default FileMenu;
