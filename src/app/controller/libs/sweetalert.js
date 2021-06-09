import Swal from 'sweetalert2';

const promptConfirmation = (title, text, confirm, cancel, callback) => {
    Swal.fire({
        title: title,
        text: text,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#19AB27',
        cancelButtonColor: '#d33',
        confirmButtonText: confirm,
        cancelButtonText: cancel,
    }).then((result) => {
        if (result.isConfirmed) callback();
    });
}

const promptUndoRequest = (callback) => {
    promptConfirmation(
        'Undo Request',
        'Would you like to send an undo request to your opponent?',
        'Yes, send it!',
        'No, don\'t send.',
        callback,
    );
}
const promptTimerToggleRequest = (timerOn, callback) => {
    promptConfirmation(
        'Timer Request',
        `Would you like to send an request to turn ${timerOn ? 'off' : 'on'} the timer?`,
        'Yes, send it!',
        'No, don\'t send.',
        callback,
    );
}
const confirmTimerToggleRequest = (timerOn, callback) => {
    promptConfirmation(
        'Timer Request',
        `Your opponent has requested to turn ${timerOn ? 'on' : 'off'} the timer.`,
        'Allow',
        'Decline',
        callback,
    );
}
const confirmUndoRequest = (callback) => {
    promptConfirmation(
        'Undo Request',
        'Your opponent has requested to undo the last pick.',
        'Allow',
        'Decline',
        callback,
    );
}


export {
    promptConfirmation,
    promptUndoRequest,
    promptTimerToggleRequest,
    confirmTimerToggleRequest,
    confirmUndoRequest,
}