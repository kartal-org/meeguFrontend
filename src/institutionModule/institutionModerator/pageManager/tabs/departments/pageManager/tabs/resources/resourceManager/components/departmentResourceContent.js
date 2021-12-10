import React, { useEffect } from "react";
import { useLocation, useParams, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";

import useFetch from "../../../../../../../../../../hooks/useFetch";
import { getFolders } from "../../../../../../../../../../store/newFolderSlice";
import {
	deletefile,
	getfiles,
} from "../../../../../../../../../../store/newFileSlice";
import FolderList from "../../../../../../../../../../materialUI/pages/workspaceModule/tabs/files/folderList";
import FileTable from "../../../../../../../../../../materialUI/pages/workspaceModule/tabs/files/fileTable";

const DepartmentResourceContent = () => {
	const { id } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const folderState = useFetch;
	const fileState = useFetch;
	const location = useLocation();
	const { folder } = queryString.parse(location.search);

	// folder
	useEffect(() => {
		dispatch(getFolders(`/resource/department/folder?search=${id}`));
	}, []);
	const fetchedFolders = useSelector((state) => state.folder.folders);
	const { items: folders, setItems: setFolders } = folderState(fetchedFolders);

	// Files
	useEffect(() => {
		if (folder) {
			dispatch(getfiles(`/resource/department/file?search=${folder}`));
		}
	}, [folder]);
	const fetchedFiles = useSelector((state) => state.file.files);
	const { items: files, setItems: setFiles } = fileState(fetchedFiles);

	// const handMeID = (item) => {
	// 	if (item.file) {
	// 		alert('is an upload file');
	// 	} else {
	// 		history.push(`/institution/department/resources/file/${item.id}`);
	// 		console.log(item);
	// 	}
	// };
	const delete_File = (item) => {
		dispatch(deletefile(`resource/department/file/change/${item.id}`));
	};

	return (
		<>
			<div className="grid grid-rows-7 grid-flow-row gap-2  min-w-full">
				<div className="row-span-4 grid grid-cols-6 gap-4">
					<div>
						<FolderList
							folders={folders}
							link={`/institution/moderator/department/resources/${id}`}
						/>
					</div>
					<div className=" col-span-5 border-2 rounded-md">
						<FileTable
							files={files}
							//  handMeID={handMeID}
							delete_File={delete_File}
						/>
					</div>
				</div>
				<div className="row-span-2"></div>
			</div>
		</>
	);
};

export default DepartmentResourceContent;
