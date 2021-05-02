import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './styles/main.scss';

const App = () => {
	return (
		<Router basename={process.env.PUBLIC_URL}>
			Text
		</Router>
	);
}

export default App;
