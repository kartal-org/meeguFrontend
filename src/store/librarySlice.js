import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';

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
			alert('Articles load failed');
		},
		articleDeleteRequest: (state, action) => {
			state.isLoading = true;
		},
		articleDeleteSuccess: (state, action) => {
			state.isLoading = false;
			const filtered = state.articles.filter((val) => val.id == action.payload.id);
			state.articles = filtered;
		},
		articleDeleteFailed: (state, action) => {
			alert('Articles delete failed');
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
} = librarySlice.actions;

export default librarySlice.reducer;

//action creators

export const getArticles = () =>
	apiCallBegan({
		url: '/library',
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
export const addArticle = (content) =>
	apiCallBegan({
		url: '/library/add',
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: { content },
		type: 'regular',
		onStart: articleLoadRequest.type,
		onSuccess: articleLoadSuccess.type,
		onError: articleLoadFailed.type,
	});
export const removeArticle = (id) =>
	apiCallBegan({
		url: '/library/' + id,
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
