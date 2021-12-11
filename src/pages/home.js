import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import queryString from "query-string";

import { getArticles, getCategories } from "../store/articleSlice";
import { addArticle } from "../store/librarySlice";

//material ui
import { Card, Button, Typography, Divider, Avatar } from "@mui/material";
import { BsPeopleFill } from "react-icons/bs";
import { MdArticle } from "react-icons/md";
import StarIcon from "@mui/icons-material/Star";

import ArticleCards from "../materialUI/components/articlecards";

//reusable
import PageManagerComponent from "../materialUI/components/reuseableComponents/pageManagerComponent";
import CardComponent from "../materialUI/components/reuseableComponents/cardComponent";
import CardHolder from "../materialUI/components/reuseableComponents/cardHolder";
import useFetch from "../hooks/useFetch";

import Rating from "@mui/material/Rating";

const items = [
	{
		id: 1,
		name: "HELLO!",
		username: "@username",
		about:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed risus euismod, vestibulum nunc sit amet, fringilla mauris. ",
	},
];

const feeds = [
	{
		id: 1,
		author: "Jonathan Ectuban",
		title: "Responsiveness on equal work opportunity in the Philippines",
		date: "November 09, 2019",
		rating: "2 stars",
	},
	{
		id: 2,
		author: "Jonathan Ectuban",
		title: "Responsiveness on equal work opportunity in the Philippines",
		date: "November 09, 2019",
		rating: "2 stars",
	},
];

const Home = ({ item, feed }) => {
	// hooks
	const dispatch = useDispatch();
	const categoryStates = useFetch;
	const articlesStates = useFetch;
	const location = useLocation();
	const history = useHistory();
	const { id } = useParams();
	// const dispatch = useDispatch();
	const { tab } = queryString.parse(location.search);

	const [value, setValue] = useState(tab);

	// fetch states
	useEffect(() => {
		dispatch(getCategories(`/post/category`));
	}, []);
	useEffect(() => {
		if (tab === "Feed") {
			dispatch(getArticles(`/post/`));
		} else {
			dispatch(getArticles(`/post/?search=${tab}`));
		}
	}, [tab]);
	// get states
	const fetchedArticles = useSelector((state) => state.article.articles);
	const fetchedCategories = useSelector((state) => state.article.categories);
	// set states
	const { items: articles, setItems: setArticles } =
		articlesStates(fetchedArticles);

	const addToLibrary = (id) => {
		dispatch(addArticle(id));
	};

	const [tabs, setTabs] = useState([
		{
			label: "Feed",
			link: `/home?navTab=home&tab=Feed`,
			value: "Feed",
		},
	]);

	//tabs
	useEffect(() => {
		if (fetchedCategories) {
			let combine = [];
			fetchedCategories.map((val) => {
				combine.push({
					label: val.name,
					link: `/home?navTab=home&tab=${val.name}`,
					value: val.name,
				});
			});
			tabs.map((val) => {
				combine.unshift(val);
			});
			setTabs(combine);
		}
	}, [fetchedCategories]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	function handleOpen(feedId) {
		history.push(`/article/${feedId}`);
	}

	return (
		<>
			{/* <div className=''>
				<p className='text-xl text-gray-800 font-semibold '>Discover</p>
			</div> */}

			{/* <Divider sx={{ mb: 1 }} /> */}

			<PageManagerComponent
				value={value}
				handleChange={handleChange}
				tabs={tabs}
			/>

			{/* {articles.map((item) => (
				<ArticleCards
					article={item}
					retrieveID={item.id}
					button={
						<Button onClick={() => addToLibrary(item.id)}>
							Add To Library
						</Button>
					}
				/>
			))} */}

			<CardHolder>
				{articles.map((feed) => (
					<Card
						sx={{
							height: "270px",
							width: "800px",
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
								<p className="font-bold text-lg">{feed.institution}</p>

								<div className="flex flex-row space-x-2">
									<MdArticle className="text-gray-400" />
									<p className="text-xs text-gray-400">added an article</p>
								</div>

								<p className="mt-6 font-bold text-gray-500">{feed.title}</p>

								<div className="mt-2 flex flex-row items-center">
									<p className="bg-purple-200 text-purple-500 text-sm w-20 px-2 py-1 flex items-center justify-center rounded-md">
										Article
									</p>

									<p className="text-sm text-gray-400 ml-2">{feed.date}</p>

									{/* <p className="text-sm text-gray-400 ml-5 mr-1">3.7</p>
									<StarIcon sx={{ color: "#edb53b", fontSize: "20px" }} /> */}

									{feed.rating ? feed.rating.toFixed(2) : 0}
									<Rating
										name="half-rating"
										defaultValue={feed.rating ? feed.rating : 0}
										precision={0.25}
										readOnly
									/>
								</div>

								<div className="mt-4 flex flex-row items-center space-x-2">
									<BsPeopleFill className="text-gray-400" />
									<p className="text-sm text-gray-600 ml-1">{feed.author}</p>
								</div>

								<Divider sx={{ mt: 2, mb: 2 }} />

								<div className="flex flex-row justify-between">
									<Button
										onClick={() => handleOpen(feed.id)}
										variant="contained"
									>
										open article
									</Button>

									<Button variant="text">Add to Library</Button>
								</div>
							</div>
						</div>
					</Card>
				))}
			</CardHolder>
		</>
	);
};

export default Home;
