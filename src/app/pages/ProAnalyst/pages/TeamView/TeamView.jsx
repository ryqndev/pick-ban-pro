import { useParams } from 'react-router';
import cn from './TeamView.module.scss';

const TeamView = () => {
    const { teamName } = useParams();

    return (
        <div>
            {teamName}
        </div>
    );
}

export default TeamView;
