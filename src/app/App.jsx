import { useState, memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import usePeer from './controller/hooks/usePeer';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { Menu, Create, TournamentList, SinglePlayerDraft, SpectatorDraft } from './pages';
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
				<Route path="create/*" element={<Create {...peer} />} />
				<Route path="challenger/:id" element={<SpectatorDraft {...peer} />} />
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
						element={<SinglePlayerDraft setNavigationContent={setNavigationContent} {...peer} />}
					/>
				)}
			</Routes>
			<Footer />
		</>
	);
}

export default memo(App);
