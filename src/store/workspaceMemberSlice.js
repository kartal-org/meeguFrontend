import { createSlice } from "@reduxjs/toolkit";

import { apiCallBegan } from "./actions/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let toastId;

export const workspaceMemberSlice = createSlice({
	name: "worksMember",
	initialState: {
		currentMember: null,
		members: [],
		sharedWorkspace: [],
		isLoading: false,
	},
	reducers: {
		memberLoadRequest: (state, action) => {
			state.isLoading = true;
		},
		memberLoadSuccess: (state, action) => {
			state.isLoading = false;
			state.members = action.payload;
		},
		memberLoadFailed: (state, action) => {
			console.log(action.error);
			alert("Member Load Failed!");
		},

		memberJoinRequest: (state, action) => {
			state.isLoading = true;
			toastId = toast.loading("Request is being processed");
		},
		memberJoinSuccess: (state, action) => {
			state.isLoading = false;
			state.sharedWorkspace.unshift(action.payload);
			// alert('Member Join Success!');
			toast.update(toastId, {
				render: "Successfully joined",
				autoClose: 3000,
				type: "success",
				isLoading: false,
			});
		},
		memberJoinFailed: (state, action) => {
			// alert('Member Join Failed!');
			toast.update(toastId, {
				render: "Failed to join",
				autoClose: 3000,
				type: "error",
				isLoading: false,
			});
		},
		sharedWorkspaceRequest: (state, action) => {
			state.isLoading = true;
		},
		sharedWorkspaceSuccess: (state, action) => {
			state.isLoading = false;
			state.sharedWorkspace = action.payload;
			alert("Shared Workspace Load Success!");
			// toast.update(toastId, {
			// 	render: "Successfully shared",
			// 	autoClose: 3000,
			// 	type: "success",
			// 	isLoading: false,
			// });
		},
		sharedWorkspaceFailed: (state, action) => {
			state.isLoading = false;
			alert("Shared Workspace Load Failed!");
			// toast.update(toastId, {
			// 	render: "Failed to share",
			// 	autoClose: 3000,
			// 	type: "error",
			// 	isLoading: false,
			// });
		},
	},
});

const {
	memberLoadRequest,
	memberLoadSuccess,
	memberLoadFailed,
	sharedWorkspaceRequest,
	sharedWorkspaceSuccess,
	sharedWorkspaceFailed,
	memberJoinRequest,
	memberJoinSuccess,
	memberJoinFailed,
} = workspaceMemberSlice.actions;

export default workspaceMemberSlice.reducer;

//action creators

export const getMembers = (workspace) =>
	apiCallBegan({
		url: "/workspace/members/" + workspace,
		method: "get",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: memberLoadRequest.type,
		onSuccess: memberLoadSuccess.type,
		onError: memberLoadFailed.type,
	});
export const joinWorkspace = (workspace) =>
	apiCallBegan({
		url: "/workspace/join",
		method: "post",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		data: { workspace },
		onStart: memberJoinRequest.type,
		onSuccess: memberJoinSuccess.type,
		onError: memberJoinFailed.type,
	});

export const getSharedWorkspace = () =>
	apiCallBegan({
		url: "/workspace/shared",
		method: "get",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: sharedWorkspaceRequest.type,
		onSuccess: sharedWorkspaceSuccess.type,
		onError: sharedWorkspaceFailed.type,
	});

export const getAvailableMember = (classroom) =>
	apiCallBegan({
		url: "/workspace/members/available/" + classroom,
		method: "get",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: memberLoadRequest.type,
		onSuccess: memberLoadSuccess.type,
		onError: memberLoadFailed.type,
	});

export const addWorkspaceMember = (workspace, user) =>
	apiCallBegan({
		url: "/workspace/members/" + workspace,
		method: "post",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		data: { user },
		type: "regular",
		onStart: memberJoinRequest.type,
		onSuccess: memberJoinSuccess.type,
		onError: memberJoinFailed.type,
	});
