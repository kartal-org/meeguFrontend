import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import useFetch from '../../../../../../../../hooks/useFetch';
import { getSubmissions } from '../../../../../../../../store/submissionSlice';

import {
	Button,
	Card,
	Dialog,
	DialogActions,
	DialogTitle,
	Divider,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	TextField,
} from '@mui/material';

import DialogComponent from '../../../../../../../../materialUI/components/reuseableComponents/dialogComponent';

//icons
import { CgFileDocument } from 'react-icons/cg';
import { HiOutlineClock } from 'react-icons/hi';
import { createresponse } from '../../../../../../../../store/responseSlice';

const DepartmentSubmissions = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const submissionsState = useFetch;
	const history = useHistory();
	useEffect(() => {
		dispatch(getSubmissions(`/submission/recommendation?search=${id}`));
	}, []);
	const fetchedSubmissions = useSelector((state) => state.submission.submissions);
	const { items: submissions, setItems: setSubmissions } = submissionsState(fetchedSubmissions);

	// note to thania gamita ang submissions para i map ang mga submissions

	const handleClickOpen = (itemId) => {
		history.push(`/institutions/moderator/department/${itemId}`);
	};

	//select
	const [submissionStatus, setSubmissionStatus] = useState('pending');

	const handleChange = (event) => {
		setSubmissionStatus(event.target.value);
	};
	//select
	const [status, setStatus] = useState('');

	const [comment, setComment] = useState('');

	function handleChangeForm(e) {
		if (e.target.name === 'status') {
			setStatus(e.target.value);
		}
		if (e.target.name === 'comment') {
			setComment(e.target.value);
		}
	}

	function handleClickOpenFile(item) {
		history.push(`/institutions/moderator/department/submission/pdf/${item.submission.file.id}`);
		console.log(item.submission.file.id);
	}
	function handleRespondRecommendation(itemID) {
		dispatch(
			createresponse(`/submission/recommendation/response`, {
				recommendation: itemID,
				comment,
				responseStatus: status,
			})
		);
	}
	return (
		<>
			<div className='flex w-full justify-end mb-4'>
				<div className='flex w-56'>
					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>Submission Status</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={submissionStatus}
							label='Submission Status'
							onChange={handleChange}
						>
							<MenuItem value={'pending'}>Pending</MenuItem>
							<MenuItem value={'revision'}>Revision</MenuItem>
							<MenuItem value={'accepted'}>Accepted</MenuItem>
							<MenuItem value={'published'}>Published</MenuItem>
							<MenuItem value={'rejected'}>Rejected</MenuItem>
						</Select>
					</FormControl>
				</div>
			</div>

			{/* Cards here */}
			<div
				className='px-1 overflow-y-auto bg-red-50'
				style={{ maxHeight: '600px', minHeight: '600px' }}
			>
				{submissions.map((item) => {
					return (
						<Card
							item={item}
							sx={{
								maxHeight: 180,
								minHeight: 180,
								border: 1,
								borderColor: '#d4d4d4',
								mb: 1,
								p: 2,
							}}
						>
							<div className='flex justify-end'>
								<DialogComponent
									title={item.submission ? item.submission.title : null}
									button={<Button variant='contained'>Check Recommendation</Button>}
									action={{
										label: 'Confirm Action',
										handler: () => handleRespondRecommendation(item.id),
									}}
								>
									<div className='flex flex-col mt-4 space-y-4 w-full'>
										<TextField
											id='outlined-read-only-input'
											label='Submission Title'
											value={item.submission ? item.submission.title : null}
											InputProps={{
												readOnly: true,
											}}
										/>

										<TextField
											id='outlined-read-only-input'
											label='Submission Description'
											value={item.submission ? item.submission.description : null}
											multiline
											minRows={4}
											InputProps={{
												readOnly: true,
											}}
										/>

										<FormControl fullWidth>
											<InputLabel id='demo-simple-select-label'>Verdict</InputLabel>
											<Select
												labelId='demo-simple-select-label'
												id='demo-simple-select'
												value={status}
												label='Verdict'
												name='status'
												onChange={handleChangeForm}
											>
												<MenuItem value={'accepted'}>Accept</MenuItem>
												<MenuItem value={'reject'}>Reject</MenuItem>
												<MenuItem value={'revise'}>Revise</MenuItem>
											</Select>
										</FormControl>

										<TextField
											id='outlined-basic'
											label='Comment'
											name='comment'
											value={comment}
											onChange={handleChangeForm}
											multiline
											minRows={4}
										/>
										{/* </Box>
								))} */}
										<Button variant='outlined' onClick={() => handleClickOpenFile(item)}>
											View File
										</Button>
									</div>
								</DialogComponent>
							</div>
							<div className='flex justify-between items-center'>
								<p className='text-3xl tracking-wider font-semibold'>
									{item.submission ? item.submission.title : null}
								</p>
								<p className='text-xs text-gray-400'>{item.date}</p>
							</div>
							<p
								className='text-sm tracking-wider truncate'
								style={{
									maxHeight: '40px',
									minHeight: '40px',
									maxWidth: '1210px',
									minWidth: '1210px',
									padding: 5,
								}}
							>
								{item.submission ? item.submission.description : null}
							</p>
							<div className='mt-2 px-2 flex space-x-2'>
								<div className='flex items-center space-x-1'>
									<CgFileDocument className='text-gray-500' />
									<p className='text-sm text-gray-500'>Workspace Name ●</p>
									<p className='text-xs text-purple-500'>{item.workspace} </p>
								</div>
								<div className='flex items-center space-x-1'>
									<HiOutlineClock className='text-gray-500' />
									<p className='text-sm text-gray-500'>Status ●</p>
									<p className='text-xs text-purple-500'>{item.status} </p>
								</div>
							</div>
						</Card>
					);
				})}
			</div>
		</>
	);
};

export default DepartmentSubmissions;
