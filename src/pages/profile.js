import React, { useEffect, useState } from 'react';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Link, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileCardComponent from '../materialUI/components/reuseableComponents/profileCardComponent';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import useFetch from '../hooks/useFetch';
import { editProfile, editProfileImage } from '../store/authSlice';

import PageManagerComponent from '../materialUI/components/reuseableComponents/pageManagerComponent';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import ProfileAbout from './profileAbout';
import DialogComponent from '../materialUI/components/reuseableComponents/dialogComponent';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import { FaRegCommentAlt } from 'react-icons/fa';
import { Avatar, Button, IconButton, TextField, Card, CardHeader, Divider } from '@mui/material';

const Profile = ({ match }) => {
	const location = useLocation();
	const dispatch = useDispatch();
	const { tab } = queryString.parse(location.search);

	const [value, setValue] = useState(tab);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const user = useSelector((state) => state.auth.user);
	const { items: profile, setItems: setProfile } = useFetch(user);

	const handleSubmit = (form_data) => {
		dispatch(editProfileImage(user.id, form_data));
	};
	const handleEdit = () => {
		const { first_name, last_name, about, username, email } = profile;
		console.log(first_name, last_name, username, email, about, user.id);
		let formdata = new FormData();
		formdata.append('first_name', first_name);
		formdata.append('last_name', last_name);
		formdata.append('username', username);
		formdata.append('email', email);
		formdata.append('about', about);
		dispatch(editProfile(`/api/user/me/edit/${user.id}/`, formdata));
	};
	const onChange = (e) => {
		// e.preventDefault();
		setProfile({ ...profile, [e.target.name]: e.target.value });
	};
	// console.log(profile);

	const tabs = [
		// {
		// 	label: 'About',
		// 	link: `/profile?tab=about`,
		// 	value: 'about',
		// 	component: <ProfileAbout />,
		// },
		{
			label: 'Published Works',
			link: `/profile?tab=published-works`,
			value: 'published-works',
			component: <div>Publish Works</div>,
		},
		{
			label: 'Activity',
			link: `/profile?tab=activity`,
			value: 'activity',
			component: (
				<>
					<div className=''>
						<Card
							sx={{
								maxHeight: 150,
								minHeight: 150,
								border: 1,
								borderColor: '#d4d4d4',
							}}
						>
							{/* Top Part */}
							<div className='flex items-center px-2' style={{ height: 50 }}>
								<div className='flex flex-row bg-white w-full justify-between items-center'>
									<div className='flex items-center'>
										<FaRegCommentAlt className='text-xl text-gray-400 mr-2' />

										<p className='text-sm text-purple-400 mr-1'>
											Name here dili username
										</p>
										<p className='text-sm text-gray-400 mr-1'>commented on</p>
										<p className='text-sm text-gray-400'>/* Title Here */</p>
									</div>

									<div className='flex items-center'>
										<p className='text-xs text-gray-400 mr-2'>●</p>
										<p className='text-sm text-gray-400 mr-1'>Date</p>
									</div>
								</div>
							</div>

							<Divider sx={{ m: 1 }} />
							{/* Bottom Part */}
							<div className='flex flex-row' style={{ height: 100 }}>
								{/* Vertical Line */}
								<div className='w-10 flex flex-col justify-center py-1'>
									<p className='text-gray-400 text-sm flex justify-center -mt-1'>┆</p>
									<p className='text-gray-400 text-sm flex justify-center -mt-1'>┆</p>
									<p className='text-gray-400 text-sm flex justify-center -mt-1'>┆</p>
									<p className='text-gray-400 text-sm flex justify-center -mt-1'>┆</p>
									<p className='text-gray-400 text-sm flex justify-center -mt-1'>┆</p>
									<p className='text-gray-400 text-sm flex justify-center -mt-1'>┆</p>
								</div>
								<div className='bg-gray-200 w-full p-1'>sdg</div>
							</div>
						</Card>
					</div>
				</>
			),
		},
	];

	return (
		<>
			<div class='flex flex-col w-full space-y-4'>
				<ProfileCardComponent
					item={profile}
					setItem={setProfile}
					dispatchAction={handleSubmit}
					editButton={
						<DialogComponent
							maxWidth='sm'
							button={
								<Button variant='outlined' startIcon={<ModeEditIcon />}>
									Edit
								</Button>
							}
							title='Edit Profile'
							action={{ label: 'Edit', handler: handleEdit }}
						>
							<div className='flex flex-col w-full mt-4 space-y-4'>
								<TextField
									label='First Name'
									name='first_name'
									value={profile.first_name}
									onChange={(e) => onChange(e)}
									variant='outlined'
									required
								/>
								<TextField
									label='Last Name'
									name='last_name'
									value={profile.last_name}
									onChange={(e) => onChange(e)}
									variant='outlined'
									required
								/>
								<TextField
									label='Username'
									name='username'
									value={profile.username}
									onChange={(e) => onChange(e)}
									variant='outlined'
									required
								/>
								<TextField
									label='Email'
									name='email'
									value={profile.email}
									onChange={(e) => onChange(e)}
									variant='outlined'
									required
								/>
								<TextField
									fullWidth
									label='About'
									name='about'
									value={profile.about}
									onChange={(e) => onChange(e)}
									multiline
									minRows={8}
									variant='outlined'
									inputProps={{ maxLength: 150 }}
								/>
							</div>
						</DialogComponent>
					}
				/>

				<PageManagerComponent value={value} handleChange={handleChange} tabs={tabs} />
			</div>
		</>
	);
};

export default Profile;
