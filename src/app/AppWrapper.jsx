import { BrowserRouter as Router } from 'react-router-dom'
import ChampionsContext from './controller/contexts/ChampionsContext';
import useDDragonStaticAssets from './controller/hooks/useDDragonStaticAssets';
import App from '.';

const AppWrapper = () => {
    const { championsList, patchList, patch } = useDDragonStaticAssets();

    return (
        <ChampionsContext.Provider value={{ championsList, patchList, patch }}>
            <Router basename={process.env.PUBLIC_URL}>
                <App />
            </Router>
        </ChampionsContext.Provider>
    )
}

export default AppWrapper;
