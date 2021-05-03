import ChampionIcon from '../../components/ChampionIcon/ChampionIcon';
import ChampionPick from './ChampionPick/ChampionPick';
import './Draft.scss';

const Draft = () => {
    const draftState = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        <main className="draft--wrapper">
            <div className="title">
                header
            </div>
            <div className="pickban-select--wrapper">
                <div className="pickban">
                    <div className="ban-row">
                        <ChampionIcon name={'Zilean'}/>
                        <ChampionIcon name={'Galio'}/>
                        <ChampionIcon name={'Diana'}/>
                    </div>
                    <ChampionPick left />
                    <ChampionPick left />
                    <ChampionPick left />
                    <div className="ban-row">
                        <ChampionIcon />
                        <ChampionIcon />
                    </div>
                    <ChampionPick left />
                    <ChampionPick left />
                </div>
                <div className="select"></div>
                <div className="pickban">
                    <div className="ban-row">
                        <ChampionIcon name={'Morgana'}/>
                        <ChampionIcon name={'Rumble'}/>
                        <ChampionIcon name={'Nidalee'}/>
                    </div>
                    <ChampionPick left={false} />
                    <ChampionPick left={false} />
                    <ChampionPick left={false} />
                    <div className="ban-row">
                        <ChampionIcon />
                        <ChampionIcon />
                    </div>
                    <ChampionPick left={false} />
                    <ChampionPick left={false} />                    
                </div>
            </div>
        </main>
    )
}

export default Draft;
