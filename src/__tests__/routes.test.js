import { toBeInTheDocument } from '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithRouter } from '../test-utils';
import { App } from '../app';

describe('every url imaginable routes correctly', () => {
    describe('menu page', () => {
        test('[/] route', async () => {
            renderWithRouter(<App />, { route: '/' });
            expect(screen.getByText(/explore/i)).toBeInTheDocument();
        });
        test('[/menu] route', async () => {
            renderWithRouter(<App />, { route: '/menu' });
            expect(screen.getByText(/explore/i)).toBeInTheDocument();
        });
    });

    describe('tournament list page', () => {
        test('[/list] route', async () => {
            renderWithRouter(<App />, { route: '/list' });
            expect(screen.getByText('MSI 2021')).toBeInTheDocument();
        });
        test('[/list/] route', async () => {
            renderWithRouter(<App />, { route: '/list/' });
            expect(screen.getByText('MSI 2021')).toBeInTheDocument();
        });
        test('[/list/hey] route', async () => {
            renderWithRouter(<App />, { route: '/list/hey' });
            expect(screen.getByText('MSI 2021')).toBeInTheDocument();
        });
    });

    describe('challenger/spectator page', () => {
        test('[/challenger/random-id] route', async () => {
            renderWithRouter(<App />, { route: '/challenger/random-id' });
            expect(screen.getByText('Waiting for host to start...')).toBeInTheDocument();
        });
        test('[/spectator/random-id] route', async () => {
            renderWithRouter(<App />, { route: '/spectator/random-id' });
            expect(screen.getByText('Waiting for host to start...')).toBeInTheDocument();
        });
    });
});
