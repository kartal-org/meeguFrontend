import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';
import useFetch from '../../hooks/useFetch';
import { useEffect } from 'react';
import { getArticles } from '../../store/articleSlice';
import { useParams } from 'react-router-dom';
import { getInstitutions, searchInstitution } from '../../store/newInstitutionSlice';
import { searchPeople } from '../../store/authSlice';
const SearchAll = () => {
	const [expanded, setExpanded] = useState('panel1');

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	const dispatch = useDispatch();
	const articleState = useFetch;
	const institutionState = useFetch;
	const peopleState = useFetch;

	const { key } = useParams();

	useEffect(() => {
		// alert(key);
		dispatch(getArticles(`/post/search?search=${key}`));
		dispatch(searchInstitution(`/institution/search?search=${key}`));
		dispatch(searchPeople(`/api/user/search?search=${key}`));
	}, [key]);
	return (
		<>
			<div>
				<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel1a-content'
						id='panel1a-header'
					>
						<Typography>Articles</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
							lacus ex, sit amet blandit leo lobortis eget.
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel2a-content'
						id='panel2a-header'
					>
						<Typography>Institutions</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
							lacus ex, sit amet blandit leo lobortis eget.
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel2a-content'
						id='panel2a-header'
					>
						<Typography>People</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
							lacus ex, sit amet blandit leo lobortis eget.
						</Typography>
					</AccordionDetails>
				</Accordion>
			</div>
		</>
	);
};

export default SearchAll;
