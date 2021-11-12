import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseURL = 'http://127.0.0.1:8000';

const axiosInstance = axios.create({
	baseURL: baseURL,
	headers: {
		Authorization: 'Bearer ' + localStorage.getItem('access_token'),
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			// alert(
			// 	'A server/network error occurred. ' +
			// 		'Looks like CORS might be the problem. ' +
			// 		'Sorry about this - we will get it fixed shortly.'
			// );
			return Promise.reject(error);
		}

		if (error.response.status === 401 && originalRequest.url === baseURL + 'token/refresh/') {
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = localStorage.getItem('refresh_token');

			if (refreshToken) {
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);
				console.log(tokenParts.exp);

				if (tokenParts.exp > now) {
					return axiosInstance
						.post('/auth/token/', {
							grant_type: 'refresh_token',
							client_id: 'yLTdx3Jt1ljCwzNyawYjrMmrtg5jBUJylEikrVQ9',
							client_secret:
								'FvelivkuTgUj2axbJdfvPrBL2sBpE2dM7QNobXLotYPr83xisf6LSR4TbE3828CmYo7qTzqFijpkkmBs8WcVRY5LzKXnclKzOFaCnkrVjxU2ndAYN6yZbXBvHhkYC9ET',
							refresh_token: refreshToken,
						})
						.then((response) => {
							localStorage.setItem('access_token', response.data.access);
							localStorage.setItem('refresh_token', response.data.refresh);

							axiosInstance.defaults.headers['Authorization'] =
								'Bearer ' + response.data.access;
							originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access;

							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					alert('Refresh token is expired');
					console.log('Refresh token is expired', tokenParts.exp, now);

					window.location.href = '/login/';
				}
			} else {
				alert('Refresh token not available.');
				console.log('Refresh token not available.');
				window.location.href = '/login/';
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);

export default axiosInstance;
