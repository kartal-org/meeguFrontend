import { Button, Card, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { CgFileDocument } from 'react-icons/cg';
import { HiOutlineClock } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import useFetch from '../../../../../../../../../hooks/useFetch';
import CardHolder from '../../../../../../../../../materialUI/components/reuseableComponents/cardHolder';
import DialogComponent from '../../../../../../../../../materialUI/components/reuseableComponents/dialogComponent';
import {
	deleteSubmission,
	editSubmission,
	getSubmissions,
} from '../../../../../../../../../store/submissionSlice';

const ResearcherWorkspaceSubmissions = () => {
	const { id } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const submissionState = useFetch;
	useEffect(() => {
		dispatch(getSubmissions(`/submission/?search=${id}`));
	}, []);
	const fetchedSubmissions = useSelector((state) => state.submission.submissions);
	const { items: submissions, setItems: setSubmissions } = submissionState(fetchedSubmissions);
	const [submissionForm, setSubmissionForm] = useState({
		title: '',
		description: '',
		status: '',
	});
	const handleCheckup = (item) => {
		console.log(submissionForm);
		let formData = new FormData();
		formData.append('title', submissionForm.title);
		formData.append('description', submissionForm.description);
		formData.append('status', submissionForm.status);
		dispatch(editSubmission(`submission/change/${item.id}`, formData));
	};

	const handleClickDialog = (item) => {
		setSubmissionForm({ title: item.title, description: item.description, status: item.status });
	};
	const onChange = (e) => {
		setSubmissionForm({ ...submissionForm, [e.target.name]: e.target.value });
	};
	const handleFileRedirect = (file) => {
		if (file.file.content) {
			history.push(`/classroom/researcher/workspace/file/${file.file.id}`);
		}
		if (file.file.file) {
			history.push(`/classroom/researcher/workspace/upload-file/${file.file.id}`);
		}
	};
	const handleDelete = (item) => {
		dispatch(deleteSubmission(`submission/change/${item.id}`));
	};

	return (
		<>
			<CardHolder>
				{submissions.map((item) => (
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
								title={item.title}
								button={
									<Button onClick={() => handleClickDialog(item)} variant='contained'>
										Edit Submission
									</Button>
								}
								secondAction={{ label: 'Delete', handler: handleDelete, param: item }}
								action={{ label: 'Save Edit', handler: handleCheckup, param: item }}
							>
								<div className='flex flex-col space-y-4 mt-4'>
									<TextField
										label='Workspace Name'
										variant='outlined'
										name='title'
										value={submissionForm.title}
										onChange={(e) => onChange(e)}
									/>
									<TextField
										label='Description'
										variant='outlined'
										name='description'
										value={submissionForm.description}
										onChange={(e) => onChange(e)}
										multiline
										minRows={4}
									/>
									<FormControl fullWidth>
										<InputLabel id='demo-simple-select-label'>Status</InputLabel>
										<Select
											labelId='demo-simple-select-label'
											id='demo-simple-select'
											value={submissionForm.status}
											label='Status'
											name='status'
											onChange={(e) => onChange(e)}
										>
											<MenuItem value={'draft'}>Draft</MenuItem>
											<MenuItem value={'submit'}>Submit</MenuItem>
										</Select>
									</FormControl>
									<Button onClick={() => handleFileRedirect(item)} variant='outlined'>
										Check File - "{item.file.name}"
									</Button>
								</div>
							</DialogComponent>
						</div>
						<div className='flex justify-between items-center'>
							<p className='text-3xl tracking-wider font-semibold'>{item.title}</p>
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
							{item.description}
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
				))}
			</CardHolder>
		</>
	);
};

export default ResearcherWorkspaceSubmissions;
