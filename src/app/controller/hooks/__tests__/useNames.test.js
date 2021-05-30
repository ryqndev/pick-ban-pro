import { renderHook } from '@testing-library/react-hooks';
import useNames from '../useNames.js';

const mockURLParams = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useParams: () => mockURLParams(),
}))

const cases = [
    [
        {},
        undefined,
        {
            match: 'pickban.pro',
            blue: 'Blue Team',
            red: 'Red Team',
        }
    ],
    [
        {
            teamNames: 'Cloud 9,DWG KIA',
        },
        undefined,
        {
            match: 'pickban.pro',
            blue: 'Cloud 9',
            red: 'DWG KIA',
        }
    ],
    [
        {
            matchName: 'MSI 2021',
            teamNames: 'Cloud 9,DWG KIA',
        },
        undefined,
        {
            match: 'MSI 2021',
            blue: 'Cloud 9',
            red: 'DWG KIA',
        }
    ],
    [
        {},
        {
            match: 'LCS Spring 2021',
            blue: 'Team Liquid',
            red: 'Cloud 9'
        },
        {
            match: 'LCS Spring 2021',
            blue: 'Team Liquid',
            red: 'Cloud 9',
        }
    ],
];

describe('correct data extraction from useNames hook', () => {
    test.each(cases)(
        "when useParams = %o and nameState = %o, return %o",
        (useParamArg, nameStateArg, result) => {
            mockURLParams.mockImplementation(() => (useParamArg));
            expect(renderHook(() => useNames(nameStateArg)).result.current).toEqual(result);
        }
    );
});
