import { ReactComponent as SettingsIcon } from '../../../../assets/settings.svg';

const ControlsDisplay = ({ lockinButtonRef, actions, draft, setShowOptions, showOptions }) => {
    return (
        <div className="controls">
            <button
                className="lock-in"
                ref={lockinButtonRef}
                onClick={actions.lockin}
                disabled={!draft.d[draft.p]}
            >
                lock in
                    </button>
            <button
                className={`settings ${showOptions ? 'active' : ''}`}
                onClick={() => { setShowOptions(prevOption => !prevOption) }}
            >
                <SettingsIcon />
            </button>
            <button
                className="undo"
                onClick={actions.undo}
                disabled={draft.p <= 0}
            >
                undo
            </button>
        </div>
    )
}

export default ControlsDisplay;
