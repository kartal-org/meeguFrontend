import { createSlice } from "@reduxjs/toolkit";

import { apiCallBegan } from "./actions/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let toastId;

export const messageSlice = createSlice({
	name: "messages",
	initialState: {
		messages: [],
		rooms: [],
		isLoading: false,
	},
	reducers: {
		messagesLoadRequest: (state, action) => {
			state.isLoading = true;
		},
		messagesLoadSuccess: (state, action) => {
			state.isLoading = false;
			state.messages = action.payload;
		},
		messagesLoadFailed: (state, action) => {
			state.isLoading = false;
			alert("Load Message Failed!");
		},
		roomsLoadRequest: (state, action) => {
			state.isLoading = true;
		},
		roomsLoadSuccess: (state, action) => {
			state.isLoading = false;
			state.rooms = action.payload;
		},
		roomsLoadFailed: (state, action) => {
			state.isLoading = false;
			alert("Load Message Failed!");
		},
		roomCreateRequest: (state, action) => {
			state.isLoading = true;
			toastId = toast.loading("Request is being processed");
		},
		roomCreateSuccess: (state, action) => {
			state.isLoading = false;
			state.rooms.unshift({
				id: action.payload.id.id,
				messages: "",
				title: action.payload.title,
			});
			// alert('Create Message Success!');
			toast.update(toastId, {
				render: "Created successfully",
				autoClose: 3000,
				type: "success",
				isLoading: false,
			});
		},
		roomCreateFailed: (state, action) => {
			state.isLoading = false;
			// alert('Create Message Failed!');
			toast.update(toastId, {
				render: "Failed to create",
				autoClose: 3000,
				type: "error",
				isLoading: false,
			});
		},
		sendMessageRequest: (state, action) => {
			state.isLoading = true;
			toastId = toast.loading("Request is being processed");
		},
		sendMessageSuccess: (state, action) => {
			state.isLoading = false;
			// alert('Sending Message Success!');
			toast.update(toastId, {
				render: "Message Sent",
				autoClose: 3000,
				type: "success",
				isLoading: false,
			});
		},
		sendMessageFailed: (state, action) => {
			state.isLoading = false;
			// alert('Sending Message Failed!');
			toast.update(toastId, {
				render: "Failed to send message",
				autoClose: 3000,
				type: "error",
				isLoading: false,
			});
		},
		roomEditRequest: (state, action) => {
			state.isLoading = true;
			toastId = toast.loading("Request is being processed");
		},
		roomEditSuccess: (state, action) => {
			state.isLoading = false;
			state.currentRoom = action.payload;
			// alert('Edit Room Success!');
			toast.update(toastId, {
				render: "Edited successfully",
				autoClose: 3000,
				type: "success",
				isLoading: false,
			});
		},
		roomEditFailed: (state, action) => {
			state.isLoading = false;
			// alert('Edit Room Failed!');
			toast.update(toastId, {
				render: "Failed to edit",
				autoClose: 3000,
				type: "error",
				isLoading: false,
			});
		},
		roomsRetrieveRequest: (state, action) => {
			state.isLoading = true;
			toastId = toast.loading("Request is being processed");
		},
		roomsRetrieveSuccess: (state, action) => {
			state.isLoading = false;
			state.currentRoom = action.payload;
			toast.update(toastId, {
				render: "Retreived successfully",
				autoClose: 3000,
				type: "success",
				isLoading: false,
			});
		},
		roomsRetrieveFailed: (state, action) => {
			state.isLoading = false;
			// alert('Load Message Failed!');
			toast.update(toastId, {
				render: "Failed to retreive",
				autoClose: 3000,
				type: "error",
				isLoading: false,
			});
		},
	},
});

const {
	messagesLoadRequest,
	messagesLoadSuccess,
	messagesLoadFailed,
	roomsLoadRequest,
	roomsLoadSuccess,
	roomsLoadFailed,
	sendMessageRequest,
	sendMessageSuccess,
	sendMessageFailed,
	roomCreateRequest,
	roomCreateSuccess,
	roomCreateFailed,
	roomEditRequest,
	roomEditSuccess,
	roomEditFailed,
	roomsRetrieveRequest,
	roomsRetrieveSuccess,
	roomsRetrieveFailed,
} = messageSlice.actions;

export default messageSlice.reducer;

//action creators

export const getMessages = (link) =>
	apiCallBegan({
		url: link,
		method: "get",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: messagesLoadRequest.type,
		onSuccess: messagesLoadSuccess.type,
		onError: messagesLoadFailed.type,
	});
export const getRooms = (link) =>
	apiCallBegan({
		url: link,
		method: "get",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: roomsLoadRequest.type,
		onSuccess: roomsLoadSuccess.type,
		onError: roomsLoadFailed.type,
	});
export const sendMessage = (content, room) =>
	apiCallBegan({
		url: "/chat/sendMessage",
		method: "post",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		data: { content, room },
		type: "regular",
		onStart: sendMessageRequest.type,
		onSuccess: sendMessageSuccess.type,
		onError: sendMessageFailed.type,
	});
export const createRoom = (receiver) =>
	apiCallBegan({
		url: "/chat/createRoom",
		method: "post",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		data: { receiver },
		type: "regular",
		onStart: roomCreateRequest.type,
		onSuccess: roomCreateSuccess.type,
		onError: roomCreateFailed.type,
	});

export const editRoom = (link, formdata) =>
	apiCallBegan({
		url: link,
		method: "put",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		data: formdata,
		type: "regular",
		onStart: roomEditRequest.type,
		onSuccess: roomEditSuccess.type,
		onError: roomEditFailed.type,
	});

export const retrieveRoom = (link) =>
	apiCallBegan({
		url: link,
		method: "get",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: roomsRetrieveRequest.type,
		onSuccess: roomsRetrieveSuccess.type,
		onError: roomsRetrieveFailed.type,
	});
