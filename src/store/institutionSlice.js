import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./actions/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

let toastId;

export const institutionSlice = createSlice({
	name: "institutions",
	initialState: {
		currentInstitution: null,
		currentResource: null,
		classes: [],
		resources: [],
		resourceFolder: [],
		files: [],
		isLoading: false,
		loadingFolders: false,
		loadingFiles: false,
	},
	reducers: {
		//actions => action handlers
		//use this when you talk to the state

		loadRequest: (state, action) => {
			state.isLoading = true;
		},

		loadSuccess: (state, action) => {
			state.classes = action.payload;
			state.isLoading = false;
		},
		loadFailed: (state, action) => {
			state.classes = null;
			state.isLoading = false;
			alert("Institution Load Failed!");
		},
		loadCurrentInstitutionRequest: (state, action) => {},
		loadCurrentInstitutionSuccess: (state, action) => {
			state.currentInstitution = action.payload;
			alert("Current Institution Load Success!");
		},
		loadCurrentInstitutionFailed: (state, action) => {
			window.location.href = "/institutions";
			alert("Current Institution Load Failed!");
		},
		editCurrentInstitutionRequest: (state, action) => {
			toastId = toast.loading("Request is being processed");
		},
		editCurrentInstitutionSuccess: (state, action) => {
			state.currentInstitution = action.payload;
			toast.update(toastId, {
				render: "Edited successfully",
				type: "success",
				autoClose: 3000,
				isLoading: false,
			});
			// alert('Current Institution Edit Success!');
		},
		editCurrentInstitutionFailed: (state, action) => {
			toast.update(toastId, {
				render: "Failed to edit",
				type: "error",
				autoClose: 3000,
				isLoading: false,
			});
			// alert('Current Institution Edit Failed!');
		},
		deleteCurrentInstitutionRequest: (state, action) => {
			toastId = toast.loading("Request is being processed");
		},
		deleteCurrentInstitutionSuccess: (state, action) => {
			state.currentInstitution = null;
			toast.update(toastId, {
				render: "Institution Deleted!",
				type: "success",
				autoClose: 3000,
				isLoading: false,
			});
			window.location.href = "/institutions";
			// alert('Current Institution Delete Success!');
		},
		deleteCurrentInstitutionFailed: (state, action) => {
			toast.update(toastId, {
				render: "Delete Failed!",
				type: "error",
				autoClose: 3000,
				isLoading: false,
			});
			// alert('Current Institution Delete Failed!');
		},

		addSuccess: (state, action) => {
			state.classes.unshift({
				id: action.payload.id,
				instName: action.payload.instName,
				instCategory: action.payload.instCategory,
				instDesc: action.payload.instDesc,
				owner: action.payload.owner,
			});
			toast.update(toastId, {
				render: "Institution Added!",
				type: "success",
				autoClose: 2000,
				isLoading: false,
			});
			// alert('Create Institution Success!');
		},
		addFailed: (state, action) => {
			toast.update(toastId, {
				render: "Failed to add institution",
				type: "error",
				autoClose: 3000,
				isLoading: false,
			});
			// alert('Create Institution Failed!');
		},
		addRequest: (state, action) => {
			toastId = toast.loading("Request is being processed");
		},
		updateSuccess: (state, action) => {
			alert("Update Institution Success!");
		},
		deleteSuccess: (state, action) => {
			alert("Delete Institution Success!");
		},
		// For Resources
	},
});

const {
	joinInstitutionRequest,
	joinInstitutionSuccess,
	joinInstitutionFailed,
	deleteCurrentInstitutionRequest,
	deleteCurrentInstitutionSuccess,
	deleteCurrentInstitutionFailed,
	editCurrentInstitutionRequest,
	editCurrentInstitutionSuccess,
	editCurrentInstitutionFailed,
	loadCurrentInstitutionRequest,
	loadCurrentInstitutionSuccess,
	loadCurrentInstitutionFailed,
	updateResourceRequest,
	updateResourceSuccess,
	updateResourceFailed,
	deleteResourceRequest,
	deleteResourceSuccess,
	deleteResourceFailed,
	createFilesRequest,
	createFilesSuccess,
	createFilesFailed,
	createFolderRequest,
	createFolderSuccess,
	createFolderFailed,
	loadRequest,
	loadSuccess,
	loadFailed,
	addSuccess,
	updateSuccess,
	deleteSuccess,
	loadResourcesRequest,
	loadResourcesSuccess,
	loadResourcesFailed,
	loadCurrentResourceRequest,
	loadCurrentResourceSuccess,
	loadCurrentResourceFailed,
	createResourcesRequest,
	createResourcesSuccess,
	createResourcesFailed,
	loadFolderRequest,
	loadFolderSuccess,
	loadFolderFailed,
	loadFilesRequest,
	loadFilesSuccess,
	loadFilesFailed,
} = institutionSlice.actions;

export default institutionSlice.reducer;

//action Creator
export const getInstitutionManage = () =>
	apiCallBegan({
		url: "/institutions/myInstitution",
		method: "get",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: loadRequest.type,
		onSuccess: loadSuccess.type,
		onError: loadFailed.type,
	});
export const getInstitution = () =>
	apiCallBegan({
		url: "/institutions/list",
		method: "get",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: loadRequest.type,
		onSuccess: loadSuccess.type,
		onError: loadFailed.type,
	});
export const createInstitution = (name, subject, owner) =>
	apiCallBegan({
		url: "/institutions/create",
		method: "post",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		data: { name, subject, owner },
		type: "regular",
		onStart: loadRequest.type,
		onSuccess: addSuccess.type,
	});

// For Resources
///selectors

export const getUser = createSelector(
	(state) => state.user.user,
	(user) => user
);
