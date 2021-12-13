import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import useFetch from '../../../../../../../hooks/useFetch';
import { getSubmissions } from '../../../../../../../store/submissionSlice';
import { getDepartments } from '../../../../../../../store/departmentSlice';
import { createrecommendation } from '../../../../../../../store/recommendationSlice';

const CreateRecommendations = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const [article, setArticle] = useState('');
	const handleSelectArticle = (event) => {
		setArticle(event.target.value);
	};
	const [department, setDepartment] = useState('');
	const handleSelectDepartment = (event) => {
		setDepartment(event.target.value);
	};
	const submissionsState = useFetch;
	const departmentsState = useFetch;

	useEffect(() => {
		dispatch(getSubmissions(`/submission/classroom?search=${id}`));
		dispatch(getDepartments(`/institution/department/relevant`));
	}, []);

	const fetchedSubmissions = useSelector((state) => state.submission.submissions);
	const fetchedDepartments = useSelector((state) => state.department.departments);
	const { items: departments } = departmentsState(fetchedDepartments);
	const { items: submissions } = submissionsState(fetchedSubmissions);

	function handleCreateRecommendation() {
		dispatch(
			createrecommendation(`submission/recommendation`, { department, submission: article })
		);
	}

	return (
		<>
			<div className='mt-3 flex flex-col space-y-4'>
				<FormControl fullWidth>
					<InputLabel id='demo-simple-select-label'>
						Select From Accepted Submissions
					</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={article}
						label='Select From Accepted Submissions'
						onChange={handleSelectArticle}
					>
						{submissions.map((val) => (
							<MenuItem value={val.id}>{val.title}</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl fullWidth>
					<InputLabel id='demo-simple-select-label'>Select Department To Recommend</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={department}
						label='Select Department To Recommend'
						onChange={handleSelectDepartment}
					>
						{departments.map((val) => (
							<MenuItem value={val.id}>{val.name}</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>

			<div>
				<Button onClick={handleCreateRecommendation} variant='contained' sx={{ mt: 4 }}>
					Add article
				</Button>
			</div>
		</>
	);
};

export default CreateRecommendations;
