import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import useFetch from '../../../../../../hooks/useFetch';
import BannerComponent from '../../../../../../materialUI/components/reuseableComponents/bannerComponent';
import CardComponent from '../../../../../../materialUI/components/reuseableComponents/cardComponent';
import CardHolder from '../../../../../../materialUI/components/reuseableComponents/cardHolder';
import DialogComponent from '../../../../../../materialUI/components/reuseableComponents/dialogComponent';
import DialogStepperComponent from '../../../../../../materialUI/components/reuseableComponents/dialogStepperComponent';
import { createWorkspace, getWorkspaces } from '../../../../../../store/workspaceSlice';

import AddMember from './createSteps/addMember';
import WorkspaceDetail from './createSteps/workspaceDetails';

//mui
import { Button, TextField, Typography } from '@mui/material';

//Tour
import { Steps } from 'intro.js-react';

//validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const ResearcherWorkspaceTab = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const workspaceState = useFetch;

	useEffect(() => {
		dispatch(getWorkspaces(`/workspace/student/${id}`));
	}, []);
	const fetchedWorkspace = useSelector((state) => state.works.workspaces);
	const { items: workspaces, setItems: setWorkspaces } = workspaceState(fetchedWorkspace);
	const createProject = () => {};

	const [formData, setFormData] = useState({
		name: '',
		description: '',
		code: '',
	});
	const onChange = (e) => {};

	const steps = [
		{
			label: 'Workspace Details',
			component: <WorkspaceDetail />,
		},
		{
			label: 'Add Members',
			component: <AddMember />,
		},
	];

	//validation
	const validationMsg = Yup.object().shape({
		code: Yup.string()
			.required('Code is required.')
			.min(8, 'Must only have 8 characters only.')
			.max(8, 'Must only have 8 characters only.'),
	});

	const {
		register, // register inputs
		handleSubmit, // handle form submit
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationMsg),
	});

	const onSubmit = (data) => {
		console.log(data);
	};
	const handleJoinProject = (data) => {
		dispatch(createWorkspace(`/workspace/student/${id}`, { workspace: data.code }));
	};

	//tour
	const [stepsEnabled, setStepsEnabled] = useState('true');
	const [initialStep, setInitialStep] = useState(0);

	const tourSteps = [
		{
			element: '.create',
			intro: 'Create your workspace here.',
		},
		{
			element: '.join',
			intro: 'Create your workspace here.',
		},
		{
			element: '.cards',
			intro: 'Manage your workspaces here.',
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

			<div class='flex flex-col w-full space-y-4'>
				<BannerComponent
					title='Welcome to Project Workspace!'
					subtitle='Create and collaborate with your fellow researchers.'
				>
					<div className='flex space-x-2'>
						{/* Create Project */}
						<DialogStepperComponent
							button='Create Project'
							title='Create Project Workspace'
							context='Start your research journey today!'
							maxWidth='md'
							steps={steps}
							tourIdentifier='create'
						></DialogStepperComponent>
						{/* Join Project */}
						<DialogComponent
							button={
								<Button className='join' variant='contained'>
									Join Project
								</Button>
							}
							title='Join Project Workspace'
							maxWidth='sm'
							// action={{ label: 'Join', handler: handleJoinProject }}
						>
							<form
								onSubmit={handleSubmit(handleJoinProject)}
								className='flex flex-col space-y-4'
							>
								<div class='flex flex-col p-4 space-y-4'>
									<TextField
										label='Workspace Code'
										type='text'
										fullWidth
										variant='outlined'
										name='code'
										// value={formData.code}
										// onChange={(e) => onChange(e)}
										{...register('code')}
										error={errors.code ? true : false}
									/>
									<Typography sx={{ fontSize: '12px', color: 'red', fontStyle: 'italic' }}>
										{errors.code?.message}
									</Typography>
								</div>

								<div>
									<Button type='submit' variant='contained'>
										Join Project
									</Button>
								</div>
							</form>
						</DialogComponent>
					</div>
				</BannerComponent>

				<CardHolder tourIdentifier='cards'>
					{workspaces.map((item) => (
						<CardComponent
							item={item}
							image={item.cover}
							link={`/classroom/researcher/workspace/${item.id}?tab=dashboard`}
						/>
					))}
				</CardHolder>
			</div>
		</>
	);
};

export default ResearcherWorkspaceTab;
