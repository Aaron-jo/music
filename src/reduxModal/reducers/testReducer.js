import actionType from '../action-type/index'

const initialState = {
    number: 0,
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case actionType.CHANGE_NUMBER:
            return {
                ...state,
                number: action.data,
            };
        default:
            return state
    }
}
