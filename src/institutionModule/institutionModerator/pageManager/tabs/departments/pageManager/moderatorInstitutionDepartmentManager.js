import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Avatar, Button, Card, CardMedia, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useFetch from "../../../../../../hooks/useFetch";
import ProductDetailComponent from "../../../../../../materialUI/components/reuseableComponents/dashboardComponentCopy";
import DialogComponent from "../../../../../../materialUI/components/reuseableComponents/dialogComponent";
import PageManagerComponent from "../../../../../../materialUI/components/reuseableComponents/pageManagerComponent";
import {
	deleteDepartment,
	editDepartment,
	retrieveDepartment,
} from "../../../../../../store/departmentSlice";
import { styled } from "@mui/material/styles";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router";
import DepartmentSubmissions from "./tabs/submissions/departmentSubmissions";
import DepartmentStaff from "./tabs/staff/departmentStaff";
import DepartmentResources from "./tabs/resources/departmentResources";
import DepartmentArticles from "./tabs/articles/departmentArticles";
import DepartmentWall from "./tabs/wall/departmentWall";

const Input = styled("input")({
	display: "none",
});
const ModeratorInstitutionDepartmentManager = () => {
	const { id } = useParams();
	const location = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const departmentretrieveState = useFetch;
	const { tab } = queryString.parse(location.search);
	const [defaultImage, setDefaultImage] = useState();

	useEffect(() => {
		dispatch(retrieveDepartment(id));
	}, []);
	const fetchedDepartment = useSelector(
		(state) => state.department.currentDepartment
	);

	const { items: department, setItems: setDepartment } =
		departmentretrieveState(fetchedDepartment);

	useEffect(() => {
		if (fetchedDepartment) {
			setDepartment({
				...fetchedDepartment,
				imageFile: fetchedDepartment.image,
			});
			setDefaultImage(fetchedDepartment.image);
		}
	}, [fetchedDepartment]);

	const [value, setValue] = useState(tab);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const onChange = (e) => {
		e.preventDefault();
		if (e.target.name == "cover") {
			let reader = new FileReader();
			let file = e.target.files[0];

			reader.onloadend = () => {
				setDepartment({
					...department,
					imageFile: file,
					image: reader.result,
				});
			};
			reader.readAsDataURL(file);
		} else {
			setDepartment({ ...department, [e.target.name]: e.target.value });
		}
	};
	const handleDelete = () => {
		dispatch(deleteDepartment(id));
		// history.replace(`/institutions/moderator/${department.institution}?tab=department`);
	};
	const handleEdit = () => {
		let form_data = new FormData();
		const { name, description, image, imageFile } = department;

		if (imageFile != defaultImage) {
			form_data.append("image", imageFile, imageFile.name);
		}
		form_data.append("name", name);
		form_data.append("description", description);
		dispatch(editDepartment(id, form_data));
	};

	const tabs = [
		{
			label: "Wall",
			link: `/institutions/moderator/department/${id}?tab=wall`,
			value: "wall",
			component: <DepartmentWall />,
		},
		{
			label: "Articles",
			link: `/institutions/moderator/department/${id}?tab=articles`,
			value: "articles",
			component: <DepartmentArticles />,
		},
		{
			label: "Submissions",
			link: `/institutions/moderator/department/${id}?tab=submissions`,
			value: "submissions",
			component: <DepartmentSubmissions />,
		},
		{
			label: "Staff",
			link: `/institutions/moderator/department/${id}?tab=staff`,
			value: "staff",
			component: <DepartmentStaff />,
		},
		{
			label: "Resources",
			link: `/institutions/moderator/department/${id}?tab=resourcess`,
			value: "resources",
			component: <DepartmentResources />,
		},
		// {
		// 	label: 'Publishing',
		// 	link: `/institutions/moderator/department/${id}?tab=publishing`,
		// 	value: 'publishing',
		// 	component: <div>File not found</div>,
		// },
		{
			label: "Settings",
			link: `/institutions/moderator/department/${id}?tab=settings`,
			value: "settings",
			component: <div>Settings Here</div>,
		},
	];

	return (
		<>
			<ProductDetailComponent cover={department.image} product={department}>
				<div className="grid grid-cols-2 w-full gap-2 ">
					<div className="flex flex-col space-y-4 ">
						<h5 className="text-2xl font-bold text-gray-700">
							{department.name}
						</h5>
						<div className="mt-1 flex flex-row items-center">
							<Avatar
								alt="Remy Sharp"
								src="https://images.unsplash.com/photo-1579783483458-83d02161294e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
							/>
							<p className="text-sm text-gray-600 ml-2">{department.owner} </p>
						</div>
						<p>{department.description}</p>
					</div>
					<div className="flex flex-col justify-between items-end space-y-4">
						<div className="flex justify-between"></div>
						<div className="flex justify-between space-x-2 ">
							<DialogComponent
								title="department Package Info"
								button={
									<Button variant="contained">Edit department Info</Button>
								}
							>
								<div className="flex flex-col space-y-4 ">
									<Card sx={{ maxWidth: "100%" }}>
										<CardMedia
											component="div"
											image={department.image}
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
										label="Department Name"
										variant="outlined"
										name="name"
										value={department.name}
										onChange={(e) => onChange(e)}
									/>

									<TextField
										label="Description"
										variant="outlined"
										name="description"
										value={department.description}
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
							</DialogComponent>
						</div>
					</div>
				</div>
			</ProductDetailComponent>
			<PageManagerComponent
				tabs={tabs}
				value={value}
				handleChange={handleChange}
			/>
		</>
	);
};

export default ModeratorInstitutionDepartmentManager;
