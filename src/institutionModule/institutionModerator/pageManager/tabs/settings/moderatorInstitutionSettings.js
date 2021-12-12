import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { format } from 'date-fns';

import useFetch from '../../../../../hooks/useFetch';
import Paypal from '../../../../../materialUI/components/paypal';
import CardComponent from '../../../../../materialUI/components/reuseableComponents/cardComponent';
import DialogComponent from '../../../../../materialUI/components/reuseableComponents/dialogComponent';
import NewBannerComponent from '../../../../../materialUI/components/reuseableComponents/newBannerComponent';
import { getInstitutionPlans, getMySubscriptions } from '../../../../../store/subscriptionSlice';

//mui
import {
	Card,
	CardActions,
	CardContent,
	Divider,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';

function createData(date, plan, storage_add, price) {
	return { date, plan, storage_add, price };
}

const rows = [
	createData('DD-MM-YYYY', 'Basic Subscription Plan', '2 GB', '250.00'),
	createData('DD-MM-YYYY', 'Silver Subscription Plan', '5 GB', '500.00'),
	createData('DD-MM-YYYY', 'Gold Subscription Plan', '10 GB', '1500.00'),
];

const ModeratorInstitutionSettings = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const subscriptionState = useFetch;
	const planStates = useFetch;

	const currentInstitution = useSelector((state) => state.institution.currentInstitution);

	useEffect(() => {
		dispatch(getInstitutionPlans());
	}, []);
	const fetchedPlans = useSelector((state) => state.subscription.plans);
	const { items: plans, setItems: setPlans } = planStates(fetchedPlans);
	console.log(fetchedPlans);

	useEffect(() => {
		dispatch(getMySubscriptions(`/subscription/buy/institution/${id}`));
	}, []);

	const fetchedSubscription = useSelector((state) => state.subscription.subscriptions);
	const { items: subscriptions } = subscriptionState(fetchedSubscription);
	return (
		<>
			{subscriptions[0] && (
				<div className='bg-red-100'>
					<NewBannerComponent
						title={subscriptions[0].plan.name}
						subtitle='Keep track of your subscription transactions.'
					>
						<DialogComponent
							maxWidth='md'
							title='Transaction History'
							button={
								<Button className='join' variant='contained'>
									See transactions
								</Button>
							}
						>
							<TableContainer component={Paper}>
								<Table
									sx={{
										minWidth: 650,
										border: 1,
										borderColor: '#e8e8e8',
									}}
									aria-label='simple table'
								>
									<TableHead>
										<TableRow sx={{ backgroundColor: '#e3e3e3' }}>
											<TableCell
												align='center'
												sx={{
													fontWeight: '700',
													fontSize: '14px',
													color: '#383838',
												}}
											>
												DATE
											</TableCell>
											<TableCell
												align='center'
												sx={{
													fontWeight: '700',
													fontSize: '14px',
													color: '#383838',
												}}
											>
												SUBSCRIPTION PLAN
											</TableCell>
											<TableCell
												align='center'
												sx={{
													fontWeight: '700',
													fontSize: '14px',
													color: '#383838',
												}}
											>
												STORAGE ADDED
											</TableCell>
											<TableCell
												align='center'
												sx={{
													fontWeight: '700',
													fontSize: '14px',
													color: '#383838',
												}}
											>
												PRICE
											</TableCell>
										</TableRow>
									</TableHead>

									<TableBody>
										{subscriptions.map((row) => (
											<TableRow
												key={row.plan.name}
												sx={{
													'&:last-child td, &:last-child th': { border: 0 },
												}}
											>
												<TableCell component='th' scope='row' align='center'>
													{format(new Date(row.dateCreated), 'MMM-dd-yyyy h:m b')}
												</TableCell>
												<TableCell component='th' scope='row' align='center'>
													{row.plan.name}
												</TableCell>
												<TableCell component='th' scope='row' align='center'>
													+{row.plan.limitations / 1000000000} GB
												</TableCell>
												<TableCell component='th' scope='row' align='center'>
													₱ {row.plan.price}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>

							<div className='mt-5'>
								<DialogComponent
									maxWidth='md'
									title='Upgrade Your Subscription'
									button={
										<Button className='join' variant='contained'>
											Upgrade Subscription
										</Button>
									}
								>
									<div className='flex w-full justify-center items-center mt-5'>
										{plans.map((item) => (
											<DialogComponent
												title='Pay Thru:'
												button={<CardComponent item={item} />}
											>
												{currentInstitution ? (
													<Paypal
														item={item}
														productID={currentInstitution.id}
														productlabel='institution'
														dispatchLink={`/subscription/buy/institution/${currentInstitution.id}`}
													/>
												) : null}
											</DialogComponent>
										))}
									</div>
								</DialogComponent>
							</div>
						</DialogComponent>
					</NewBannerComponent>
				</div>
			)}
		</>
	);
};

export default ModeratorInstitutionSettings;
