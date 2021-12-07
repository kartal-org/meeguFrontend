import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./actions/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let toastId;

export const memberSlice = createSlice({
	name: "member",
	initialState: {
		currentMember: null,
		members: [],
		members2: [],
		currentMemberType: null,
		memberTypes: [],
		status: "idle",
	},
	reducers: {
		loadMemberRequest: (state, action) => {
			state.status = "loading";
		},
		loadMemberSuccess: (state, action) => {
			state.status = "member load success";
			state.members = action.payload;
		},
		loadMemberFailed: (state, action) => {
			state.status = "member load failed";
			state.members = [];
			alert("members Load Failed!");
		},
		loadMemberRequest2: (state, action) => {
			state.status = "loading";
			state.members2 = [];
		},
		loadMemberSuccess2: (state, action) => {
			state.status = "member load success";
			state.members2 = action.payload;
		},
		loadMemberFailed2: (state, action) => {
			state.status = "member load failed";
			alert("members Load Failed!");
		},
		loadMemberTypeRequest: (state, action) => {
			state.status = "loading";
		},
		loadMemberTypeSuccess: (state, action) => {
			state.status = "member type load success";
			state.memberTypes = action.payload;
		},
		loadMemberTypeFailed: (state, action) => {
			state.status = "member type load failed";
			state.memberTypes = [];
			alert("member type Load Failed!");
		},
		addMemberRequest: (state, action) => {
			state.status = "loading";
			toastId = toast.loading("Request is being processed");
		},
		addMemberSuccess: (state, action) => {
			state.status = "member add success";
			state.members.unshift(action.payload);
			// alert('member add Success!');
			toast.update(toastId, {
				render: "Added successfully",
				autoClose: 3000,
				type: "success",
				isLoading: false,
			});
		},
		addMemberFailed: (state, action) => {
			state.status = "Member add failed";
			// alert('Member add Failed!');
			toast.update(toastId, {
				render: "Failed to add",
				autoClose: 3000,
				type: "error",
				isLoading: false,
			});
		},
	},
});

const {
	loadMemberRequest,
	loadMemberSuccess,
	loadMemberFailed,
	loadMemberRequest2,
	loadMemberSuccess2,
	loadMemberFailed2,
	loadMemberTypeRequest,
	loadMemberTypeSuccess,
	loadMemberTypeFailed,
	addMemberRequest,
	addMemberSuccess,
	addMemberFailed,
} = memberSlice.actions;

export default memberSlice.reducer;

//action creators

export const getMembers = (link) =>
	apiCallBegan({
		url: link,
		method: "get",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: loadMemberRequest.type,
		onSuccess: loadMemberSuccess.type,
		onError: loadMemberFailed.type,
	});
export const getMembers2 = (link) =>
	apiCallBegan({
		url: link,
		method: "get",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: loadMemberRequest.type,
		onSuccess: loadMemberSuccess.type,
		onError: loadMemberFailed.type,
	});
export const getMemberTypes = (link) =>
	apiCallBegan({
		url: link,
		method: "get",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: loadMemberTypeRequest.type,
		onSuccess: loadMemberTypeSuccess.type,
		onError: loadMemberTypeFailed.type,
	});
export const addMember = (link, formdata) =>
	apiCallBegan({
		url: link,
		method: "post",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		data: formdata,
		onStart: addMemberRequest.type,
		onSuccess: addMemberSuccess.type,
		onError: addMemberFailed.type,
	});
