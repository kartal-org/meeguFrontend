import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import Accordion from "@mui/material/Accordion";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
import useFetch from "../../hooks/useFetch";
import { getArticles } from "../../store/articleSlice";
import {
	getInstitutions,
	searchInstitution,
} from "../../store/newInstitutionSlice";
import { searchPeople } from "../../store/authSlice";

//mui
import {
	Typography,
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CardActions,
	Avatar,
	IconButton,
	Button,
	Rating,
	Divider,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import SchoolIcon from "@mui/icons-material/School";
import { styled } from "@mui/material/styles";

import { BsPeopleFill } from "react-icons/bs";
import { MdArticle } from "react-icons/md";

const SearchAll = () => {
	const [expanded, setExpanded] = useState("panel1");

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	const dispatch = useDispatch();
	const articleState = useFetch;
	const institutionState = useFetch;
	const peopleState = useFetch;

	const { key } = useParams();

	useEffect(() => {
		// alert(key);
		dispatch(getArticles(`/post/search?search=${key}`));
		dispatch(searchInstitution(`/institution/search?search=${key}`));
		dispatch(searchPeople(`/api/user/search?search=${key}`));
	}, [key]);
	return (
		<>
			<div className="flex justify-center">
				<div className="w-7/12 flex flex-col space-y-3 py-1">
					<Card sx={{ p: 2, border: 1, borderColor: "#e6e6e6" }}>
						<div className="flex flex-row">
							<Avatar sx={{ bgcolor: "#7bc9c7" }} aria-label="recipe">
								R
							</Avatar>
							<div className="flex flex-col ml-2 w-full">
								<p className="font-bold text-lg">People Name</p>
								<div className="flex flex-row space-x-2">
									<BsPeopleFill className="text-gray-400" />
									<p className="text-xs text-gray-400">People</p>
								</div>
								<p className="mt-3 max-w-full min-w-full truncate">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
								</p>
							</div>
						</div>
					</Card>

					<Card
						sx={{
							height: "270px",
							padding: 2,
							border: 1,
							borderColor: "#e6e6e6",
							mb: 2,
						}}
					>
						<div className="flex flex-row">
							<Avatar
								alt="Remy Sharp"
								src="https://images.unsplash.com/photo-1579783483458-83d02161294e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
							/>
							<div className="flex flex-col ml-2 w-full">
								<p className="font-bold text-lg">Institution</p>
								<div className="flex flex-row space-x-2">
									<MdArticle className="text-gray-400" />
									<p className="text-xs text-gray-400">Article</p>
								</div>
								<p className="mt-6 font-bold text-gray-500">Article Title</p>

								<div className="mt-2 flex flex-row items-center">
									<p className="bg-purple-200 text-purple-500 text-sm w-20 px-2 py-1 flex items-center justify-center rounded-md">
										Article
									</p>

									<p className="text-sm text-gray-400 ml-2">Jan 23, 2020</p>
									<p className="text-sm text-gray-400 ml-5 mr-1">3.7</p>

									<StarIcon sx={{ color: "#edb53b", fontSize: "20px" }} />
									{/* <Rating
										name="half-rating"
										defaultValue={feed.rating ? feed.rating : 0}
										precision={0.25}
										readOnly
									/>*/}
								</div>

								<div className="mt-4 flex flex-row items-center space-x-2">
									<BsPeopleFill className="text-gray-400" />
									<p className="text-sm text-gray-600 ml-1">author</p>
								</div>

								<Divider sx={{ mt: 2, mb: 2 }} />

								<div className="flex flex-row justify-between">
									<Button
										// onClick={() => handleOpen(feed.id)}
										variant="contained"
									>
										open article
									</Button>

									<Button variant="text">Add to Library</Button>
								</div>
							</div>
						</div>
					</Card>

					<Card sx={{ p: 2, border: 1, borderColor: "#e6e6e6" }}>
						<div className="flex flex-row">
							<Avatar sx={{ bgcolor: "#51a7ed" }} aria-label="recipe">
								<SchoolIcon />
							</Avatar>
							<div className="flex flex-col ml-2 w-full">
								<p className="font-bold text-lg">Institution Name</p>
								<div className="flex flex-row space-x-2">
									<BsPeopleFill className="text-gray-400" />
									<p className="text-xs text-gray-400">Institution</p>
								</div>
								<p className="mt-3 max-w-full min-w-full truncate">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
								</p>
							</div>
						</div>
					</Card>

					<Card sx={{ p: 2, border: 1, borderColor: "#e6e6e6" }}>
						<div className="flex flex-row">
							<Avatar sx={{ bgcolor: "#51a7ed" }} aria-label="recipe">
								<SchoolIcon />
							</Avatar>
							<div className="flex flex-col ml-2 w-full">
								<p className="font-bold text-lg">Institution Name</p>
								<div className="flex flex-row space-x-2">
									<BsPeopleFill className="text-gray-400" />
									<p className="text-xs text-gray-400">Institution</p>
								</div>
								<p className="mt-3 max-w-full min-w-full truncate">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
								</p>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</>
	);
};

export default SearchAll;
