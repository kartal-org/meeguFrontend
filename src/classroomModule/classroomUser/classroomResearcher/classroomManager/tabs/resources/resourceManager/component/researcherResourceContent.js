import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router';
import queryString from 'query-string';
import useFetch from '../../../../../../../../hooks/useFetch';
import FileTable from '../../../../../../../../materialUI/pages/workspaceModule/tabs/files/fileTable';
import FolderList from '../../../../../../../../materialUI/pages/workspaceModule/tabs/files/folderList';
import { useEffect } from 'react';
import { getFolders } from '../../../../../../../../store/newFolderSlice';
import { deletefile, getfiles } from '../../../../../../../../store/newFileSlice';

const ResearcherResourceContent = () => {
	const { id } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const folderState = useFetch;
	const fileState = useFetch;
	const location = useLocation();
	const { folder } = queryString.parse(location.search);

	// folder
	useEffect(() => {
		dispatch(getFolders(`resource/classroom/folder?search=${id}`));
	}, []);
	const fetchedFolders = useSelector((state) => state.folder.folders);
	const { items: folders, setItems: setFolders } = folderState(fetchedFolders);

	// Files
	useEffect(() => {
		if (folder) {
			dispatch(getfiles(`resource/classroom/file?search=${folder}`));
		}
	}, [folder]);
	const fetchedFiles = useSelector((state) => state.file.files);
	const { items: files, setItems: setFiles } = fileState(fetchedFiles);

	// // Upload Files
	// useEffect(() => {
	// 	if (folder) {
	// 		dispatch(getfiles(`resource/classroom/uploadfile/${folder}`));
	// 	}
	// }, [folder]);
	// const fetchedUploadFiles = useSelector((state) => state.file.uploadFiles);
	// const { items: uploadFiles, setItems: setUploadFiles } = fileState(fetchedUploadFiles);

	const handMeID = (item) => {
		if (item.file) {
			history.push(`/classroom/researcher/resources/pdf/${item.id}`);
		} else {
			history.push(`/classroom/researcher/resources/file/${item.id}`);
		}
		// if (item.hasOwnProperty('content')) {

		// 	console.log(item);
		// }
	};

	return (
		<div className='grid grid-rows-7 grid-flow-row gap-2  min-w-full'>
			<div className='row-span-4 grid grid-cols-6 gap-4'>
				<div>
					<FolderList folders={folders} link={`/classroom/researcher/resources/${id}`} />
				</div>
				<div className=' col-span-5 border-2 rounded-md'>
					<FileTable files={files} handMeID={handMeID} />
				</div>
			</div>
			<div className='row-span-2'></div>
		</div>
	);
};

export default ResearcherResourceContent;
