import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let toastId;

export const responseSlice = createSlice({
	name: 'response',
	initialState: {
		currentresponse: null,
		responses: [],
		status: 'idle',
	},
	reducers: {
		loadresponseRequest: (state, action) => {
			state.status = 'loading';
		},
		loadresponseSuccess: (state, action) => {
			state.status = 'response load success';
			state.responses = action.payload;
		},
		loadresponseFailed: (state, action) => {
			state.status = 'response load failed';
			state.responses = [];
		},
		addresponseRequest: (state, action) => {
			state.status = 'loading';
		},
		addresponseSuccess: (state, action) => {
			state.status = 'response add success';
			state.responses.unshift(action.payload);
			toast.update(toastId, {
				render: 'Succesfully added',
				autoClose: 3000,
				type: 'success',
				isLoading: false,
			});
		},
		addresponseFailed: (state, action) => {
			state.status = 'response add failed';
			// alert('Adding response failed');
			toast.update(toastId, {
				render: 'Failed to add',
				autoClose: 3000,
				type: 'error',
				isLoading: false,
			});
		},
	},
});

const {
	loadresponseRequest,
	loadresponseSuccess,
	loadresponseFailed,
	addresponseRequest,
	addresponseSuccess,
	addresponseFailed,
} = responseSlice.actions;

export default responseSlice.reducer;

//action creators

export const createresponse = (link, formData) =>
	apiCallBegan({
		url: link,
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		data: formData,
		onStart: addresponseRequest.type,
		onSuccess: addresponseSuccess.type,
		onError: addresponseFailed.type,
	});

export const getresponses = (link) =>
	apiCallBegan({
		url: link,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: loadresponseRequest.type,
		onSuccess: loadresponseSuccess.type,
		onError: loadresponseFailed.type,
	});
