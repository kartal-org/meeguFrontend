import { useState, useEffect } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import useFetch from '../../../../hooks/useFetch';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { getInstitutions, staffInstitutionList } from '../../../../store/newInstitutionSlice';

import FeedBackButton from '../../../../hooks/feedBackButton';
import LoadingButton from '@mui/lab/LoadingButton';
import useStatus from '../../../../hooks/useStatus';
import { editAdviserClassroom, editClassroom } from '../../../../store/newClassroomSlice';
import ClassroomSubscriptionPlan from './classroomSubscriptionPlan';

const ClassroomAffliate = () => {
	const dispatch = useDispatch();
	const useFetch2 = useFetch;
	const [checked, setChecked] = useState(true);
	const { currentClassroom } = useSelector((state) => state.newClass);

	useEffect(() => {
		dispatch(getInstitutions(`/institution/`));
	}, []);
	const fetchedInstitutions = useSelector((state) => state.institution.institutions);
	const { items: institutions, setItems: setInstitutions } = useFetch2(fetchedInstitutions);

	const [selectInstitution, setSelectInstitution] = useState('');
	const onChange = (e) => {
		e.preventDefault();
		setSelectInstitution(e.target.value);
	};

	const handleChange = (event) => {
		setChecked(event.target.checked);
	};

	const { status } = useSelector((state) => state.class);
	const { loading } = useStatus(status);
	const handleClassroomAffliate = () => {
		if (localStorage.getItem('createdClassroom')) {
			let form_data = new FormData();
			form_data.append('institution', selectInstitution);
			dispatch(editClassroom(`classroom/change/${currentClassroom.id}`, form_data, 'patch'));
		} else {
			alert("Sorry but it seems you haven't created a classroom yet.");
		}
	};
	return (
		<>
			<div className='flex flex-col w-full items-center mt-4 space-y-4  '>
				<div className='flex flex-col w-2/5 space-y-4'>
					<FormControlLabel
						control={<Checkbox checked={checked} onChange={handleChange} />}
						label='Is this classroom an affliate with an Institution?'
					/>
					{checked ? (
						<>
							<FormControl fullWidth>
								<InputLabel id='demo-simple-select-label'>Select Institution</InputLabel>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={selectInstitution}
									label='Select Institution'
									name='selectInstitution'
									onChange={(e) => onChange(e)}
								>
									<MenuItem value=''>
										<em>None</em>
									</MenuItem>
									{institutions.map((item) => (
										<MenuItem key={item.id} value={item.id}>
											{item.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<p>
								<b>Note: </b>If the choices is empty, that means you are not a staff to any
								institution. Please notify your institutition admin for this.
								<br />
							</p>
							<div>
								<FeedBackButton
									button={
										<LoadingButton
											onClick={handleClassroomAffliate}
											loading={loading}
											type='submit'
											variant='contained'
										>
											Add Classroom Affliate
										</LoadingButton>
									}
									status={status}
								/>
								{/* <Button variant='contained'>Add Classroom Affliate</Button> */}
							</div>
						</>
					) : (
						<>
							<ClassroomSubscriptionPlan />
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default ClassroomAffliate;
