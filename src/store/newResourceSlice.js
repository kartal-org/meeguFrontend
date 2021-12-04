import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./actions/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let toastId;

export const newResourceSlice = createSlice({
	name: "newResource",
	initialState: {
		currentResource: null,
		resources: [],
		status: "idle",
	},
	reducers: {
		loadResourcesRequest: (state, action) => {
			state.status = "loading";
		},
		loadResourcesSuccess: (state, action) => {
			state.status = "Resources Load success";
			state.resources = action.payload;
		},
		loadResourcesFailed: (state, action) => {
			state.status = "Resources Load failed";
			alert("Resources Load Failed!");
		},
		retrieveResourcesRequest: (state, action) => {
			state.status = "loading";
		},
		retrieveResourcesSuccess: (state, action) => {
			state.status = "Resources Retrieve success";
			state.currentResource = action.payload;
		},
		retrieveResourcesFailed: (state, action) => {
			state.status = "Resources Retrieve failed";
			alert("Resources Load Failed!");
		},
		addResourcesRequest: (state, action) => {
			state.status = "loading";
		},
		addResourcesSuccess: (state, action) => {
			state.status = "Resources Create success";
			state.resources.unshift(action.payload);
			// alert('Resources Create Success!');
			toast.update(toastId, {
				render: "Created successfully",
				autoClose: 3000,
				type: "success",
				isLoading: false,
			});
		},
		addResourcesFailed: (state, action) => {
			state.status = "Resources Create failed";
			// alert('Resources Create Failed!');
			toast.update(toastId, {
				render: "Failed to create",
				autoClose: 3000,
				type: "error",
				isLoading: false,
			});
		},
		editResourcesRequest: (state, action) => {
			state.status = "loading";
		},
		editResourcesSuccess: (state, action) => {
			state.status = "Resources Edit success";
			state.currentResource = action.payload;
			// alert('Resources Edit Success!');
			toast.update(toastId, {
				render: "Edited successfully",
				autoClose: 3000,
				type: "success",
				isLoading: false,
			});
		},
		editResourcesFailed: (state, action) => {
			state.status = "Resources Edit failed";
			// alert('Resources Edit Failed!');
			toast.update(toastId, {
				render: "Failed to edit",
				autoClose: 3000,
				type: "error",
				isLoading: false,
			});
		},
		deleteResourcesRequest: (state, action) => {
			state.status = "loading";
		},
		deleteResourcesSuccess: (state, action) => {
			state.status = "Resources Delete success";
			state.currentResource = null;
			// alert('Resources Delete Success!');
			toast.update(toastId, {
				render: "Deleted successfully",
				autoClose: 3000,
				type: "success",
				isLoading: false,
			});
		},
		deleteResourcesFailed: (state, action) => {
			state.status = "Resources Delete failed";
			// alert('Resources Edit Failed!');
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
	loadResourcesRequest,
	loadResourcesSuccess,
	loadResourcesFailed,
	addResourcesRequest,
	addResourcesSuccess,
	addResourcesFailed,
	retrieveResourcesRequest,
	retrieveResourcesSuccess,
	retrieveResourcesFailed,
	editResourcesRequest,
	editResourcesSuccess,
	editResourcesFailed,
	deleteResourcesRequest,
	deleteResourcesSuccess,
	deleteResourcesFailed,
} = newResourceSlice.actions;

export default newResourceSlice.reducer;

//action creators

export const getResources = (link) =>
	apiCallBegan({
		url: link,
		method: "get",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: loadResourcesRequest.type,
		onSuccess: loadResourcesSuccess.type,
		onError: loadResourcesFailed.type,
	});

export const addResource = (link, formdata) =>
	apiCallBegan({
		url: link,
		method: "post",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		data: formdata,
		type: "regular",
		onStart: addResourcesRequest.type,
		onSuccess: addResourcesSuccess.type,
		onError: addResourcesFailed.type,
	});
export const retrieveResource = (link) =>
	apiCallBegan({
		url: link,
		method: "get",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},

		type: "regular",
		onStart: retrieveResourcesRequest.type,
		onSuccess: retrieveResourcesSuccess.type,
		onError: retrieveResourcesFailed.type,
	});
export const editResource = (link, formData) =>
	apiCallBegan({
		url: link,
		method: "patch",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		data: formData,
		type: "regular",
		onStart: editResourcesRequest.type,
		onSuccess: editResourcesSuccess.type,
		onError: editResourcesFailed.type,
	});
export const deleteResource = (link) =>
	apiCallBegan({
		url: link,
		method: "delete",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},

		type: "regular",
		onStart: deleteResourcesRequest.type,
		onSuccess: deleteResourcesSuccess.type,
		onError: deleteResourcesFailed.type,
	});
