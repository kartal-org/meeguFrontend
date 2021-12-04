import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Authentication from './hocs/authentication';
import MiniDrawer from './materialUI/components/drawer';
import { ThemeProvider } from '@mui/material/styles';
import { theme, outsideTheme } from './contexts/materialThemes';
import outsideRoutes from './routes/outsideRoutes';
import insideRoutes from './routes/insideRoutes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<>
			<ToastContainer
				position='top-center'
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<Switch>
				{outsideRoutes}
				<Authentication>
					<ThemeProvider theme={outsideTheme}>
						<MiniDrawer>{insideRoutes}</MiniDrawer>
					</ThemeProvider>
				</Authentication>
			</Switch>
		</>
	);
}

export default App;
