import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./actions/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let toastId;

export const recommendationSlice = createSlice({
	name: "recommendation",
	initialState: {
		currentRecommendation: null,
		recommendations: [],

		status: "idle",
	},
	reducers: {
		loadrecommendationRequest: (state, action) => {
			state.status = "loading";
		},
		loadrecommendationSuccess: (state, action) => {
			state.status = "recommendation load success";
			state.recommendations = action.payload;
		},
		loadrecommendationFailed: (state, action) => {
			state.status = "recommendation load failed";
			state.recommendations = [];
		},
		addrecommendationRequest: (state, action) => {
			state.status = "loading";
			toastId = toast.loading("Request is being processed");
		},
		addrecommendationSuccess: (state, action) => {
			state.status = "recommendation add success";
			state.recommendations.unshift(action.payload);
			toast.update(toastId, {
				render: "Succesfully added",
				autoClose: 3000,
				type: "success",
				isLoading: false,
			});
		},
		addrecommendationFailed: (state, action) => {
			state.status = "recommendation add failed";
			// alert('Adding recommendation failed');
			toast.update(toastId, {
				render: "Failed to add",
				autoClose: 3000,
				type: "error",
				isLoading: false,
			});
		},
		editrecommendationRequest: (state, action) => {
			state.status = "loading";
			toastId = toast.loading("Request is being processed");
		},
		editrecommendationSuccess: (state, action) => {
			const index = state.recommendations.findIndex(
				(item) => item.id === action.payload.id
			);
			state.recommendations[index] = action.payload;
			state.status = "recommendation edit success";
			toast.update(toastId, {
				render: "Edited successfully",
				autoClose: 3000,
				type: "success",
				isLoading: false,
			});
		},
		editrecommendationFailed: (state, action) => {
			state.status = "recommendation edit failed";
			// alert('Editing recommendation failed');
			toast.update(toastId, {
				render: "Failed to edit",
				autoClose: 3000,
				type: "error",
				isLoading: false,
			});
		},
		deleterecommendationRequest: (state, action) => {
			state.status = "loading";
			toastId = toast.loading("Request is being processed");
		},
		deleterecommendationSuccess: (state, action) => {
			const filtered = state.recommendations.filter(
				(item) => item.id !== action.payload.id
			);
			state.recommendations = filtered;
			state.status = "recommendation delete success";
			toast.update(toastId, {
				render: "Deleted successfully",
				autoClose: 3000,
				type: "success",
				isLoading: false,
			});
		},
		deleterecommendationFailed: (state, action) => {
			state.status = "recommendation delete failed";
			// alert('Delete recommendation failed');
			toast.update(toastId, {
				render: "Failed to delete",
				autoClose: 3000,
				type: "error",
				isLoading: false,
			});
		},
		retrieverecommendationRequest: (state, action) => {
			state.status = "loading";
		},
		retrieverecommendationSuccess: (state, action) => {
			state.currentRecommendation = action.payload;
			state.status = "recommendation retrieve success";
		},
		retrieverecommendationFailed: (state, action) => {
			state.status = "recommendation retrieve failed";
			alert("Retrieval failed");
		},
	},
});

const {
	loadrecommendationRequest,
	loadrecommendationSuccess,
	loadrecommendationFailed,
	addrecommendationRequest,
	addrecommendationSuccess,
	addrecommendationFailed,
	editrecommendationRequest,
	editrecommendationSuccess,
	editrecommendationFailed,
	deleterecommendationRequest,
	deleterecommendationSuccess,
	deleterecommendationFailed,
	retrieverecommendationRequest,
	retrieverecommendationSuccess,
	retrieverecommendationFailed,
} = recommendationSlice.actions;

export default recommendationSlice.reducer;

//action creators

export const createrecommendation = (link, formData) =>
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
		onStart: addrecommendationRequest.type,
		onSuccess: addrecommendationSuccess.type,
		onError: addrecommendationFailed.type,
	});

export const getrecommendations = (link) =>
	apiCallBegan({
		url: link,
		method: "get",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: loadrecommendationRequest.type,
		onSuccess: loadrecommendationSuccess.type,
		onError: loadrecommendationFailed.type,
	});
export const editrecommendation = (link, formData) =>
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
		onStart: editrecommendationRequest.type,
		onSuccess: editrecommendationSuccess.type,
		onError: editrecommendationFailed.type,
	});
export const deleterecommendation = (link) =>
	apiCallBegan({
		url: link,
		method: "delete",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: deleterecommendationRequest.type,
		onSuccess: deleterecommendationSuccess.type,
		onError: deleterecommendationFailed.type,
	});
export const retrieverecommendation = (link) =>
	apiCallBegan({
		url: link,
		method: "get",
		headers: {
			Authorization: "Bearer " + localStorage.getItem("access_token"),
			"Content-Type": "application/json",
			accept: "application/json",
		},
		type: "regular",
		onStart: retrieverecommendationRequest.type,
		onSuccess: retrieverecommendationSuccess.type,
		onError: retrieverecommendationFailed.type,
	});

export const selectrecommendation = (recommendation) =>
	retrieverecommendationSuccess(recommendation);
