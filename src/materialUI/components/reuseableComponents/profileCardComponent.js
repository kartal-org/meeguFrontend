import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Avatar, Button, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import ProfilePicture from '../../../components/profilePicture';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
const Input = styled('input')({
	display: 'none',
});
const ProfileCardComponent = ({ item, setItem, dispatchAction, editButton }) => {
	const onChange = (e) => {
		let form_data = new FormData();
		switch (e.target.name) {
			case 'image':
				console.log(e.target.files[0]);
				form_data.append('profileImage', e.target.files[0], e.target.files[0].name);
				break;
			case 'cover':
				form_data.append('profileCover', e.target.files[0], e.target.files[0].name);
				break;
		}
		dispatchAction(form_data);
	};

	return (
		<>
			<Card variant='outlined' sx={{ maxWidth: '100%' }}>
				<CardMedia
					component='div'
					height='140'
					image={item.profileCover}
					className='flex justify-end items-center'
					sx={{
						minHeight: '300px',
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
				<CardContent
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'start',
					}}
				>
					<div className='-mt-32'>
						<label htmlFor='icon-button-file'>
							<Input
								accept='image/*'
								name='image'
								id='icon-button-file'
								type='file'
								onChange={onChange}
							/>
							<IconButton aria-label='upload picture' component='span'>
								<Avatar
									alt='Remy Sharp'
									src={item.profileImage}
									sx={{ width: '10rem', height: '10rem', border: '6px solid #ffff' }}
								/>
							</IconButton>
						</label>
					</div>
					<div className='flex justify-between w-full items-center '>
						<div className='text-xl font-bold'>{item.name}</div>
						<div className='text-xl font-semibold'>{editButton}</div>
					</div>
					{item.username ? (
						<div className='text-sm text-gray-500'>@{item.username}</div>
					) : null}

					<div className='mt-4 text-base '>
						{item.about ? item.about : null}
						{item.description ? item.description : null}
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export default ProfileCardComponent;
