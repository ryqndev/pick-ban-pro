import './ParticipantSettings.scss';

const ParticipantsSettings = ({spectatorLink}) => {
    return (
        <div className="participant-settings--wrapper">
            <label htmlFor="">Spectator Link</label>
            <input type="text" value={spectatorLink} readOnly/>
        </div>
    );
}

export default ParticipantsSettings;
