import { useState, useEffect } from 'react';

//Tour
import { Steps } from 'intro.js-react';

//mui
import {
	Box,
	TextField,
	InputBase,
	IconButton,
	Paper,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

//IconButton
import { HiOutlineFilter } from 'react-icons/hi';

import { styled } from '@mui/material/styles';
//Reusable
import CardHolder from '../../materialUI/components/reuseableComponents/cardHolder';
import CardComponent from '../../materialUI/components/reuseableComponents/cardComponent';
import DialogStepperComponent from '../../materialUI/components/reuseableComponents/dialogStepperComponent';
import BannerComponent from '../../materialUI/components/reuseableComponents/bannerComponent';

import { useSelector, useDispatch } from 'react-redux';
import {
	applyVerification,
	createInstitution,
	getInstitutions,
} from '../../store/newInstitutionSlice';
import useFetch from '../../hooks/useFetch';
import { getInstitutionPlans } from '../../store/subscriptionSlice';

// import Loader from '../../components/loader';

import Paypal from '../../materialUI/components/paypal';
import DialogComponent from '../../materialUI/components/reuseableComponents/dialogComponent';
import InstitutionDetails from './createSteps/institutionDetails';
import InstitutionVerification from './createSteps/institutionVerification';
import InstitutionSubscription from './createSteps/institutionSubscription';

const Input = styled('input')({
	display: 'flex',
});

const ModeratorInstitution = () => {
	// hooks
	const dispatch = useDispatch();

	useState(() => {
		dispatch(getInstitutions('/institution/admin'));
	}, []);

	const fetchPlans = useSelector((state) => state.subscription.plans);
	const { institutions: fetchInstitutions, status: institutionStatus } = useSelector(
		(state) => state.institution
	);

	const { items: institutions } = useFetch(fetchInstitutions);

	const steps = [
		{
			label: 'Institution Details',
			component: <InstitutionDetails />,
		},
		{
			label: 'Institution Verification',
			component: <InstitutionVerification />,
		},
		{
			label: 'Choose a Subscription Plan',
			component: <InstitutionSubscription />,
		},
	];

	//tour
	const [stepsEnabled, setStepsEnabled] = useState('true');
	const [initialStep, setInitialStep] = useState(0);

	const tourSteps = [
		{
			element: '.create',
			intro: 'You can create your new institution page here.',
		},
		{
			element: '.search',
			intro: 'You can search for a specific institution here.',
		},
		{
			element: '.filter',
			intro: 'Filter out things for your convenience.',
		},
		{
			element: '.cards',
			intro: 'See your institution cards here.',
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
			{/* <Steps
				enabled={stepsEnabled}
				steps={tourSteps}
				initialStep={initialStep}
				onExit={onExit}
			/> */}

			<div class='flex flex-col w-full space-y-4'>
				<BannerComponent
					title='Hello Institution Manager!'
					subtitle='Create and manage your Institution page here:'
				>
					<DialogStepperComponent
						title='Create Institution'
						name='dialogStepper'
						steps={steps}
						button='Create New Institution'
						tourIdentifier='create'
					></DialogStepperComponent>
				</BannerComponent>

				<div className='w-full flex flex-row justify-end '>
					{/* Search Box */}
					<Paper
						variant='outlined'
						component='form'
						sx={{
							p: '2px 4px',
							display: 'flex',
							alignItems: 'center',
							width: 400,
						}}
						class='search'
					>
						<InputBase
							sx={{ ml: 1, flex: 1 }}
							placeholder='Search Institution'
							inputProps={{ 'aria-label': 'search institution' }}
						/>
						<IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
							<SearchIcon sx={{ mr: 3 }} />
						</IconButton>
					</Paper>

					<IconButton aria-label='filter' aria-haspopup='true' name='menu'>
						<HiOutlineFilter class='filter' />
					</IconButton>
				</div>

				<CardHolder tourIdentifier='cards'>
					{/* {institutionStatus == 'loading' ? <Loader /> : null} */}
					{institutions.map((item) => (
						<CardComponent
							image={item.cover}
							item={item}
							link={`/institutions/moderator/${item.id}?tab=wall`}
						/>
					))}
				</CardHolder>
			</div>
		</>
	);
};

export default ModeratorInstitution;
