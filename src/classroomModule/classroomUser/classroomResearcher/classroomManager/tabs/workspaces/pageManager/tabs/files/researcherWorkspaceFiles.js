import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router';
import useFetch from '../../../../../../../../../hooks/useFetch';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import FolderList from '../../../../../../../../../materialUI/pages/workspaceModule/tabs/files/folderList';
import FileTable from '../../../../../../../../../materialUI/pages/workspaceModule/tabs/files/fileTable';
import { deletefile, getfiles } from '../../../../../../../../../store/newFileSlice';
import { getFolders } from '../../../../../../../../../store/newFolderSlice';
import PublishIcon from '@mui/icons-material/Publish';
import DialogComponent from '../../../../../../../../../materialUI/components/reuseableComponents/dialogComponent';
import { TextField } from '@mui/material';
import { createSubmission } from '../../../../../../../../../store/submissionSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ResearcherWorkspaceFiles = () => {
	const { id } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const folderState = useFetch;
	const fileState = useFetch;
	const location = useLocation();
	const { folder } = queryString.parse(location.search);

	// folder
	useEffect(() => {
		dispatch(getFolders(`/workspace/folder?search=${id}`));
	}, []);
	const fetchedFolders = useSelector((state) => state.folder.folders);
	const { items: folders, setItems: setFolders } = folderState(fetchedFolders);

	// Files
	useEffect(() => {
		if (folder) {
			dispatch(getfiles(`/workspace/file?search=${folder}`));
		}
	}, [folder]);
	const fetchedFiles = useSelector((state) => state.file.files);
	const { items: files, setItems: setFiles } = fileState(fetchedFiles);
	const [selectedFile, setSelectedFile] = useState();

	const handMeID = (item) => {
		if (item.content) {
			history.push(`/classroom/researcher/workspace/file/${item.id}`);
			console.log(item);
		}
		if (item.file) {
			history.push(`/classroom/researcher/workspace/upload-file/${item.id}`);
			// alert('Is an upload File');
		}
	};
	const handleSubmit = (item) => {
		setSelectedFile(item);
		// console.log(item.id);
		// if (item.hasOwnProperty('content')) {
		// 	dispatch(deletefile(`workspace/file/change/${item.id}`));
		// }
	};
	const handleDelete = (item) => {
		dispatch(deletefile(`workspace/file/${item.id}`));
	};

	const [inputForm, setInputForm] = useState({
		title: '',
		description: '',
		status: 'draft',
	});
	const onChange = (e) => {
		e.preventDefault();
		setInputForm({ ...inputForm, [e.target.name]: e.target.value });
	};
	const handleMakeSubmmision = () => {
		const { title, description, status } = inputForm;
		let formData = new FormData();
		formData.append('title', title);
		formData.append('description', description);
		formData.append('status', status);
		formData.append('file', selectedFile.id);
		dispatch(createSubmission('/submission/', formData));
	};

	return (
		<div className='grid grid-rows-7 grid-flow-row gap-2  min-w-full'>
			<div className='row-span-4 grid grid-cols-6 gap-4'>
				<div>
					<FolderList
						folders={folders}
						link={`/classroom/researcher/workspace/${id}`}
						additionalLink={`&tab=files`}
					/>
				</div>
				<div className=' col-span-5 border-2 rounded-md'>
					<FileTable
						files={files}
						handMeID={handMeID}
						delete_File={handleDelete}
						handleSubmit={handleSubmit}
						submitButton={
							<>
								<DialogComponent
									title='Make Submission'
									action={{ label: 'Create Submission', handler: handleMakeSubmmision }}
									button={<PublishIcon className='cursor-pointer hover:text-purple-400' />}
								>
									<div className='flex flex-col w-full pt-4 space-y-4'>
										<TextField
											label='Submission Title'
											variant='outlined'
											name='title'
											value={inputForm.title}
											onChange={(e) => onChange(e)}
										/>
										<TextField
											label='Description'
											variant='outlined'
											name='description'
											value={inputForm.description}
											onChange={(e) => onChange(e)}
											multiline
											minRows={4}
										/>
										<FormControl fullWidth>
											<InputLabel id='demo-simple-select-label'>Status</InputLabel>
											<Select
												labelId='demo-simple-select-label'
												id='demo-simple-select'
												value={inputForm.status}
												label='Status'
												name='status'
												onChange={(e) => onChange(e)}
											>
												<MenuItem value={'draft'}>Draft</MenuItem>
												<MenuItem value={'submit'}>Submit</MenuItem>
											</Select>
										</FormControl>
									</div>
								</DialogComponent>
							</>
						}
					/>
				</div>
			</div>
			<div className='row-span-2'></div>
		</div>
	);
};

export default ResearcherWorkspaceFiles;
