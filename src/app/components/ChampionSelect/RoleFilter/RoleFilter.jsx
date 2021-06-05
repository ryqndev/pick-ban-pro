import clsx from 'clsx';
import { memo } from 'react';
import { ReactComponent as TopIcon } from '../../../assets/positions/position-top.svg';
import { ReactComponent as JungleIcon } from '../../../assets/positions/position-jungle.svg';
import { ReactComponent as MiddleIcon } from '../../../assets/positions/position-middle.svg';
import { ReactComponent as BotIcon } from '../../../assets/positions/position-bottom.svg';
import { ReactComponent as SupportIcon } from '../../../assets/positions/position-utility.svg';
import './RoleFilter.scss';

const RoleFilter = ({ roleFilter, setRoleFilter }) => {
    const roles = [
        { id: 'top', icon: <TopIcon /> },
        { id: 'jun', icon: <JungleIcon /> },
        { id: 'mid', icon: <MiddleIcon /> },
        { id: 'bot', icon: <BotIcon /> },
        { id: 'sup', icon: <SupportIcon /> },
    ];

    const filterRole = (role) => {
        setRoleFilter(roleFilter === role ? null : role);
    }

    return (
        <div className="role-filter--wrapper">
            {roles.map(({ id, icon }) =>
                <div
                    key={id}
                    className={clsx(id === roleFilter && 'active')}
                    onClick={() => { filterRole(id) }}
                >
                    {icon}
                </div>
            )}
        </div>
    );
}

export default memo(RoleFilter);
