import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let toastId;

export const librarySlice = createSlice({
	name: 'library',
	initialState: {
		currentArticle: null,
		articles: [],
		isLoading: false,
	},
	reducers: {
		articleLoadRequest: (state, action) => {
			state.isLoading = true;
		},
		articleLoadSuccess: (state, action) => {
			state.isLoading = false;
			state.articles = action.payload;
		},
		articleLoadFailed: (state, action) => {
			alert('Articles Load Failed!');
		},
		articleAddRequest: (state, action) => {
			state.isLoading = true;
		},
		articleAddSuccess: (state, action) => {
			state.isLoading = false;
			state.articles.unshift(action.payload);
		},
		articleAddFailed: (state, action) => {
			alert('Articles Load Failed!');
		},
		articleDeleteRequest: (state, action) => {
			state.isLoading = true;
			toastId = toast.loading('Request is being processed');
		},
		articleDeleteSuccess: (state, action) => {
			state.isLoading = false;
			const filtered = state.articles.filter((val) => val.id !== action.payload.id);
			state.articles = filtered;
			// alert('Articles Delete Success!');
			toast.update(toastId, {
				render: 'Deleted successfully',
				autoClose: 3000,
				type: 'success',
				isLoading: false,
			});
		},
		articleDeleteFailed: (state, action) => {
			// alert('Articles Delete Failed!');
			toast.update(toastId, {
				render: 'Failed to delete',
				autoClose: 3000,
				type: 'error',
				isLoading: false,
			});
		},
	},
});

const {
	articleLoadRequest,
	articleLoadSuccess,
	articleLoadFailed,
	articleDeleteRequest,
	articleDeleteSuccess,
	articleDeleteFailed,
	articleAddRequest,
	articleAddSuccess,
	articleAddFailed,
} = librarySlice.actions;

export default librarySlice.reducer;

//action creators

export const getArticles = () =>
	apiCallBegan({
		url: '/library/',
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: articleLoadRequest.type,
		onSuccess: articleLoadSuccess.type,
		onError: articleLoadFailed.type,
	});
export const addArticle = (link, formdata) =>
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
		onStart: articleAddRequest.type,
		onSuccess: articleAddSuccess.type,
		onError: articleAddFailed.type,
	});
export const removeArticle = (id) =>
	apiCallBegan({
		url: '/library/change/' + id,
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: articleDeleteRequest.type,
		onSuccess: articleDeleteSuccess.type,
		onError: articleDeleteFailed.type,
	});
