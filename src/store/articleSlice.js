import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';

export const articleSlice = createSlice({
	name: 'article',
	initialState: {
		currentArticle: null,
		articles: [],
		status: 'idle',
		isLoading: false,
	},
	reducers: {
		articleLoadRequest: (state, action) => {
			state.status = 'loading';
		},
		articleLoadSuccess: (state, action) => {
			state.status = 'article load success';
			state.articles = action.payload;
		},
		articleLoadFailed: (state, action) => {
			state.status = 'article failed success';
			alert('Article load Failed!');
		},
		articleRetrieveRequest: (state, action) => {
			state.isLoading = true;
		},
		articleRetrieveSuccess: (state, action) => {
			state.isLoading = false;
			state.currentArticle = action.payload;
		},
		articleRetrieveFailed: (state, action) => {
			alert('Article Load Failed!');
		},
		publishArticleRequest: (state, action) => {
			state.status = 'loading';
		},
		publishArticleSuccess: (state, action) => {
			state.status = 'article publish success';
			alert('article publish success');
			state.articles.unshift(action.payload);
		},
		publishArticleFailed: (state, action) => {
			state.status = 'article failed success';
			alert('Article publish Failed!');
		},
	},
});

const {
	articleLoadRequest,
	articleLoadSuccess,
	articleLoadFailed,
	articleRetrieveRequest,
	articleRetrieveSuccess,
	articleRetrieveFailed,
	publishArticleRequest,
	publishArticleSuccess,
	publishArticleFailed,
} = articleSlice.actions;

export default articleSlice.reducer;

//action creators

export const getArticles = () =>
	apiCallBegan({
		url: '/post',
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
export const retrieveArticle = (id) =>
	apiCallBegan({
		url: '/post/change/' + id,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: articleRetrieveRequest.type,
		onSuccess: articleRetrieveSuccess.type,
		onError: articleRetrieveFailed.type,
	});
export const newRetrieveArticle = (link) =>
	apiCallBegan({
		url: link,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: articleRetrieveRequest.type,
		onSuccess: articleRetrieveSuccess.type,
		onError: articleRetrieveFailed.type,
	});

export const newGetArticles = (link) =>
	apiCallBegan({
		url: link,
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
export const publishArticle = (link, formData) =>
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
		onStart: publishArticleRequest.type,
		onSuccess: publishArticleSuccess.type,
		onError: publishArticleFailed.type,
	});
