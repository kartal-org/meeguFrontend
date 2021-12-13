import DialogComponent from './dialogComponent';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useEffect } from 'react';

const DialogStepperComponent = (props) => {
	const { title, steps, context, name, button, maxWidth, tourIdentifier, baseURL } = props;
	const history = useHistory();
	const location = useLocation();
	const { currentStep } = queryString.parse(location.search);

	// dialog component
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	// stepper component

	const [activeStep, setActiveStep] = useState(parseInt(currentStep));
	const [completed, setCompleted] = useState({});

	const totalSteps = () => {
		return steps.length;
	};

	const completedSteps = () => {
		return Object.keys(completed).length;
	};

	const isLastStep = () => {
		return activeStep === totalSteps() - 1;
	};

	const allStepsCompleted = () => {
		return completedSteps() === totalSteps();
	};
	let currentURL = location.pathname + location.search;
	const handleNext = () => {
		const newActiveStep =
			isLastStep() && !allStepsCompleted()
				? // It's the last step, but not all steps have been completed,
				  // find the first step that has been completed
				  steps.findIndex((step, i) => !(i in completed))
				: activeStep + 1;
		setActiveStep(newActiveStep);
		if (currentStep) {
			// debugger;
			console.log(newActiveStep);
			console.log(
				currentURL.replace(`&currentStep=${currentStep}`, `&currentStep=${newActiveStep}`)
			);
			history.push(
				currentURL.replace(`&currentStep=${currentStep}`, `&currentStep=${newActiveStep}`)
			);
		}
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStep = (step) => () => {
		setActiveStep(step);
	};

	const handleComplete = () => {
		const newCompleted = completed;
		newCompleted[activeStep] = true;
		setCompleted(newCompleted);
		handleNext();
		console.log('step complete');

		if (allStepsCompleted()) {
			handleReset();
			handleClose();
		}
	};

	const handleReset = () => {
		setActiveStep(0);
		if (baseURL) {
			history.push(baseURL);
		}
		setCompleted({});
	};

	useEffect(() => {
		// set previous step to be completed
	}, [currentStep]);

	return (
		<>
			<Button
				variant='contained'
				onClick={handleClickOpen}
				className={tourIdentifier ? tourIdentifier : ''}
			>
				{button}
			</Button>
			<Dialog
				component='div'
				fullWidth={true}
				name={name}
				maxWidth={maxWidth ? maxWidth : 'lg'}
				open={open}
				onClose={handleClose}
			>
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>
					<DialogContentText>{context}</DialogContentText>
					<div class='flex flex-col p-4 space-y-4'>
						<Stepper activeStep={activeStep}>
							{steps.map((step, index) => (
								<Step key={step.label} completed={completed[index]}>
									<StepButton color='inherit'>{step.label}</StepButton>
								</Step>
							))}
						</Stepper>
						{allStepsCompleted() ? (
							<>
								<Typography sx={{ mt: 2, mb: 1 }}>
									All steps completed - you&apos;re finished
								</Typography>
								<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
									<Box sx={{ flex: '1 1 auto' }} />
									<Button
										onClick={() => {
											handleClose();
											handleReset();
										}}
									>
										Close
									</Button>
								</Box>
							</>
						) : (
							<>
								<div style={{ minHeight: '300px' }}>{steps[activeStep].component}</div>

								<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
									{/* <Button
										color='inherit'
										disabled={activeStep === 0}
										onClick={handleBack}
										sx={{ mr: 1 }}
									>
										Back
									</Button> */}
									<Box sx={{ flex: '1 1 auto' }} />
									{/* <Button onClick={handleNext} sx={{ mr: 1 }}>
										Next
									</Button> */}
									{/* {activeStep !== steps.length &&
										(completed[activeStep] ? null : (
											<>
												{completedSteps() !== totalSteps() - 1 ? (
													<Button onClick={handleComplete}>Skip</Button>
												) : null}
											</>
										))} */}
									{activeStep !== steps.length &&
										(completed[activeStep] ? (
											<Typography variant='caption' sx={{ display: 'inline-block' }}>
												Step {activeStep + 1} already completed
											</Typography>
										) : (
											<Button onClick={handleComplete}>
												{completedSteps() === totalSteps() - 1 ? 'Finish' : 'Next'}
											</Button>
										))}
								</Box>
							</>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default DialogStepperComponent;
