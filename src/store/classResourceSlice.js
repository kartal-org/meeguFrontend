import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from './actions/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let toastId2;
let toastId;

export const classResourceSlice = createSlice({
	name: 'resource',
	initialState: {
		folders: [],
		files: [],
		currentFile: null,
		uploadFiles: [],
		isLoading: false,
	},
	reducers: {
		// Folder CRUD Reducers
		folderLoadRequest: (state, action) => {
			state.isLoading = true;
		},
		folderLoadSuccess: (state, action) => {
			state.isLoading = false;
			state.folders = action.payload; 
		},
		folderLoadFailed: (state, action) => {
			state.isLoading = false;
			state.folders = [];
			alert('Folder Load Failed!');
		},
		folderCreateRequest: (state, action) => {
			state.isLoading = true;
		},
		folderCreateSuccess: (state, action) => {
			state.isLoading = false;
			state.folders.push(action.payload);
			alert('Adding Folder Success!');
		},
		folderCreateFailed: (state, action) => {
			state.isLoading = false;
			alert('Adding Folder Failed!');
		},
		folderEditRequest: (state, action) => {
			state.isLoading = true;
		},
		folderEditSuccess: (state, action) => {
			state.isLoading = false;
			const index = state.folders.findIndex((folder) => folder.id === action.payload.id);
			state.folders[index].name = action.payload.name;
			alert('Edit Folder Success!');
		},
		folderEditFailed: (state, action) => {
			state.isLoading = false;
			alert('Edit Folder Failed!');
		},
		folderDeleteRequest: (state, action) => {
			state.isLoading = true;
		},
		folderDeleteSuccess: (state, action) => {
			state.isLoading = false;
			state.folders = state.folders.filter((val) => val.id !== action.payload.id);
			alert('Delete Folder Success!');
		},
		folderDeleteFailed: (state, action) => {
			state.isLoading = false;
			alert('Delete Folder Failed!');
		},
		uploadedFileLoadRequest: (state, action) => {
			state.isLoading = true;
		},
		uploadedFileLoadSuccess: (state, action) => {
			state.isLoading = false;
			state.uploadFiles = action.payload;
			alert('Files Upload Success!');
		},
		uploadedFileLoadFailed: (state, action) => {
			state.isLoading = false;
			alert('Files Upload Failed!');
		},
		// Quill File CRUD
		quillLoadRequest: (state, action) => {
			state.isLoading = true;
		},
		quillLoadSuccess: (state, action) => {
			state.isLoading = false;
			state.files = action.payload; 
		},
		quillLoadFailed: (state, action) => {
			state.isLoading = false;
			alert('Files Load Failed!');
		},
		fileUploadRequest: (state, action) => {
			state.isLoading = true;
		},
		fileUploadSuccess: (state, action) => {
			state.isLoading = false;
			state.files.push({
				id: action.payload.id,
				name: action.payload.name,
				status: action.payload.status,
				tags: action.payload.tags,
				dateCreated: action.payload.dateCreated,
				dateUpdated: action.payload.dateUpdated,
				file: 'http://localhost:8000' + action.payload.file,
				folder: action.payload.folder,
				assignee: action.payload.assignee,
			});
			alert('Files Upload Success!');
		},
		fileUploadFailed: (state, action) => {
			state.isLoading = false;
			alert('Files Upload Failed!');
		},
		createFileRequest: (state, action) => {
			state.isLoading = true;
		},
		createFileSuccess: (state, action) => {
			state.isLoading = false;
			state.files.push({
				id: action.payload.id,
				name: action.payload.name,
				status: action.payload.status,
				tags: action.payload.tags,
				dateCreated: action.payload.dateCreated,
				dateUpdated: action.payload.dateUpdated,
				content: action.payload.content,
				folder: action.payload.folder,
				assignee: action.payload.assignee,
			});
			alert('Files Upload Success!');
		},
		createFileFailed: (state, action) => {
			state.isLoading = false;
			alert('Files Upload Failed!');
		},

		retrieveFileRequest: (state, action) => {
			state.isLoading = true;
		},
		retrieveFileSuccess: (state, action) => {
			state.isLoading = false;
			state.currentFile = action.payload; 
		},
		retrieveFileFailed: (state, action) => {
			state.isLoading = false;
			alert('File Load Failed!');
		},
		editFileRequest: (state, action) => {
			state.isLoading = true;
		},
		editFileSuccess: (state, action) => {
			state.isLoading = false;
			alert('File Saved Success!');
		},
		editFileFailed: (state, action) => {
			state.isLoading = false;
			alert('File Saved Failed!');
		},
		deleteFileRequest: (state, action) => {
			state.isLoading = true;
		},
		deleteFileSuccess: (state, action) => {
			console.log(action.payload);
			if (action.payload.hasOwnProperty('content')) {
				const filtered = state.files.filter((val) => val.id !== action.payload.id);
				state.files = filtered;
			}
			if (action.payload.hasOwnProperty('file')) {
				const filtered = state.uploadFiles.filter((val) => val.id !== action.payload.id);
				state.files = filtered;
			}
			state.isLoading = false;
			alert('File Delete Success!');
		},
		deleteFileFailed: (state, action) => {
			state.isLoading = false;
			alert('File Delete Failed!');
		},
	},
});

const {
	folderLoadRequest,
	folderLoadSuccess,
	folderLoadFailed,
	folderCreateRequest,
	folderCreateSuccess,
	folderCreateFailed,
	folderEditRequest,
	folderEditSuccess,
	folderEditFailed,
	folderDeleteRequest,
	folderDeleteSuccess,
	folderDeleteFailed,
	quillLoadRequest,
	quillLoadSuccess,
	quillLoadFailed,
	uploadedFileLoadRequest,
	uploadedFileLoadSuccess,
	uploadedFileLoadFailed,
	fileUploadRequest,
	fileUploadSuccess,
	fileUploadFailed,
	createFileRequest,
	createFileSuccess,
	createFileFailed,
	retrieveFileRequest,
	retrieveFileSuccess,
	retrieveFileFailed,
	editFileRequest,
	editFileSuccess,
	editFileFailed,
	deleteFileRequest,
	deleteFileSuccess,
	deleteFileFailed,
} = classResourceSlice.actions;

export default classResourceSlice.reducer;

//action creators

// Resources CRUD Operations

/// Files CRUD Operations

export const getFiles = (folder) =>
	apiCallBegan({
		url: '/resource/classroom/file/' + folder,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: quillLoadRequest.type,
		onSuccess: quillLoadSuccess.type,
		onError: quillLoadFailed.type,
	});
export const getUploadedFiles = (folder) =>
	apiCallBegan({
		url: '/resource/classroom/uploadfile/' + folder,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: uploadedFileLoadRequest.type,
		onSuccess: uploadedFileLoadSuccess.type,
		onError: uploadedFileLoadFailed.type,
	});
export const uploadFile = (formData, folder) =>
	apiCallBegan({
		url: '/resource/classroom/uploadfile/' + folder,
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
			accept: '*/*',
		},
		data: formData,
		onStart: fileUploadRequest.type,
		onSuccess: fileUploadSuccess.type,
		onError: fileUploadFailed.type,
	});
export const createFile = (name) =>
	apiCallBegan({
		url: '/resource/classroom/file',
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: { name },
		onStart: createFileRequest.type,
		onSuccess: createFileSuccess.type,
		onError: createFileFailed.type,
	});
export const retrieveFile = (id) =>
	apiCallBegan({
		url: '/resource/classroom/file/change/' + id,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		onStart: retrieveFileRequest.type,
		onSuccess: retrieveFileSuccess.type,
		onError: retrieveFileFailed.type,
	});
export const editFile = (id, name, content) =>
	apiCallBegan({
		url: '/resource/classroom/file/change/' + id,
		method: 'patch',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: { name, content },
		onStart: editFileRequest.type,
		onSuccess: editFileSuccess.type,
		onError: editFileFailed.type,
	});
export const deleteFile = (id) =>
	apiCallBegan({
		url: '/resource/classroom/file/change/' + id,
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		onStart: deleteFileRequest.type,
		onSuccess: deleteFileSuccess.type,
		onError: deleteFileFailed.type,
	});
export const deleteUploadFile = (id) =>
	apiCallBegan({
		url: '/resource/classroom/uploadfile/change/' + id,
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		onStart: deleteFileRequest.type,
		onSuccess: deleteFileSuccess.type,
		onError: deleteFileFailed.type,
	});

///Folders CRUD Operations
export const getFolders = (resource) =>
	apiCallBegan({
		url: '/resource/classroom/folder/' + resource,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: folderLoadRequest.type,
		onSuccess: folderLoadSuccess.type,
		onError: folderLoadFailed.type,
	});
export const createFolder = (name, resource) =>
	apiCallBegan({
		url: '/resource/classroom/folder',
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: { name, resource },
		type: 'regular',
		onStart: folderCreateRequest.type,
		onSuccess: folderCreateSuccess.type,
		onError: folderCreateFailed.type,
	});
export const editFolder = (id, name, resource) =>
	apiCallBegan({
		url: '/resource/classroom/folder/change/' + id,
		method: 'put',

		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: { name, resource },

		type: 'regular',
		onStart: folderEditRequest.type,
		onSuccess: folderEditSuccess.type,
		onError: folderEditFailed.type,
	});
export const deleteFolder = (id) =>
	apiCallBegan({
		url: '/resource/classroom/folder/change/' + id,
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: folderDeleteRequest.type,
		onSuccess: folderDeleteSuccess.type,
		onError: folderDeleteFailed.type,
	});
