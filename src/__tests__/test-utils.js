import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react';

// function renderWithRouter(ui,
//     {
//       route = "/",
//       history = createMemoryHistory({ initialEntries: [route] })
//     } = {}) {
//     return {
//       ...render(<Router history={history}>{ui}</Router>),
//       history
//     };
//   }

const renderWithRouter = (children, route) => {
    const history = createMemoryHistory();
    return render(
        <BrowserRouter history={history}>
            <Routes>
                <Route />
            </Routes>
        </BrowserRouter>
    );
}

export default renderWithRouter;
