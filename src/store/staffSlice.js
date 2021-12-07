import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./actions/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let toastId;

export const staffSlice = createSlice({
	name: "Staffs",
	initialState: {
		currentStaff: null,
		staffs: [],
		currentStaffType: null,
		staffTypes: [],
		status: false,
	},
	reducers: {
		loadStaffRequest: (state, action) => {
			state.status = "loading";
		},
		loadStaffSuccess: (state, action) => {
			state.status = "staff load success";
			state.staffs = action.payload;
		},
		loadStaffFailed: (state, action) => {
			state.status = "staff load failed";
			state.staffs = [];
			alert("Staffs Load Failed!");
		},
		loadStaffTypeRequest: (state, action) => {
			state.status = "loading";
		},
		loadStaffTypeSuccess: (state, action) => {
			state.status = "staff type load success";
			state.staffTypes = action.payload;
		},
		loadStaffTypeFailed: (state, action) => {
			state.status = "staff type load failed";
			state.staffTypes = [];
			alert("Staff type Load Failed!");
		},
		addStaffRequest: (state, action) => {
			state.status = "loading";
			toastId = toast.loading("Request is being processed");
		},
		addStaffSuccess: (state, action) => {
			state.status = "staff add success";
			state.staffs.unshift(action.payload);
			// alert('Staff add Success!');
			toast.update(toastId, {
				render: "Successfully added",
				autoClose: 3000,
				type: "success",
				isLoading: false,
			});
		},
		addStaffFailed: (state, action) => {
			state.status = "staff add failed";
			// alert('Staff add Failed!');
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
	loadStaffRequest,
	loadStaffSuccess,
	loadStaffFailed,
	loadStaffTypeRequest,
	loadStaffTypeSuccess,
	loadStaffTypeFailed,
	addStaffRequest,
	addStaffSuccess,
	addStaffFailed,
} = staffSlice.actions;

export default staffSlice.reducer;

//action creators

export const getStaffs = (link) =>
	apiCallBegan({
		url: link,
		method: "get",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: loadStaffRequest.type,
		onSuccess: loadStaffSuccess.type,
		onError: loadStaffFailed.type,
	});
export const getStaffTypes = (link) =>
	apiCallBegan({
		url: link,
		method: "get",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: loadStaffTypeRequest.type,
		onSuccess: loadStaffTypeSuccess.type,
		onError: loadStaffTypeFailed.type,
	});
export const addStaff = (link, formdata) =>
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
		onStart: addStaffRequest.type,
		onSuccess: addStaffSuccess.type,
		onError: addStaffFailed.type,
	});
