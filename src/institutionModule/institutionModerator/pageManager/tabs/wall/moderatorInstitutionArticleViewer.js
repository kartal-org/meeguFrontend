// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
import { useParams } from 'react-router-dom';
import useFetch from '../../../../../hooks/useFetch';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newRetrieveArticle, retrieveArticle } from '../../../../../store/articleSlice';

const ModeratorInstitutionArticleViewer = () => {
	const { id } = useParams();
	const articleState = useFetch;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(newRetrieveArticle(`/post/change/${id}`));
	}, []);
	const fetchedArticle = useSelector((state) => state.article.currentArticle);
	const { items: article } = articleState(fetchedArticle);
	const defaultLayoutPluginInstance = defaultLayoutPlugin();

	return (
		<div className='flex w-full flex-wrap overflow-y-auto bg-gray-200 items-center justify-center'>
			{article.archiveFile && (
				<>
					<Worker workerUrl='https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js'>
						<Viewer fileUrl={article.archiveFile} plugins={[defaultLayoutPluginInstance]} />
					</Worker>
				</>
			)}
		</div>
	);
};

export default ModeratorInstitutionArticleViewer;
