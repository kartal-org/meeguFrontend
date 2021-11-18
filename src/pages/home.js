import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router";
import queryString from "query-string";

import { getArticles } from "../store/articleSlice";
import { addArticle } from "../store/librarySlice";

//material ui
import { Button, Typography, Divider, Avatar } from "@mui/material";

import ArticleCards from "../materialUI/components/articlecards";

//reusable
import PageManagerComponent from "../materialUI/components/reuseableComponents/pageManagerComponent";
import CardComponent from "../materialUI/components/reuseableComponents/cardComponent";
import CardHolder from "../materialUI/components/reuseableComponents/cardHolder";

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
		reads: "2 reads",
	},
];

const Home = ({ item, feed }) => {
	// hooks
	const dispatch = useDispatch();

	// states
	const [articles, setArticles] = useState([]);

	// get states
	const fetchedArticles = useSelector((state) => state.article.articles);

	// fetch states
	useEffect(() => {
		dispatch(getArticles());
	}, []);

	// set states

	useEffect(() => {
		if (fetchedArticles) {
			setArticles(fetchedArticles);
		}
	}, [fetchedArticles]);

	const addToLibrary = (id) => {
		dispatch(addArticle(id));
	};

	//tabs
	const location = useLocation();
	const { id } = useParams();
	// const dispatch = useDispatch();
	const { tab } = queryString.parse(location.search);

	const [value, setValue] = useState(tab);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const tabs = [
		{
			label: "All",
			link: `/home/${id}?tab=all`,
			value: "all",
			// component: <DiscoverArticles />,
			component: (
				<>
					<CardHolder>
						{feeds.map((feed) => (
							<CardComponent item={feed} height="270px" width="800px">
								<div className="flex flex-row items-center">
									<Avatar
										alt="Remy Sharp"
										src="https://images.unsplash.com/photo-1579783483458-83d02161294e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
									/>

									<Typography
										gutterBottom
										variant="h6"
										component="div"
										sx={{
											ml: 1,
											fontSize: "18px",
											fontWeight: 500,
											color: "#1056a1",
										}}
									>
										{feed.author}
									</Typography>
								</div>

								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ ml: 6, mt: -1, fontSize: "12px" }}
								>
									added an article
								</Typography>

								<Typography
									variant="body2"
									color="text.secondary"
									sx={{
										ml: 6,
										mt: 2,
										fontSize: "18px",
										fontWeight: 700,
									}}
								>
									{feed.title}
								</Typography>

								<div className="ml-12 mt-2 flex flex-row items-center">
									<p className="bg-purple-200 text-purple-500 text-sm w-20 px-2 py-1 flex items-center justify-center rounded-md">
										Article
									</p>

									<p className="text-sm text-gray-400 ml-2">{feed.date}</p>
									<p className="text-sm text-gray-400 ml-1">•</p>
									<p className="text-sm text-gray-400 ml-1">{feed.reads}</p>
								</div>

								<div className="ml-12 mt-4 flex flex-row items-center">
									<Avatar
										alt="Remy Sharp"
										src="https://images.unsplash.com/photo-1579783483458-83d02161294e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
										sx={{ width: 20, height: 20 }}
									/>

									<p className="text-sm text-gray-600 ml-2">
										Raymond Mangumpit
									</p>
									<p className="text-sm text-gray-600 ml-1">•</p>

									<Avatar
										alt="Remy Sharp"
										src="https://images.unsplash.com/photo-1579783483458-83d02161294e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
										sx={{ width: 20, height: 20, ml: 1 }}
									/>
									<p className="text-sm text-gray-600 ml-1">{feed.author}</p>
								</div>

								<Divider sx={{ m: 2 }} />

								<div className="ml-12 mt-4 mr-4 flex flex-row items-center w-full">
									<div className="w-1/2 flex flex-row items-center">
										<Button variant="outlined">Request full text</Button>

										<p className="text-base text-gray-600 ml-5">Save</p>
									</div>
									<div className="w-1/2 flex flex-row items-center ml-36">
										<Button variant="text">Follow</Button>
										<Button variant="text">Recommend</Button>
										<Button variant="text">Share</Button>
									</div>
								</div>
							</CardComponent>
						))}
					</CardHolder>
				</>
			),
		},
		{
			label: "Publications",
			link: `/home/${id}?tab=publications`,
			value: "publications",
			component: "publications",
		},
		{
			label: "People",
			link: `/home/${id}?tab=people`,
			value: "people",
			component: (
				<>
					<CardHolder>
						{items.map((item) => (
							<CardComponent item={item} height="120px" width="700px">
								<div className="flex flex-row items-center">
									<Avatar
										alt="Remy Sharp"
										src="https://images.unsplash.com/photo-1579783483458-83d02161294e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
									/>
									<Typography
										gutterBottom
										variant="h6"
										component="div"
										sx={{ ml: 1, fontSize: "22px", fontWeight: 700 }}
									>
										{item.name}
									</Typography>
								</div>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ ml: 6, mt: -1, fontSize: "12px" }}
								>
									{item.username}
								</Typography>

								<Typography
									variant="body2"
									color="text.secondary"
									sx={{
										ml: 6,
										mt: 2,
										fontSize: "14px",
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap",
									}}
								>
									{item.about}
								</Typography>
							</CardComponent>
						))}
					</CardHolder>
				</>
			),
		},
		{
			label: "Institutions",
			link: `/home/${id}?tab=institutions`,
			value: "institutions",
			component: "institutions cards diri ibutang",
		},
	];

	return (
		<>
			<div className="">
				<p className="text-xl text-gray-800 font-semibold ">Discover</p>
			</div>

			<Divider sx={{ mt: 2, mb: 1 }} />

			<PageManagerComponent
				value={value}
				handleChange={handleChange}
				tabs={tabs}
			/>

			{articles.map((item) => (
				<ArticleCards
					article={item}
					retrieveID={item.id}
					button={
						<Button onClick={() => addToLibrary(item.id)}>
							Add To Library
						</Button>
					}
				/>
			))}
		</>
	);
};

export default Home;
