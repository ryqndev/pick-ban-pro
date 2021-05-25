import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useDDragonStaticAssets from './controller/hooks/useDDragonStaticAssets';
import usePeer from './controller/hooks/usePeer';
import ChampionsContext from './controller/contexts/ChampionsContext';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { Landing, Menu, Create, TournamentList, SinglePlayerDraft, SpectatorDraft } from './pages';
import './styles/main.scss';

const App = () => {
	const { championsList, patchList, patch } = useDDragonStaticAssets();
	const peer = usePeer();
	const [navRenderData, setNavRenderData] = useState({});

	return (
		<ChampionsContext.Provider value={{ championsList, patchList, patch }}>
			<Router basename={process.env.PUBLIC_URL}>
				<Navbar navRenderData={navRenderData} />
				<Routes>
					<Route path="/" element={<Menu/>} />
					<Route path="menu" element={<Menu/>} />
					<Route path="list/*" element={<TournamentList/>} />
					<Route path="create/*" element={<Create {...peer}/>} />
					<Route path="challenger/:id" element={<SpectatorDraft {...peer}/>} />
					<Route path="spectator/:id" element={<SpectatorDraft {...peer} setNavRenderData={setNavRenderData}/>} />
					{[
						"d", 
						"d/:draftString", 
						"draft/:teamNames", 
						"draft/:teamNames/:draftString", 
						"d/:matchName/:teamNames", 
						"d/:matchName/:teamNames/:draftString"
					].map(url => 
						<Route
							key={url}
							path={url} 
							element={<SinglePlayerDraft setNavRenderData={setNavRenderData} {...peer}/>} 
						/>
					)}
				</Routes>
				<Footer />
			</Router>
		</ChampionsContext.Provider>
	);
}

export default App;
