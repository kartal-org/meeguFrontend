import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import Pusher from "pusher-js";
import queryString from "query-string";
import { format } from "date-fns";

import useFetch from "../hooks/useFetch";
import {
	createRoom,
	editRoom,
	getMessages,
	getRooms,
	retrieveRoom,
	sendMessage,
} from "../store/messageSlice";
import DialogComponent from "../materialUI/components/reuseableComponents/dialogComponent";

//validation
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

//Icons
import { BiMessageAltAdd } from "react-icons/bi";
import { BsInfoCircle, BsSearch } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import { RiChat1Line } from "react-icons/ri";

import {
	InputAdornment,
	FormControl,
	TextField,
	IconButton,
	Button,
	Typography,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
	AvatarGroup,
} from "@mui/material";

const FinalMessage = () => {
	const dispatch = useDispatch();
	const messagesState = useFetch;
	const roomsState = useFetch;
	const userState = useFetch;
	const currentRoomState = useFetch;
	const history = useHistory();
	const location = useLocation();
	const { room } = queryString.parse(location.search);

	const currentUser = useSelector((state) => state.auth.user);

	// list rooms
	useEffect(() => {
		dispatch(getRooms(`/chat/room`));
	}, []);

	const fetchedRooms = useSelector((state) => state.message.rooms);
	const { items: rooms } = roomsState(fetchedRooms); // use variable rooms to map

	///use this for room onclick
	function handleClickRoom(code) {
		history.push(`/messages?navTab=messages&room=${code}`);
	}

	// list of messages
	useEffect(() => {
		if (room) {
			console.log(room);
			dispatch(getMessages(`/chat/?search=${room}`));
			dispatch(retrieveRoom(`/chat/room/change/${room}`));
		}
	}, [room]);

	const fetchedMessages = useSelector((state) => state.message.messages);
	const fetchedCurrentRoom = useSelector((state) => state.message.currentRoom);
	const { items: messages, setItems: setMessages } =
		messagesState(fetchedMessages);
	const { items: currentRoom } = currentRoomState(fetchedCurrentRoom);

	// create room
	const [name, setName] = useState("");

	function onChange(e) {
		setName(e.target.value);
	}

	function handleAddRoom() {
		let members = [];
		members.push(currentUser.username);
		dispatch(createRoom(`/chat/room`, { name, members }));
	}
	const [message, setMessage] = useState("");
	function onChangeMessage(e) {
		setMessage(e.target.value);
	}

	function handleSendMessage() {
		dispatch(
			sendMessage(`/chat/`, { content: message, sender: currentUser.id, room })
		);
	}
	// For Real Time Messaging
	let allMessages = [];
	const [dataCatched, setDataCatched] = useState();
	useEffect(() => {
		if (dataCatched) {
			messages.map((val) => {
				allMessages.push(val);
			});
			allMessages.push(dataCatched);

			setMessages(allMessages);
		}
	}, [dataCatched]);
	function catchData(data) {
		setDataCatched(data);
	}

	useEffect(() => {
		if (room) {
			Pusher.logToConsole = true;
			const pusher = new Pusher("ba5283fee85d5a9a7b86", {
				cluster: "ap1",
			});
			const channel = pusher.subscribe("chat");
			channel.bind(room, function (data) {
				catchData(data);
			});
		}
	}, [room]);

	//validation
	const validationMsg = Yup.object().shape({
		room_name: Yup.string().required("Room Name is required."),
		username: Yup.string().required("Username is required."),
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

	// Editing Room Detail

	const [roomDetails, setRoomDetails] = useState({
		room_name: "",
		members: [],
	});
	useEffect(() => {
		if (currentRoom) {
			setRoomDetails({
				room_name: currentRoom.name,
				members: currentRoom.members,
			});
		}
	}, [currentRoom]);
	function onChangeCurrentRoom(e) {
		setRoomDetails({ ...roomDetails, [e.target.name]: e.target.value });
	}
	function handleEditRoom() {
		let members = [];
		roomDetails.members.map((i) => {
			// console.log(i.username);
			members.push(i.username);
		});
		dispatch(
			editRoom(`/chat/room/change/${room}`, {
				name: roomDetails.room_name,
				members,
				code: room,
			})
		);
	}
	const [username, setUsername] = useState("");
	function onChangeUsername(e) {
		setUsername(e.target.value);
	}
	function handleAddMember() {
		let members = [];
		roomDetails.members.map((i) => {
			// console.log(i.username);
			members.push(i.username);
		});
		members.push(username);
		dispatch(
			editRoom(`/chat/room/change/${room}`, {
				name: roomDetails.room_name,
				members,
				code: room,
			})
		);
	}

	// Adding or Editing Member
	return (
		<>
			<div className="">
				<div>
					<div>
						<div
							className=" relative min-h-screen flex flex-col"
							style={{ minHeight: "675px", maxHeight: "675px" }}
						>
							<div className="flex-grow w-full mx-auto lg:flex">
								<div
									className="flex-1 min-w-0 xl:flex"
									style={{ minHeight: "665px", maxHeight: "665px" }}
								>
									<div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-gray-50">
										<div
											className="pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0"
											style={{ minHeight: "665px", maxHeight: "665px" }}
										>
											<div className="h-full relative">
												<div className="flex flex-row justify-between ml-2">
													<p className="text-2xl text-gray-500 p-1 justify-start">
														{" "}
														Chats
													</p>

													<DialogComponent
														title="New Chat Room"
														button={
															<IconButton color="primary" aria-label="add room">
																<BiMessageAltAdd />
															</IconButton>
														}
													>
														{/* <form onSubmit={handleSubmit(onSubmit)}> */}
														<TextField
															fullWidth
															sx={{ mt: 1 }}
															id="outlined-search"
															label="Enter room name"
															variant="outlined"
															name="name"
															value={name}
															onChange={onChange}
														/>

														<div className="mt-5">
															<Button
																className="add"
																variant="contained"
																type="submit"
																onClick={handleAddRoom}
															>
																Create Room
															</Button>
														</div>
														{/* </form> */}
													</DialogComponent>
												</div>

												{/* Room List */}
												<List
													sx={{
														width: "100%",
														maxHeight: "580px",
														minHeight: "580px",
														overflowY: "auto",
														mt: 1,
													}}
												>
													{rooms.length > 0 ? (
														<>
															{rooms.map((val) => (
																<ListItem
																	className="border-b rounded-b-xl"
																	sx={{ cursor: "pointer" }}
																	onClick={() => handleClickRoom(val.code)}
																	key={val.id}
																>
																	<ListItemAvatar>
																		<Avatar>
																			<RiChat1Line />
																		</Avatar>
																	</ListItemAvatar>
																	<ListItemText
																		primary={val.name}
																		secondary={
																			<>
																				{val.latest_message && (
																					<p className="truncate">
																						<b>
																							{
																								val.latest_message
																									.sender__username
																							}
																							:
																						</b>
																						{val.latest_message.content}
																					</p>
																				)}
																			</>
																		}
																	/>
																</ListItem>
															))}
														</>
													) : (
														"You have no rooms yet"
													)}
												</List>
											</div>
										</div>
									</div>

									{/* Right Side */}
									<div
										className="flex-1 p:2 sm:pb-6 justify-between flex flex-col  xl:flex"
										style={{ minHeight: "675px", maxHeight: "675px" }}
									>
										<div className="flex sm:items-center justify-between py-3 border-b border-gray-200 p-3">
											<div className="flex items-center space-x-4">
												<div className="flex flex-col leading-tight">
													<div className="text-1xl mt-1 flex items-center">
														<span className="text-gray-700 mr-3">
															{roomDetails && roomDetails.room_name}
														</span>
														<span className="text-green-500">
															<svg width={10} height={10}>
																<circle
																	cx={5}
																	cy={5}
																	r={5}
																	fill="currentColor"
																/>
															</svg>
														</span>
													</div>
												</div>
												<AvatarGroup max={2}>
													{roomDetails.members &&
														roomDetails.members.map((val) => (
															<Avatar src={val.profileImage} />
														))}
												</AvatarGroup>
											</div>

											<div className="flex items-center space-x-2">
												<DialogComponent
													title="Chat Room Information"
													button={
														<IconButton color="primary" aria-label="Room Info">
															<BsInfoCircle />
														</IconButton>
													}
													action={{
														label: "Save Changes",
														handler: handleEditRoom,
													}}
												>
													<TextField
														fullWidth
														sx={{ mt: 1 }}
														id="outlined-search"
														label="Room name"
														variant="outlined"
														name="room_name"
														value={roomDetails.room_name}
														onChange={onChangeCurrentRoom}
													/>

													<List
														sx={{
															width: "100%",
															maxHeight: "330px",
															minHeight: "330px",
															bgcolor: "background.paper",
															overflowY: "auto",
															mt: 1,
														}}
													>
														{roomDetails.members &&
															roomDetails.members.map((item) => (
																<ListItem>
																	<ListItemAvatar>
																		<Avatar src={item.profileImage} />
																	</ListItemAvatar>
																	<ListItemText
																		primary={item.username}
																		secondary={item.role}
																	/>
																</ListItem>
															))}
													</List>

													<div className="mt-1">
														<DialogComponent
															maxWidth="xs"
															title="Add Member"
															button={
																<Button
																	color="primary"
																	aria-label="Room Info"
																	variant="contained"
																>
																	Add Member
																</Button>
															}
															action={{
																label: "Add",
																handler: handleAddMember,
															}}
														>
															{/* <form onSubmit={handleSubmit(onSubmit)}> */}
															<TextField
																fullWidth
																sx={{ mt: 1 }}
																id="outlined-search"
																label="Username"
																variant="outlined"
																name="username"
																value={username}
																onChange={onChangeUsername}
															/>

															{/* </form> */}
														</DialogComponent>
													</div>
												</DialogComponent>
											</div>
										</div>

										{/* Conversation */}
										{/* <InfiniteScrolling data={messages} /> */}
										{messages.length > 0 ? (
											<div
												className="chat-message py-7 px-4 overflow-y-auto"
												style={{ maxHeight: "450px", minHeight: "450px" }}
											>
												{messages.map((val) => (
													<div className="flex w-full items-start">
														<div className="flex flex-col w-full mx-2 order-2 items-start">
															<div
																className="mb-8 list-none w-full"
																key={val.id}
															>
																<div className="flex flex-row">
																	<Avatar src={val.sender.profileImage} />

																	<div className="flex flex-col w-full">
																		<div className="flex flex-row items-center">
																			<p className="ml-2 text-sm text-gray-900">
																				{val.sender.full_name}
																			</p>
																			<p className="ml-3 text-xs text-gray-400">
																				{val.dateModified &&
																					format(
																						new Date(val.dateModified),
																						"MMM-dd h:m b"
																					)}
																			</p>
																		</div>
																		<p className="ml-2 text-xs text-gray-500">
																			{val.content}
																		</p>
																	</div>
																</div>
															</div>
														</div>
													</div>
												))}
											</div>
										) : (
											<p className="text-center text-gray-400">
												Please click on one of the chat rooms
											</p>
										)}

										<div className="border-t-2 border-gray-200 p-4 -mb-3.5">
											<div className="relative flex">
												<FormControl
													sx={{ m: 1, width: "25ch" }}
													variant="outlined"
												>
													<TextField
														fullWidth
														multiline
														minRows={3}
														InputProps={{
															endAdornment: (
																<InputAdornment position="end">
																	<IconButton
																		aria-label="send"
																		edge="end"
																		sx={{ m: 2 }}
																		onClick={handleSendMessage}
																	>
																		<FiSend />
																	</IconButton>
																</InputAdornment>
															),
														}}
														sx={{
															width: "1025px",
															padding: "5px",
															textAlign: "justify",
														}}
														label="Type message here ..."
														value={message}
														onChange={onChangeMessage}
													/>
												</FormControl>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default FinalMessage;
