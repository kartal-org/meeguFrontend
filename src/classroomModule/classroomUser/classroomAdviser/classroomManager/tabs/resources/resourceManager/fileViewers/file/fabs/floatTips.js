import React from 'react';

//mui
import { Button, Divider, Card } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import useFetch from '../../../../../../../../../../hooks/useFetch';

const FloatTips = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const fileState = useFetch;

	const fetchedFile = useSelector((state) => state.file.currentFile);
	const { items: file } = fileState(fetchedFile);
	return (
		<>
			{file.tips ? (
				<div
					className='px-3 overflow-y-auto space-y-2'
					style={{ maxHeight: '450px', minHeight: '450px' }}
				>
					<Card sx={{ p: 2, border: 1, borderColor: '#f0f0f0' }}>
						<div className='flex flex-col w-full'>
							<div className='flex flex-row justify-between items-center'>
								<div className='w-2 h-2 mr-2 rounded-full bg-green-400'></div>
								<p className='text-xs text-gray-600 mr-auto'>created by</p>
								<p className='text-xs text-gray-400'>12/11/2021</p>
							</div>

							<p className='font-bold text-base mt-3'>Tip Title</p>
							<p className='text-sm mt-1 text-justify'>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
								tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
								consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
								cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
								non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</p>
						</div>
					</Card>
				</div>
			) : (
				"You don't have a tip for this file yet"
			)}
		</>
	);
};

export default FloatTips;
