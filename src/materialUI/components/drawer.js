import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { useHistory } from 'react-router-dom';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { ImBooks } from 'react-icons/im';
import { FaPencilAlt } from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';
import { MdSchool } from 'react-icons/md';
import { CgNotes } from 'react-icons/cg';
import { SiGooglemessages } from 'react-icons/si';
import LogoutIcon from '@mui/icons-material/Logout';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PrimarySearchAppBar from './toolbar';

import queryString from 'query-string';

const drawerWidth = 200;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(9)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));
export default function MiniDrawer(props) {
	const location = useLocation();
	const { navTab } = queryString.parse(location.search);

	const history = useHistory();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [pageTitle, setPageTitle] = React.useState('Home');
	const [selectedIndex, setSelectedIndex] = React.useState('home');
	React.useEffect(() => {
		if (navTab) {
			setSelectedIndex(navTab);
		}
	}, [navTab]);
	React.useEffect(() => {
		if (location.pathname.includes('profile')) {
			setSelectedIndex('profile');
			setPageTitle('Profile');
		}
	}, [location.pathname]);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	let hiddenNavigation;
	const mainNavigations = [
		{
			text: 'Home',
			icon: <AiFillHome className='w-6 h-6 ' />,
			toolTip: 'Home',
			onClick: () => {
				history.push('/home?navTab=home&tab=feed');
				setPageTitle('Home');
			},
			selected: 'home',
		},
		{
			text: 'Library',
			icon: <ImBooks className='w-6 h-6 ' />,
			toolTip: 'Library',
			onClick: () => {
				history.push('/library?navTab=library');
				setPageTitle('Library');
			},
			selected: 'library',
		},
		{
			text: 'Notes',
			icon: <CgNotes className='w-6 h-6 ' />,
			toolTip: 'Notes',
			onClick: () => {
				history.push('/notes?navTab=notes');
				setPageTitle('Notes');
			},
			selected: 'notes',
		},
		{
			text: 'Messages',
			icon: <SiGooglemessages className='w-6 h-6 ' />,
			toolTip: 'Messages',
			onClick: () => {
				history.push('/messages?navTab=messages');
				setPageTitle('Messages');
			},
			selected: 'messages',
		},
	];
	const paidNavigations = [
		{
			text: 'Classrooms',
			icon: <BsFillPeopleFill className='w-6 h-6 ' />,
			toolTip: 'Classrooms',
			onClick: () => {
				history.push('/classroom?ref=researcher&navTab=classroom');
				setPageTitle('Classrooms');
			},
			selected: 'classroom',
		},
		{
			text: 'Institutions',
			icon: <MdSchool className='w-6 h-6 ' />,
			toolTip: 'Institutions',
			onClick: () => {
				history.push('/institutions?ref=managing&navTab=institutions');
				setPageTitle('Institutions');
			},
			selected: 'institutions',
		},
		{
			text: 'Settings',
			icon: <AiFillSetting className='w-6 h-6 ' />,
			toolTip: 'Settings',
			onClick: () => {
				history.push('/settings?navTab=settings');
				setPageTitle('Settings');
			},
			selected: 'settings',
		},
		{
			text: 'Log Out',
			icon: <LogoutIcon />,
			toolTip: 'Log Out',
			onClick: () => history.push('/logout'),
		},
	];

	if (open) {
		hiddenNavigation = 'flex';
	} else {
		hiddenNavigation = 'hidden';
	}

	return (
		<>
			{/* {loc.includes("message") ? null : ( */}
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar position='fixed' color='transparent' open={open} elevation={0}>
					<PrimarySearchAppBar>
						<IconButton
							color='inherit'
							aria-label='open drawer'
							onClick={handleDrawerOpen}
							edge='start'
							sx={{
								marginRight: '36px',
								...(open && { display: 'none' }),
							}}
						>
							<MenuIcon />
						</IconButton>
						<Typography
							variant='h6'
							noWrap
							component='div'
							sx={{ marginLeft: '10px', color: 'rgba(55, 65, 81, 1)' }}
						>
							{pageTitle}
						</Typography>
					</PrimarySearchAppBar>
				</AppBar>
				<Drawer variant='permanent' hideBackdrop={true} open={open}>
					<DrawerHeader>
						{open ? (
							<Typography
								className='w-full flex justify-center '
								variant='h6'
								noWrap
								component='div'
							>
								meegu
							</Typography>
						) : null}

						<IconButton onClick={handleDrawerClose}>
							{open ? <ChevronLeftIcon /> : null}
							{/* {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />} */}
						</IconButton>
					</DrawerHeader>
					<Divider />
					{/* <div class={` ${hiddenNavigation} p-2`}>Main Navigations</div> */}
					<List
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
						}}
					>
						{mainNavigations.map((item, index) => (
							<ListItemButton
								key={item.text}
								onClick={item.onClick}
								selected={selectedIndex === item.selected}
							>
								<Tooltip title={item.toolTip} placement='right'>
									{item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
								</Tooltip>
								<ListItemText primary={item.text} />
							</ListItemButton>
						))}
					</List>
					<Divider />
					<List
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-center',
						}}
					>
						{paidNavigations.map((item, index) => (
							<ListItemButton
								key={item.text}
								onClick={item.onClick}
								selected={selectedIndex === item.selected}
							>
								<Tooltip title={item.toolTip} placement='right'>
									{item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
								</Tooltip>
								<ListItemText primary={item.text} />
							</ListItemButton>
						))}
					</List>
				</Drawer>
				<Box
					component='main'
					sx={{
						flexGrow: 1,
						p: 3,
						minHeight: '100vh',
					}}
				>
					<DrawerHeader />
					{props.children}
				</Box>
			</Box>
			{/* )} */}
		</>
	);
}
