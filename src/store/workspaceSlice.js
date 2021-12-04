import { createSlice } from '@reduxjs/toolkit';

import { apiCallBegan } from './actions/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let toastId2;
let toastId;

export const workspaceSlice = createSlice({
	name: 'works',
	initialState: {
		currentWorkspace: null,
		workspaces: [],
		status: 'idle',
	},
	reducers: {
		workspaceLoadRequest: (state, action) => {
			state.status = 'loading';
		},
		workspaceLoadSuccess: (state, action) => {
			state.status = 'workspace load success';
			state.workspaces = [];
			action.payload.map((val) => {
				if (val.hasOwnProperty('workspace')) {
					state.workspaces.push(val.workspace);
				} else {
					state.workspaces.push(val);
				}
			});
			// state.workspaces = action.payload;
		},
		workspaceLoadFailed: (state, action) => {
			state.status = 'workspace load failed';
			alert('Workspace Load Failed!');
		},
		currentWorkspaceLoadRequest: (state, action) => {},
		currentWorkspaceLoadSuccess: (state, action) => {
			state.currentWorkspace = action.payload;
		},
		currentWorkspaceLoadFailed: (state, action) => {
			alert('Current Workspace Load Failed!');
		},
		workspaceAddRequest: (state, action) => {},
		workspaceAddSuccess: (state, action) => {
			// state.workspaces.unshift(action.payload);
			if (action.payload.hasOwnProperty('workspace')) {
				state.workspaces.unshift(action.payload.workspace);
			} else {
				state.workspaces.unshift(action.payload);
			}

			state.currentWorkspace = action.payload;
			alert('Workspace Create Success!');
		},
		workspaceAddFailed: (state, action) => {
			alert('Workspace Create Failed!');
		},

		worksUpdateRequest: (state, action) => {},
		worksUpdateSuccess: (state, action) => {
			state.currentWorkspace = action.payload;
			alert('Workspace Update Success!');
		},
		worksUpdateFailed: (state, action) => {
			alert('Workspace Update Failed!');
		},
		worksDeleteRequest: (state, action) => {},
		worksDeleteSuccess: (state, action) => {
			state.currentWorkspace = null;
			alert('Workspace Delete Success!');
		},
		worksDeleteFailed: (state, action) => {
			alert('Workspace Update Failed!');
		},

		worksDeleted: (state, action) => {},
	},
});

const {
	workspaceLoadRequest,
	workspaceLoadSuccess,
	workspaceLoadFailed,
	currentWorkspaceLoadRequest,
	currentWorkspaceLoadSuccess,
	currentWorkspaceLoadFailed,
	worksRequestFinished,
	workspaceAddRequest,
	workspaceAddSuccess,
	workspaceAddFailed,
	worksUpdateRequest,
	worksUpdateSuccess,
	worksUpdateFailed,
	worksDeleteRequest,
	worksDeleteSuccess,
	worksDeleteFailed,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;

//action creators

export const getWorkspaces = (link) =>
	apiCallBegan({
		url: link,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: workspaceLoadRequest.type,
		onSuccess: workspaceLoadSuccess.type,
		onError: workspaceLoadFailed.type,
	});
export const getCurrentWorkspace = (id) =>
	apiCallBegan({
		url: '/workspace/change/' + id,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: currentWorkspaceLoadRequest.type,
		onSuccess: currentWorkspaceLoadSuccess.type,
		onError: currentWorkspaceLoadFailed.type,
	});
export const createWorkspace = (link, formdata) =>
	apiCallBegan({
		url: link,
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: formdata,
		type: 'regular',
		onStart: workspaceAddRequest.type,
		onSuccess: workspaceAddSuccess.type,
		onError: workspaceAddFailed.type,
	});
export const updateWorkspace = (link, formdata) =>
	apiCallBegan({
		url: link,
		method: 'patch',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: formdata,
		type: 'regular',
		onStart: worksUpdateRequest.type,
		onSuccess: worksUpdateSuccess.type,
		onError: worksUpdateFailed.type,
	});
export const deleteWorkspace = (id) =>
	apiCallBegan({
		url: '/workspace/change/' + id,
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},

		type: 'regular',
		onStart: worksDeleteRequest.type,
		onSuccess: worksDeleteSuccess.type,
		onError: worksDeleteFailed.type,
	});
