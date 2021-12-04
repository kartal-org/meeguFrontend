import * as React from 'react';
import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getMessages, getRooms, sendMessage, createRoom } from '../../../store/messageSlice';

import IconButton from '@mui/material/IconButton';

//Icons
import { BiMessageAltAdd } from 'react-icons/bi';
import { BsInfoCircle, BsSearch } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';

//Input
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

//Modal
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import MessageNotifier from './messageNotifier';
import MessagesRoom from './messagesRoom';
import MessagesList from './messagesList';
import { useLocation, Link } from 'react-router-dom';
import queryString from 'query-string';

import Pusher from 'pusher-js';

export default function NewMesssages() {
	const [message, setMessage] = useState('');
	const location = useLocation();

	// pusher
	let allMessages = [];
	useEffect(() => {
		Pusher.logToConsole = true;

		const pusher = new Pusher('', {
			cluster: '',
		});

		const channel = pusher.subscribe('chat'); //change this to code
		channel.bind('message', function (data) {
			allMessages.push(data);
			// setMessages(allMessages);
		});
	}, []);

	const [user, setUser] = useState({
		username: '',
		first_name: '',
		last_name: '',
	});

	const dispatch = useDispatch();

	const handleChangeMessage = (event) => {
		setMessage(event.target.value);
	};

	const roomList = useSelector((state) => state.message.rooms);
	const { isLoading } = useSelector((state) => state.message);
	const messageFetch = useSelector((state) => state.message.messages);
	const userFetch = useSelector((state) => state.auth.user);
	const [i, setI] = useState(0);

	useEffect(() => {
		if (userFetch) {
			setUser(userFetch);
		}
	}, [userFetch]);

	//List
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [selectedRoom, setSelectedRoom] = useState();

	// query string
	const { roomID } = queryString.parse(location.search);

	const submit = (e) => {
		e.preventDefault();

		dispatch(sendMessage(message, parseInt(roomID)));
		// send message here
		setMessage('');
	};

	//Modals
	const [inputForm, setInputForm] = React.useState({ username: '' });
	const { username } = inputForm;
	const onChange = (e) => setInputForm({ ...inputForm, [e.target.name]: e.target.value });

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const create_Room = () => {
		dispatch(createRoom(username));
	};

	return (
		<>
			<div className=''>
				<div>
					<div
						className=' relative min-h-screen flex flex-col'
						style={{ minHeight: '675px', maxHeight: '675px' }}
					>
						{/* Chat Layout */}

						<div className='flex-grow w-full mx-auto lg:flex'>
							<div
								className='flex-1 min-w-0 xl:flex'
								style={{ minHeight: '665px', maxHeight: '665px' }}
							>
								<div className='border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-gray-50'>
									<div
										className='pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0'
										style={{ minHeight: '665px', maxHeight: '665px' }}
									>
										<div className='h-full relative'>
											<div className='flex flex-row justify-between ml-2'>
												<p className='text-2xl text-gray-500 p-1 justify-start'>
													{' '}
													Chats
												</p>
												<IconButton
													aria-label='more'
													className='justify-between'
													onClick={handleClickOpen}
												>
													<BiMessageAltAdd />
												</IconButton>

												<Dialog open={open} onClose={handleClose}>
													<DialogTitle>Connect with your friends</DialogTitle>
													<DialogContent>
														<DialogContentText sx={{ fontSize: '14px' }}>
															Enter their username here!
														</DialogContentText>
														<TextField
															id='standard-search'
															label='Username'
															variant='standard'
															name='username'
															value={username}
															onChange={(e) => onChange(e)}
															sx={{
																width: '520px',
																marginBottom: '3px',
																marginTop: '15px',
																marginLeft: '15px',
																padding: '2px',
																fontWeight: 'bold',
															}}
														/>
													</DialogContent>
													<DialogActions>
														<Button
															onClick={() => {
																handleClose();
																create_Room();
																// handleSubmit();
															}}
														>
															Add
														</Button>
													</DialogActions>
												</Dialog>
											</div>

											<div
												className='h-full p-2 mt-2 overflow-y-auto space-y-1'
												style={{ minHeight: '600px', maxHeight: '600px' }}
											>
												{/* Room List */}
												<MessagesRoom />
											</div>
										</div>
									</div>
								</div>

								{/* Right Side */}
								<div
									className='flex-1 p:2 sm:pb-6 justify-between flex flex-col  xl:flex'
									style={{ minHeight: '675px', maxHeight: '675px' }}
								>
									<div className='flex sm:items-center justify-between py-3 border-b border-gray-200 p3'>
										<div className='flex items-center space-x-4'>
											<img
												src='https://images.unsplash.com/photo-1635336969198-ec9553adc0e1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1332&q=80'
												alt=''
												className='w-10 sm:w-12 h-10 sm:h-12 ml-2 rounded-full cursor-pointer object-cover'
											/>

											<div className='flex flex-col leading-tight'>
												<div className='text-1xl mt-1 flex items-center'>
													<span className='text-gray-700 mr-3'>{selectedRoom}</span>
													<span className='text-green-500'>
														<svg width={10} height={10}>
															<circle cx={5} cy={5} r={5} fill='currentColor' />
														</svg>
													</span>
												</div>
											</div>
										</div>

										<div className='flex items-center space-x-2'>
											<IconButton aria-label='search'>
												<BsSearch />
											</IconButton>
											<IconButton aria-label='more'>
												<BsInfoCircle />
											</IconButton>
										</div>
									</div>

									{/* Messages starts here */}
									<MessagesList />

									{/* Messages ends here */}
									<div className='border-t-2 border-gray-200 p-4 -mb-3.5'>
										<div className='relative flex'>
											<FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
												<TextField
													multiline
													minRows={3}
													value={message}
													onChange={handleChangeMessage}
													// onKeyPress={submitEnter}
													InputProps={{
														endAdornment: (
															<InputAdornment position='end'>
																<IconButton
																	aria-label='send'
																	edge='end'
																	sx={{ m: 2 }}
																	onClick={submit}
																>
																	<FiSend />
																</IconButton>
															</InputAdornment>
														),
													}}
													sx={{
														width: '900px',
														padding: '5px',
														textAlign: 'justify',
													}}
													label='Type message here ...'
												/>
											</FormControl>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
