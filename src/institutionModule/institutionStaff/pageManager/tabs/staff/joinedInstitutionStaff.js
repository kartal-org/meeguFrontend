import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import useFetch from '../../../../../hooks/useFetch';
import { getStaffs, getStaffTypes } from '../../../../../store/staffSlice';
import { getDepartments } from '../../../../../store/departmentSlice';

import {
	Avatar,
	Button,
	Card,
	CardContent,
	Menu,
	MenuItem,
	TextField,
	Typography,
	InputLabel,
	FormControl,
	Select,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const JoinedInstitutionStaff = () => {
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
		// dispatch(getStaffTypes(`/institution/staff-type`));
		dispatch(getDepartments(`/institution/department/${id}`));
	}, []);
	useEffect(() => {});

	const fetchedStaffs = useSelector((state) => state.staff.staffs);
	const fetchedStaffTypes = useSelector((state) => state.staff.staffTypes);
	const fetchedDepartments = useSelector((state) => state.department.departments);
	const { items: staffs, setItems: setStaffs } = staffStates(fetchedStaffs);
	const { items: staffTypes, setItems: setStaffTypes } = staffTypeStates(fetchedStaffTypes);
	const { items: departments, setItems: setDepartments } = departmentStates(fetchedDepartments);

	return (
		<>
			<div className='flex flex-col space-x-4'>
				<div className='flex flex-row space-x-4 w-full  mt-2'>
					{staffs.map((staff) => (
						<Card raised sx={{ width: '200px', borderRadius: '1rem' }}>
							<CardContent className='flex flex-col w-full justify-center items-center space-y-3 '>
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
									@{staff.username}
								</Typography>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</>
	);
};

export default JoinedInstitutionStaff;
