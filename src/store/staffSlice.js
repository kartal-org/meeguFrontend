import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let toastId;

export const staffSlice = createSlice({
	name: 'Staffs',
	initialState: {
		currentStaff: null,
		staffs: [],
		currentStaffType: null,
		staffTypes: [],
		status: false,
	},
	reducers: {
		loadStaffRequest: (state, action) => {
			state.status = 'loading';
		},
		loadStaffSuccess: (state, action) => {
			state.status = 'staff load success';
			state.staffs = action.payload;
		},
		loadStaffFailed: (state, action) => {
			state.status = 'staff load failed';
			state.staffs = [];
			alert('Staffs Load Failed!');
		},
		loadStaffTypeRequest: (state, action) => {
			state.status = 'loading';
		},
		loadStaffTypeSuccess: (state, action) => {
			state.status = 'staff type load success';
			state.staffTypes = action.payload;
		},
		loadStaffTypeFailed: (state, action) => {
			state.status = 'staff type load failed';
			state.staffTypes = [];
			alert('Staff type Load Failed!');
		},
		addStaffRequest: (state, action) => {
			state.status = 'loading';
			toastId = toast.loading('Request is being processed');
		},
		addStaffSuccess: (state, action) => {
			state.status = 'staff add success';
			state.staffs.unshift(action.payload);
			// alert('Staff add Success!');
			toast.update(toastId, {
				render: 'Successfully added',
				autoClose: 3000,
				type: 'success',
				isLoading: false,
			});
		},
		addStaffFailed: (state, action) => {
			state.status = 'staff add failed';
			// alert('Staff add Failed!');
			toast.update(toastId, {
				render: 'Failed to add',
				autoClose: 3000,
				type: 'error',
				isLoading: false,
			});
		},
		addStaffTypeRequest: (state, action) => {
			state.status = 'loading';
			toastId = toast.loading('Request is being processed');
		},
		addStaffTypeSuccess: (state, action) => {
			state.status = 'staff add success';
			state.staffTypes.unshift(action.payload);
			// alert('Staff add Success!');
			toast.update(toastId, {
				render: 'Successfully added',
				autoClose: 3000,
				type: 'success',
				isLoading: false,
			});
		},
		addStaffTypeFailed: (state, action) => {
			state.status = 'staff add failed';
			// alert('Staff add Failed!');
			toast.update(toastId, {
				render: 'Failed to add',
				autoClose: 3000,
				type: 'error',
				isLoading: false,
			});
		},
		removeStaffRequest: (state, action) => {
			state.status = 'loading';
			toastId = toast.loading('Request is being processed');
		},
		removeStaffSuccess: (state, action) => {
			state.status = 'staff remove success';
			const filtered = state.staffs.filter((val) => val.id !== action.payload.id);
			state.staffs = filtered;
			// alert('Staff add Success!');
			toast.update(toastId, {
				render: 'Successfully remove',
				autoClose: 3000,
				type: 'success',
				isLoading: false,
			});
		},
		removeStaffFailed: (state, action) => {
			state.status = 'staff remove failed';
			// alert('Staff add Failed!');
			toast.update(toastId, {
				render: 'Failed to remove',
				autoClose: 3000,
				type: 'error',
				isLoading: false,
			});
		},
		editStaffRequest: (state, action) => {
			state.status = 'loading';
			toastId = toast.loading('Request is being processed');
		},
		editStaffSuccess: (state, action) => {
			state.status = 'staff remove success';
			const index = state.staffs.findIndex((item) => item.id === action.payload.id);
			state.staffs[index] = action.payload;
			// alert('Staff add Success!');
			toast.update(toastId, {
				render: 'Successfully Edit',
				autoClose: 3000,
				type: 'success',
				isLoading: false,
			});
		},
		editStaffFailed: (state, action) => {
			state.status = 'staff edit failed';
			// alert('Staff add Failed!');
			toast.update(toastId, {
				render: 'Failed to edit',
				autoClose: 3000,
				type: 'error',
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
	removeStaffRequest,
	removeStaffSuccess,
	removeStaffFailed,
	editStaffRequest,
	editStaffSuccess,
	editStaffFailed,
	addStaffTypeRequest,
	addStaffTypeSuccess,
	addStaffTypeFailed,
} = staffSlice.actions;

export default staffSlice.reducer;

//action creators

export const getStaffs = (link) =>
	apiCallBegan({
		url: link,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: loadStaffRequest.type,
		onSuccess: loadStaffSuccess.type,
		onError: loadStaffFailed.type,
	});
export const getStaffTypes = (link) =>
	apiCallBegan({
		url: link,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: loadStaffTypeRequest.type,
		onSuccess: loadStaffTypeSuccess.type,
		onError: loadStaffTypeFailed.type,
	});
export const addStaffType = (link, formdata) =>
	apiCallBegan({
		url: link,
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		data: formdata,
		onStart: addStaffTypeRequest.type,
		onSuccess: addStaffTypeSuccess.type,
		onError: addStaffTypeFailed.type,
	});
export const addStaff = (link, formdata) =>
	apiCallBegan({
		url: link,
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		data: formdata,
		onStart: addStaffRequest.type,
		onSuccess: addStaffSuccess.type,
		onError: addStaffFailed.type,
	});
export const removeStaff = (link) =>
	apiCallBegan({
		url: link,
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: removeStaffRequest.type,
		onSuccess: removeStaffSuccess.type,
		onError: removeStaffFailed.type,
	});
export const editStaff = (link, formData) =>
	apiCallBegan({
		url: link,
		method: 'patch',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: formData,
		type: 'regular',
		onStart: editStaffRequest.type,
		onSuccess: editStaffSuccess.type,
		onError: editStaffFailed.type,
	});
