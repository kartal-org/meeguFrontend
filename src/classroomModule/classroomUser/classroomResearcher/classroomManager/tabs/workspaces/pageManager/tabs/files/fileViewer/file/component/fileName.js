import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Button, IconButton, InputBase } from '@mui/material';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { editFile } from '../../../../../../../../../../../../store/classResourceSlice';

const FileName = () => {
	const history = useHistory();
	const { id } = useParams();
	const dispatch = useDispatch();
	const fetchedFile = useSelector((state) => state.file.currentFile);
	const [name, setName] = useState('');
	const [edit, setEdit] = useState(true);
	useEffect(() => {
		if (fetchedFile) {
			setName(fetchedFile.name);
		}
	}, [fetchedFile]);
	const onChange = (e) => {
		setName(e.target.value);
		if (name !== '') {
			setEdit(false);
		}
		// put dispatch here
	};
	//
	function handleEdit() {
		dispatch(editFile(`/workspace/file/${id}`, { name }));
	}
	return (
		<>
			<IconButton aria-label='back' size='large' onClick={() => history.goBack()}>
				<FiArrowLeftCircle fontSize='inherit' />
			</IconButton>
			<div className='flex w-full justify-between items-center'>
				<InputBase
					sx={{
						flex: 1,
						fontSize: '1.5rem',
						lineHeight: '2rem',
						fontWeight: 700,
					}}
					name='name'
					placeholder='File Name'
					value={name}
					onChange={onChange}
					size='medium'
					inputProps={{ 'aria-label': 'search google maps' }}
				/>
				<Button variant='contained' onClick={handleEdit} disabled={edit}>
					Save Edit
				</Button>
			</div>
		</>
	);
};

export default FileName;
