import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import useFetch from '../../../../../../hooks/useFetch';
import CardComponent from '../../../../../../materialUI/components/reuseableComponents/cardComponent';
import CardHolder from '../../../../../../materialUI/components/reuseableComponents/cardHolder';
import { getWorkspaces } from '../../../../../../store/workspaceSlice';

const AdviserWorkspaceTab = () => {
	// hooks
	const dispatch = useDispatch();
	const { id } = useParams();
	const workspaceState = useFetch;

	useEffect(() => {
		dispatch(getWorkspaces(`/workspace/?search=${id}`));
	}, []);
	const fetchedWorkspace = useSelector((state) => state.works.workspaces);
	const { items: workspaces, setItems: setWorkspaces } = workspaceState(fetchedWorkspace);

	return (
		<>
			<div class='flex flex-col w-full p-4 space-y-4'>
				<CardHolder>
					{workspaces.map((item) => (
						<CardComponent
							item={item}
							image={item.cover}
							link={`/classroom/adviser/workspace/${item.id}?tab=dashboard`}
						/>
					))}
				</CardHolder>
			</div>
		</>
	);
};

export default AdviserWorkspaceTab;
