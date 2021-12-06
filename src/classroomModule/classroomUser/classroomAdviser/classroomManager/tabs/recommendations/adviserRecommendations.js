import React, { useEffect, useState } from 'react';

//mui
import {
	Button,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Card,
	Typography,
	Divider,
	Avatar,
} from '@mui/material';

import Assignment from '@mui/icons-material/Assignment';
import { CgFileDocument } from 'react-icons/cg';
import { RiTimerLine } from 'react-icons/ri';

import DialogComponent from '../../../../../../materialUI/components/reuseableComponents/dialogComponent';
import CardHolder from '../../../../../../materialUI/components/reuseableComponents/cardHolder';
import { useDispatch, useSelector } from 'react-redux';
import { getSubmissions } from '../../../../../../store/submissionSlice';
import useFetch from '../../../../../../hooks/useFetch';
import { getrecommendations } from '../../../../../../store/recommendationSlice';
import CreateRecommendations from './components/createRecommendation';

const AdviserRecommendations = () => {
	const currentClassroom = useSelector((state) => state.newClass.currentClassroom);
	const dispatch = useDispatch();
	const recommendationsState = useFetch;

	useEffect(() => {
		if (currentClassroom) {
			dispatch(getrecommendations(`/submission/recommendation?search=${currentClassroom.code}`));
		}
	}, [currentClassroom]);

	const fetchedRecommendations = useSelector((state) => state.recommendation.recommendations);
	const { items: recommendations } = recommendationsState(fetchedRecommendations);

	//select
	const [article, setArticle] = useState('');
	const [status, setStatus] = useState('');

	const handleSelectArticle = (event) => {
		setArticle(event.target.value);
	};
	const handleSelectStatus = (event) => {
		setStatus(event.target.value);
	};

	const submissions = [
		{
			id: 1,
			author: 'Jonathan Ectuban',
			title: 'Responsiveness on equal work opportunity in the Philippines',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
			workspace_name: 'Workspace 1',

			date: 'DD-MM-YYYY',
		},
		{
			id: 2,
			author: 'Jonathan Ectuban',
			title: 'Responsiveness on equal work opportunity in the Philippines',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
			workspace_name: 'Workspace 1',
			date: 'DD-MM-YYYY',
		},
	];

	return (
		<>
			<div className='flex justify-end'>
				<DialogComponent
					title='Create Recommendations'
					button={<Button variant='contained'> Create Recommendations</Button>}
				>
					<CreateRecommendations />
				</DialogComponent>
			</div>

			<div className='flex justify-end mt-4'>
				<FormControl>
					<InputLabel id='demo-simple-select-label'>Status</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={article}
						label='Status'
						onChange={handleSelectStatus}
						sx={{ width: '248px', minHeight: '50px', maxHeight: '50px' }}
					>
						<MenuItem value={10}>Status 1</MenuItem>
						<MenuItem value={20}>Status 2</MenuItem>
						<MenuItem value={30}>Status 3</MenuItem>
					</Select>
				</FormControl>
			</div>

			<div className='mt-5'>
				<CardHolder>
					{recommendations.map((val) => (
						<Card
							sx={{
								height: '180px',
								width: '1000px',
								padding: 2,
								border: 1,
								borderColor: '#e6e6e6',
								mb: 2,
							}}
						>
							<div className='flex flex-row space-x-3 items-center'>
								<Avatar sx={{ bgcolor: '#6c27a8' }}>
									<Assignment />
								</Avatar>
								<div className='flex justify-between items-center'>
									<p className='text-xl tracking-wider font-semibold'>
										{val.submission.title}
									</p>
								</div>
							</div>

							<p className='text-sm tracking-wider w-full py-3 px-12 mb-2 truncate'>
								{val.submission.description}
							</p>

							<Divider />
							<div className=' px-2 flex space-x-4 mt-4'>
								<div className='flex items-center space-x-1'>
									<CgFileDocument className='text-gray-500' />
									<p className='text-sm text-gray-500'>Workspace Name ●</p>
									<p className='text-sm text-purple-500'>{val.workspace_name} </p>
								</div>
								<div className='flex items-center space-x-1'>
									<RiTimerLine className='text-gray-500' />
									<p className='text-sm text-gray-500'>{val.date} </p>
								</div>
							</div>
						</Card>
					))}
				</CardHolder>
			</div>
		</>
	);
};

export default AdviserRecommendations;
