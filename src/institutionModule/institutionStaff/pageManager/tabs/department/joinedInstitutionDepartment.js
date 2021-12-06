import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import useFetch from "../../../../../hooks/useFetch";
import CardHolder from "../../../../../materialUI/components/reuseableComponents/cardHolder";
import CardComponent from "../../../../../materialUI/components/reuseableComponents/cardComponent";
import { getDepartments } from "../../../../../store/departmentSlice";

import {
	Button,
	Card,
	CardMedia,
	TextField,
	Typography,
	PhotoCamera,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const JoinedInstitutionDepartment = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const departmentState = useFetch;
	useEffect(() => {
		dispatch(getDepartments(`/institution/department/${id}`));
	}, []);
	const fetchedDepartments = useSelector(
		(state) => state.department.departments
	);
	const { items: departments, setItems: setDepartments } =
		departmentState(fetchedDepartments);

	const defaultImage =
		"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

	return (
		<>
			<CardHolder>
				{departments.map((item) => (
					<CardComponent
						// link={`/institutions/staff/department/${item.id}?tab=wall`}
						link={`/institution/staff/department/${item.id}`}
						image={item.image}
						item={item}
					></CardComponent>
				))}
			</CardHolder>
		</>
	);
};

export default JoinedInstitutionDepartment;
