import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { logout } from "../../store/authSlice";
import { useSelector } from "react-redux";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: "1.5rem",
	backgroundColor: "rgba(229, 231, 235, 1)",
	borderStyle: "solid",
	borderColor: "#838CFF",
	border: "2px",
	"&:hover": {
		backgroundColor: "rgba(229, 231, 235, 1)",
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",

	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",

		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

export default function PrimarySearchAppBar(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const { user } = useSelector((state) => state.auth);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	let history = useHistory();

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const goToProfile = () => {
		history.push("/profile?tab=published-works");
	};
	const goToLogout = () => {
		history.push("/logout");
	};
	const goToNotifications = () => {
		history.push("/notif");
	};

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<>
			<Menu
				anchorEl={anchorEl}
				// anchorOrigin={{
				// 	vertical: 'top',
				// 	horizontal: 'right',
				// }}
				id={menuId}
				keepMounted
				// transformOrigin={{
				// 	vertical: 'top',
				// 	horizontal: 'right',
				// }}
				open={isMenuOpen}
				onClose={handleMenuClose}
			>
				<MenuItem
					onClick={() => {
						handleMenuClose();
						goToProfile();
					}}
				>
					<div className="flex justify-center items-center">
						{user && user.username}
					</div>
				</MenuItem>
				<MenuItem
					onClick={() => {
						handleMenuClose();
						goToLogout();
					}}
				>
					Logout
				</MenuItem>
			</Menu>
		</>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton
					size="large"
					aria-label="show 17 new notifications"
					color="inherit"
				>
					<Badge badgeContent={0} color="error">
						<SearchIcon />
					</Badge>
				</IconButton>
				<p>Search</p>
			</MenuItem>
			<MenuItem>
				<IconButton
					size="large"
					aria-label="show 17 new notifications"
					color="inherit"
				>
					<Badge badgeContent={0} color="error">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				{/* <p>Profile</p> */}
				<div className="flex justify-center items-center">
					{user && user.username}
				</div>
			</MenuItem>
		</Menu>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar
				position="sticky"
				sx={{
					backgroundColor: "#FFFF",
					borderBottom: "1px solid",
					borderBottomColor: "#e1e1e1",
					color: "rgba(55, 65, 81, 1)",
				}}
				elevation={0}
			>
				<Toolbar>
					{props.children}
					<Box sx={{ flexGrow: 1 }} />
					{/* <TextField
						id='input-with-icon-textfield'
						placeholder='Search...'
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<AccountCircle />
								</InputAdornment>
							),
						}}
						sx={{ borderRadius: 4 }}
						variant='outlined'
					/> */}
					<Search sx={{ display: { xs: "none", md: "flex" } }}>
						<SearchIconWrapper sx={{ display: { xs: "none", md: "flex" } }}>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ "aria-label": "search" }}
						/>
					</Search>
					<Box sx={{ display: { xs: "none", md: "flex" } }}>
						<IconButton
							size="large"
							aria-label="show 17 new notifications"
							color="inherit"
						>
							<Badge badgeContent={0} color="error">
								<NotificationsIcon />
							</Badge>
						</IconButton>

						<IconButton
							size="large"
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
					</Box>
					<Box sx={{ display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</Box>
	);
}
