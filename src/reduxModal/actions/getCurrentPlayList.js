import actionType from '../action-type/index';

export const setCurrentSongLit = songList => ({
    type: actionType.GET_CURRENT_SONG_LIST,
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
