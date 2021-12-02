import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';

export const institutionSlice = createSlice({
	name: 'institution',
	initialState: {
		currentInstitution: null,
		verification: null,
		institutions: [],
		status: 'idle',
	},
	reducers: {
		institutionLoadRequest: (state, action) => {
			state.status = 'loading';
		},
		institutionLoadSuccess: (state, action) => {
			state.institutions = [];
			action.payload.map((val) => {
				const { institutions } = val;
				if (institutions) {
					institutions.map((i) => {
						state.institutions.unshift(i);
					});
				}
			});
			// state.institutions = action.payload;
			state.status = 'success';
			// state.institutions = action.payload;
		},
		institutionLoadFailed: (state, action) => {
			state.status = 'failed';
			alert('Institution Load Failed!');
		},
		institutionCreateRequest: (state, action) => {
			state.status = 'loading';
		},
		institutionCreateSuccess: (state, action) => {
			state.status = 'success';
			state.institutions.unshift(action.payload);
			state.currentInstitution = action.payload;
			alert('Institution Create Success!');
		},
		institutionCreateFailed: (state, action) => {
			state.status = 'failed';
			alert('Institution Delete Failed!');
		},
		institutionRetrieveRequest: (state, action) => {
			state.status = 'loading';
		},
		institutionRetrieveSuccess: (state, action) => {
			state.status = 'success';
			state.currentInstitution = action.payload;
		},
		institutionRetrieveFailed: (state, action) => {
			state.status = 'failed';
			alert('Institution Retrieve Failed!');
		},
		institutionEditRequest: (state, action) => {
			state.status = 'loading';
		},
		institutionEditSuccess: (state, action) => {
			state.status = 'success';
			state.currentInstitution = action.payload;
			alert('Institution Edit Sucess!');
		},
		institutionEditFailed: (state, action) => {
			state.status = 'failed';
			alert('Institution Edit Failed!');
		},
		institutionDeleteRequest: (state, action) => {
			state.status = 'loading';
		},
		institutionDeleteSuccess: (state, action) => {
			state.status = 'Institution Delete Sucess';
			state.currentInstitution = null;
			alert('Institution Delete Sucess!');
		},
		institutionDeleteFailed: (state, action) => {
			state.status = 'failed';
			alert('Institution Delete Failed!');
		},
		// verification
		verificationApplyRequest: (state, action) => {
			state.status = 'loading';
		},
		verificationApplySuccess: (state, action) => {
			state.status = 'success';
			state.verification = action.payload;
			alert('Verification Success!');
		},
		verificationApplyFailed: (state, action) => {
			state.status = 'failed';
			alert('Verification Failed!');
		},
		verificationEditRequest: (state, action) => {
			state.status = 'loading';
		},
		verificationEditSuccess: (state, action) => {
			state.status = 'success';
			state.verification = action.payload;
			alert('Verification Edit Success!');
		},
		verificationEditFailed: (state, action) => {
			state.status = 'failed';
			alert('Verification Edit Failed!');
		},
		verificationCheckRequest: (state, action) => {
			state.status = 'loading';
		},
		verificationCheckSuccess: (state, action) => {
			state.status = 'success';
			state.verification = action.payload;
			alert('Verification Check Success!');
		},
		verificationCheckFailed: (state, action) => {
			state.status = 'failed';
			alert('Verification Check Failed!');
		},
	},
});

const {
	institutionLoadRequest,
	institutionLoadSuccess,
	institutionLoadFailed,
	institutionCreateRequest,
	institutionCreateSuccess,
	institutionCreateFailed,
	institutionRetrieveRequest,
	institutionRetrieveSuccess,
	institutionRetrieveFailed,
	verificationApplyRequest,
	verificationApplySuccess,
	verificationApplyFailed,
	verificationEditRequest,
	verificationEditSuccess,
	verificationEditFailed,
	verificationCheckRequest,
	verificationCheckSuccess,
	verificationCheckFailed,
	institutionEditRequest,
	institutionEditSuccess,
	institutionEditFailed,
	institutionDeleteRequest,
	institutionDeleteSuccess,
	institutionDeleteFailed,
} = institutionSlice.actions;

export default institutionSlice.reducer;

//action creators

export const getInstitutions = (link) =>
	apiCallBegan({
		url: link,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: institutionLoadRequest.type,
		onSuccess: institutionLoadSuccess.type,
		onError: institutionLoadFailed.type,
	});
export const createInstitution = (link, formdata) =>
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
		onStart: institutionCreateRequest.type,
		onSuccess: institutionCreateSuccess.type,
		onError: institutionCreateFailed.type,
	});

export const retrieveInstitution = (link) =>
	apiCallBegan({
		url: link,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: institutionRetrieveRequest.type,
		onSuccess: institutionRetrieveSuccess.type,
		onError: institutionRetrieveFailed.type,
	});
export const editInstitution = (link, form_data) =>
	apiCallBegan({
		url: link,
		method: 'patch',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: form_data,
		type: 'regular',
		onStart: institutionEditRequest.type,
		onSuccess: institutionEditSuccess.type,
		onError: institutionEditFailed.type,
	});
export const deleteInstitution = (link) =>
	apiCallBegan({
		url: link,
		method: 'delete',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},

		type: 'regular',
		onStart: institutionDeleteRequest.type,
		onSuccess: institutionDeleteSuccess.type,
		onError: institutionDeleteFailed.type,
	});

// Verification

export const applyVerification = (link, form_data) =>
	apiCallBegan({
		url: link,
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
			accept: '*/*',
		},
		data: form_data,
		type: 'regular',
		onStart: verificationApplyRequest.type,
		onSuccess: verificationApplySuccess.type,
		onError: verificationApplyFailed.type,
	});
export const editVerification = (institution, document) =>
	apiCallBegan({
		url: '/institution/verify/' + institution,
		method: 'patch',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: { document },
		type: 'regular',
		onStart: verificationEditRequest.type,
		onSuccess: verificationEditSuccess.type,
		onError: verificationEditFailed.type,
	});
export const checkVerification = (institution) =>
	apiCallBegan({
		url: '/institution/verify/' + institution,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: verificationCheckRequest.type,
		onSuccess: verificationCheckSuccess.type,
		onError: verificationCheckFailed.type,
	});

export const staffInstitutionList = () =>
	apiCallBegan({
		url: '/institution/sharedInstitution',
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: institutionLoadRequest.type,
		onSuccess: institutionLoadSuccess.type,
		onError: institutionLoadFailed.type,
	});
