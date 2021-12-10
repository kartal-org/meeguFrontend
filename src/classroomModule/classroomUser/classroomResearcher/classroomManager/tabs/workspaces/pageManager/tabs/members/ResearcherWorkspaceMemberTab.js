import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import useFetch from "../../../../../../../../../hooks/useFetch";
import {
	addMember,
	getMembers,
	getMembers2,
	removeMember,
} from "../../../../../../../../../store/memberSlice";
import CardHolder from "../../../../../../../../../materialUI/components/reuseableComponents/cardHolder";
import DialogComponent from "../../../../../../../../../materialUI/components/reuseableComponents/dialogComponent";

import {
	Avatar,
	Button,
	Card,
	CardContent,
	Menu,
	Typography,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ResearcherWorkspaceMemberTab = () => {
	const { id } = useParams();
	const memberStates = useFetch;
	const classMemberStates = useFetch;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getMembers(`/workspace/member?search=${id}`));
	}, []);

	const fetchedMembers = useSelector((state) => state.member.members);
	const fetchedClassMembers = useSelector((state) => state.member.members2);
	const currentWorkspace = useSelector((state) => state.works.currentWorkspace);
	useEffect(() => {
		if (currentWorkspace) {
			dispatch(
				getMembers2(
					`/classroom/member/list/?search=${currentWorkspace.classroom}`
				)
			);
		}
	}, [currentWorkspace]);
	const { items: members, setItems: setMembers } = memberStates(fetchedMembers);
	const { items: members2, setItems: setMembers2 } =
		classMemberStates(fetchedClassMembers);

	const [memberSelected, setMemberSelected] = useState();

	const handleChange = (event) => {
		setMemberSelected(event.target.value);
	};

	const handleRemoveMember = (id) => {
		// /institution/staff/change/{id}
		dispatch(removeMember(`/workspace/member/${id}`));
	};

	function handleAddMember() {
		let formData = new FormData();
		formData.append("user", memberSelected); //load classroom members first
		formData.append("workspace", id);
		dispatch(addMember(`/workspace/member`, formData));
		// console.log(memberSelected);
	}
	console.log(members);

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<div className="flex w-full justify-end">
				<DialogComponent
					button={<Button>Add Member</Button>}
					title="Add Members"
				>
					<div className="mt-2">
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">
								Select From Classroom Member
							</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={memberSelected}
								label="Select From Classroom Member"
								onChange={handleChange}
							>
								{members2.map((val) => (
									<MenuItem value={val.id}>{val.user.full_name}</MenuItem>
								))}
							</Select>
						</FormControl>

						<div className="mt-5">
							<Button variant="contained" onClick={handleAddMember}>
								Add Member
							</Button>
						</div>
					</div>
				</DialogComponent>
			</div>
			<div className="flex flex-row space-x-4">
				{members ? (
					<>
						{members.map((member) => (
							<Card raised sx={{ width: "200px", borderRadius: "1rem" }}>
								<CardContent className="flex flex-col w-full justify-center items-center space-y-3 ">
									<div className="flex w-full justify-end">
										{/* {staff.type === "Admin" ? (
											<MoreVertIcon className="cursor-pointer" />
										) : ( */}
										<MoreVertIcon
											className="cursor-pointer"
											aria-expanded={open ? "true" : undefined}
											onClick={handleClick}
										/>
										{/* )} */}
									</div>

									<Menu
										id="basic-menu"
										anchorEl={anchorEl}
										open={open}
										onClose={handleClose}
										MenuListProps={{
											"aria-labelledby": "basic-button",
										}}
									>
										<DialogComponent
											title="Remove Member"
											secondAction={{
												label: "Confirm",
												handler: () => {
													handleRemoveMember(member.id);
													handleClose();
												},
											}}
											button={<MenuItem>Remove</MenuItem>}
										>
											Are you sure you want to remove {member.user.full_name}?
										</DialogComponent>
									</Menu>

									<Avatar
										alt="Remy Sharp"
										src={member.user.profileImage}
										sx={{
											height: "100px",
											width: "100px",
											border: "1px solid #808080",
										}}
									/>
									<div className="flex flex-col justify-center items-center w-full space-y-1">
										<Typography
											className="text-gray-800"
											gutterBottom
											variant="p"
											component="div"
										>
											{member.user.full_name}
										</Typography>
										<Typography
											className="font-semibold"
											variant="body2"
											color="text.secondary"
										>
											@{member.user.username}
										</Typography>
									</div>
									<Typography variant="body1" color="text.primary">
										{member.user.role}
									</Typography>
								</CardContent>
							</Card>
						))}
					</>
				) : null}
			</div>
		</>
	);
};

export default ResearcherWorkspaceMemberTab;
