import actionType from '../action-type';

const initialState = {
    list: [],
    currentPlayIndex: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionType.GET_CURRENT_SONG_LIST:
            return {
                ...state,
                list: action.songList
            };
        case actionType.SEQUENTIAL_PLAY:
            return {
                ...state,
                currentPlayIndex: action.next
            };
        case actionType.RESET_CURRENT_PLAY_INDEX:
            return {
                ...state,
                currentPlayIndex: action.reset
            };
        default:
            return state
    }
};
