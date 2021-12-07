import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { editFile } from '../../../../../../../../../../../../store/classResourceSlice';

const StatusDropDown = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const fetchedFile = useSelector((state) => state.file.currentFile);

	const [status, setStatus] = useState('draft');
	useEffect(() => {
		if (fetchedFile) {
			setStatus(fetchedFile.status);
		}
	}, [fetchedFile]);
	const onChange = (e) => {
		setStatus(e.target.value);
		// put dispatch here
		// if (fetchedFile.status !== status) {
		// 	// alert(status);
		// 	// alert(fetchedFile.status);
		// 	console.log(status);
		// 	// dispatch(editFile(`/workspace/file/${id}`, { status }));
		// }
	};

	useEffect(() => {
		if (fetchedFile) {
			if (fetchedFile.status !== status) {
				// alert(status);
				// alert(fetchedFile.status);
				console.log(status);
				dispatch(editFile(`/workspace/file/${id}`, { status }));
			}
		}
	}, [status]);
	const options = [
		{ label: 'Draft', value: 'draft' },
		{ label: 'Publish', value: 'published' },
	];
	return (
		<>
			<FormControl fullWidth>
				<InputLabel id='demo-simple-select-label'>Status</InputLabel>
				<Select
					name='status'
					value={status}
					label='Status'
					onChange={onChange}
					sx={{ height: '45px' }}
				>
					<MenuItem value='draft'>Draft</MenuItem>
					<MenuItem value='published'>Publish</MenuItem>
				</Select>
			</FormControl>
		</>
	);
};

export default StatusDropDown;
