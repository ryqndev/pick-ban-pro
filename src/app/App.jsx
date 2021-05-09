import {BrowserRouter as Router, Route} from 'react-router-dom';
import useDDragonStaticAssets from './controller/hooks/useDDragonStaticAssets';
import ChampionsContext from './controller/contexts/ChampionsContext';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Landing from './pages/Landing';
import Draft from './pages/Draft';
import './styles/main.scss';

const App = () => {
	const {championsList, patchList, patch} = useDDragonStaticAssets();

	return (
		<ChampionsContext.Provider value={{championsList, patchList, patch}}>
			<Router basename={process.env.PUBLIC_URL}>
				<Navbar />
				<Route exact strict path="/" component={Landing} />
				<Route exact path="/draft" component={Draft} />
				<Route path="/draft/:draftString" component={Draft} />
				<Footer />
			</Router>
		</ChampionsContext.Provider>
	);
}

export default App;
