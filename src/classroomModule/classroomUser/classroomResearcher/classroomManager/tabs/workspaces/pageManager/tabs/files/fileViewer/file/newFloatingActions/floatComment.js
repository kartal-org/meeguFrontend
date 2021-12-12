import React from "react";

//mui
import {
	TextField,
	Divider,
	Card,
	Avatar,
	Button,
	InputAdornment,
} from "@mui/material";

import { FiSend } from "react-icons/fi";

const FloatComments = () => {
	return (
		<>
			<Divider sx={{ mb: 2 }} />

			<div
				className="px-3 overflow-y-auto space-y-5"
				style={{ maxHeight: "325px", minHeight: "325px" }}
			>
				<div className="flex flex-row">
					<Avatar sx={{ bgcolor: "#51a7ed" }} aria-label="recipe">
						r
					</Avatar>

					<div className="flex flex-col ml-2 w-full">
						<div className="flex flex-row justify-between items-center">
							<p className="font-bold text-base">Institution Name</p>
							<p className="text-xs text-gray-400">12/11/2021</p>
						</div>
						<p className="text-xs text-justify">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</p>
					</div>
				</div>

				<div className="flex flex-row">
					<Avatar sx={{ bgcolor: "#51a7ed" }} aria-label="recipe">
						r
					</Avatar>

					<div className="flex flex-col ml-2 w-full">
						<div className="flex flex-row justify-between items-center">
							<p className="font-bold text-base">Institution Name</p>
							<p className="text-xs text-gray-400">12/11/2021</p>
						</div>
						<p className="text-xs text-justify">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore eu fugiat
							nulla pariatur. Excepteur sint occaecat cupidatat non proident,
							sunt in culpa qui officia deserunt mollit anim id est laborum.
						</p>
					</div>
				</div>
			</div>

			<div className="mt-2">
				<TextField
					fullWidth
					id="outlined-basic"
					label="Comment here ..."
					variant="outlined"
					multiline
					minRows={4}
				/>
			</div>

			<div className="mt-2 flex justify-end">
				<Button variant="contained">Comment</Button>
			</div>
		</>
	);
};

export default FloatComments;
