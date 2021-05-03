import TeamPickDisplay from './TeamPickDisplay';
import './Draft.scss';

const Draft = () => {
    const draftState = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        <main className="draft--wrapper">
            <div className="title">
                header
            </div>
            <div className="pickban-select--wrapper">
                <TeamPickDisplay isLeft={true}  />
                <div className="select"></div>
                <TeamPickDisplay isLeft={false} />
            </div>
        </main>
    )
}

export default Draft;
