import { useLocation, useParams } from 'react-router-dom';
import PageManagerComponent from '../materialUI/components/reuseableComponents/pageManagerComponent';
import queryString from 'query-string';
import { useState } from 'react';
import SearchAll from './tabs/searchAll';

const SearchPage = () => {
	const location = useLocation();
	const { key } = useParams();
	const { tab } = queryString.parse(location.search);
	const [value, setValue] = useState(tab);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const tabs = [
		{
			label: 'All',
			link: `/search/${key}?tab=all`,
			value: 'all',
			component: <SearchAll />,
		},
		{
			label: 'Article',
			link: `/search/${key}?tab=article`,
			value: 'article',
		},
		{
			label: 'Institution',
			link: `/search/${key}?tab=institution`,
			value: 'institution',
		},
		{
			label: 'People',
			link: `/search/${key}?tab=people`,
			value: 'people',
		},
	];
	return (
		<>
			<PageManagerComponent
				value={value}
				handleChange={handleChange}
				tabs={tabs}
			></PageManagerComponent>
		</>
	);
};

export default SearchPage;
