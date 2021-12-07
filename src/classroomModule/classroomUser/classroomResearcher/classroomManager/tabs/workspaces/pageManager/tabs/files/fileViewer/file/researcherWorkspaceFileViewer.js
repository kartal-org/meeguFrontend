import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import ViewToggleButton from '../../../../../../../../../../../materialUI/components/reuseableComponents/viewModeToggleButton';
import AccordionComponent from '../../../../../../../../../../../materialUI/components/reuseableComponents/accordionComponent';
import StatusDropDown from './component/statusDropDown';
import { retrieveFile } from '../../../../../../../../../../../store/newFileSlice';
import FileName from './component/fileName';
import FileEditor from './component/fileEditor';

const ResearcherWorkspaceFileViewer = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const { id } = useParams();

	useEffect(() => {
		dispatch(retrieveFile(`/workspace/file/${id}`));
	}, []);

	const [view, setView] = useState('default');

	const onChange = (e) => {
		e.preventDefault();
		setView(e.target.value);
	};

	const buttons = [
		{
			label: 'Default View',
			value: 'default',
		},
		{
			label: 'Focus View',
			value: 'focus',
		},
	];

	return (
		<>
			<div className='grid grid-rows-6 gap-1'>
				<div className='row-span-1  grid grid-cols-3 gap-4'>
					<div className='col-span-2 flex space-x-2 items-center'>
						<FileName />
					</div>
					<div className='col-span-1 grid grid-cols-3 gap-2'>
						<div className='col-span-1 flex items-center '>
							<StatusDropDown />
						</div>
						<div className='col-span-2 flex justify-end items-center'>
							<ViewToggleButton
								name='view'
								view={view}
								handleChange={onChange}
								buttons={buttons}
							/>
						</div>
					</div>
				</div>
				<div className='row-span-5 grid grid-cols-3 gap-4'>
					<div className='col-span-2'>
						<FileEditor />
					</div>
					<div className=' col-span-1'>
						<AccordionComponent label='Comments'>
							<div>Comments Here</div>
						</AccordionComponent>
						<AccordionComponent label='Notes'>
							<div>Notes Here</div>
						</AccordionComponent>
						<AccordionComponent label='Videos'>
							<div>Videos Here</div>
						</AccordionComponent>
						<AccordionComponent label='Tips'>
							<div>Tips</div>
						</AccordionComponent>
					</div>
				</div>
			</div>
		</>
	);
};

export default ResearcherWorkspaceFileViewer;
