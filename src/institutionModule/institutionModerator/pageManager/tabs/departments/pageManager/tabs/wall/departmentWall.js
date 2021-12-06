import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";

import useFetch from "../../../../../../../../hooks/useFetch";
// import { getDepartments } from '../../../../../../../../store/departmentSlice';
import { newGetArticles } from "../../../../../../../../store/articleSlice";

import DialogComponent from "../../../../../../../../materialUI/components/reuseableComponents/dialogComponent";
import PublicationDetail from "../../../../wall/createSteps/publicationDetail";

import { Button, Chip, Card, CardActionArea } from "@mui/material";
import { CgFileDocument } from "react-icons/cg";

const DepartmentWall = () => {
	const { id } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const articleStates = useFetch;
	const location = useLocation();

	const fetchedArticles = useSelector((state) => state.article.articles);
	const fetchedInstitution = useSelector(
		(state) => state.institution.currentInstitution
	);
	// const fetchedDepartments = useSelector((state) => state.department.currentDepartment);

	// useEffect(() => {
	// 	if (fetchedDepartment) {
	// 		dispatch(newGetArticles(`/post/?search=${fetchedDepartment.name}`));
	// 	}
	// }, [fetchedDepartment]);
	useEffect(() => {
		if (fetchedInstitution) {
			dispatch(newGetArticles(`/post/?search=${fetchedInstitution.name}`));
		}
	}, [fetchedInstitution]);

	// const { items: departments } = departmentStates(fetchedDepartments);
	const { items: articles } = articleStates(fetchedArticles);

	const handleClick = () => {};
	const [publishType, setPublishType] = useState("article");

	const handlePublishType = (event, publishType) => {
		setPublishType(publishType);
	};

	return (
		<>
			<div className="flex w-full justify-end">
				<DialogComponent
					title="Publish"
					button={<Button variant="outlined">Add Publishing</Button>}
				>
					<PublicationDetail />
				</DialogComponent>
			</div>

			<div class="w-full mt-4 bg-red-100">
				<div
					class="p-2 overflow-y-auto flex flex-col space-y-4"
					style={{ maxHeight: "650px", minHeight: "650px" }}
				>
					<div className="flex space-x-4">
						<Chip
							label="Featured"
							color="primary"
							//  onClick={handleClick}
						/>
						<Chip
							label="Recent"
							color="primary"
							// onClick={handleClick}
						/>
						<Chip
							label="Archives"
							color="primary"
							// onClick={handleClick}
						/>
					</div>

					{articles.map((item) => (
						<Card
							item={item}
							sx={{
								maxHeight: 140,
								minHeight: 140,
								border: 1,
								borderColor: "#d4d4d4",
								mb: 1,
								p: 2,
							}}
						>
							<CardActionArea
							// onClick={() => history.push(`/institutions/moderator/article/${item.id}`)}
							>
								<div className="flex justify-between items-center">
									<p className="text-3xl tracking-wider font-semibold">
										{item.title}
									</p>
									<p className="text-xs text-gray-400">{item.date}</p>
								</div>
								<p
									className="text-sm tracking-wider truncate"
									style={{
										maxHeight: "40px",
										minHeight: "40px",
										maxWidth: "1210px",
										minWidth: "1210px",
										padding: 5,
									}}
								>
									{item.abstract}
								</p>
								<div className="mt-2 px-2 flex space-x-5">
									<div className="flex items-center space-x-1">
										<CgFileDocument className="text-gray-500" />
										<p className="text-sm text-gray-500">Created by</p>
										<p className="text-xs text-gray-500">●</p>
										<p className="text-sm text-purple-500">{item.author} </p>
									</div>
								</div>
							</CardActionArea>
						</Card>
					))}
				</div>
			</div>
		</>
	);
};

export default DepartmentWall;
