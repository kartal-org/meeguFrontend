import { useParams, useHistory, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../../../../hooks/useFetch';
import {
	Avatar,
	Button,
	Card,
	CardContent,
	IconButton,
	Menu,
	MenuItem,
	TextField,
	Tooltip,
	Typography,
	FormControl,
	InputLabel,
	Select,
	Box,
	FormLabel,
	FormGroup,
	FormControlLabel,
	FormHelperText,
	Checkbox,
} from '@mui/material';
import DialogComponent from '../../../../../materialUI/components/reuseableComponents/dialogComponent';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
	addStaff,
	addStaffType,
	editStaff,
	getStaffs,
	getStaffTypes,
	removeStaff,
} from '../../../../../store/staffSlice';
import { getDepartments } from '../../../../../store/departmentSlice';

//Tour
import { Steps } from 'intro.js-react';
import { HiPlus } from 'react-icons/hi';

const ModeratorInstitutionStaff = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const staffStates = useFetch;
	const staffTypeStates = useFetch;
	const departmentStates = useFetch;

	const currentInstitution = useSelector((state) => state.institution.currentInstitution);
	useEffect(() => {
		if (currentInstitution) {
			dispatch(getStaffs(`/institution/staff-list?search=${currentInstitution.slug}`));
		}
	}, [currentInstitution]);

	useEffect(() => {
		dispatch(getStaffTypes(`/institution/staff-type/${id}`));
		dispatch(getDepartments(`/institution/department/${id}`));
	}, []);
	useEffect(() => {});

	const fetchedStaffs = useSelector((state) => state.staff.staffs);
	const fetchedStaffTypes = useSelector((state) => state.staff.staffTypes);
	const fetchedDepartments = useSelector((state) => state.department.departments);
	const { items: staffs, setItems: setStaffs } = staffStates(fetchedStaffs);
	const { items: staffTypes, setItems: setStaffTypes } = staffTypeStates(fetchedStaffTypes);
	const { items: departments, setItems: setDepartments } = departmentStates(fetchedDepartments);

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const [inputForm, setInputForm] = useState({
		username: '',
		type: '',
		department: '',
	});

	const onChange = (e) => {
		setInputForm({ ...inputForm, [e.target.name]: e.target.value });
	};
	const handleAddStaff = () => {
		const { username, type, department } = inputForm;
		let form_data = new FormData();
		form_data.append('user', username);
		form_data.append('type', type);
		form_data.append('department', department);
		form_data.append('institution', id);
		dispatch(addStaff(`/institution/staff-list`, form_data));
	};
	const handleRemoveStaff = (staffId) => {
		// /institution/staff/change/{id}
		dispatch(removeStaff(`/institution/staff/change/${staffId}`));
	};
	const handleEditStaff = (staffId) => {
		// /institution/staff/change/{id}
		const { type, department } = inputForm;
		dispatch(editStaff(`/institution/staff/change/${staffId}`, { type, department }));
	};
	const [staffTypeForm, setStaffTypeForm] = useState({ name: '', description: '' });
	function onChangeStaffType(e) {
		setStaffTypeForm({ ...staffTypeForm, [e.target.name]: e.target.value });
	}
	const handleAddCustomStaff = () => {
		//
		const { name, description } = staffTypeForm;
		dispatch(
			addStaffType(`/institution/staff-type/${id}`, {
				name,
				description,
				permissions: state,
				custom_Type_For: id,
			})
		);
	};

	//tour
	const [stepsEnabled, setStepsEnabled] = useState('true');
	const [initialStep, setInitialStep] = useState(0);

	const tourSteps = [
		{
			element: '.add',
			position: 'left',
			intro: 'You can add new staff here.',
		},
		{
			element: '.cards',
			intro: 'See your staff list here.',
		},
	];

	//checkbox
	const [state, setState] = useState({
		canAddStaff: false,
		canEditStaff: false,
		canRemoveStaff: false,
		canRespondToRecommendations: false,
		canEditInstitution: false,
		canEditDepartment: false,
	});

	const handleChange = (event) => {
		setState({
			...state,
			[event.target.name]: event.target.checked,
		});
	};

	const {
		canAddStaff,
		canRemoveStaff,
		canEditStaff,
		canRespondToRecommendations,
		canEditInstitution,
		canEditDepartment,
	} = state;

	function preLoadForm(staff) {
		setInputForm({ username: staff.username, department: staff.department, type: staff.type });
	}

	return (
		<>
			{/* <Steps
				enabled={stepsEnabled}
				steps={tourSteps}
				initialStep={initialStep}
				onExit={onExit}
			/> */}

			<div className='flex flex-col space-x-4'>
				<div className='flex w-full justify-end'>
					<DialogComponent
						title='Add Staff'
						button={
							<Button className='add' variant='outlined'>
								Add Staff
							</Button>
						}
						action={{ label: 'Add Staff', handler: handleAddStaff }}
					>
						<div className='flex flex-col w-full space-y-4 mt-4'>
							<TextField
								fullWidth
								label='Staff Username'
								variant='outlined'
								name='username'
								value={inputForm.username}
								onChange={(e) => onChange(e)}
							/>
							<div className='flex flex-row w-full space-x-1 '>
								<FormControl fullWidth>
									<InputLabel id='demo-simple-select-label'>Staff Type</InputLabel>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										value={inputForm.type}
										label='Staff Type'
										onChange={(e) => onChange(e)}
										name='type'
									>
										<MenuItem value=''>
											<em>None</em>
										</MenuItem>
										{staffTypes.map((val) => (
											<MenuItem key={val.id} value={val.name}>
												{val.name}
											</MenuItem>
										))}
									</Select>
								</FormControl>

								<div className='flex items-center'>
									<DialogComponent
										title='Add Custom Type'
										maxWidth='sm'
										button={
											<Tooltip title='Add custom staff type'>
												<IconButton>
													<HiPlus className='text-gray-400' />
												</IconButton>
											</Tooltip>
										}
										action={{ label: 'Create', handler: handleAddCustomStaff }}
									>
										<div className='flex flex-col space-y-4 mt-2 mb-2'>
											<TextField
												fullWidth
												label='Name'
												variant='outlined'
												name='name'
												value={staffTypeForm.name}
												onChange={onChangeStaffType}
											/>
											<TextField
												fullWidth
												label='Description'
												multiline
												minRows={4}
												variant='outlined'
												name='description'
												value={staffTypeForm.description}
												onChange={onChangeStaffType}
											/>
										</div>
										<Box sx={{ display: 'flex' }}>
											<FormControl sx={{ m: 1 }} component='fieldset' variant='standard'>
												<FormLabel component='legend' sx={{ fontSize: '12px' }}>
													Assign responsibility
												</FormLabel>

												<FormGroup>
													<FormControlLabel
														control={
															<Checkbox
																checked={canAddStaff}
																onChange={handleChange}
																name='canAddStaff'
															/>
														}
														label={
															<>
																<p className='text-sm'>Can add staff</p>
															</>
														}
													/>
												</FormGroup>

												<FormGroup>
													<FormControlLabel
														control={
															<Checkbox
																checked={canEditStaff}
																onChange={handleChange}
																name='canEditStaff'
															/>
														}
														label={
															<>
																<p className='text-sm'>Can edit staff</p>
															</>
														}
													/>
												</FormGroup>
												<FormGroup>
													<FormControlLabel
														control={
															<Checkbox
																checked={canRemoveStaff}
																onChange={handleChange}
																name='canRemoveStaff'
															/>
														}
														label={
															<>
																<p className='text-sm'>Can remove staff</p>
															</>
														}
													/>
												</FormGroup>
											</FormControl>

											<FormControl sx={{ m: 1 }} component='fieldset' variant='standard'>
												<FormGroup sx={{ marginTop: 2 }}>
													<FormControlLabel
														control={
															<Checkbox
																checked={canEditDepartment}
																onChange={handleChange}
																name='canEditDepartment'
															/>
														}
														label={
															<>
																<p className='text-sm'>Can edit department</p>
															</>
														}
													/>
												</FormGroup>

												<FormGroup>
													<FormControlLabel
														control={
															<Checkbox
																checked={canEditInstitution}
																onChange={handleChange}
																name='canEditInstitution'
															/>
														}
														label={
															<>
																<p className='text-sm'>Can edit institution</p>
															</>
														}
													/>
												</FormGroup>
												<FormGroup>
													<FormControlLabel
														control={
															<Checkbox
																checked={canRespondToRecommendations}
																onChange={handleChange}
																name='canRespondToRecommendations'
															/>
														}
														label={
															<>
																<p className='text-sm'>
																	Can respond to recommendations
																</p>
															</>
														}
													/>
												</FormGroup>
											</FormControl>
										</Box>

										{/* <div className='mt-5'>
											<Button
												className='add'
												variant='contained'
												// onClick={handleAddStaff}
											>
												Add Type
											</Button>
										</div> */}
									</DialogComponent>
								</div>
							</div>

							<FormControl fullWidth>
								<InputLabel id='demo-simple-select-label'>Department</InputLabel>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={inputForm.department}
									label='Department'
									onChange={onChange}
									name='department'
								>
									{departments.map((val) => (
										<MenuItem value={val.id}>{val.name}</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>
					</DialogComponent>
				</div>
				<div className='cards flex flex-row space-x-4 w-full  mt-2'>
					{staffs.map((staff) => (
						<Card raised sx={{ width: '200px', borderRadius: '1rem' }}>
							<CardContent className='flex flex-col w-full justify-center items-center space-y-3 '>
								<div className='flex w-full justify-end'>
									{staff.type === 'Admin' ? (
										<MoreVertIcon className='cursor-pointer' />
									) : (
										<MoreVertIcon
											className='cursor-pointer'
											aria-expanded={open ? 'true' : undefined}
											onClick={handleClick}
										/>
									)}

									{/* </Button> */}
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
									<DialogComponent
										title='Remove Staff'
										secondAction={{
											label: 'Confirm',
											handler: () => {
												handleRemoveStaff(staff.id);
												handleClose();
											},
										}}
										button={<MenuItem>Remove</MenuItem>}
									>
										Are you sure you want to remove {staff.name}?
									</DialogComponent>
									<DialogComponent
										title='Edit Staff'
										action={{
											label: 'Save Edit',
											handler: () => {
												handleEditStaff(staff.id);
												handleClose();
											},
										}}
										button={<MenuItem onClick={() => preLoadForm(staff)}>Edit</MenuItem>}
									>
										<div className='flex flex-col w-full space-y-4 mt-4'>
											<div>
												<b>Staff:</b> {staff.name}
											</div>
											<div className='flex flex-row w-full space-x-1 '>
												<FormControl fullWidth>
													<InputLabel id='demo-simple-select-label'>
														Staff Type
													</InputLabel>
													<Select
														labelId='demo-simple-select-label'
														id='demo-simple-select'
														value={inputForm.type}
														label='Staff Type'
														onChange={(e) => onChange(e)}
														name='type'
													>
														<MenuItem value=''>
															<em>None</em>
														</MenuItem>
														{staffTypes.map((val) => (
															<MenuItem key={val.id} value={val.name}>
																{val.name}
															</MenuItem>
														))}
													</Select>
												</FormControl>

												<div className='flex items-center'>
													<DialogComponent
														title='Add Custom Type'
														maxWidth='sm'
														button={
															<Tooltip title='Add custom staff type'>
																<IconButton>
																	<HiPlus className='text-gray-400' />
																</IconButton>
															</Tooltip>
														}
													>
														<div className='flex flex-col space-y-4 mt-2 mb-2'>
															<TextField
																fullWidth
																label='Name'
																variant='outlined'
																name='type'
															/>
															<TextField
																fullWidth
																label='Description'
																multiline
																minRows={4}
																variant='outlined'
																name='type'
															/>
														</div>
														<Box sx={{ display: 'flex' }}>
															<FormControl
																sx={{ m: 1 }}
																component='fieldset'
																variant='standard'
															>
																<FormLabel
																	component='legend'
																	sx={{ fontSize: '12px' }}
																>
																	Assign responsibility
																</FormLabel>

																<FormGroup>
																	<FormControlLabel
																		control={
																			<Checkbox
																				checked={canAddStaff}
																				onChange={handleChange}
																				name='canAddStaff'
																			/>
																		}
																		label={
																			<>
																				<p className='text-sm'>Can add staff</p>
																			</>
																		}
																	/>
																</FormGroup>

																<FormGroup>
																	<FormControlLabel
																		control={
																			<Checkbox
																				checked={canEditStaff}
																				onChange={handleChange}
																				name='canEditStaff'
																			/>
																		}
																		label={
																			<>
																				<p className='text-sm'>
																					Can edit staff
																				</p>
																			</>
																		}
																	/>
																</FormGroup>
																<FormGroup>
																	<FormControlLabel
																		control={
																			<Checkbox
																				checked={canRemoveStaff}
																				onChange={handleChange}
																				name='canRemoveStaff'
																			/>
																		}
																		label={
																			<>
																				<p className='text-sm'>
																					Can remove staff
																				</p>
																			</>
																		}
																	/>
																</FormGroup>
															</FormControl>

															<FormControl
																sx={{ m: 1 }}
																component='fieldset'
																variant='standard'
															>
																<FormGroup sx={{ marginTop: 2 }}>
																	<FormControlLabel
																		control={
																			<Checkbox
																				checked={canEditDepartment}
																				onChange={handleChange}
																				name='canEditDepartment'
																			/>
																		}
																		label={
																			<>
																				<p className='text-sm'>
																					Can edit department
																				</p>
																			</>
																		}
																	/>
																</FormGroup>

																<FormGroup>
																	<FormControlLabel
																		control={
																			<Checkbox
																				checked={canEditInstitution}
																				onChange={handleChange}
																				name='canEditInstitution'
																			/>
																		}
																		label={
																			<>
																				<p className='text-sm'>
																					Can edit institution
																				</p>
																			</>
																		}
																	/>
																</FormGroup>
																<FormGroup>
																	<FormControlLabel
																		control={
																			<Checkbox
																				checked={canRespondToRecommendations}
																				onChange={handleChange}
																				name='canRespondToRecommendations'
																			/>
																		}
																		label={
																			<>
																				<p className='text-sm'>
																					Can respond to recommendations
																				</p>
																			</>
																		}
																	/>
																</FormGroup>
															</FormControl>
														</Box>

														<div className='mt-5'>
															<Button
																className='add'
																variant='contained'
																// onClick={handleAddStaff}
															>
																Add Type
															</Button>
														</div>
													</DialogComponent>
												</div>
											</div>

											<FormControl fullWidth>
												<InputLabel id='demo-simple-select-label'>
													Department
												</InputLabel>
												<Select
													labelId='demo-simple-select-label'
													id='demo-simple-select'
													value={inputForm.department}
													label='Department'
													onChange={onChange}
													name='department'
												>
													{departments.map((val) => (
														<MenuItem value={val.id}>{val.name}</MenuItem>
													))}
												</Select>
											</FormControl>
										</div>
									</DialogComponent>
								</Menu>
								<Avatar
									alt='Remy Sharp'
									src={staff.image}
									sx={{
										height: '100px',
										width: '100px',
										border: '1px solid #808080',
									}}
								/>
								<Typography
									className='text-gray-800'
									gutterBottom
									variant='h6'
									component='div'
								>
									{staff.name}
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									{staff.type}
								</Typography>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</>
	);
};

export default ModeratorInstitutionStaff;
