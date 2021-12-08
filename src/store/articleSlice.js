import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let toastId;

export const articleSlice = createSlice({
	name: 'article',
	initialState: {
		currentArticle: null,
		fileToUpload: null,
		categories: [],
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
			toastId = toast.loading('Request is being processed');
		},
		articleRetrieveSuccess: (state, action) => {
			state.isLoading = false;
			state.currentArticle = action.payload;

			toast.update(toastId, {
				render: 'Retreived successfully',
				type: 'success',
				isLoading: false,
			});
		},
		articleRetrieveFailed: (state, action) => {
			// alert('Article Load Failed!');
			toast.update(toastId, {
				render: 'Failed to retreive',
				autoClose: 3000,
				type: 'error',
				isLoading: false,
			});
			// toast.update(toastId, {
			// 	render: "Retreived successfully",
			toastId = toast.loading('Request is being processed');
		},
		publishArticleSuccess: (state, action) => {
			state.status = 'article publish success';
			// alert('article publish success');
			state.articles.unshift(action.payload);
			toast.update(toastId, {
				render: 'Published successfully',
				autoClose: 3000,
				type: 'success',
				isLoading: false,
			});
		},
		publishArticleFailed: (state, action) => {
			state.status = 'article failed success';
			// alert('Article publish Failed!');
			toast.update(toastId, {
				render: 'Failed to publish',
				autoClose: 3000,
				type: 'error',
				isLoading: false,
			});
		},
		loadCategoryRequest: (state, action) => {
			state.status = 'loading';
			// toastId = toast.loading('Request is being processed');
		},
		loadCategorySuccess: (state, action) => {
			state.status = 'article category load success';
			state.categories = action.payload;
		},
		loadCategoryFailed: (state, action) => {
			state.status = 'article failed success';
			alert('Article category load Failed!');
		},
		setFileToUpload: (state, action) => {
			console.log(action.payload);
			state.fileToUpload = action.payload;
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
	loadCategoryRequest,
	loadCategorySuccess,
	loadCategoryFailed,
} = articleSlice.actions;

export const { setFileToUpload } = articleSlice.actions;

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
export const getCategories = (link) =>
	apiCallBegan({
		url: link,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: loadCategoryRequest.type,
		onSuccess: loadCategorySuccess.type,
		onError: loadCategoryFailed.type,
	});
export const getnewArticles = (link) =>
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
