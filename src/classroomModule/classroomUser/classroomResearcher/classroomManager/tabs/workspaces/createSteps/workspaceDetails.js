import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { createWorkspace } from '../../../../../../../store/workspaceSlice';
import FeedBackButton from '../../../../../../../hooks/feedBackButton';
import useStatus from '../../../../../../../hooks/useStatus';

//mui
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import LoadingButton from '@mui/lab/LoadingButton';
import {
	Button,
	Card,
	CardMedia,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';

//validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Input = styled('input')({
	display: 'none',
});

const WorkspaceDetail = () => {
	const { id } = useParams();
	const defaultImage =
		'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';
	const dispatch = useDispatch();
	const [inputForm, setInputForm] = useState({
		name: '',
		subject: '',
		privacy: 'private',
		description: '',
		cover: defaultImage,
		coverFile: defaultImage,
	});

	const { status } = useSelector((state) => state.class);
	const { loading } = useStatus(status);
	const handleClassroomDetail = () => {
		console.log('hello');
		let form_data = new FormData();
		const { name, description, privacy, subject, cover, coverFile } = inputForm;
		if (coverFile != defaultImage) {
			form_data.append('cover', coverFile, coverFile.name);
		}
		form_data.append('name', name);
		form_data.append('description', description);
		form_data.append('privacy', privacy);
		form_data.append('subject', subject);
		dispatch(createWorkspace(id, form_data));
	};
	console.log(inputForm.coverFile);
	const onChange = (e) => {
		e.preventDefault();
		if (e.target.name == 'cover') {
			let reader = new FileReader();
			let file = e.target.files[0];

			reader.onloadend = () => {
				setInputForm({
					...inputForm,
					coverFile: file,
					cover: reader.result,
				});
			};
			reader.readAsDataURL(file);
		} else {
			setInputForm({ ...inputForm, [e.target.name]: e.target.value });
		}
	};

	//validation
	const validationMsg = Yup.object().shape({
		name: Yup.string().required('Workspace name is required.'),
	});

	const {
		register, // register inputs
		handleSubmit, // handle form submit
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationMsg),
	});

	const onSubmit = (data) => {
		console.log(JSON.stringify(data, null, 2));

		let form_data = new FormData();
		const { description, privacy, subject, cover, coverFile } = inputForm;
		if (coverFile != defaultImage) {
			form_data.append('cover', coverFile, coverFile.name);
		}
		form_data.append('name', data.name);
		form_data.append('description', description);
		form_data.append('privacy', privacy);
		form_data.append('subject', subject);
		form_data.append('classroom', id);
		dispatch(createWorkspace(`/workspace/`, form_data));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='flex w-full justify-center'>
				<div className='flex flex-col space-y-3 w-3/5 '>
					<Card sx={{ maxWidth: '100%' }}>
						<CardMedia
							component='div'
							image={inputForm.cover}
							className='flex justify-end items-center'
							sx={{
								height: '190px',
								display: 'flex',
								justifyContent: 'flex-end',
								alignItems: 'end',
							}}
						>
							<label htmlFor='contained-button-file'>
								<Input
									accept='image/*'
									id='contained-button-file'
									name='cover'
									onChange={onChange}
									type='file'
								/>
								<Button
									variant='contained'
									startIcon={<PhotoCamera />}
									style={{
										marginRight: '10px',
										marginBottom: '10px',
										backgroundColor: 'white',
										color: 'rgba(55, 65, 81, 1)',
										textTransform: 'capitalize',
									}}
									component='span'
								>
									Change Cover Photo
								</Button>
							</label>
						</CardMedia>
					</Card>

					<TextField
						label='Workspace Name'
						variant='outlined'
						name='name'
						// value={inputForm.name}
						// onChange={(e) => onChange(e)}
						{...register('name')}
						error={errors.name ? true : false}
					/>
					<Typography sx={{ fontSize: '12px', color: 'red', fontStyle: 'italic' }}>
						{errors.name?.message}
					</Typography>

					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>Privacy</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={inputForm.privacy}
							label='Privacy'
							name='privacy'
							onChange={(e) => onChange(e)}
						>
							<MenuItem value={'public'}>Public</MenuItem>
							<MenuItem value={'private'}>Private</MenuItem>
						</Select>
					</FormControl>

					<TextField
						label='Description'
						variant='outlined'
						name='description'
						value={inputForm.description}
						onChange={(e) => onChange(e)}
						multiline
						minRows={4}
					/>

					<div className='flex justify-end'>
						{/* <Button variant="contained" onClick={handleClassroomDetail}>
						Create Classroom
					</Button> */}

						<Button type='submit' variant='contained'>
							Create Workspace
						</Button>

						{/* <FeedBackButton
						button={
							<LoadingButton
								onClick={handleClassroomDetail}
								loading={loading}
								type='submit'
								variant='contained'
							>
								Create Classroom
							</LoadingButton>
						}
						status={status}
					/> */}
					</div>
				</div>
			</div>
		</form>
	);
};

export default WorkspaceDetail;
