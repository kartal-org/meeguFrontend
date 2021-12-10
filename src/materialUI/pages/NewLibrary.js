import { useEffect, useState } from 'react';

//Search Imports
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { format } from 'date-fns';
//Select Imports
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Divider from '@mui/material/Divider';
import { ReactReduxContext } from 'react-redux';

import { useSelector, useDispatch } from 'react-redux';
import { getArticles, removeArticle } from '../../store/librarySlice';
import ArticleCards from '../components/articlecards';
import Button from '@mui/material/Button';
import { Avatar, Card, Rating, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: '.5rem',
	// backgroundColor: "#d6d6d6",
	backgroundColor: 'rgba(229, 231, 235, 1)',
	borderStyle: 'solid',
	borderColor: '#6d0cad',
	// borderColor: "#838CFF",
	border: '2px',
	'&:hover': {
		backgroundColor: 'rgba(229, 231, 235, 1)',
	},
	// marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',

	[theme.breakpoints.up('sm')]: {
		// marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '40ch',
		},
	},
}));

const NewLibrary = ({ item }) => {
	const dispatch = useDispatch();
	const [age, setAge] = useState('');
	const libraryState = useFetch;
	const history = useHistory();

	useEffect(() => {
		dispatch(getArticles());
	}, []);

	const fetchLibrary = useSelector((state) => state.library.articles);
	const { items: articles } = libraryState(fetchLibrary);

	const handleChange = (event) => {
		setAge(event.target.value);
	};
	const handleDelete = (id) => {
		dispatch(removeArticle(id));
	};
	function handleOpen(feedId) {
		history.push(`/article/${feedId}`);
	}

	return (
		<>
			<div className='w-full p-1 mb-4 items-center lg:flex lg:flex-row lg:justify-between lg:space-y-0 space-y-6'>
				<div className=''>
					<Search variant='outlined'>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase placeholder='Search…' inputProps={{ 'aria-label': 'search' }} />
					</Search>
				</div>
				<div className='lg:flex lg:flex-row lg:justify-between items-center'>
					<p className='text-gray-400 text-sm mr-2 lg:text-base'>Sort By :</p>

					<div className=''>
						<Box sx={{ minWidth: 120, maxHeight: '30px' }}>
							<FormControl fullWidth>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={age}
									onChange={handleChange}
									sx={{ maxHeight: '30px' }}
								>
									<MenuItem value={10}>Ten</MenuItem>
									<MenuItem value={20}>Twenty</MenuItem>
									<MenuItem value={30}>Thirty</MenuItem>
								</Select>
							</FormControl>
						</Box>
					</div>
				</div>
			</div>
			<Divider sx={{ mt: 3, mb: 1 }} />
			{/* Cards are here */}
			<div
				className='max-w-full p-2 space-y-5'
				style={{
					minHeight: '595px',
					maxHeight: '595px',
				}}
			>
				{articles &&
					articles.map((feed) => (
						<Card
							sx={{
								width: '800px',
								padding: 2,
								border: 1,
								borderColor: '#e6e6e6',
								mb: 2,
							}}
						>
							<Typography
								variant='body2'
								color='text.secondary'
								sx={{
									fontSize: '18px',
									fontWeight: 700,
								}}
							>
								{feed.publication.title}
							</Typography>

							<p className='text-sm text-gray-400 ml-2'>
								{format(new Date(feed.publication.publishedDate), 'MMM-dd h:m b')}
							</p>

							<div className=' flex flex-row items-center'>
								<p className='bg-purple-200 text-purple-500 text-sm w-20 px-2 py-1 flex items-center justify-center rounded-md'>
									Article
								</p>

								{feed.publication.rating ? feed.publication.rating.toFixed(2) : 0}
								<Rating
									name='half-rating'
									defaultValue={feed.publication.rating ? feed.publication.rating : 0}
									precision={0.25}
									readOnly
								/>
							</div>

							<div className='mt-4 flex flex-row items-center'>
								<Avatar
									alt='Remy Sharp'
									src='https://images.unsplash.com/photo-1579783483458-83d02161294e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
									sx={{ width: 20, height: 20, ml: 1 }}
								/>
								<p className='text-sm text-gray-600 ml-1'>{feed.publication.authors}</p>
							</div>

							<Divider sx={{ m: 2 }} />

							<div className='flex flex-row justify-between'>
								<Button
									onClick={() => handleOpen(feed.publication.id)}
									variant='contained'
									sx={{ ml: 2 }}
								>
									open article
								</Button>

								<Button onClick={() => handleDelete(feed.id)} variant='text'>
									Remove To Library
								</Button>
							</div>
						</Card>
					))}
			</div>
		</>
	);
};

export default NewLibrary;
