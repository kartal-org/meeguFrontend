import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { retrieveFile } from '../../../../../../../../../../store/newFileSlice';
import useFetch from '../../../../../../../../../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import NewFileName from './components/filename';
import NewFileEditor from './components/fileEditor';
import DialogComponent from '../../../../../../../../../../materialUI/components/reuseableComponents/dialogComponent';
import { Fab, Tooltip } from '@mui/material';
import { MdOutlineCommentBank, MdOutlineTipsAndUpdates } from 'react-icons/md';
import { VscNotebook } from 'react-icons/vsc';
import FloatTips from '../../../../../../../../../../classroomModule/classroomUser/classroomResearcher/classroomManager/tabs/workspaces/pageManager/tabs/files/fileViewer/file/newFloatingActions/floatTips';
import FloatComments from '../../../../../../../../../../classroomModule/classroomUser/classroomResearcher/classroomManager/tabs/workspaces/pageManager/tabs/files/fileViewer/file/newFloatingActions/floatComment';
import FloatNotes from '../../../../../../../../../../classroomModule/classroomUser/classroomResearcher/classroomManager/tabs/workspaces/pageManager/tabs/files/fileViewer/file/newFloatingActions/floatNotes';

const CreateFileViewerDepartment = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const fileState = useFetch;

	useEffect(() => {
		dispatch(retrieveFile(`/resource/department/file/change/${id}`));
	}, []);

	const fetchedFile = useSelector((state) => state.file.currentFile);
	const { items: file } = fileState(fetchedFile);
	return (
		<>
			<div className='flex flex-col space-y-4'>
				<div className='flex space-x-2 items-center '>
					<NewFileName />
				</div>

				<div style={{ width: '94%' }}>
					<NewFileEditor />
				</div>
			</div>
			<>
				<div className='sticky right-2 bottom-36'>
					<div className='flex w-full justify-end'>
						<DialogComponent
							title='Comments'
							button={
								<Tooltip title='Comments' placement='left'>
									<Fab color='primary' aria-label='add'>
										<MdOutlineCommentBank className='h-6 w-6' />
									</Fab>
								</Tooltip>
							}
						>
							<FloatComments />
						</DialogComponent>
					</div>
				</div>
				<div className='sticky right-4 bottom-20'>
					<div className='flex w-full justify-end'>
						<DialogComponent
							title='Notes'
							button={
								<Tooltip title='Notes' placement='left'>
									<Fab color='secondary' aria-label='edit'>
										<VscNotebook className='h-6 w-6' />
									</Fab>
								</Tooltip>
							}
						>
							<FloatNotes />
						</DialogComponent>
					</div>
				</div>
				<div className='sticky right-4 bottom-4 '>
					<div className='flex w-full justify-end'>
						<DialogComponent
							title="Adviser's Tips"
							button={
								<Tooltip title="Adviser's Tips" placement='left'>
									<Fab color='info' aria-label='edit'>
										<MdOutlineTipsAndUpdates className='h-6 w-6' />
									</Fab>
								</Tooltip>
							}
						>
							<FloatTips />
						</DialogComponent>
					</div>
				</div>
			</>
		</>
	);
};

export default CreateFileViewerDepartment;
