import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./actions/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let toastId;

export const fileSlice = createSlice({
	name: "file",
	initialState: {
		currentFile: null,
		files: [],
		files2: [],
		uploadFiles: [],
		status: "idle",
	},
	reducers: {
		loadFileRequest: (state, action) => {
			state.status = "loading";
		},
		loadFileSuccess: (state, action) => {
			state.status = "file load success";
			const test = action.payload;
			if (test[0]) {
				if (test[0].hasOwnProperty("content")) {
					state.files = action.payload;
				}
				if (test[0].hasOwnProperty("file")) {
					state.uploadFiles = action.payload;
				}
			}
		},
		loadFileFailed: (state, action) => {
			// state.files = [];
			// state.uploadFiles = [];
			alert("Files Load Failed!");
		},
		retrieveFileRequest: (state, action) => {
			state.status = "loading";
		},
		retrieveFileSuccess: (state, action) => {
			state.status = 'file retrieve success';
			console.log(action.payload);
			if (action.payload.hasOwnProperty('file') || action.payload.hasOwnProperty('folder')) {
				if (!action.payload.hasOwnProperty('folder')) {
					state.currentFile = action.payload.file;
				}
				state.currentFile = action.payload;
			} else {
				state.currentFile = action.payload;
			}
			toast.update(toastId, {
				render: "Successfully retreived files",
				autoClose: 3000,
				type: "success",
				isLoading: false,
			});
		},
		retrieveFileFailed: (state, action) => {
			// alert('Files Retrieve Failed!');
			toast.update(toastId, {
				render: "Failed to retreive files",
				autoClose: 3000,
				type: "error",
				isLoading: false,
			});
		},
		addFileRequest: (state, action) => {
			state.status = "loading";
			toastId = toast.loading("Request is being processed");
		},
		addFileSuccess: (state, action) => {
			state.status = "file add success";
			state.files.push(action.payload);
			// alert('Files Add Success!');
			toast.update(toastId, {
				render: "Sucessfully added",
				autoClose: 3000,
				type: "success",
				isLoading: false,
			});
		},
		addFileFailed: (state, action) => {
			state.status = "file add failed";
			// alert('Files Add Failed!');
			toast.update(toastId, {
				render: "Failed to add",
				autoClose: 3000,
				type: "error",
				isLoading: false,
			});
		},
		addFile2Request: (state, action) => {
			state.status = 'loading';
		},
		addFile2Success: (state, action) => {
			state.status = 'file add success';
			state.files2.push(action.payload);
			// alert('Files Add Success!');
			toast.update(toastId, {
				render: 'Sucessfully added',
				autoClose: 3000,
				type: 'success',
				isLoading: false,
			});
		},
		addFile2Failed: (state, action) => {
			state.status = 'file add failed';
			// alert('Files Add Failed!');
			toast.update(toastId, {
				render: 'Failed to add',
				autoClose: 3000,
				type: 'error',
				isLoading: false,
			});
		},
		editFileRequest: (state, action) => {
			state.status = "loading";
			toastId = toast.loading("Request is being processed");
		},
		editFileSuccess: (state, action) => {
			const index = state.files.findIndex(
				(item) => item.id === action.payload.id
			);
			state.files[index] = action.payload;
			state.status = "file edit success";
			// alert('Files Edit Success!');
			toast.update(toastId, {
				render: "Edited successfully",
				autoClose: 3000,
				type: "success",
				isLoading: false,
			});
		},
		editFileFailed: (state, action) => {
			state.status = "file edit failed";
			// alert('Files Edit Failed!');
			toast.update(toastId, {
				render: "Failed to edit",
				autoClose: 3000,
				type: "error",
				isLoading: false,
			});
		},
		deleteFileRequest: (state, action) => {
			state.status = "loading";
			toastId = toast.loading("Request is being processed");
		},
		deleteFileSuccess: (state, action) => {
			if (action.payload.hasOwnProperty("content")) {
				const filtered = state.files.filter(
					(item) => item.id !== action.payload.id
				);
				state.files = filtered;
			}
			if (action.payload.hasOwnProperty("file")) {
				const filtered = state.uploadFiles.filter(
					(item) => item.id !== action.payload.id
				);
				state.files = filtered;
			}

			state.status = "file delete success";
			// alert('Files Delete Success!');
			toast.update(toastId, {
				render: "Deleted successfully",
				autoClose: 3000,
				type: "success",
				isLoading: false,
			});
		},
		deleteFileFailed: (state, action) => {
			state.status = "file delete failed";
			// alert('files delete failed');
			// alert('Files Delete Failed!');
			toast.update(toastId, {
				render: "Failed to delete",
				autoClose: 3000,
				type: "error",
				isLoading: false,
			});
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
	addFile2Request,
	addFile2Success,
	addFile2Failed,
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
		method: "get",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: loadFileRequest.type,
		onSuccess: loadFileSuccess.type,
		onError: loadFileFailed.type,
	});
export const addFile = (link, formData) =>
	apiCallBegan({
		url: link,
		method: "post",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		data: formData,
		onStart: addFileRequest.type,
		onSuccess: addFileSuccess.type,
		onError: addFileFailed.type,
	});
export const addFile2 = (link, formData) =>
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
		onStart: addFile2Request.type,
		onSuccess: addFile2Success.type,
		onError: addFile2Failed.type,
	});
export const retrieveFile = (link) =>
	apiCallBegan({
		url: link,
		method: "get",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: retrieveFileRequest.type,
		onSuccess: retrieveFileSuccess.type,
		onError: retrieveFileFailed.type,
	});
export const editfile = (link, formData) =>
	apiCallBegan({
		url: link,
		method: "patch",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		data: formData,
		onStart: editFileRequest.type,
		onSuccess: editFileSuccess.type,
		onError: editFileFailed.type,
	});
export const deletefile = (link) =>
	apiCallBegan({
		url: link,
		method: "delete",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: deleteFileRequest.type,
		onSuccess: deleteFileSuccess.type,
		onError: deleteFileFailed.type,
	});
