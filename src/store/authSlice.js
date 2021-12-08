import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './actions/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let toastId;

/**
 * *Instruction for using Toastify:
 * import { toast } from 'react-toastify';
 * import 'react-toastify/dist/ReactToastify.css';
 * let toastId;
 * TODO: for loading ==> toastId = toast.loading('Your Loading Message');
 * ? for Success ==> toast.update(toastId, {render: 'Changes Saved!',type: 'success',isLoading: false});
 * ? another option for silent success ==> toast.dismiss(toastId);
 * ! for Erorr ==> toast.update(toastId, {render: 'Login Failed!', type: 'error',isLoading: false});
 */

export const userSlice = createSlice({
	name: 'auth',
	initialState: {
		user: null,
		image: null,
		status: 'idle',
		isAuthenticated: false,
	},
	reducers: {
		//actions => action handlers
		//use this when you talk to the state
		userLoggedInRequest: (state, action) => {
			state.status = 'Login loading';
			toastId = toast.loading('Logging in...');
		},
		userLoggedInSuccess: (state, action) => {
			console.log(action.payload);
			localStorage.setItem('access_token', action.payload.access_token);
			localStorage.setItem('refresh_token', action.payload.refresh_token);
			state.isAuthenticated = true;

			state.status = 'Login success';

			toast.dismiss(toastId);
		},

		userLoggedInFailed: (state, action) => {
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			state.isAuthenticated = false;
			state.status = 'Login failed';

			toast.update(toastId, {
				render: 'Login Failed!',
				type: 'error',
				isLoading: false,
			});
		},
		userRegisteredRequest: (state, action) => {
			state.status = 'loading';
		},
		userRegisteredSuccess: (state, action) => {
			console.log(action.payload);
			state.user = action.payload;

			alert('Sign up success you can now login! ');
			state.status = 'success';
		},
		userRegisteredFailed: (state, action) => {
			alert('Sign up failed! ');
			state.status = 'failed';
		},
		userLoadedRequest: (state, action) => {
			state.status = 'loading';
		},
		userLoadedSuccess: (state, action) => {
			state.user = action.payload;
			state.status = 'success';
			state.isAuthenticated = true;
		},
		userLoadedFailed: (state, action) => {
			state.status = 'failed';
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			state.isAuthenticated = false;
			// window.location.href = '/login/';
		},
		userEditRequest: (state, action) => {
			state.status = 'loading';
		},

		userEditSuccess: (state, action) => {
			console.log(action.payload, 'payload');
			state.user = action.payload;
			alert('Profile edit success!');
			state.status = 'success';
		},
		userEditFailed: (state, action) => {
			// state.user = null;
			alert('Profile edit failed!');
			state.status = 'failed';
		},
		logoutRequest: (state, action) => {
			state.status = 'Logout Loading';
		},
		logoutSuccess: (state, action) => {
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			state.isAuthenticated = false;
			state.status = 'Logout Success';
		},
		logoutFailed: (state, action) => {
			toast.update(toastId, {
				render: 'Logout Failed',
				type: 'error',
				autoClose: 3000,
				isLoading: false,
			});
			state.status = 'Logout Failed';
		},
		loadImageRequest: (state, action) => {
			state.image = action.payload;
			state.status = 'loading';
		},
		loadImageSuccess: (state, action) => {
			state.image = action.payload;
			state.status = 'success';
		},
		loadImageFailed: (state, action) => {
			state.status = 'failed';
		},

		verifyUserRequest: (state, action) => {
			state.status = 'loading';
		},
		verifyUserSuccess: (state, action) => {
			if (state.user) {
				state.user.is_verified = true;
			}
			alert('Hooray your are now verified!');
			state.status = 'success';
		},
		verifyUserFailed: (state, action) => {
			alert('Sorry the verification failed.\n' + action.payload);
			state.status = 'failed';
		},
		resendLinkRequest: (state, action) => {
			state.status = 'loading';
		},
		resendLinkSuccess: (state, action) => {
			alert('Send Link Success!');
			state.status = 'success';
		},
		resendLinkFailed: (state, action) => {
			alert('Send Link failed');
			state.status = 'failed';
		},
		resetPasswordStep1Request: (state, action) => {
			state.status = 'loading';
		},
		resetPasswordStep1Success: (state, action) => {
			alert('Send Link Success!');
			state.status = 'success';
		},
		resetPasswordStep1Failed: (state, action) => {
			alert('Send Link failed');
			state.status = 'failed';
		},
	},
});

const {
	logoutRequest,
	logoutSuccess,
	logoutFailed,
	userLoadedRequest,
	userLoadedSuccess,
	userLoadedFailed,
	userEditRequest,
	userEditSuccess,
	userEditFailed,
	userRegisteredSuccess,
	userRegisteredFailed,
	userRegisteredRequest,
	userLoggedInRequest,
	userLoggedInSuccess,
	userLoggedInFailed,
	loadImageRequest,
	loadImageSuccess,
	loadImageFailed,
	verifyUserRequest,
	verifyUserSuccess,
	verifyUserFailed,
	resendLinkRequest,
	resendLinkSuccess,
	resendLinkFailed,
	resetPasswordStep1Request,
	resetPasswordStep1Success,
	resetPasswordStep1Failed,
} = userSlice.actions;

export default userSlice.reducer;

//action creators

export const verifyUser = (token) =>
	apiCallBegan({
		url: `/api/user/email-verify?token=` + token,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: verifyUserRequest.type,
		onSuccess: verifyUserSuccess.type,
		onError: verifyUserFailed.type,
	});
export const resendLink = (link) =>
	apiCallBegan({
		url: link,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: resendLinkRequest.type,
		onSuccess: resendLinkSuccess.type,
		onError: resendLinkFailed.type,
	});

export const login = (email, password) =>
	apiCallBegan({
		url: 'auth/token/',
		method: 'post',
		data: {
			grant_type: 'password',
			username: email,
			password: password,
			client_id: process.env.REACT_APP_CLIENT_ID,
			client_secret: process.env.REACT_APP_CLIENT_SECRET,
		},
		onSuccess: userLoggedInSuccess.type,
		onStart: userLoggedInRequest.type,
		onError: userLoggedInFailed.type,
	});

export const signup = (first_name, last_name, username, email, password) =>
	apiCallBegan({
		url: '/api/user/register/',
		method: 'post',
		data: {
			first_name,
			last_name,
			email,
			username,
			password,
		},
		onSuccess: userRegisteredSuccess.type,
		onError: userRegisteredFailed.type,
		onStart: userRegisteredRequest.type,
	});
export const socialLoginFacebook = (accesstoken) =>
	apiCallBegan({
		url: '/auth/convert-token/',
		method: 'post',
		data: {
			token: accesstoken,
			backend: 'facebook',
			grant_type: 'convert_token',
			client_id: process.env.REACT_APP_CLIENT_ID,
			client_secret: process.env.REACT_APP_CLIENT_SECRET,
		},
		onStart: userLoggedInRequest.type,
		onSuccess: userLoggedInSuccess.type,
		onError: userLoggedInFailed.type,
	});
export const socialLoginGoogle = (accesstoken) =>
	apiCallBegan({
		url: '/auth/convert-token/',
		method: 'post',
		data: {
			token: accesstoken,
			backend: 'google-oauth2',
			grant_type: 'convert_token',
			client_id: process.env.REACT_APP_CLIENT_ID,
			client_secret: process.env.REACT_APP_CLIENT_SECRET,
		},
		onStart: userLoggedInRequest.type,
		onSuccess: userLoggedInSuccess.type,
		onError: userLoggedInSuccess.type,
	});

export const loadUser = () =>
	apiCallBegan({
		url: '/api/user/me/',
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		onStart: userLoadedRequest.type,
		onSuccess: userLoadedSuccess.type,
		onError: userLoadedFailed.type,
	});

export const logout = () =>
	apiCallBegan({
		url: '/auth/invalidate-sessions',
		method: 'post',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		data: { client_id: process.env.REACT_APP_CLIENT_ID },
		onStart: logoutRequest.type,
		onSuccess: logoutSuccess.type,
		onError: logoutFailed.type,
	});

export const editProfile = (link, formData) =>
	apiCallBegan({
		url: link,
		method: 'patch',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
			accept: '*/*',
		},
		type: 'regular',
		data: formData,
		onStart: userEditRequest.type,
		onSuccess: userEditSuccess.type,
		onError: userEditFailed.type,
	});
export const editProfileImage = (id, form_data) =>
	apiCallBegan({
		url: `/api/user/me/edit/${id}/`,
		method: 'patch',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
			accept: '*/*',
		},
		type: 'regular',
		data: form_data,
		onStart: userEditRequest.type,
		onSuccess: userEditSuccess.type,
		onError: userEditFailed.type,
	});

export const loadImageUser = (id) =>
	apiCallBegan({
		url: `/api/user/profile/${id}`,
		method: 'get',
		headers: {
			Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',

		onStart: loadImageRequest.type,
		onSuccess: loadImageSuccess.type,
		onError: loadImageFailed.type,
	});
export const resetPassword1 = (email) =>
	apiCallBegan({
		url: `/api/user/request-reset-email/`,
		method: 'post',
		headers: {
			// Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		data: { email },
		onStart: resetPasswordStep1Request.type,
		onSuccess: resetPasswordStep1Success.type,
		onError: resetPasswordStep1Failed.type,
	});
export const resetPasswordConfirm = (data) =>
	apiCallBegan({
		url: `/api/user/password-reset-complete`,
		method: 'patch',
		headers: {
			// Authorization: 'Bearer ' + localStorage.getItem('access_token'),
			'Content-Type': 'application/json',
			accept: 'application/json',
		},
		type: 'regular',
		data: data,
		onStart: resetPasswordStep1Request.type,
		onSuccess: resetPasswordStep1Success.type,
		onError: resetPasswordStep1Failed.type,
	});
///selectors

export const getUser = createSelector(
	(state) => state.user.user,
	(user) => user
);
