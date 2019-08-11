import actionType from '../action-type/index';
import {call, put, takeEvery} from 'redux-saga/effects';
// import playMusic from '@/commo/playMusic';

// https://www.jianshu.com/p/6f96bdaaea22 参照网址

function* playSong(action) {
    yield console.log(action)
}


function* rootSaga() {     // 在store.js中，执行了 sagaMiddleware.run(rootSaga)
    yield takeEvery(actionType.GET_SONG, playSong)   // 如果有对应type的action触发，就执行goAge()函数
}

export default rootSaga;      // 导出rootSaga，被store.js文件import
