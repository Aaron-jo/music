import actionType from '../action-type';

const initialState = {
    list: JSON.parse(localStorage.getItem('playingList')) || [], //当前播放列表
    playedList: JSON.parse(localStorage.getItem('playedList')) || [], // 历史播放列表
    playWay: parseInt(localStorage.getItem('PLAY_WAY')) || 0, // 播放方式(顺序)
    currentPlayIndex: parseInt(localStorage.getItem('currentPlayIndex')) || 0, // 当前正在播放歌曲的list的index
    randomPlayedIndex: [],
    isPaused: true,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionType.SET_CURRENT_SONG_LIST:
            localStorage.setItem('playingList', JSON.stringify(action.songList));
            return {
                ...state,
                list: action.songList
            };
        case actionType.SET_CURRENT_PLAY_INDEX:
            localStorage.setItem('currentPlayIndex', JSON.stringify(action.index));
            // state.currentPlayIndex = action.index;
            // return state;
            return {
                ...state,
                currentPlayIndex: action.index
            };
        case actionType.SET_PLAYED_LIST:
            localStorage.setItem('playedList', JSON.stringify(action.playedList));
            return {
                ...state,
                playedList: action.playedList
            };
        case actionType.SET_RANDOM_PLAYED_INDEX:
            return {
                ...state,
                randomPlayedIndex: state.randomPlayedIndex.push(action.index)
            };
        case actionType.RESET_RANDOM_PLAYED_INDEX:
            return {
                ...state,
                randomPlayedIndex: []
            };
        case actionType.SET_PLAY_WAY:
            return {
                ...state,
                playWay: action.code
            };
        case actionType.SET_IS_PAUSED:
            return {
                ...state,
                isPaused: action.boolean
            };
        default:
            return state
    }
};
