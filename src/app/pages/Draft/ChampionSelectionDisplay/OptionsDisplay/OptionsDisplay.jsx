import { memo } from 'react';
import './OptionsDisplay.scss';

const OptionsDisplay = ({ open, options, children }) => {

    return (
        <div className="options-display--wrapper" style={{ maxHeight: open ? '250px' : 0 + 'px' }}>
            <div className="content card__component">
                {children}
            </div>
        </div>
    );
}

export default memo(OptionsDisplay);
