import { Button, TextField } from '@mui/material';
import 'quill/dist/quill.snow.css';
import { useEffect } from 'react';
import { MdOutlinePlagiarism, MdOutlineSpeakerNotes } from 'react-icons/md';
import { useQuill } from 'react-quilljs';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import useFetch from '../../../../../../../hooks/useFetch';
import { retrieveSubmission } from '../../../../../../../store/submissionSlice';

const AdviserSubmissionViewer = () => {
	const theme = 'snow';
	const { id } = useParams();
	const dispatch = useDispatch();
	const submissionState = useFetch;
	useEffect(() => {
		dispatch(retrieveSubmission(`submission/change/${id}`));
	}, []);
	const fetchedSubmission = useSelector((state) => state.submission.currentSubmission);
	const { items: submission, setItems: setSubmission } = submissionState(fetchedSubmission);

	const modules = {
		toolbar: [
			[{ font: [] }],
			['bold', 'italic', 'underline', 'strike'],
			[{ align: [] }],

			[{ list: 'ordered' }, { list: 'bullet' }],
			[{ indent: '-1' }, { indent: '+1' }],

			// [{ size: ['small', false, 'large', 'huge'] }],
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			['link', 'image', 'video', 'blockquote', 'code-block'],
			[{ color: [] }, { background: [] }],
		],
		clipboard: {
			matchVisual: false,
		},
	};

	const placeholder = 'Compose an epic...';
	const commentPlaceholder = 'Type your comment here...';

	const formats = ['bold', 'italic', 'underline', 'strike'];

	const { quill: content, quillRef: contentQuill } = useQuill({
		theme,
		modules,
		formats,
		placeholder,
	});

	useEffect(() => {
		if (submission && content) {
			content.clipboard.dangerouslyPasteHTML(submission.file.content);
			content.setSelection(content.getLength(), 0);
			// setI(1);

			content.on('text-change', (delta, oldDelta, source) => {
				// setFile({ ...file, content: content.root.innerHTML });
				if (submission !== content.root.innerHTML) {
					getUpdate(content.root.innerHTML);
				}
			});
		}
	}, [submission, content]);

	const getUpdate = (text) => {
		// let formdata = new FormData();
		// formdata.append('content', text);
		// dispatch(editfile(`/workspace/file/${id}`, formdata));
		// console.log(text, 'UPdated text');
	};

	return (
		<>
			{submission.file ? (
				<div className='grid grid-rows-6 w-full  gap-4 mb-6'>
					<div className='row-span-1 grid  grid-cols-5 gap-4'>
						<div className='col-span-3  flex flex-col space-y-2'>
							<h6 className='font-extrabold text-xl text-gray-700'>
								{submission.file.name ? submission.file.name : null}
							</h6>

							<div className='flex space-x-4'>
								by:
								{submission.authors ? (
									<>
										{submission.authors.map((author) => (
											<p className='font-base text-gray-700 text-md'>
												{author.user__user__first_name} {author.last_name},
											</p>
										))}
									</>
								) : null}
								<p>-</p>
								<p className='font-medium text-gray-700 text-md'>Workspace</p>
							</div>
						</div>
						<div className='col-span-2  flex justify-end items-center space-x-4'>
							<div>
								<Button variant='contained'>Accept</Button>
							</div>
							<div>
								<Button variant='contained' color='secondary'>
									Call For Revision
								</Button>
							</div>
							<div>
								<Button variant='contained' color='error'>
									Reject
								</Button>
							</div>
						</div>
					</div>
					<div className='row-span-5  grid  grid-cols-5 gap-4'>
						<div className='col-span-3  flex flex-col space-y-4'>
							<div>
								<div
									style={{
										width: '100%',
										height: '400px',
										border: '1px solid lightgray',
									}}
									ref={contentQuill}
								/>
							</div>
						</div>
						<div className='col-span-2 flex flex-col space-y-4'>
							<div>
								<TextField
									fullWidth
									id='outlined-multiline-flexible'
									label='Enter Your Comment...'
									multiline
									minRows={4}
									//   value={value}
									//   onChange={handleChange}
								/>
								<div className='flex w-full justify-end'>
									<Button>Comment</Button>
								</div>
							</div>
							<div className='flex flex-col h-full space-y-1'>
								<div className='flex justify-between border-b-2 space-x-2 '>
									<p className='overflow-clip'>Comment</p>

									<p>11/12/2021 9:30am</p>
								</div>
								<div className='flex justify-between border-b-2 space-x-2 '>
									<p className='overflow-clip'>Comment</p>

									<p>11/12/2021 9:30am</p>
								</div>
								<div className='flex justify-between border-b-2 space-x-2 '>
									<p className='overflow-clip'>Comment</p>

									<p>11/12/2021 9:30am</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
};

export default AdviserSubmissionViewer;
