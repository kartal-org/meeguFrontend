import {
	Avatar,
	Button,
	Card,
	CardContent,
	Menu,
	MenuItem,
	TextField,
	Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../../../../../hooks/useFetch';
import {
	addStudent,
	getMembers,
	removeStudent,
} from '../../../../../../store/classroomMemberSlice';
import CardHolder from '../../../../../../materialUI/components/reuseableComponents/cardHolder';
import DialogComponent from '../../../../../../materialUI/components/reuseableComponents/dialogComponent';

//Tour
import { Steps } from 'intro.js-react';

const AdviserClassroomStudents = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	// const member = { id: 1, firstname: 'jonathan' };

	const { id } = useParams();
	const dispatch = useDispatch();
	const studentStates = useFetch;
	useEffect(() => {
		dispatch(getMembers(`/classroom/member/list/?search=${id}`));
	}, []);
	const fetchedStudents = useSelector((state) => state.classMember.members);
	const currentClassroom = useSelector((state) => state.newClass.currentClassroom);
	const { items: members, setItems: setMembers } = studentStates(fetchedStudents);
	const [username, setUsername] = useState('');
	const onChange = (e) => {
		e.preventDefault();
		setUsername(e.target.value);
	};
	const handleAddStudent = () => {
		dispatch(addStudent(id, username));
	};
	const handleRemoveStudent = (student) => {
		dispatch(removeStudent(student));
	};

	//tour
	const [stepsEnabled, setStepsEnabled] = useState('true');
	const [initialStep, setInitialStep] = useState(0);

	const tourSteps = [
		{
			element: '.add',
			position: 'left',
			intro: 'Add your students here.',
		},
		{
			element: '.cards',
			intro: 'See how many students are enrolled in this classroom.',
		},
	];

	const onExit = () => {
		setStepsEnabled(false);
	};

	function toggleSteps() {
		setStepsEnabled((prevState) => ({ stepsEnabled: !prevState.stepsEnabled }));
	}

	return (
		<>
			<Steps
				enabled={stepsEnabled}
				steps={tourSteps}
				initialStep={initialStep}
				onExit={onExit}
			/>

			<div className='flex flex-col space-x-4'>
				<div className='flex w-full justify-end'>
					{/* <DialogComponent
						title='Add Student'
						button={
							<Button className='add' variant='outlined'>
								Add Student
							</Button>
						}
						action={{ label: 'Add Student', handler: handleAddStudent }}
					>
						<div className='flex w-full mt-4'>
							<TextField
								fullWidth
								label='Student Username'
								variant='outlined'
								name='username'
								value={username}
								onChange={(e) => onChange(e)}
							/>
						</div>
					</DialogComponent> */}
				</div>
				<div className='cards flex flex-row space-x-4 w-full  mt-2'>
					{members.map((member) => (
						<Card raised sx={{ width: '200px', borderRadius: '1rem' }}>
							<CardContent className='flex flex-col w-full justify-center items-center space-y-3 '>
								<div className='flex w-full justify-end'>
									{currentClassroom && member.user.id !== currentClassroom.creator ? (
										<MoreVertIcon
											className='cursor-pointer'
											aria-expanded={open ? 'true' : undefined}
											onClick={handleClick}
										/>
									) : (
										<MoreVertIcon className='cursor-pointer' />
									)}
								</div>

								<Menu
									id='basic-menu'
									anchorEl={anchorEl}
									open={open}
									onClose={handleClose}
									MenuListProps={{
										'aria-labelledby': 'basic-button',
									}}
								>
									<MenuItem
										onClick={() => {
											handleClose();
											handleRemoveStudent(member.id);
										}}
									>
										Remove
									</MenuItem>
								</Menu>
								<Avatar
									alt='Remy Sharp'
									src={member.user.profileImage}
									sx={{
										height: '100px',
										width: '100px',
										border: '1px solid #808080',
									}}
								/>
								<Typography
									className='text-gray-800'
									gutterBottom
									variant='p'
									component='div'
								>
									{member.user.full_name}
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									{member.role}
								</Typography>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</>
	);
};

export default AdviserClassroomStudents;
