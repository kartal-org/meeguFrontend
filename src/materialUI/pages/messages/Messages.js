import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import FolderIcon from "@mui/icons-material/Folder";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { BiMessageAltAdd } from "react-icons/bi";
import MessageCards from "../../components/MessageCards";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
	RiGhostSmileLine,
	RiInformationLine,
	RiSendPlaneFill,
} from "react-icons/ri";

import Container from "@mui/material/Container";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",

	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(2),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",

		[theme.breakpoints.up("md")]: {
			width: "35ch",
		},
	},
}));

function HideOnScroll(props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
	});

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}

HideOnScroll.propTypes = {
	children: PropTypes.element.isRequired,
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
};

export default function Messages(props) {
	const [ownerSwitch, setOwnerSwitch] = useState(true);
	const [dense, setDense] = useState(false);
	const [secondary, setSecondary] = useState(false);

	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const [tableData, setTableData] = useState([]);
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const deleteUser = React.useCallback(
		(params) => () => {
			console.log(params.row.name);
		},
		[]
	);

	const [message, setMessage] = React.useState("");

	const handleChangeMessage = (event) => {
		setValue(event.target.message);
	};
	const items = [
		{
			sender: "Thania Sinogaya",
			sendBy: "Neek",
			message: "i'm here",
		},
		{
			sender: "Thania Sinogaya",
			sendBy: "Neek",
			message: "what where are you?",
		},
	];

	return (
		<>
			<div class="grid grid-cols-3 gap-4 ">
				<div class="">
					<div class="row-span-6 grid grid-cols-6 mt-4">
						<div className="mr-5 ">
							<Tabs
								orientation="vertical"
								value={value}
								onChange={handleChange}
								aria-label="Messages List"
								className="flex flex-col"
								variant="scrollable"
								sx={{
									margin: 0,
									border: 1,
									borderColor: "divider",
									minWidth: "420px",
									borderRadius: "0.5rem",
									maxHeight: "650px",
									minHeight: "650px",
								}}
							>
								<div className="flex flex-col justify-between">
									<div className="justify-start">
										<div className="flex flex-row justify-between p-2">
											<p className="justify-start text-2xl text-gray-400 ml-2">
												{" "}
												Chats
											</p>
											<IconButton color="primary" aria-label="add message">
												<BiMessageAltAdd />
											</IconButton>
										</div>
									</div>
									<div className="justify-between">
										<Search
											sx={{
												display: { xs: "none", md: "flex" },
												backgroundColor: "#fafafa",
											}}
										>
											<SearchIconWrapper
												sx={{ display: { xs: "none", md: "flex" } }}
											>
												<SearchIcon sx={{ color: "#919191" }} />
											</SearchIconWrapper>
											<StyledInputBase
												placeholder="Search…"
												inputProps={{ "aria-label": "search" }}
											/>
										</Search>
									</div>
								</div>

								<div className="p-2 space-y-1">
									{items.map((item) => (
										<MessageCards item={item} />
									))}
								</div>
							</Tabs>
						</div>
					</div>
				</div>
				<div class="col-span-2 border border-purple-200 rounded-lg mt-4">
					<div
						className="flex flex-col h-full justify-between"
						style={{ minHeight: "650px", maxHeight: "650px" }}
					>
						{/* Display messages */}
						<div className="justify-start h-full">
							<div className="flex flex-row justify-between shadow-md">
								<div className="justify-start p-2">
									<Avatar sx={{ bgcolor: "#ad4242" }} aria-label="recipe">
										R
									</Avatar>
								</div>
								<div className="flex justify-between items-center p-2 w-full">
									<p className="text-lg text-gray-500">Teddy Bear </p>
								</div>

								<IconButton color="primary" aria-label="send message">
									<RiInformationLine />
								</IconButton>
							</div>

							<div className="mt-4 p-4 h-5/6 border-2 border-gray-300">
								{/* <Tabs
									orientation="vertical"
									value={value}
									onChange={handleChange}
									aria-label="Messages List"
									className="flex flex-col"
									variant="scrollable"
									sx={{
										margin: 0,
										border: 1,
										borderColor: "divider",
										minWidth: "420px",
										borderRadius: "0.5rem",
										maxHeight: "500px",
									}}
								>
									<div className="p-2 space-y-1">
										{items.map((item) => (
											<MessageCards item={item} />
										))}
									</div>
								</Tabs> */}

								{/* Converstations */}
								<div className="w-1/2">
									<div className="bg-blue-300 text-sm justify-start p-4 w-full rounded-tl-3xl rounded-tr-3xl rounded-br-3xl ">
										Cras mattis consectetur purus sit amet fermentum. Cras justo
										odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
										risus, porta ac consectetur ac, vestibulum at eros. Praesent
										commodo cursus magna, vel scelerisque nisl consectetur et.
										Cras mattis consectetur purus sit amet fermentum.
									</div>
									<div className="flex flex-row justify-between">
										<p className="text-sm text-gray-300">Sent</p>
										<p className="text-sm text-gray-300 mr-5">10:34 pm</p>
									</div>
								</div>
								<div className="w-1/2 ml-auto">
									<div className="bg-gray-300 text-sm  justify-between p-4 w-full rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl ">
										Cras mattis consectetur purus sit amet fermentum. Cras justo
										odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
										risus, porta ac consectetur ac, vestibulum at eros. Praesent
										commodo cursus magna, vel scelerisque nisl consectetur et.
										Cras mattis consectetur purus sit amet fermentum.
									</div>

									<div className="flex flex-row justify-between">
										<p className="text-sm text-gray-300 ml-5">10:34 pm</p>
										<p className="text-sm text-gray-300">Sent</p>
									</div>
								</div>
							</div>
						</div>

						{/* Input message here */}
						<div className="justify-between">
							<div className="flex flex-row justify-between">
								<div className="justify-start w-full">
									<div className="flex flex-row justify-between">
										<div className="justify-start w-full p-2">
											<TextField
												id="standard-multiline-flexible"
												label="Type your message here"
												multiline
												maxRows={3}
												// value={message}
												// onChange={handleChangeMessage}
												variant="standard"
												sx={{
													bgcolor: "#f2f2f2",
													borderTopLeftRadius: "10px",
													borderTopRightRadius: "10px",
													width: "750px",
													padding: "5px",
												}}
											/>
										</div>

										<IconButton color="primary" aria-label="emojis">
											<RiGhostSmileLine />
										</IconButton>
									</div>
								</div>

								<IconButton color="primary" aria-label="send message">
									{/* <RiSendPlaneFill /> */}
								</IconButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
