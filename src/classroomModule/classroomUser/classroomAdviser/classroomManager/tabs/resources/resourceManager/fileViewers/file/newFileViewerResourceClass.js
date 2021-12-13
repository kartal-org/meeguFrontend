import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { retrieveFile } from '../../../../../../../../../store/newFileSlice';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import { VscNotebook } from 'react-icons/vsc';
import { MdOutlineCommentBank, MdOutlineTipsAndUpdates } from 'react-icons/md';

import NewFileEditor from './components/newFileEditor';
import NewFileName from './components/newFileName';

import FloatComments from '../../../../../../../classroomResearcher/classroomManager/tabs/workspaces/pageManager/tabs/files/fileViewer/file/newFloatingActions/floatComment';
import FloatNotes from '../../../../../../../classroomResearcher/classroomManager/tabs/workspaces/pageManager/tabs/files/fileViewer/file/newFloatingActions/floatNotes';
import FloatTips from '../../../../../../../classroomResearcher/classroomManager/tabs/workspaces/pageManager/tabs/files/fileViewer/file/newFloatingActions/floatTips';
import DialogComponent from '../../../../../../../../../materialUI/components/reuseableComponents/dialogComponent';

const NewFileViewerClass = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(retrieveFile(`/resource/classroom/file/change/${id}`));
	}, []);

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

export default NewFileViewerClass;
