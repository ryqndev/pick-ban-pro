import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import useDDragonStaticAssets from './controller/hooks/useDDragonStaticAssets';
import ChampionsContext from './controller/contexts/ChampionsContext';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { Landing, Menu, Create, TournamentList, Draft } from './pages';
import './styles/main.scss';

const App = () => {
	const { championsList, patchList, patch } = useDDragonStaticAssets();
	const [navRenderData, setNavRenderData] = useState({ draft: false });

	return (
		<ChampionsContext.Provider value={{ championsList, patchList, patch }}>
			<Router basename={process.env.PUBLIC_URL}>
				<Navbar navRenderData={navRenderData} />
				<Route exact strict path="/" component={Landing} />
				<Route exact strict path="/menu" component={Menu} />
				<Route path="/create" component={Create} />
				<Route exact strict path="/list" component={TournamentList} />
				<Route exact path={[
					"/d",
					"/d/:draftString",
					"/draft/:teamNames",
					"/draft/:teamNames/:draftString",
					"/d/:matchName/:teamNames",
					"/d/:matchName/:teamNames/:draftString",
				]}>
					<Draft setNavRenderData={setNavRenderData}/>
				</Route>
				<Footer />

			</Router>
		</ChampionsContext.Provider>
	);
}

export default App;
