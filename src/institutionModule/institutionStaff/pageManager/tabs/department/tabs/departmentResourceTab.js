import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useFetch from '../../../../../../hooks/useFetch';
// import {addResource,getResources} from "";

import BannerComponent from '../../../../../../materialUI/components/reuseableComponents/bannerComponent';
import DialogComponent from '../../../../../../materialUI/components/reuseableComponents/dialogComponent';
import CardHolder from '../../../../../../materialUI/components/reuseableComponents/cardHolder';
import CardComponent from '../../../../../../materialUI/components/reuseableComponents/cardComponent';
//mui
import { Button, TextField, Typography } from '@mui/material';

//validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { getResources } from '../../../../../../store/newResourceSlice';

const DepartmentResourceTabStaff = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const resourcesStates = useFetch;
	const fetchDepartment = useFetch;

	useEffect(() => {
		dispatch(getResources(`/resource/department?search=${id}`));
	}, []);
	const fetchedResources = useSelector((state) => state.newResource.resources);
	// const { items: resources, setItems: setResources } = fetchDepartment(fetchedResources);
	const { items: resources } = resourcesStates(fetchedResources);
	// use resources variable to map

	return (
		<>
			<div class='flex flex-col w-full space-y-4'>
				<CardHolder tourIdentifier='cards'>
					{resources.length > 0
						? resources.map((item) => (
								<CardComponent
									link={`/institution/moderator/department/resources/${item.id}`}
									image={item.cover}
									item={item}
								/>
						  ))
						: 'No resources created yet'}
				</CardHolder>
			</div>
		</>
	);
};

export default DepartmentResourceTabStaff;
