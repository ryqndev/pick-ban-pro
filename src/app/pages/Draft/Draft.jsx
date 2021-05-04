import {useState} from 'react';
import TeamPickDisplay from './TeamPickDisplay';
import ChampionSelect from '../../components/ChampionSelect';
import './Draft.scss';
const draft1 = [
    {status: 1, val: 'Senna', id: 'Senna'},
    {status: 1, val: 'Nidalee', id: 'Nidalee'},
    {status: 1, val: 'Twisted Fate', id: 'TwistedFate'},
    {status: 1, val: 'Seraphine', id: 'Seraphine'},
    {status: 1, val: 'Kindred', id: 'Kindred'},
    {status: 1, val: 'Jinx', id: 'Jinx'},
    {status: 1, val: 'Wukong', id: 'MonkeyKing'},
    {status: 1, val: 'Camille', id: 'Camille'},
    {status: -1},
    {status: -1},
];
const draft2 = [
    {status: 1, val: 'Udyr', id: 'Udyr'},
    {status: 1, val: 'Lucian', id: 'Lucian'},
    {status: 1, val: 'Orianna', id: 'Orianna'},
    {status: 1, val: 'Hecarim', id: 'Hecarim'},
    {status: 1, val: 'Rell', id: 'Rell'},
    {status: 1, val: 'Kai\'Sa', id: 'Kaisa'},
    {status: 1, val: 'Sion', id: 'Sion'},
    {status: 1, val: 'Thresh', id: 'Thresh'},
    {status: 0, val: 'Akali', id: 'Akali'},
    {status: -1},
];
/**
 * Draft object needs to maintain a draft state of every champion + timer
 * main object passed between peers will be 
 *  {
 *      teamNames: ['Blue', 'Red'],
 *      options: {
 *          
 *      },
 *      draft: []
 *  }
 * 
 * 
 * @returns 
 * 
 */
const Draft = () => {
    return (
        <main className="draft--wrapper">
            <div className="pickban-select--wrapper">
                <TeamPickDisplay isLeft={true} isPicking={true} draft={draft1} />
                <ChampionSelect />
                <TeamPickDisplay isLeft={false} isPicking={false} draft={draft2} />
            </div>
        </main>
    )
}

export default Draft;
