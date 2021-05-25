import { memo } from 'react';
import './OptionsDisplay.scss';

const OptionsDisplay = ({ open, options, draft, children }) => {

    return (
        <div className="options-display--wrapper" style={{ maxHeight: open ? '250px' : 0 + 'px' }}>
            <div className="content card__component">
                <h2>Share Your Draft!</h2>
                <input type="text" readOnly value={`${window.location.href}`} />
                {children}
            </div>
        </div>
    );
}

export default memo(OptionsDisplay);
