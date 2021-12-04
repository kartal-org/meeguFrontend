import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { loadUser, resendLink } from '../store/authSlice';

const ActivationGuard = () => {
	// hooks imported
	const history = useHistory();
	const dispatch = useDispatch();

	// one time function
	useEffect(() => {
		dispatch(loadUser());
	}, []);

	// get data from redux store
	const user = useSelector((state) => state.auth.user);

	// will run when user is update or changes
	useEffect(() => {
		if (user) {
			if (user.is_verified) {
				history.replace('/home');
			}
		}
	}, [user]);

	// handler
	function handleResendLink() {
		dispatch(resendLink(`/api/user/resend-verify/`));
	}
	return (
		<>
			We notice that your account is not yet verified. Please check your email inbox or choose to
			resend activation link
			<Button onClick={handleResendLink} variant='contained'>
				Resend Link
			</Button>
		</>
	);
};

export default ActivationGuard;
