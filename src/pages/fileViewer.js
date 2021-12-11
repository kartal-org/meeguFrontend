// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import queryString from 'query-string';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import DialogComponent from '../materialUI/components/reuseableComponents/dialogComponent';
import { MdOutlineCommentBank, MdOutlineTipsAndUpdates } from 'react-icons/md';
import { VscNotebook } from 'react-icons/vsc';
import { GiNotebook } from 'react-icons/gi';

const FileViewer = ({ location }) => {
	const defaultLayoutPluginInstance = defaultLayoutPlugin();

	const { filePath } = queryString.parse(location.search);

	return (
		<>
			<div
				className='flex flex-wrap h-screen overflow-y-auto bg-gray-200 items-center justify-center'
				style={{ width: '94%' }}
			>
				{/* show pdf conditionally (if we have one)  */}

				<>
					<Worker workerUrl='https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js'>
						<Viewer fileUrl={filePath} plugins={[defaultLayoutPluginInstance]} />
					</Worker>
				</>
			</div>
			<>
				<div className='sticky right-4 bottom-4 '>
					<div className='flex w-full justify-end'>
						<DialogComponent
							title='Take Notes'
							button={
								<Tooltip title='Take Notes' placement='left'>
									<Fab color='primary' aria-label='edit'>
										<GiNotebook className='h-6 w-6' />
									</Fab>
								</Tooltip>
							}
						>
							Hi
						</DialogComponent>
					</div>
				</div>
			</>
		</>
	);
};

export default FileViewer;
