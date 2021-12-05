import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { loadUser, resendLink } from "../store/authSlice";

import mail from "../assets/img/mail.png";

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
				history.replace("/home");
			}
		}
	}, [user]);

	// handler
	function handleResendLink() {
		dispatch(resendLink(`/api/user/resend-verify/`));
	}
	return (
		<>
			<div className="h-screen bg-gray-100 p-4 flex items-center justify-center">
				<div
					className="bg-white justify-center p-4 rounded-2xl shadow-lg"
					style={{ maxHeight: "530px", minHeight: "530px", width: "1000px" }}
				>
					<div className="flex justify-center p-2 mt-3 mb-10">
						<img
							alt=""
							src={mail}
							style={{
								height: "200px",
								width: "200px",
							}}
						/>
					</div>

					<p className="text-xl font-semibold flex justify-center text-center">
						{" "}
						We noticed that your account is not yet verified. To proceed to the
						site please verify your email first.
					</p>
					<p className="text-xs text-gray-500 flex justify-center">
						If by chance you didn't see the e-mail verification list on your
						inbox, please check your spam folder.
					</p>
					<div className="mt-20 flex justify-center">
						<Button
							onClick={handleResendLink}
							variant="contained"
							sx={{ width: "230px", height: "60px" }}
						>
							Resend Link
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ActivationGuard;
