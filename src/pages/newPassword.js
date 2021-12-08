import { AiFillUnlock } from 'react-icons/ai';
import InputIconField from '../components/commons/inputIconField';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { socialLogin, resetPasswordConfirm } from '../store/authSlice';
import { useParams, useLocation } from 'react-router';
import queryString from 'query-string';

import purple from '../assets/img/Artboard 1.png';

const NewPassword = () => {
	const [formData, setFormData] = useState({
		new_password: '',
		re_new_password: '',
	});
	const dispatch = useDispatch();
	const location = useLocation();
	const { token, uidb64 } = queryString.parse(location.search);

	const { new_password, re_new_password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	// console.log("I'm Here", uid, token);

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = { password: new_password, token, uidb64 };
		console.log(token);
		console.log(uidb64);
		dispatch(resetPasswordConfirm(data));
	};
	console.log(token);
	console.log(uidb64);
	// const isAuthenticated = useSelector((auth) => auth.auth.isAuthenticated);

	return (
		<div class='flex flex-wrap w-full'>
			<div class='flex flex-col w-full md:w-1/2'>
				<div class='flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24'>
					<Link to='/' class='p-4 text-xl font-bold text-white bg-purple-800'>
						meegu.
					</Link>
				</div>
				<div class='flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32'>
					<p class='text-3xl text-center'>Password Reset</p>
					<form class='flex flex-col pt-3 md:pt-8 space-y-2'>
						<div>
							<InputIconField
								icon={<AiFillUnlock className='h-4 w-4' />}
								name='new_password'
								placeholder='Your password'
								value={new_password}
								onChange={(e) => onChange(e)}
								type='password'
							/>
						</div>
						<div>
							<InputIconField
								icon={<AiFillUnlock className='h-4 w-4' />}
								name='re_new_password'
								placeholder='Re-enter your password'
								value={re_new_password}
								onChange={(e) => onChange(e)}
								type='password'
							/>
						</div>
					</form>

					<div className='flex flex-row justify-between'>
						<div class='pt-12 pb-12 text-center justify-start'>
							<p>
								<Link to='/login' class='ml-2 text-gray-400 hover:text-purple-400'>
									Login
								</Link>
							</p>
						</div>

						<div className='mt-9 justify-between'>
							<button
								onClick={(e) => handleSubmit(e)}
								type='submit'
								class='w-36 px-4  py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-purple-800 shadow-md hover:text-purple-800 hover:bg-white focus:outline-none focus:ring-2 rounded-md'
							>
								<span class='w-full'>Submit</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div class='w-1/2 shadow-2xl'>
				<img class='hidden object-center w-full h-screen md:block' src={purple} alt='signup' />
			</div>
		</div>
	);
};

export default NewPassword;
