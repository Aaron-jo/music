import actionType from '../action-type/index';

export const getCurrentSongLit = songList => ({
    type: actionType.GET_CURRENT_SONG_LIST,
    songList
});

export const sequentialPlay = next => ({
    type: actionType.SEQUENTIAL_PLAY,
    next
});

export const resetCurrentPlayIndex = (reset = 0) => ({
   type: actionType.RESET_CURRENT_PLAY_INDEX,
    reset
});
