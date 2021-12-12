import PageManagerComponent from '../materialUI/components/reuseableComponents/pageManagerComponent';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';
import ManageInstitution from '../materialUI/pages/institutionModule/ManageInstitution';
import ModeratorInstitution from './institutionModerator/moderatorInstitution';
import InstitutionStaff from './institutionStaff/institutionStaff';

const Institution = () => {
	// hooks and query strings
	const location = useLocation();

	const { ref } = queryString.parse(location.search);
	console.log(ref);
	const { id } = useParams();

	const [value, setValue] = useState(ref);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const tabs = [
		{
			label: 'Owned',
			link: `/institutions?ref=managing&navTab=institutions&currentStep=0`,
			value: 'managing',
			component: <ModeratorInstitution />,
		},
		{
			label: 'Staff',
			link: `/institutions?ref=joined`,
			value: 'joined',
			component: <InstitutionStaff />,
		},
	];

	return (
		<>
			<PageManagerComponent value={value} handleChange={handleChange} tabs={tabs} />
		</>
	);
};

export default Institution;
