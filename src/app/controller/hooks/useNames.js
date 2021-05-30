import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

const DEFAULT_MATCH_NAME = 'pickban.pro';
const DEFAULT_BLUE_NAME = 'Blue Team';
const DEFAULT_RED_NAME = 'Red Team';

const DEFAULT_NAME_OBJECT = {
    match: DEFAULT_MATCH_NAME,
    blue: DEFAULT_BLUE_NAME,
    red: DEFAULT_RED_NAME,
}

/**
 * @function useNames hook to extract match and team names from navigation state or
 * url params.
 * 
 * The priority is URL params > navigation state > default.
 * 
 * @param {Object} names 
 */
const useNames = (nameState=DEFAULT_NAME_OBJECT) => {
    const {matchName, teamNames} = useParams();
    const [names, setNames] = useState(nameState);
    
    useEffect(() => {
        if(matchName || teamNames) {
            const match = decodeURIComponent(matchName ?? DEFAULT_MATCH_NAME);
            const teams = teamNames.split(',');
            if (teams.length !== 2 || teamNames === ',') 
                return setNames({
                    match: match,
                    blue: DEFAULT_BLUE_NAME,
                    red: DEFAULT_RED_NAME,
                });
            return setNames({
                match: match,
                blue: teams[0] ? decodeURIComponent(teams[0]) : DEFAULT_BLUE_NAME,
                red: teams[1] ? decodeURIComponent(teams[1]) : DEFAULT_RED_NAME,
            });
        }
        return setNames({
            match: nameState.match ? nameState.match : DEFAULT_MATCH_NAME,
            blue: nameState.blue ? nameState.blue : DEFAULT_BLUE_NAME,
            red: nameState.red ? nameState.red : DEFAULT_RED_NAME,
        });
    }, [matchName, teamNames, nameState]);

    return names;
}

export default useNames;
