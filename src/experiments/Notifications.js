import React, { useEffect } from 'react';

import {
	Divider,
	Paper,
	MenuList,
	MenuItem,
	ListItemText,
	ListItemIcon,
	Typography,
} from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

import { GoCommentDiscussion } from 'react-icons/go';
import { HiOutlineSpeakerphone, HiOutlineClock } from 'react-icons/hi';
import { MdOutlineFactCheck, MdOutlineSchool } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getnotification } from '../store/notificationSlice';
import useFetch from '../hooks/useFetch';
import { format } from 'date-fns';
import { useHistory } from 'react-router-dom';

const Notifications = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const notificationState = useFetch;
	useEffect(() => {
		dispatch(getnotification(`/notification/`));
	}, []);
	const fetchedNotifs = useSelector((state) => state.notification.notifications);
	const { items: notifications, setItems: setNotifications } = notificationState(fetchedNotifs);

	function handleOnClickVerification(notif) {
		console.log(notif);
		history.push(`/institutions/moderator/${notif.id}?tab=wall`);
	}
	return (
		<>
			<div className='flex flex-col w-full space-y-2'>
				<List>
					{notifications.map((val) => {
						if (val.type == 'verification') {
							return (
								<ListItemButton
									onClick={() => handleOnClickVerification(val)}
									selected={!val.isRead}
								>
									<ListItemIcon>
										<MdOutlineSchool fontSize='large' />
									</ListItemIcon>
									<div className='flex w-full items-center'>
										{/* <p className='font-semibold mr-1'>Name</p> */}
										<p className='text-sm text-gray-500'>{val.message}</p>
										<p className='ml-auto text-xs text-gray-400'>
											{' '}
											{format(new Date(val.dateCreated), 'MMM-dd h:mm b')}
										</p>
									</div>
								</ListItemButton>
							);
						}
					})}
					<MenuItem>
						<ListItemIcon>
							<HiOutlineSpeakerphone fontSize='large' />
						</ListItemIcon>
						<div className='flex w-full items-center'>
							<p className='font-semibold mr-1'>Name</p>
							<p className='text-sm text-gray-500 mr-1'>called for a revision on</p>
							<p className='text-sm text-gray-500'>this part</p>
							<p className='ml-auto text-xs text-gray-400'> MM-DD-YYYY ● </p>
						</div>
					</MenuItem>
					<MenuItem>
						<ListItemIcon>
							<MdOutlineFactCheck fontSize='large' />
						</ListItemIcon>
						<div className='flex w-full items-center'>
							<p className='font-semibold mr-1'>Name</p>
							<p className='text-sm text-gray-500 mr-1'>has approved of your admission</p>
							<p className='ml-auto text-xs text-gray-400'> MM-DD-YYYY ● </p>
						</div>
					</MenuItem>
					<MenuItem>
						<ListItemIcon>
							<MdOutlineSchool fontSize='large' />
						</ListItemIcon>
						<div className='flex w-full items-center'>
							<p className='font-semibold mr-1'>Name</p>
							<p className='text-sm text-gray-500 mr-1'>
								Your page is now verified. You have now successfully created your
								insititutional page
							</p>
							<p className='ml-auto text-xs text-gray-400'> MM-DD-YYYY ● </p>
						</div>
					</MenuItem>
					<MenuItem>
						<ListItemIcon>
							<HiOutlineClock fontSize='large' />
						</ListItemIcon>
						<div className='flex w-full items-center'>
							<p className='text-sm text-gray-500 mr-1'>
								The deadline for this task is fast approaching. Please be mindful.
							</p>
							<p className='ml-auto text-xs text-gray-400'> MM-DD-YYYY ● </p>
						</div>
					</MenuItem>
				</List>
			</div>
		</>
	);
};

export default Notifications;
