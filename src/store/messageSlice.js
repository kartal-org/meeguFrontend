import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from './actions/api';

export const messageSlice = createSlice({
	name: 'messages',
	initialState: {
		messages: [],
		rooms: [],
		currentRoom: null,
		status: 'idle',
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
			alert('Load Message Failed!');
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
			alert('Load Message Failed!');
		},
		roomsRetrieveRequest: (state, action) => {
			state.isLoading = true;
		},
		roomsRetrieveSuccess: (state, action) => {
			state.isLoading = false;
			state.currentRoom = action.payload;
		},
		roomsRetrieveFailed: (state, action) => {
			state.isLoading = false;
			alert('Load Message Failed!');
		},
		roomCreateRequest: (state, action) => {
			state.isLoading = true;
		},
		roomCreateSuccess: (state, action) => {
			state.isLoading = false;
			state.rooms.unshift(action.payload);
			alert('Create Message Success!');
		},
		roomCreateFailed: (state, action) => {
			state.isLoading = false;
			alert('Create Message Failed!');
		},
		roomEditRequest: (state, action) => {
			state.isLoading = true;
		},
		roomEditSuccess: (state, action) => {
			state.isLoading = false;
			state.currentRoom = action.payload;
			alert('Edit Room Success!');
		},
		roomEditFailed: (state, action) => {
			state.isLoading = false;
			alert('Edit Room Failed!');
		},
		roomDeleteRequest: (state, action) => {
			state.isLoading = true;
			state.status = 'loading';
		},
		roomDeleteSuccess: (state, action) => {
			state.isLoading = false;
			state.currentRoom = null;
			console.log(action.payload);
			let filtered = state.rooms.filter((val) => val.id !== action.payload.id);
			state.rooms = filtered;
			state.status = 'success';
			alert('Delete Room Success!');
		},
		roomDeleteFailed: (state, action) => {
			state.isLoading = false;
			state.status = 'failed';
			alert('Delete Room Failed!');
		},
		sendMessageRequest: (state, action) => {
			state.isLoading = true;
		},
		sendMessageSuccess: (state, action) => {
			state.isLoading = false;
			// state.messages.push(action.payload);
			// alert('Sending Message Success!');
		},
		sendMessageFailed: (state, action) => {
			state.isLoading = false;
			alert('Sending Message Failed!');
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
	roomDeleteRequest,
	roomDeleteSuccess,
	roomDeleteFailed,
} = messageSlice.actions;

export default messageSlice.reducer;

//action creators

export const getMessages = (link) =>
	apiCallBegan({
		url: link,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: messagesLoadRequest.type,
		onSuccess: messagesLoadSuccess.type,
		onError: messagesLoadFailed.type,
	});
export const getRooms = (link) =>
	apiCallBegan({
		url: link,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: roomsLoadRequest.type,
		onSuccess: roomsLoadSuccess.type,
		onError: roomsLoadFailed.type,
	});
export const sendMessage = (link, formdata) =>
	apiCallBegan({
		url: link,
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: formdata,
		type: 'regular',
		onStart: sendMessageRequest.type,
		onSuccess: sendMessageSuccess.type,
		onError: sendMessageFailed.type,
	});
export const createRoom = (link, formdata) =>
	apiCallBegan({
		url: link,
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: formdata,
		type: 'regular',
		onStart: roomCreateRequest.type,
		onSuccess: roomCreateSuccess.type,
		onError: roomCreateFailed.type,
	});
export const editRoom = (link, formdata) =>
	apiCallBegan({
		url: link,
		method: 'put',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: formdata,
		type: 'regular',
		onStart: roomEditRequest.type,
		onSuccess: roomEditSuccess.type,
		onError: roomEditFailed.type,
	});
export const deleteRoom = (link, formdata) =>
	apiCallBegan({
		url: link,
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: formdata,
		type: 'regular',
		onStart: roomDeleteRequest.type,
		onSuccess: roomDeleteSuccess.type,
		onError: roomDeleteFailed.type,
	});
export const retrieveRoom = (link) =>
	apiCallBegan({
		url: link,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: roomsRetrieveRequest.type,
		onSuccess: roomsRetrieveSuccess.type,
		onError: roomsRetrieveFailed.type,
	});
