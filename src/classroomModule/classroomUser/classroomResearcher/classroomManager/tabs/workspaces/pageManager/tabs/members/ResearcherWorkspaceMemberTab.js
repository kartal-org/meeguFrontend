import { Avatar, Button, Card, CardContent, Menu, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useFetch from '../../../../../../../../../hooks/useFetch';
import { useEffect, useState } from 'react';
import { addMember, getMembers, getMembers2 } from '../../../../../../../../../store/memberSlice';
import DialogComponent from '../../../../../../../../../materialUI/components/reuseableComponents/dialogComponent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CardHolder from '../../../../../../../../../materialUI/components/reuseableComponents/cardHolder';

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
			dispatch(getMembers2(`/classroom/member/list/?search=${currentWorkspace.classroom}`));
		}
	}, [currentWorkspace]);
	const { items: members, setItems: setMembers } = memberStates(fetchedMembers);
	const { items: members2, setItems: setMembers2 } = classMemberStates(fetchedClassMembers);

	const [memberSelected, setMemberSelected] = useState();

	const handleChange = (event) => {
		setMemberSelected(event.target.value);
	};

	function handleAddMember() {
		let formData = new FormData();
		formData.append('user', memberSelected); //load classroom members first
		formData.append('workspace', id);
		dispatch(addMember(`/workspace/member`, formData));
	}
	console.log(members);
	return (
		<>
			<div className='flex w-full justify-end'>
				<DialogComponent button={<Button>Add Member</Button>} title='Add Members'>
					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>
							Select From Classroom Member
						</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={memberSelected}
							label='Select From Classroom Member'
							onChange={handleChange}
						>
							{members2.map((val) => (
								<MenuItem value={val.user.id}>{val.user.full_name}</MenuItem>
							))}
						</Select>
					</FormControl>
				</DialogComponent>
			</div>
			<div className='flex flex-row space-x-4'>
				{members ? (
					<>
						{members.map((member) => (
							<Card raised sx={{ width: '200px', borderRadius: '1rem' }}>
								<CardContent className='flex flex-col w-full justify-center items-center space-y-3 '>
									<Avatar
										alt='Remy Sharp'
										src={member.user.profileImage}
										sx={{
											height: '100px',
											width: '100px',
											border: '1px solid #808080',
										}}
									/>
									<div className='flex flex-col justify-center items-center w-full space-y-1'>
										<Typography
											className='text-gray-800'
											gutterBottom
											variant='p'
											component='div'
										>
											{member.user.full_name}
										</Typography>
										<Typography
											className='font-semibold'
											variant='body2'
											color='text.secondary'
										>
											@{member.user.username}
										</Typography>
									</div>
									<Typography variant='body1' color='text.primary'>
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
