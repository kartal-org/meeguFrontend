import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';

export const fileSlice = createSlice({
	name: 'file',
	initialState: {
		currentFile: null,
		files: [],
		uploadFiles: [],
		status: 'idle',
	},
	reducers: {
		loadFileRequest: (state, action) => {
			state.status = 'loading';
		},
		loadFileSuccess: (state, action) => {
			state.status = 'file load success';
			const test = action.payload;
			if (test[0]) {
				if (test[0].hasOwnProperty('content')) {
					state.files = action.payload;
				}
				if (test[0].hasOwnProperty('file')) {
					state.uploadFiles = action.payload;
				}
			}
		},
		loadFileFailed: (state, action) => {
			// state.files = [];
			// state.uploadFiles = [];
			alert('Files Load Failed!');
		},
		retrieveFileRequest: (state, action) => {
			state.status = 'loading';
		},
		retrieveFileSuccess: (state, action) => {
			state.status = 'file retrieve success';
			state.currentFile = action.payload;
		},
		retrieveFileFailed: (state, action) => {
			alert('Files Retrieve Failed!');
		},
		addFileRequest: (state, action) => {
			state.status = 'loading';
		},
		addFileSuccess: (state, action) => {
			state.status = 'file add success';
			state.files.push(action.payload);
			alert('Files Add Success!');
		},
		addFileFailed: (state, action) => {
			state.status = 'file add failed';
			alert('Files Add Failed!');
		},
		editFileRequest: (state, action) => {
			state.status = 'loading';
		},
		editFileSuccess: (state, action) => {
			const index = state.files.findIndex((item) => item.id === action.payload.id);
			state.files[index] = action.payload;
			state.status = 'file edit success';
			// alert('Files Edit Success!');
		},
		editFileFailed: (state, action) => {
			state.status = 'file edit failed';
			alert('Files Edit Failed!');
		},
		deleteFileRequest: (state, action) => {
			state.status = 'loading';
		},
		deleteFileSuccess: (state, action) => {
			if (action.payload.hasOwnProperty('content')) {
				const filtered = state.files.filter((item) => item.id !== action.payload.id);
				state.files = filtered;
			}
			if (action.payload.hasOwnProperty('file')) {
				const filtered = state.uploadFiles.filter((item) => item.id !== action.payload.id);
				state.files = filtered;
			}

			state.status = 'file delete success';
			alert('Files Delete Success!');
		},
		deleteFileFailed: (state, action) => {
			state.status = 'file delete failed';
			alert('files delete failed');
			alert('Files Delete Failed!');
		},
	},
});

const {
	loadFileRequest,
	loadFileSuccess,
	loadFileFailed,
	retrieveFileRequest,
	retrieveFileSuccess,
	retrieveFileFailed,
	addFileRequest,
	addFileSuccess,
	addFileFailed,
	editFileRequest,
	editFileSuccess,
	editFileFailed,
	deleteFileRequest,
	deleteFileSuccess,
	deleteFileFailed,
} = fileSlice.actions;

export default fileSlice.reducer;

//action creators

export const getfiles = (link) =>
	apiCallBegan({
		url: link,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: loadFileRequest.type,
		onSuccess: loadFileSuccess.type,
		onError: loadFileFailed.type,
	});
export const addFile = (link, formData) =>
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
		onStart: addFileRequest.type,
		onSuccess: addFileSuccess.type,
		onError: addFileFailed.type,
	});
export const retrieveFile = (link) =>
	apiCallBegan({
		url: link,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: retrieveFileRequest.type,
		onSuccess: retrieveFileSuccess.type,
		onError: retrieveFileFailed.type,
	});
export const editfile = (link, formData) =>
	apiCallBegan({
		url: link,
		method: 'patch',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		data: formData,
		onStart: editFileRequest.type,
		onSuccess: editFileSuccess.type,
		onError: editFileFailed.type,
	});
export const deletefile = (link) =>
	apiCallBegan({
		url: link,
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: deleteFileRequest.type,
		onSuccess: deleteFileSuccess.type,
		onError: deleteFileFailed.type,
	});
