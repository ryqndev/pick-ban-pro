import { useState, memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import usePeer from './controller/hooks/usePeer';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { Menu, Create, TournamentList, SinglePlayerDraft, MultiplayerDraft, ChallengerDraft, SpectatorDraft } from './pages';
import './styles/main.scss';

const App = () => {
	const peer = usePeer();
	const [navigationContent, setNavigationContent] = useState({});

	return (
		<>
			<Navbar {...navigationContent} />
			<Routes>
				<Route path="/" element={<Menu />} />
				<Route path="menu" element={<Menu />} />
				<Route path="list/*" element={<TournamentList />} />
				<Route path="create" element={<Create {...peer} />} />
				<Route path="create/challenge" element={<Create challenge {...peer} />} />
				<Route path="challenger/:id" element={<ChallengerDraft {...peer} setNavigationContent={setNavigationContent} />} />
				<Route path="challenge/:id" element={<MultiplayerDraft {...peer} setNavigationContent={setNavigationContent} />} />
				<Route path="spectator/:id" element={<SpectatorDraft {...peer} setNavigationContent={setNavigationContent} />} />
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
						element={<SinglePlayerDraft {...peer} setNavigationContent={setNavigationContent} />}
					/>
				)}
			</Routes>
			<Footer />
		</>
	);
}

export default memo(App);
