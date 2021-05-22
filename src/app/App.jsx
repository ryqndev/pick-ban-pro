import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import useDDragonStaticAssets from './controller/hooks/useDDragonStaticAssets';
import usePeer from './controller/hooks/usePeer';
import ChampionsContext from './controller/contexts/ChampionsContext';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { Landing, Menu, Create, TournamentList, Draft, PeerDraft } from './pages';
import './styles/main.scss';

const App = () => {
	const { championsList, patchList, patch } = useDDragonStaticAssets();
	const {peer, peerID, connect, send, listen, setPeer, setPeerID} = usePeer();
	const [navRenderData, setNavRenderData] = useState({});

	return (
		<ChampionsContext.Provider value={{ championsList, patchList, patch }}>
			<Router basename={process.env.PUBLIC_URL}>
				<Route path={[
					"/d/:matchName/:teamNames",
					"/draft/:teamNames",
					"/",
				]}>
					<Navbar navRenderData={navRenderData} />
				</Route>
				<Route exact strict path="/" component={Landing} />
				<Route exact strict path="/menu" component={Menu} />
				<Route path="/create">
					<Create peer={peer} peerID={peerID} listen={listen}/>
				</Route>
				<Route path="/challenger/:id">
					<PeerDraft peer={peer} peerID={peerID} send={send} connect={connect}/>
				</Route>
				<Route path="/spectator/:id">
					<PeerDraft peer={peer} peerID={peerID}/>
				</Route>
				<Route exact strict path="/list" component={TournamentList} />
				<Route exact path={[
					"/d",
					"/d/:draftString",
					"/draft/:teamNames",
					"/draft/:teamNames/:draftString",
					"/d/:matchName/:teamNames",
					"/d/:matchName/:teamNames/:draftString",
				]}>
					<Draft setNavRenderData={setNavRenderData} />
				</Route>
				<Footer />

			</Router>
		</ChampionsContext.Provider>
	);
}

export default App;
