import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let toastId;

export const notificationlice = createSlice({
	name: 'notification',
	initialState: {
		currentnotification: null,
		notifications: [],
		isLoading: false,
	},
	reducers: {
		notifLoadRequest: (state, action) => {
			state.isLoading = true;
		},
		notifLoadSuccess: (state, action) => {
			state.isLoading = false;
			state.notifications = action.payload;
		},
		notifLoadFailed: (state, action) => {
			state.isLoading = false;
			alert('notification Load Failed!');
		},
		notifUpdateRequest: (state, action) => {
			state.isLoading = true;
		},
		notifUpdateSuccess: (state, action) => {
			state.isLoading = false;
			const index = state.notifications.findIndex((item) => item.id === action.payload.id);
			state.notifications[index] = action.payload;
		},
		notifUpdateFailed: (state, action) => {
			state.isLoading = false;
			alert('notification update Failed!');
		},
	},
});

const {
	notifLoadRequest,
	notifLoadSuccess,
	notifLoadFailed,
	notifUpdateRequest,
	notifUpdateSuccess,
	notifUpdateFailed,
} = notificationlice.actions;

export default notificationlice.reducer;

//action creators

export const getnotification = (link) =>
	apiCallBegan({
		url: link,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: notifLoadRequest.type,
		onSuccess: notifLoadSuccess.type,
		onError: notifLoadFailed.type,
	});
export const updatenotification = (link, formData) =>
	apiCallBegan({
		url: link,
		method: 'patch',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: formData,
		type: 'regular',
		onStart: notifUpdateRequest.type,
		onSuccess: notifUpdateSuccess.type,
		onError: notifUpdateFailed.type,
	});
