import { Route, Routes } from 'react-router';
import { Dashboard, TeamView, TournamentListView, TournamentView  } from './pages';

const ProAnalyst = () => {
	return (
		<Routes>
			{/* <Route path='/' element={<Dashboard />} />
			<Route path='/teams' element={<TeamView />} />
            <Route path='/teams/:teamName' element={<TeamView />} /> */}
            <Route path='/' element={<TournamentListView />} />
            <Route path='/:tournamentName' element={<TournamentView />} />
            {/* <Route path='/patches' element={<Dashboard />} />
            <Route path='/patches/:patchVersion' element={<Dashboard />} /> */}
		</Routes>
	);
};

export default ProAnalyst;
