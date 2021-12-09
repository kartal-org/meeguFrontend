import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useFetch from "../../../../../../../../hooks/useFetch";
import {
	addResource,
	getResources,
} from "../../../../../../../../store/newResourceSlice";

import BannerComponent from "../../../../../../../../materialUI/components/reuseableComponents/bannerComponent";
import DialogComponent from "../../../../../../../../materialUI/components/reuseableComponents/dialogComponent";
import CardHolder from "../../../../../../../../materialUI/components/reuseableComponents/cardHolder";
import CardComponent from "../../../../../../../../materialUI/components/reuseableComponents/cardComponent";
//mui
import { Button, TextField, Typography } from "@mui/material";

//validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const DepartmentResources = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const resourcesStates = useFetch;
	const fetchDepartment = useFetch;

	useEffect(() => {
		dispatch(getResources(`/resource/institution/department?search=${id}`));
	}, []);
	const fetchedResources = useSelector((state) => state.newResource.resources);
	// const { items: resources, setItems: setResources } = fetchDepartment(fetchedResources);
	const { items: resources } = resourcesStates(fetchedResources);
	// use resources variable to map

	const [inputForm, setInputForm] = useState({
		name: "",
		description: "",
	});
	const onChange = (e) => {
		setInputForm({ ...inputForm, [e.target.name]: e.target.value });
	};

	//validation
	const validationMsg = Yup.object().shape({
		name: Yup.string().required("Resource Name is required."),
	});

	const {
		register, // register inputs
		handleSubmit, // handle form submit
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationMsg),
	});

	const handleCreateResource = (data) => {
		console.log(JSON.stringify(data, null, 2));
		// const { description } = inputForm;
		// dispatch(addResource(`resource/department/${id}`, data.name, description));

		const { description } = inputForm;
		let formData = new FormData();
		formData.append("name", data.name);
		formData.append("description", description);
		formData.append("department", id);
		// dispatch(addResource(`/resource​/institution​/department`, formData));
		dispatch(addResource(`/resource/institution/department`, formData));
	};

	return (
		<>
			<div class="flex flex-col w-full space-y-4">
				<BannerComponent
					title=" Hello  !"
					subtitle="Here is where you can set up something to help your students."
				>
					<DialogComponent
						button={
							<Button className="create" variant="contained">
								Create Resource Package
							</Button>
						}
						title="Create Resource Package"
						context="Guide your students to grow."
					>
						<form
							onSubmit={handleSubmit(handleCreateResource)}
							className="flex flex-col space-y-4"
						>
							<div className="flex flex-col space-y-4 mt-4">
								<TextField
									fullWidth
									id="outlined-search"
									label="Resource Name"
									variant="outlined"
									name="name"
									{...register("name")}
									error={errors.name ? true : false}
								/>
								<Typography
									sx={{ fontSize: "12px", color: "red", fontStyle: "italic" }}
								>
									{errors.name?.message}
								</Typography>

								<TextField
									fullWidth
									id="outlined-search"
									label="Description"
									variant="outlined"
									name="description"
									value={inputForm.description}
									onChange={(e) => onChange(e)}
									multiline
									minRows={4}
								/>
							</div>
							<div>
								<Button type="submit" variant="contained">
									Create Package
								</Button>
							</div>
						</form>
					</DialogComponent>
				</BannerComponent>

				<CardHolder tourIdentifier="cards">
					{resources.length > 0
						? resources.map((item) => (
								<CardComponent
									link={`/institution/moderator/department/resources/${item.id}`}
									image={item.cover}
									item={item}
								/>
						  ))
						: "No resources created yet"}
				</CardHolder>
			</div>
		</>
	);
};

export default DepartmentResources;
