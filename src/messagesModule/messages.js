import Pusher from 'pusher-js';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useFetch from '../hooks/useFetch';
import { getMessages, getRooms } from '../store/messageSlice';

const Messsages = () => {
	const dispatch = useDispatch();
	const messagesState = useFetch;
	const roomsState = useFetch;

	useEffect(() => {
		dispatch(getRooms(`/chat/room`));
	}, []);

	return null;
};

export default Messsages;
