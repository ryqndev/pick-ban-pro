import {BrowserRouter as Router, Route} from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Landing from './pages/Landing';
import Draft from './pages/Draft';
import './styles/main.scss';

const App = () => {
	return (
		<Router basename={process.env.PUBLIC_URL}>
			<Navbar />
			<Route exact strict path="/" component={Landing} />
			<Route exact strict path="/draft" component={Draft} />
			<Footer />
		</Router>
	);
}

export default App;
