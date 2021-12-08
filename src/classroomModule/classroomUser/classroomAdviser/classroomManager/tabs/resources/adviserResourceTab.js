import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BannerComponent from '../../../../../../materialUI/components/reuseableComponents/bannerComponent';
import DialogComponent from '../../../../../../materialUI/components/reuseableComponents/dialogComponent';
import CardHolder from '../../../../../../materialUI/components/reuseableComponents/cardHolder';
import CardComponent from '../../../../../../materialUI/components/reuseableComponents/cardComponent';
import useFetch from '../../../../../../hooks/useFetch';
import { addResource, getResources } from '../../../../../../store/newResourceSlice';

//mui
import { Button, TextField, Typography } from '@mui/material';

//Tour
import { Steps } from 'intro.js-react';

//validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const AdviserResourceTab = () => {
	const dispatch = useDispatch();
	const fetchClassroom = useFetch;
	const { id } = useParams();

	useEffect(() => {
		dispatch(getResources('/resource/classroom?search=' + id));
	}, []);
	const fetchedResources = useSelector((state) => state.newResource.resources);
	const { items: resources, setItems: setResources } = fetchClassroom(fetchedResources);
	const [inputForm, setInputForm] = useState({
		name: '',
		description: '',
	});
	const onChange = (e) => {
		setInputForm({ ...inputForm, [e.target.name]: e.target.value });
	};
	const handleCreate = () => {
		const { name, description } = inputForm;
		dispatch(addResource(`resource/classroom/${id}`, name, description));
	};

	//validation
	const validationMsg = Yup.object().shape({
		name: Yup.string().required('Resource Name is required.'),
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
		const { description } = inputForm;
		let formData = new FormData();
		formData.append('name', data.name);
		formData.append('description', description);
		formData.append('classroom', id);
		dispatch(addResource(`/resource/classroom`, formData));
	};

	//tour
	const [stepsEnabled, setStepsEnabled] = useState('true');
	const [initialStep, setInitialStep] = useState(0);

	const tourSteps = [
		{
			element: '.create',
			intro: 'Create new resource packages here.',
		},
		{
			element: '.cards',
			intro: 'Manage your packages here.',
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
					title=' Hello dear, Adviser !'
					subtitle='Here is where you can set up something to help your students.'
				>
					{/* title, context, action, maxWidth, name, button */}
					<DialogComponent
						button={
							<Button className='create' variant='contained'>
								Create Resource Package
							</Button>
						}
						title='Create Resource Package'
						context='Guide your students to grow.'
						// action={{ label: 'Create', handler: handleCreate }}
					>
						<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
							<div className='flex flex-col space-y-4 mt-4'>
								<TextField
									fullWidth
									id='outlined-search'
									label='Resource Name'
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

								<TextField
									fullWidth
									id='outlined-search'
									label='Description'
									variant='outlined'
									name='description'
									value={inputForm.description}
									onChange={(e) => onChange(e)}
									multiline
									minRows={4}
								/>
							</div>

							<div>
								<Button type='submit' variant='contained'>
									Create Package
								</Button>
							</div>
						</form>
					</DialogComponent>
				</BannerComponent>

				<CardHolder tourIdentifier='cards'>
					{resources.length > 0
						? resources.map((item) => (
								<CardComponent
									link={`/classroom/adviser/resources/${item.id}`}
									image={item.cover}
									item={item}
								/>
						  ))
						: 'no resources created yet'}
				</CardHolder>
			</div>
		</>
	);
};

export default AdviserResourceTab;
