import actionType from '../action-type/index';

export const setCurrentSongLit = songList => ({
    type: actionType.GET_CURRENT_SONG_LIST,
    songList
});

export const setCurrentPlayIndex = index => ({
    type: actionType.SET_CURRENT_PLAY_INDEX,
    index
});

export const setShuffleList = shuffleList => ({
    type: actionType.SHUFFLE_LIST,
    shuffleList
});

export const setPlayWay = code => ({
    type: actionType.SET_PLAY_WAY,
    code
});
