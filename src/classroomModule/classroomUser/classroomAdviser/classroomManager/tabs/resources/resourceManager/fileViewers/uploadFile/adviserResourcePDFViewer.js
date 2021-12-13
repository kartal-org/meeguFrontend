import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import useFetch from '../../../../../../../../../hooks/useFetch';
import { retrieveFile } from '../../../../../../../../../store/newFileSlice';

// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library

const AdviserResourcePDFViewer = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const fileState = useFetch;

	useEffect(() => {
		dispatch(retrieveFile(`/resource/classroom/file/change/${id}`));
	}, []);

	const fetchedFile = useSelector((state) => state.file.currentFile);
	const { items: file } = fileState(fetchedFile);

	const defaultLayoutPluginInstance = defaultLayoutPlugin();
	console.log(file);
	return (
		<div className='flex w-full flex-wrap h-full overflow-y-auto bg-gray-200 items-center justify-center'>
			{file.file && (
				<>
					<Worker workerUrl='https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js'>
						<Viewer fileUrl={file.file} plugins={[defaultLayoutPluginInstance]} />
					</Worker>
				</>
			)}
		</div>
	);
};

export default AdviserResourcePDFViewer;
