import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useFetch from '../../../../hooks/useFetch';
import Paypal from '../../../../materialUI/components/paypal';
import CardComponent from '../../../../materialUI/components/reuseableComponents/cardComponent';
import DialogComponent from '../../../../materialUI/components/reuseableComponents/dialogComponent';
import { getClassroomPlans } from '../../../../store/subscriptionSlice';

const ClassroomSubscriptionPlan = () => {
	const useSubscription = useFetch;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getClassroomPlans());
	}, []);
	const fetchedPlans = useSelector((state) => state.subscription.plans);

	const { currentClassroom } = useSelector((state) => state.newClass);
	const { items: plans, setItems: setPlans } = useSubscription(fetchedPlans);

	const handleFree = () => {};

	return (
		<>
			<div className='flex flex-col items-center my-3'>
				<Typography align='center' variant='h6' gutterBottom component='div'>
					Please Select a Subscription Plan for this Classroom:
				</Typography>

				<div className='flex flex-row'>
					{plans.map((item) => (
						<DialogComponent
							title='Pay Thru:'
							button={
								<CardComponent image={item.cover} key={item.id}>
									<h1 className='font-bold text-lg'>{item.name}</h1>
									<p>{item.description}</p>
									<p>
										<b>{item.price}</b>
									</p>
								</CardComponent>
							}
						>
							{localStorage.getItem('createdClassroom') ? (
								<Paypal
									item={item}
									productlabel='classroom'
									productID={localStorage.getItem('createdClassroom')}
									dispatchLink={
										'/subscription/buy/classroom/' +
										localStorage.getItem('createdClassroom')
									}
								/>
							) : null}
						</DialogComponent>
					))}
				</div>
			</div>
		</>
	);
};

export default ClassroomSubscriptionPlan;
