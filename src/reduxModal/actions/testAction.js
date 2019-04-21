import actionType from '../action-type/index'

/*export const changeNumber = data => (dispatch) => {
    dispatch({
        type: action-type.CHANGE_NUMBER,
        data,
    })
};*/

export const changeNumber = data => ({
    type: actionType.CHANGE_NUMBER,
    data,
});
