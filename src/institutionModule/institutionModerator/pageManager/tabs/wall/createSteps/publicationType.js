import DialogComponent from '../../../../../../materialUI/components/reuseableComponents/dialogComponent';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { Button, Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import ApprovedSubmissions from './approvedSubmissions';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFileToUpload } from '../../../../../../store/articleSlice';
const Input = styled('input')({
	display: 'flex',
});
const PublicationType = () => {
	const [file, setFile] = useState();
	const dispatch = useDispatch();
	function onChange(e) {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];
		reader.onloadend = () => {
			setFile(file);
		};
		reader.readAsDataURL(file);
	}
	function handleUploadFile() {
		console.log(file);
		if (file) {
			dispatch(setFileToUpload(file));
			localStorage.setItem('file', JSON.stringify(file));
		} else {
			alert('No file selected');
		}
	}
	return (
		<>
			<div className='flex flex-col justify-center items-center w-full h-56  space-y-8'>
				<div className='flex items-center'>
					<p className='text-lg font-bold text-gray-700'>Please Select Publication Method</p>
					<span>
						<DialogComponent
							button={
								<IconButton color='primary' aria-label='add to shopping cart'>
									<InfoIcon />
								</IconButton>
							}
							title='Publication Method'
						>
							Explain What is Publication Method
						</DialogComponent>
					</span>
				</div>
				<div className='flex space-x-6'>
					<DialogComponent
						maxHeight='500px'
						noAction={true}
						title='Approved Submission List'
						button={<Button variant='outlined'>Select from Submissions</Button>}
					>
						<ApprovedSubmissions />
					</DialogComponent>
					<DialogComponent
						title='Upload File'
						noAction={true}
						button={<Button variant='outlined'>Upload File Archive</Button>}
						action={{ label: 'Ok', handler: handleUploadFile }}
					>
						<div className='flex min-h-full w-full justify-center items-center'>
							<label htmlFor='contained-button-file'>
								<input
									accept='application/pdf'
									onChange={onChange}
									name='file'
									id='icon-button-file'
									type='file'
								/>
							</label>
						</div>
					</DialogComponent>
				</div>
			</div>
		</>
	);
};

export default PublicationType;
