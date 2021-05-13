import './OptionsDisplay.scss';

const OptionsDisplay = ({open, options, setOptions}) => {
    return (
        <div className="options-display--wrapper" style={{height: open ? 400 : 0 + 'px'}}>
            <div className="content card__component">
                <h2>Options</h2>
            </div>
        </div>
    );
}

export default OptionsDisplay;
