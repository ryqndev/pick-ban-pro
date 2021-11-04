import { useState, memo } from 'react';
import { Routes, Route } from 'react-router-dom';
import usePeer from './controller/hooks/usePeer';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import {
	Menu,
	Practice,
	Challenge,
	ProAnalyst,
	SinglePlayerDraft,
	MultiplayerDraft,
	SpectateDraft,
} from './pages/index.js';
import './styles/main.scss';

const Pages = () => {
	const peer = usePeer();
	const [navigationContent, setNav] = useState({});

	return (
		<>
			<Navbar {...navigationContent} />
			<Routes>
				<Route path='/' element={<Menu setNav={setNav} />} />
				<Route path='menu' element={<Menu />} />
				<Route path='tournaments/*' element={<ProAnalyst />} />
				<Route path='practice' element={<Practice {...peer} />} />
				<Route path='challenge' element={<Challenge />} />
				{['blue', 'red'].map(side => (
					<Route
						key={side}
						path={side + '/:id/:hash'}
						element={
							<MultiplayerDraft setNav={setNav} side={side} />
						}
					/>
				))}
				<Route
					path='spectate/:id'
					element={<SpectateDraft setNav={setNav} />}
				/>
				{[
					'd',
					'd/:draftString',
					'draft/:teamNames',
					'draft/:teamNames/:draftString',
					'd/:matchName/:teamNames',
					'd/:matchName/:teamNames/:draftString',
				].map(url => (
					<Route
						key={url}
						path={url}
						element={
							<SinglePlayerDraft {...peer} setNav={setNav} />
						}
					/>
				))}
			</Routes>
			<Footer />
		</>
	);
};

export default memo(Pages);
