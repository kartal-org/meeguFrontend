import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import useFetch from "../../../../../../../../../hooks/useFetch";
import { publishArticle } from "../../../../../../../../../store/articleSlice";
import DialogComponent from "../../../../../../../../../materialUI/components/reuseableComponents/dialogComponent";

import {
	Button,
	TextField,
	InputLabel,
	MenuItem,
	FormControl,
	FormControlLabel,
	Select,
	Checkbox,
	Switch,
} from "@mui/material";

const DepartmentPublicationDetail = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	// useEffect(() => {
	// 	dispatch(getDepartments(`/institution/department/${id}`));
	// }, []);
	const submissionDetail = useSelector(
		(state) => state.submission.currentSubmission
	);
	// const fetchedDepartment = useSelector(
	// 	(state) => state.department.departments
	// );
	const pubState = useFetch;
	// const deptState = useFetch;

	// const { items: departments } = deptState(fetchedDepartment);
	const [inputForm, setInputForm] = useState({
		title: "",
		authors: "",
		abstract: "",
		department: "",
		isFeatured: false,
	});

	useState(() => {
		if (submissionDetail) {
			let authors;
			if (submissionDetail.authorsUploadFile) {
				authors = submissionDetail.authorsUploadFile;
			}
			if (submissionDetail.authorsFile) {
				authors = submissionDetail.authorsFile;
			}
			setInputForm({
				...inputForm,
				title: submissionDetail.title,
				abstract: submissionDetail.description,
				authors: getAuthors(authors),
			});
		}
	}, [submissionDetail]);

	function onChange(e) {
		if (e.target.name === "isFeatured") {
			setInputForm({ ...inputForm, isFeatured: e.target.checked });
		} else {
			setInputForm({ ...inputForm, [e.target.name]: e.target.value });
		}
	}

	function getAuthors(authors) {
		let authorCombine;

		authors.map((val) => {
			authorCombine = authorCombine + `${val.first_name} ${val.last_name}, `;
		});

		return authorCombine;
	}
	const [checked, setChecked] = useState(true);
	const [file, setFile] = useState();
	function handlePublish() {
		console.log(inputForm);
		let formData = new FormData();
		formData.append("title", inputForm.title);
		formData.append("abstract", inputForm.abstract);
		formData.append("department", inputForm.department);
		formData.append("isFeatured", inputForm.isFeatured);
		formData.append("archiveFile", file, file.name);
		// if (submissionDetail.uploadFile) {
		// 	formData.append('file', submissionDetail.uploadFile);
		// }

		dispatch(publishArticle(`/post/`, formData));
		// const file = localStorage.getItem('file');
		// console.log(file.name);
	}

	const handleChange = (event) => {
		setChecked(event.target.checked);
	};

	function onFileChange(e) {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];
		reader.onloadend = () => {
			setFile(file);
			let filename = file.name;
			console.log(file);
			filename.replace(".pdf", "");
			console.log(filename);
			setInputForm({ ...inputForm, title: filename });
		};
		reader.readAsDataURL(file);
	}

	return (
		<>
			<div className="flex  w-full justify-center items-center">
				<div className="flex flex-col w-4/5 space-y-4 ">
					<FormControlLabel
						control={
							<Switch
								checked={checked}
								onChange={handleChange}
								inputProps={{ "aria-label": "controlled" }}
							/>
						}
						label={checked ? "Upload File" : "Select From Submission"}
					/>
					{checked ? (
						<input
							accept="application/pdf"
							onChange={onFileChange}
							name="file"
							id="icon-button-file"
							type="file"
						/>
					) : (
						<div className="flex items-start justify-start">
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">
									Select From Accepted Submissions
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									// value={article}
									label="Select From Accepted Submissions"
									// onChange={handleSelectArticle}
								>
									{/* {submissions.map((val) => {
										if (val.responseStatus === 'accepted') {
											return <MenuItem value={val.id}>{val.title}</MenuItem>;
										}
									})} */}
								</Select>
							</FormControl>
							{/* <DialogComponent
								button={<Button>Select Submission</Button>}
								title='Select Submission To Publish'
							>
								Hello
							</DialogComponent> */}
						</div>
					)}

					<TextField
						fullWidth
						label="Article Title"
						variant="outlined"
						value={inputForm.title}
						name="title"
						onChange={onChange}
					/>
					<TextField
						fullWidth
						label="Author(s)"
						variant="outlined"
						value={inputForm.authors}
						name="authors"
						InputProps={{
							readOnly: true,
						}}
						onChange={onChange}
					/>
					<TextField
						fullWidth
						label="Abstract"
						variant="outlined"
						value={inputForm.abstract}
						multiline
						minRows={6}
						name="abstract"
						onChange={onChange}
					/>
					<FormControlLabel
						control={<Checkbox />}
						value={inputForm.isFeatured}
						onChange={onChange}
						name="isFeatured"
						label="Do you want this article be Featured?"
					/>
					<div className="flex  w-full">
						<Button onClick={handlePublish} variant="contained">
							Publish Article
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default DepartmentPublicationDetail;
