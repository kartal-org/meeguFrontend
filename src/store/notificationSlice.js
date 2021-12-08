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
		noteLoadRequest: (state, action) => {
			state.isLoading = true;
		},
		noteLoadSuccess: (state, action) => {
			state.isLoading = false;
			state.notifications = action.payload;
		},
		noteLoadFailed: (state, action) => {
			state.isLoading = false;
			alert('notification Load Failed!');
		},
	},
});

const { noteLoadRequest, noteLoadSuccess, noteLoadFailed } = notificationlice.actions;

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
		onStart: noteLoadRequest.type,
		onSuccess: noteLoadSuccess.type,
		onError: noteLoadFailed.type,
	});
