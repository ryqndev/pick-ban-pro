import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import ChampionsContext from './controller/contexts/ChampionsContext';
import useDDragonStaticAssets from './controller/hooks/useDDragonStaticAssets';
import Pages from './Pages.jsx';

const queryClient = new QueryClient();

const App = () => {
	const { championsList, patchList, patch } = useDDragonStaticAssets();

	return (
		<QueryClientProvider client={queryClient}>
			<ChampionsContext.Provider
				value={{ championsList, patchList, patch }}
			>
				<Router basename={process.env.PUBLIC_URL}>
					<Pages />
				</Router>
			</ChampionsContext.Provider>
		</QueryClientProvider>
	);
};

export default App;
