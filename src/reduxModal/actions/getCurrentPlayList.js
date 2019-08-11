import actionType from '../action-type/index';

export const setCurrentSongList = songList => ({
    type: actionType.SET_CURRENT_SONG_LIST,
    songList
});

export const setCurrentPlayIndex = index => ({
    type: actionType.SET_CURRENT_PLAY_INDEX,
    index
});

export const setRandomPlayedIndex = index => ({
    type: actionType.SET_RANDOM_PLAYED_INDEX,
    index
});

export const resetRandomPlayedIndex = () => ({
    type: actionType.SET_RANDOM_PLAYED_INDEX,
});

export const setPlayWay = code => ({
    type: actionType.SET_PLAY_WAY,
    code
});

export const setIsPaused = boolean => ({
    type: actionType.SET_IS_PAUSED,
    boolean
});

export const setPlayedList = playedList => ({
    type: actionType.SET_PLAYED_LIST,
    playedList
});
