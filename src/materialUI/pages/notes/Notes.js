import React, { useEffect, useState } from 'react';
import NoteCards from '../../components/NoteCards';
import CreateNotesModal from '../../components/modal/CreateNotesModal';
import { getNotes } from '../../../store/noteSlice';
import { useDispatch, useSelector } from 'react-redux';

const Notes = () => {
	const [items, setItems] = useState([]);
	const dispatch = useDispatch();
	const { notes, isLoading } = useSelector((state) => state.note);
	const currentUser = useSelector((state) => state.auth.user);

	useEffect(() => {
		if (currentUser) {
			dispatch(getNotes(`/note/?search=${currentUser.id}`));
		}
	}, [currentUser]);

	useEffect(() => {
		if (!isLoading) {
			setItems(notes);
		}
	}, [isLoading]);

	return (
		<>
			<div class='flex flex-col w-full p-4 space-y-4'>
				<div className='w-full p-2'>
					<CreateNotesModal />
				</div>
				<div className=' flex flex-row flex-wrap w-full items-center lg:justify-start justify-center '>
					{/* {items
					? items.map((item) => (
							<ClassroomCards item={item} bg={bg} baseURL='classroom/adviser' />
					  ))
					: 'loading files....'} */}
					{items.length > 0 ? items.map((item) => <NoteCards item={item} />) : null}
					{/* {items.map((item) => (
						<NoteCards item={item} />
					))} */}
				</div>
			</div>
		</>
	);
};

export default Notes;
