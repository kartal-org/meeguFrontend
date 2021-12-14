import { useEffect, useState } from 'react';

//Material UI
import {
	IconButton,
	Button,
	Rating,
	Box,
	Avatar,
	TextField,
	InputAdornment,
	Typography,
} from '@mui/material';

//Icons
import { CgFileDocument, CgFileRemove } from 'react-icons/cg';
import { TiDocumentAdd } from 'react-icons/ti';
import StarIcon from '@mui/icons-material/Star';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

import {
	addComment,
	addRating,
	getComments,
	getMyRating,
	retrieveArticle,
} from '../../store/articleSlice';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DialogComponent from '../components/reuseableComponents/dialogComponent';
import useFetch from '../../hooks/useFetch';
import { format } from 'date-fns';
import { addArticle } from '../../store/librarySlice';

// const labels = {
// 	0.5: "Useless",
// 	1: "Useless +",
// 	1.5: "Poor",
// 	2: "Poor +",
// 	2.5: "Ok",
// 	3: "Ok +",
// 	3.5: "Good",
// 	4: "Good +",
// 	4.5: "Excellent",
// 	5: "Excellent +",
// };

const AboutArticles = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	const commentState = useFetch;
	const ratingState = useFetch;
	const currentUser = useSelector((state) => state.auth.user);

	useEffect(() => {
		dispatch(retrieveArticle(`/post/change/${id}`));
		dispatch(getComments(`/post/comment?search=${id}`));
		// alert(id);
	}, []);
	useEffect(() => {
		if (currentUser) {
			dispatch(getMyRating(`/post/rating?publication__id=${id}&user__id=${currentUser.id}`));
		}
	}, [currentUser]);

	const fetchArticle = useSelector((state) => state.article.currentArticle);
	const fetchComments = useSelector((state) => state.article.comments);
	const fetchRating = useSelector((state) => state.article.rating);

	const { items: comments } = commentState(fetchComments);
	const { items: rating } = commentState(fetchRating);
	// console.log(comments);
	const [article, setArticle] = useState({
		id: '',
		title: '',
		abstract: '',
		publishedDate: '',
		author: '',
		file: '',
	});

	useEffect(() => {
		if (fetchArticle) {
			setArticle(fetchArticle);
		}
	}, [fetchArticle]);

	const viewPdf = () => {
		if (article) {
			history.push('/fileViewer/' + article.id);
		}
	};
	const handleAddArticle = () => {
		dispatch(addArticle(`/library/`, { user: currentUser.id, publication: article.id }));
		// console.log(article.id);
	};

	//ratings
	const [value, setValue] = useState(0);
	// const [hover, setHover] = useState(-1);

	//comments
	const [comment, setComment] = useState('');

	const handleChange = (event) => {
		setComment(event.target.value);
	};
	function handleComment() {
		dispatch(addComment(`/post/comment`, { content: comment, publication: id }));
	}

	function handleRating() {
		console.log(value);
		dispatch(addRating(`/post/rating`, { rate: value, publication: id }));
		// /post/rating
	}

	return (
		<>
			<div className='w-full'>
				<div className='border-l-2 border-b-2 border-gray-200 p-4'>
					<p className='text-3xl text-gray-800 font-bold tracking-wider'>{article.title}</p>
				</div>
				<div
					className='flex flex-row justify-between border-l-2 border-gray-200'
					style={{
						maxHeight: '670px',
						minHeight: '670px',
					}}
				>
					{/* Left Side */}
					<div
						className='justify-start w-full border-r-2 border-gray-200 p-3'
						style={{
							maxHeight: '670px',
							minHeight: '670px',
						}}
					>
						<div className='mb-3 flex flex-row justify-between'>
							<p className='text-xl text-gray-600 font-medium'>{article.author}</p>
						</div>

						<div className='flex flex-col justify-between mt-5 mb-5'>
							<p className='justify-start text-xl text-gray-600'>Abstract</p>
							<div
								className='justify-between p-2 overflow-y-auto text-sm text-justify'
								style={{
									maxHeight: '230px',
									minHeight: '230px',
								}}
							>
								{article.abstract}
							</div>
						</div>

						<div className='flex flex-col justify-between mt-10'>
							<p className='justify-start text-gray-400 mb-1'>Comments</p>
							<div
								className='justify-between p-2 overflow-y-auto text-sm text-justify border border-gray-50 shadow'
								style={{
									maxHeight: '310px',
									minHeight: '310px',
								}}
							>
								<div className='w-full h-10 flex items-center px-1'>
									<div className='bg-white text-gray-500'>Total # of Comments</div>
								</div>

								{/* Write Comment Here */}
								<div className='w-full h-12 flex items-center px-1 mb-1'>
									<Avatar
										alt='Remy Sharp'
										sx={{ mr: 1 }}
										src={currentUser ? currentUser.profileImage : ''}
									/>
									<TextField
										id='standard-basic'
										// label="Comment here ..."
										name='name'
										value={comment}
										// onChange={(e) => onChange(e)}
										onChange={handleChange}
										variant='standard'
										sx={{ fontSize: '8px', mt: -2, width: '490px', mr: 1 }}
									/>

									<Button variant='contained' onClick={handleComment}>
										Comment
									</Button>
								</div>

								{/* Comments Made by Other People */}
								<div
									className='flex flex-col overflow-y-auto '
									style={{
										maxHeight: '200px',
										minHeight: '200px',
									}}
								>
									{comments
										? comments.map((val) => (
												<div className='w-full h-auto flex flex-col justify-between  px-1 mb-1'>
													<div className='flex w-full justify-between'>
														<div className='flex items-center space-x-2'>
															<Avatar
																alt='Remy Sharp'
																sx={{ mr: 1 }}
																src={val.user.profileImage}
															/>
															<div>
																<b>{val.user.full_name}</b>
															</div>
														</div>
														<p className='text-xs text-gray-400 w-1/6'>
															{format(new Date(val.dateCreated), 'MMM-dd h:m b')}
														</p>
													</div>
													<p className='text-sm text-gray-500 ml-14'>{val.content}</p>
												</div>
										  ))
										: 'This article has no comments yet.'}
								</div>
							</div>
						</div>
					</div>

					{/* Right Side */}
					<div
						className='justify-between w-full'
						style={{
							maxHeight: '670px',
							minHeight: '670px',
						}}
					>
						<div className='p-3 w-full h-1/6 border-b-2 border-gray-200'>
							<div className='w-full flex space-x-4'>
								<Button onClick={viewPdf} variant='outlined' endIcon={<PictureAsPdfIcon />}>
									View PDF
								</Button>
								<Button
									onClick={handleAddArticle}
									variant='outlined'
									endIcon={<TiDocumentAdd />}
								>
									Add to Library
								</Button>
							</div>
						</div>

						<div className='w-full h-1/6 p-4 border-b-2 border-gray-200'>
							<p className='text-xl text-gray-400 mb-1'>Published</p>
							<p className='text-sm text-gray-400'> {article.publishedDate}</p>
						</div>

						<div className='w-full h-4/6 p-4 space-y-10'>
							{/* <div className="w-full h-80 p-4 space-y-10 border-b-2 border-gray-200"> */}
							<div className=''>
								<p className='text-xl text-gray-400 mb-1'>Issue</p>
								<p className='text-sm text-purple-400 underline cursor-pointer'>
									Ambot unsa ni naa diri lol
								</p>
							</div>
							<div className=''>
								<p className='text-xl text-gray-400 mb-1'>Section</p>
								<p className='text-sm text-gray-400'>Article</p>
							</div>
							<div className=''>
								<p className='text-xl text-gray-400 mb-1'>Ratings</p>

								{/* <Box
									sx={{
										width: 220,
										display: "flex",
										alignItems: "center",
										color: "#7c139c",
										fontWeight: 600,
									}}
								>
									<Rating
										name="hover-feedback"
										value={value}
										precision={0.5}
										onChange={(event, newValue) => {
											setValue(newValue);
										}}
										onChangeActive={(event, newHover) => {
											setHover(newHover);
										}}
										emptyIcon={
											<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
										}
									/>
									{value !== null && (
										<Box sx={{ ml: 2 }}>
											{labels[hover !== -1 ? hover : value]}
										</Box>
									)}
								</Box> */}
								<div className='flex items-center'>
									<Box
										sx={{
											'& > legend': { mt: 2 },
											// bgcolor: "#4369bf",
											mr: 2,
										}}
									>
										{article.rating && article.rating.toFixed(2)}
										<Rating
											name='read-only'
											value={parseFloat(article.rating).toFixed(2)}
											precision={0.25}
											readOnly
										/>
									</Box>
									{rating.length > 0 ? null : (
										<DialogComponent
											title='Rate'
											context='Please rate this article'
											maxWidth='sm'
											button={
												<Button
													disabled={rating.length > 0 ? true : false}
													variant='contained'
												>
													Rate here
												</Button>
											}
											action={{ label: 'Submit', handler: handleRating }}
											// action={{ label: "Submit", handler: handleSubmit }}
										>
											<div className='mt-2 flex justify-center'>
												<Box
													sx={{
														'& > legend': { mt: 2 },
													}}
												>
													<Rating
														name='simple-controlled'
														value={value}
														onChange={(event, newValue) => {
															setValue(newValue);
														}}
														sx={{ fontSize: '34px' }}
														readOnly={rating.length > 0 ? true : false}
													/>
												</Box>
											</div>
										</DialogComponent>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutArticles;
