import { useState, memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import usePeer from './controller/hooks/usePeer';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { Menu, Create, ProAnalyst, SinglePlayerDraft, MultiplayerDraft, SpectateDraft } from './pages';
import './styles/main.scss';

const App = () => {
	const peer = usePeer();
	const [navigationContent, setNav] = useState({});

	return (
		<>
			<Navbar {...navigationContent} />
			<Routes>
				<Route path="/" element={<Menu setNav={setNav}/>} />
				<Route path="menu" element={<Menu />} />
				<Route path="tournaments/*" element={<ProAnalyst />} />
				<Route path="create" element={<Create {...peer} />} />
				<Route path="create/challenge" element={<Create {...peer} />} />
				
				<Route path="blue/:id/:hash" element={<MultiplayerDraft setNav={setNav} side="blue" />} />
				<Route path="red/:id/:hash" element={<MultiplayerDraft setNav={setNav} side="red" />} />
				<Route path="spectate/:id" element={<SpectateDraft setNav={setNav} />} />
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
						element={<SinglePlayerDraft {...peer} setNav={setNav} />}
					/>
				)}
			</Routes>
			<Footer />
		</>
	);
}

export default memo(App);
