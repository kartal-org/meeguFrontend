import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./actions/api";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let toastId;

export const newClassroomSlice = createSlice({
	name: "newClassroom",
	initialState: {
		currentClassroom: null,
		classes: [],
		status: "idle",
	},
	reducers: {
		loadClassroomRequest: (state, action) => {
			state.status = "Classroom loading";
			// toastId = toast.loading('Logging in...');
		},

		loadClassroomSuccess: (state, action) => {
			state.classes = [];
			// toast.update(toastId, {
			// 	render: 'All is good',
			// 	autoClose: 3000,
			// 	type: 'success',
			// 	isLoading: false,
			// });
			action.payload.map((val) => {
				const { classrooms } = val;
				state.classes.unshift(classrooms[0]);
			});
			console.log(action.payload);
			// if (action.payload[0]) {
			// 	state.classes = action.payload[0].classrooms;
			// }
			state.status = "Classroom load success";
		},
		loadClassroomFailed: (state, action) => {
			state.classes = null;
			state.status = "Classroom load failed";
			alert("Classroom Load Failed!");
			// toast.update(toastId, {
			// 	render: 'Login Failed!',
			// 	type: 'error',
			// 	isLoading: false,
			// });
		},

		loadCurrentClassroomRequest: (state, action) => {
			state.status = "Classroom loading";
		},

		loadCurrentClassroomSuccess: (state, action) => {
			state.currentClassroom = action.payload;
			state.status = "Classroom load success";
		},
		loadCurrentClassroomFailed: (state, action) => {
			state.status = "Classroom load failed";
			alert("Current Classroom Load Failed!");
		},

		createClassroomLoadRequest: (state, action) => {
			state.status = "Classroom add loading";
			toastId = toast.loading("Request is being processed");
		},

		createClassroomSuccess: (state, action) => {
			console.log(action.payload);
			state.classes.unshift(action.payload);
			state.currentClassroom = action.payload;
			state.status = "Classroom add success";
			// alert('Classroom add Success!');
			toast.update(toastId, {
				render: "Created successfully",
				autoClose: 3000,
				type: "success",
				isLoading: false,
			});
		},
		createClassroomFailed: (state, action) => {
			state.status = "Classroom add failed";
			// alert('Classroom Create Failed!');
			toast.update(toastId, {
				render: "Creating has failed",
				autoClose: 3000,
				type: "error",
				isLoading: false,
			});
		},
		joinClassroomLoadRequest: (state, action) => {
			state.status = "Classroom join loading";
			toastId = toast.loading("Request is being processed");
		},

		joinClassroomSuccess: (state, action) => {
			console.log(action.payload);
			state.classes.unshift(action.payload.classrooms[0]);
			state.currentClassroom = action.payload.classrooms[0];
			state.status = "Classroom join success";
			// alert("Classroom join Success!");
			toast.update(toastId, {
				render: "Successfully joined",
				autoClose: 3000,
				type: "success",
				isLoading: false,
			});
		},
		joinClassroomFailed: (state, action) => {
			state.status = "Classroom add failed";
			// alert("Classroom join Failed!");
			toast.update(toastId, {
				render: "Failed to join",
				autoClose: 3000,
				type: "error",
				isLoading: false,
			});
		},

		classroomEditRequest: (state, action) => {
			state.status = "Classroom edit loading";
			toastId = toast.loading("Request is being processed");
		},
		classroomEditSuccess: (state, action) => {
			const index = state.classes.findIndex(
				(item) => item.id === action.payload.id
			);
			state.classes[index] = action.payload;
			state.status = "Classroom edit success";
			// alert("Classroom Edit Success!");
			toast.update(toastId, {
				render: "Edited successfully",
				autoClose: 3000,
				type: "success",
				isLoading: false,
			});
		},
		classroomEditFailed: (state, action) => {
			state.status = "Classroom edit failed";
			// alert("Classroom Edit Failed!");
			toast.update(toastId, {
				render: "Failed to edit",
				autoClose: 3000,
				type: "error",
				isLoading: false,
			});
		},
		classroomPatchRequest: (state, action) => {
			state.status = "Classroom affilate add loading";
			toastId = toast.loading("Request is being processed");
		},
		classroomPatchSuccess: (state, action) => {
			const index = state.classes.findIndex(
				(item) => item.id === action.payload.id
			);
			state.classes[index] = action.payload;
			state.currentClassroom = action.payload;
			state.status = "Classroom affilate add success";
			// alert("Classroom affilate add Success!");
			toast.update(toastId, {
				render: "Affiliate Added",
				autoClose: 3000,
				type: "success",
				isLoading: false,
			});
		},
		classroomPatchFailed: (state, action) => {
			state.status = "Classroom affilate add failed";
			// alert("Classroom affilate add Failed!");
			toast.update(toastId, {
				render: "Failed to add affiliate",
				autoClose: 3000,
				type: "error",
				isLoading: false,
			});
		},
		deleteClassroomRequest: (state, action) => {
			state.status = "Classroom delete loading";
			toastId = toast.loading("Request is being processed");
		},
		deleteClassroomSuccess: (state, action) => {
			const filtered = state.classes.filter(
				(val) => val.id != action.payload.id
			);
			state.classes = filtered;
			state.status = "Classroom delete success";
			// alert("Classroom Delete Success!");
			toast.update(toastId, {
				render: "Deleted successfully",
				autoClose: 3000,
				type: "success",
				isLoading: false,
			});
		},
		deleteClassroomFailed: (state, action) => {
			state.status = "Classroom delete failed";
			// alert("Classroom Delete Failed!");
			toast.update(toastId, {
				render: "Deletion has failed",
				autoClose: 3000,
				type: "error",
				isLoading: false,
			});
		},
	},
});

const {
	loadClassroomRequest,
	loadClassroomSuccess,
	loadClassroomFailed,
	createClassroomLoadRequest,
	createClassroomSuccess,
	createClassroomFailed,
	loadCurrentClassroomRequest,
	loadCurrentClassroomSuccess,
	loadCurrentClassroomFailed,
	classroomEditRequest,
	classroomEditSuccess,
	classroomEditFailed,
	deleteClassroomRequest,
	deleteClassroomSuccess,
	deleteClassroomFailed,
	joinClassroomLoadRequest,
	joinClassroomSuccess,
	joinClassroomFailed,
	classroomPatchRequest,
	classroomPatchSuccess,
	classroomPatchFailed,
} = newClassroomSlice.actions;

export default newClassroomSlice.reducer;

export const getClassrooms = (link) =>
	apiCallBegan({
		url: link,
		method: "get",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: loadClassroomRequest.type,
		onSuccess: loadClassroomSuccess.type,
		onError: loadClassroomFailed.type,
	});

export const addClassroom = (link, formdata) =>
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
		onStart: createClassroomLoadRequest.type,
		onSuccess: createClassroomSuccess.type,
		onError: createClassroomFailed.type,
	});
export const joinClassroom = (link, formdata) =>
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
		onStart: joinClassroomLoadRequest.type,
		onSuccess: joinClassroomSuccess.type,
		onError: joinClassroomFailed.type,
	});
export const retrieveClassroom = (link) =>
	apiCallBegan({
		url: link,
		method: "get",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: loadCurrentClassroomRequest.type,
		onSuccess: loadCurrentClassroomSuccess.type,
		onError: loadCurrentClassroomFailed.type,
	});
export const editClassroom = (link, formData, method) =>
	apiCallBegan({
		url: link,
		method: method,
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		data: formData,
		onStart: classroomEditRequest.type,
		onSuccess: classroomEditSuccess.type,
		onError: classroomEditFailed.type,
	});
export const addAffliateClassroom = (link, formData) =>
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
		onStart: classroomPatchRequest.type,
		onSuccess: classroomPatchSuccess.type,
		onError: classroomPatchFailed.type,
	});
export const deleteClassroom = (link) =>
	apiCallBegan({
		url: link,
		method: "delete",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: deleteClassroomRequest.type,
		onSuccess: deleteClassroomSuccess.type,
		onError: deleteClassroomFailed.type,
	});

export const getAdviserClassroom = () =>
	apiCallBegan({
		url: "/classroom/",
		method: "get",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: loadClassroomRequest.type,
		onSuccess: loadClassroomSuccess.type,
		onError: loadClassroomFailed.type,
	});
export const addAdviserClassroom = (form_data) =>
	apiCallBegan({
		url: "/classroom/",
		method: "post",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		data: form_data,
		type: "regular",
		onStart: createClassroomLoadRequest.type,
		onSuccess: createClassroomSuccess.type,
		onError: createClassroomFailed.type,
	});
export const editAdviserClassroom = (classroom, form_data) =>
	apiCallBegan({
		url: "/classroom/" + classroom,
		method: "patch",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		data: form_data,
		type: "regular",
		onStart: classroomEditRequest.type,
		onSuccess: classroomEditSuccess.type,
		onError: classroomEditFailed.type,
	});
export const deleteAdviserClassroom = (classroom) =>
	apiCallBegan({
		url: "/classroom/" + classroom,
		method: "delete",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: deleteClassroomRequest.type,
		onSuccess: deleteClassroomSuccess.type,
		onError: deleteClassroomFailed.type,
	});

export const getCurrentClassroom = (classroom) =>
	apiCallBegan({
		url: "/classroom/" + classroom,
		method: "get",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: loadCurrentClassroomRequest.type,
		onSuccess: loadCurrentClassroomSuccess.type,
		onError: loadCurrentClassroomFailed.type,
	});

export const getStudentClassroom = () =>
	apiCallBegan({
		url: "/classroom/my-class",
		method: "get",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: loadClassroomRequest.type,
		onSuccess: loadClassroomSuccess.type,
		onError: loadClassroomFailed.type,
	});

// export const joinClassroom = (link, formdata) =>
// 	apiCallBegan({
// 		url: link,
// 		method: 'post',
// 		headers: {
// 			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
// 			'Content-Type': 'application/json',
// 			accept: 'application/json',
// 		},
// 		data: formdata,
// 		type: 'regular',
// 		onStart: createClassroomLoadRequest.type,
// 		onSuccess: createClassroomSuccess.type,
// 		onError: createClassroomFailed.type,
// 	});
