import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './actions/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';

let toastId;

export const classroomSlice = createSlice({
	name: 'classroom',
	initialState: {
		currentClassroom: null,
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
			alert('Classrooms Load Failed');
		},
		loadCurrentClassroomRequest: (state, action) => {},
		loadCurrentClassroomSuccess: (state, action) => {
			state.currentClassroom = action.payload;
		},
		loadCurrentClassroomFailed: (state, action) => {
			// window.location.href = '/classroom';
		},
		editCurrentClassroomRequest: (state, action) => {
			toastId = toast.loading('Saving Changes...');
		},
		editCurrentClassroomSuccess: (state, action) => {
			state.currentClassroom = action.payload;
			toast.update(toastId, {
				render: 'Changes Saved!',
				type: 'success',
				autoClose: 3000,
				isLoading: false,
			});
		},
		editCurrentClassroomFailed: (state, action) => {
			toast.update(toastId, {
				render: 'Changes Save Failed!',
				type: 'error',
				autoClose: 3000,
				isLoading: false,
			});
		},
		deleteCurrentClassroomRequest: (state, action) => {
			toastId = toast.loading('Saving Changes...');
		},
		deleteCurrentClassroomSuccess: (state, action) => {
			state.currentClassroom = null;
			toast.update(toastId, {
				render: 'Classroom Deleted!',
				type: 'success',
				autoClose: 3000,
				isLoading: false,
			});
			window.location.href = '/classroom';
		},
		deleteCurrentClassroomFailed: (state, action) => {
			toast.update(toastId, {
				render: 'Delete Failed!',
				type: 'error',
				autoClose: 3000,
				isLoading: false,
			});
		},

		addSuccess: (state, action) => {
			state.classes.unshift({
				id: action.payload.id,
				name: action.payload.name,
				subject: action.payload.subject,
				code: action.payload.code,
				owner: action.payload.owner,
			});
			toast.update(toastId, {
				render: 'Classroom Added!',
				type: 'success',
				autoClose: 2000,
				isLoading: false,
			});
		},
		addFailed: (state, action) => {
			toast.update(toastId, {
				render: 'Classroom Added Failed!',
				type: 'error',
				autoClose: 3000,
				isLoading: false,
			});
		},
		addRequest: (state, action) => {
			toastId = toast.loading('Adding Classrooms...');
		},
		updateSuccess: (state, action) => {},
		deleteSuccess: (state, action) => {},
		// For Resources
		loadResourcesRequest: (state, action) => {
			state.isLoading = true;
		},
		loadResourcesSuccess: (state, action) => {
			state.isLoading = false;
			console.log(action.payload);
			state.resources = action.payload;
		},
		loadResourcesFailed: (state, action) => {},
		loadCurrentResourceRequest: (state, action) => {
			state.isLoading = true;
		},
		loadCurrentResourceSuccess: (state, action) => {
			state.isLoading = false;
			console.log(action.payload);
			state.currentResource = action.payload;
		},
		loadCurrentResourceFailed: (state, action) => {},

		createResourcesRequest: (state, action) => {
			toastId = toast.loading('Adding Resource...');
		},
		createResourcesSuccess: (state, action) => {
			state.resources.unshift({
				id: action.payload.id,
				name: action.payload.name,
				description: action.payload.description,
				status: action.payload.status,
				dateCreated: action.payload.dateCreated,
				dateUpdated: action.payload.dateUpdated,
				classroom: action.payload.classroom,
			});
			toast.update(toastId, {
				render: 'Resource Added!',
				type: 'success',
				autoClose: 2000,
				isLoading: false,
			});
		},
		createResourcesFailed: (state, action) => {
			toast.update(toastId, {
				render: 'Resource Added Failed!',
				type: 'error',
				autoClose: 2000,
				isLoading: false,
			});
		},
		updateResourceRequest: (state, action) => {
			toastId = toast.loading('Saving Changes...');
		},
		updateResourceSuccess: (state, action) => {
			state.currentResource = action.payload;
			toast.update(toastId, {
				render: 'Resource Updated!',
				type: 'success',
				autoClose: 2000,
				isLoading: false,
			});
		},
		updateResourceFailed: (state, action) => {
			toast.update(toastId, {
				render: 'Resource Updated Failed!',
				type: 'error',
				autoClose: 2000,
				isLoading: false,
			});
		},
		deleteResourceRequest: (state, action) => {
			toastId = toast.loading('Saving Changes...');
		},
		deleteResourceSuccess: (state, action) => {
			state.currentResource = null;
			toast.update(toastId, {
				render: 'Resource Deleted!',
				type: 'success',
				autoClose: 2000,
				isLoading: false,
			});
			window.location.href = '/classroom/' + localStorage.getItem('currentClassroom');
		},
		deleteResourceFailed: (state, action) => {
			toast.update(toastId, {
				render: 'Resource Delete Failed!',
				type: 'error',
				autoClose: 2000,
				isLoading: false,
			});
		},
		loadFolderRequest: (state, action) => {
			state.loadingFolders = true;
		},
		loadFolderSuccess: (state, action) => {
			state.resourceFolder = action.payload;
			state.loadingFolders = false;
		},
		loadFolderFailed: (state, action) => {
			state.loadingFolders = false;
		},
		createFolderRequest: (state, action) => {
			toastId = toast.loading('Adding Folder...');
		},
		createFolderSuccess: (state, action) => {
			state.resourceFolder.unshift({
				id: action.payload.id,
				name: action.payload.name,
				resource: action.payload.resource,
			});
			toast.update(toastId, {
				render: 'Resource Added!',
				type: 'success',
				autoClose: 2000,
				isLoading: false,
			});
		},
		createFolderFailed: (state, action) => {
			toast.update(toastId, {
				render: 'Resource Added Failed!',
				type: 'error',
				autoClose: 2000,
				isLoading: false,
			});
		},

		loadFilesRequest: (state, action) => {
			state.loadingFiles = true;
		},
		loadFilesSuccess: (state, action) => {
			state.loadingFiles = false;
			state.files = action.payload;
		},
		loadFilesFailed: (state, action) => {
			state.loadingFiles = false;
		},

		createFilesRequest: (state, action) => {},
		createFilesSuccess: (state, action) => {
			state.files.unshift({
				id: action.payload.id,
				name: action.payload.name,
				folder: action.payload.folder,
				tags: action.payload.tags,
				status: action.payload.status,
				dateUpdated: action.payload.dateUpdated,
			});
		},
		createFilesFailed: (state, action) => {},
		joinClassroomRequest: (state, action) => {},
		joinClassroomSuccess: (state, action) => {
			state.classes.unshift(action.payload);
			alert('Join success');
		},
		joinClassroomFailed: (state, action) => {},
	},
});

const {
	joinClassroomRequest,
	joinClassroomSuccess,
	joinClassroomFailed,
	deleteCurrentClassroomRequest,
	deleteCurrentClassroomSuccess,
	deleteCurrentClassroomFailed,
	editCurrentClassroomRequest,
	editCurrentClassroomSuccess,
	editCurrentClassroomFailed,
	loadCurrentClassroomRequest,
	loadCurrentClassroomSuccess,
	loadCurrentClassroomFailed,
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
} = classroomSlice.actions;

export default classroomSlice.reducer;

//action creators

// For Classrooms

// export const setClassroom = (classroom) => {
// 	useDispatch({ type: setCurrentClassroom, payload: classroom });
// };
export const getStudentClassroom = () =>
	apiCallBegan({
		url: '/classroom/my-class/',
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: loadRequest.type,
		onSuccess: loadSuccess.type,
		onError: loadFailed.type,
	});
export const getClassroom = () =>
	apiCallBegan({
		url: '/classroom/',
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: loadRequest.type,
		onSuccess: loadSuccess.type,
		onError: loadFailed.type,
	});
export const createClassroom = (name, description, privacy, subject) =>
	apiCallBegan({
		url: '/classroom/',
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: { name, description, privacy, subject },
		type: 'regular',
		onStart: loadRequest.type,
		onSuccess: addSuccess.type,
	});

// For Resources
export const loadResources = () =>
	apiCallBegan({
		url: '/resource/classroom/' + localStorage.getItem('currentClassroom') + '/',
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: loadResourcesRequest.type,
		onSuccess: loadResourcesSuccess.type,
		onError: loadResourcesFailed.type,
	});
export const getCurrentResource = () =>
	apiCallBegan({
		url: '/resource/classroom/change/' + localStorage.getItem('currentResource') + '/',
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: loadCurrentResourceRequest.type,
		onSuccess: loadCurrentResourceSuccess.type,
		onError: loadCurrentResourceFailed.type,
	});
export const updateCurrentResource = (name, description, status, institution) =>
	apiCallBegan({
		url: '/resource/classroom/change/' + localStorage.getItem('currentResource') + '/',
		method: 'put',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: { name, description, status, institution },
		type: 'regular',
		onStart: updateResourceRequest.type,
		onSuccess: updateResourceSuccess.type,
		onError: updateResourceFailed.type,
	});
export const deleteCurrentResource = () =>
	apiCallBegan({
		url: '/resource/classroom/change/' + localStorage.getItem('currentResource') + '/',
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: deleteResourceRequest.type,
		onSuccess: deleteResourceSuccess.type,
		onError: deleteResourceFailed.type,
	});

export const createResources = (id, name, description, classroom) =>
	apiCallBegan({
		url: '/resource/classroom/' + id,
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: { name, description, classroom },
		type: 'regular',
		onStart: createResourcesRequest.type,
		onSuccess: createResourcesSuccess.type,
		onError: createResourcesFailed.type,
	});

export const loadFolders = () =>
	apiCallBegan({
		url: '/resource​/classroom​/folder​/' + localStorage.getItem('currentResource'),
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: loadFolderRequest.type,
		onSuccess: loadFolderSuccess.type,
		onError: loadFolderFailed.type,
	});
export const createFolder = (name) =>
	apiCallBegan({
		url: '/resource​/classroom​/folder​/',
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: { name, resource: localStorage.getItem('currentResource') },
		type: 'regular',
		onStart: createFolderRequest.type,
		onSuccess: createFolderSuccess.type,
		onError: createFolderFailed.type,
	});
export const loadFiles = () =>
	apiCallBegan({
		url: '/resource/classroom/file/' + localStorage.getItem('currentFolder'),
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: loadFilesRequest.type,
		onSuccess: loadFilesSuccess.type,
		onError: loadFilesFailed.type,
	});

export const createFiles = (name) =>
	apiCallBegan({
		url: '/resource/classroom/file/',
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		data: { name, folder: localStorage.getItem('currentFolder') },
		onStart: loadFilesRequest.type,
		onSuccess: loadFilesSuccess.type,
		onError: loadFilesFailed.type,
	});

export const loadCurrentClassroom = (classroom) =>
	apiCallBegan({
		url: '/classroom/' + classroom,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: loadCurrentClassroomRequest.type,
		onSuccess: loadCurrentClassroomSuccess.type,
		onError: loadCurrentClassroomFailed.type,
	});
export const editCurrentClassroom = (classroom, name, status, code, subject, description) =>
	apiCallBegan({
		url: '/classroom/' + classroom,
		method: 'put',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: { name, status, code, subject, description },
		type: 'regular',
		onStart: editCurrentClassroomRequest.type,
		onSuccess: editCurrentClassroomSuccess.type,
		onError: editCurrentClassroomFailed.type,
	});
export const deleteCurrentClassroom = () =>
	apiCallBegan({
		url: '/classroom/' + localStorage.getItem('currentClassroom') + '/',
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: deleteCurrentClassroomRequest.type,
		onSuccess: deleteCurrentClassroomSuccess.type,
		onError: deleteCurrentClassroomFailed.type,
	});
export const joinClassroom = (student, classroom) =>
	apiCallBegan({
		url: '/classroom/join/',
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: { student, classroom },
		type: 'regular',
		onStart: joinClassroomRequest.type,
		onSuccess: joinClassroomSuccess.type,
		onError: joinClassroomFailed.type,
	});
///selectors

export const getUser = createSelector(
	(state) => state.user.user,
	(user) => user
);
