import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
	Avatar,
	Button,
	Card,
	CardMedia,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router';
import queryString from 'query-string';
import useFetch from '../../../../../../../hooks/useFetch';

import PageManagerComponent from '../../../../../../../materialUI/components/reuseableComponents/pageManagerComponent';
import {
	deleteAdviserClassroom,
	editAdviserClassroom,
	getCurrentClassroom,
} from '../../../../../../../store/newClassroomSlice';

import { styled } from '@mui/material/styles';
import {
	deleteWorkspace,
	getCurrentWorkspace,
	updateWorkspace,
} from '../../../../../../../store/workspaceSlice';
import ResearcherWorkspaceFiles from './tabs/files/researcherWorkspaceFiles';
import ProductDetailComponent from '../../../../../../../materialUI/components/reuseableComponents/dashboardComponentCopy';
import DialogComponent from '../../../../../../../materialUI/components/reuseableComponents/dialogComponent';
import FolderMenu from './tabs/files/component/folderMenu';
import FileMenu from './tabs/files/component/fileMenu';
import ResearcherWorkspaceSubmissions from './tabs/submissions/researcherWorkspacesubmissions';
import ResearcherWorkspaceMemberTab from './tabs/members/ResearcherWorkspaceMemberTab';

const Input = styled('input')({
	display: 'none',
});

const ResearcherWorkspaceManager = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const history = useHistory();
	const { tab } = queryString.parse(location.search);
	const { id } = useParams();
	const fetchClassroom = useFetch;

	const [value, setValue] = useState(tab);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	// useEffect(() => {
	// 	setValue(tab);
	// }, [tab]);

	useEffect(() => {
		dispatch(getCurrentWorkspace(id));
	}, []);
	const currentWorkspace = useSelector((state) => state.works.currentWorkspace);
	const [workspace, setWorkspace] = useState({});
	useEffect(() => {
		if (currentWorkspace) {
			setWorkspace({ ...currentWorkspace, coverFile: currentWorkspace.cover });
		}
	}, [currentWorkspace]);

	const onChange = (e) => {
		e.preventDefault();
		if (e.target.name == 'cover') {
			let reader = new FileReader();
			let file = e.target.files[0];

			reader.onloadend = () => {
				setWorkspace({
					...workspace,
					coverFile: file,
					cover: reader.result,
				});
			};
			reader.readAsDataURL(file);
		} else {
			setWorkspace({ ...workspace, [e.target.name]: e.target.value });
		}
	};

	const handleEdit = () => {
		let form_data = new FormData();
		const { name, description, status, cover, coverFile, code } = workspace;
		console.log(coverFile, cover);
		if (coverFile != cover) {
			form_data.append('cover', coverFile, coverFile.name);
		}
		form_data.append('name', name);
		form_data.append('code', code);
		form_data.append('description', description);
		form_data.append('status', status);
		dispatch(updateWorkspace(`workspace/change/${id}`, form_data));
	};

	const handleDelete = () => {
		dispatch(deleteWorkspace(id));
		history.replace(`/classroom/researcher/${workspace.classroom}?tab=workspaces`);
	};

	const tabs = [
		{
			label: 'Dashboard',
			link: `/classroom/researcher/workspace/${id}?tab=dashboard`,
			value: 'dashboard',
			component: 'Dashboard',
		},
		{
			label: 'Files',
			link: `/classroom/researcher/workspace/${id}?tab=files`,
			value: 'files',
			component: <ResearcherWorkspaceFiles />,
		},
		{
			label: 'Submissions',
			link: `/classroom/researcher/workspace/${id}?tab=submissions`,
			value: 'submissions',
			component: <ResearcherWorkspaceSubmissions />,
		},
		{
			label: 'Members',
			link: `/classroom/researcher/workspace/${id}?tab=members`,

			value: 'members',
			component: <ResearcherWorkspaceMemberTab />,
		},
	];

	return (
		<>
			<div className='flex flex-col space-y-4'>
				<ProductDetailComponent product={workspace}>
					<div className='grid grid-cols-2 w-full gap-2 '>
						<div className='flex flex-col space-y-4 '>
							<h5 className='text-2xl font-bold text-gray-700'>{workspace.name}</h5>
							<div className='mt-1 flex flex-row items-center'>
								<Avatar
									alt='Remy Sharp'
									src='https://images.unsplash.com/photo-1579783483458-83d02161294e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
								/>
								<p className='text-sm text-gray-600 ml-2'>{workspace.owner} </p>
							</div>
							<p>{workspace.description}</p>
						</div>
						<div className='flex flex-col justify-between items-end space-y-4'>
							<div className='flex justify-between'></div>
							<div className='flex justify-between space-x-2 '>
								<DialogComponent
									title='workspace Package Info'
									button={<Button>workspace Info</Button>}
								>
									<div className='flex flex-col space-y-4 '>
										<Card sx={{ maxWidth: '100%' }}>
											<CardMedia
												component='div'
												image={workspace.cover}
												className='flex justify-end items-center'
												sx={{
													height: '120px',
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
											value={workspace.name}
											onChange={(e) => onChange(e)}
										/>
										<TextField
											label='Code'
											variant='outlined'
											name='code'
											value={workspace.code}
											InputProps={{
												readOnly: true,
											}}
										/>
										<FormControl fullWidth>
											<InputLabel id='demo-simple-select-label'>Status</InputLabel>
											<Select
												labelId='demo-simple-select-label'
												id='demo-simple-select'
												value={workspace.status}
												label='Status'
												name='status'
												onChange={(e) => onChange(e)}
											>
												<MenuItem value={'draft'}>Draft</MenuItem>
												<MenuItem value={'publish'}>Publish</MenuItem>
											</Select>
										</FormControl>
										<TextField
											label='Description'
											variant='outlined'
											name='description'
											value={workspace.description}
											onChange={(e) => onChange(e)}
											multiline
											minRows={4}
										/>
										<div className='flex w-full space-x-2'>
											<Button variant='contained' onClick={handleEdit}>
												Save Changes
											</Button>
											<Button color='error' onClick={handleDelete}>
												Delete
											</Button>
										</div>
									</div>
								</DialogComponent>
								{tab === 'files' ? (
									<>
										<FolderMenu />
										<FileMenu />
									</>
								) : null}
							</div>
						</div>
					</div>
				</ProductDetailComponent>
				<PageManagerComponent value={value} handleChange={handleChange} tabs={tabs} />
			</div>
		</>
	);
};

export default ResearcherWorkspaceManager;
