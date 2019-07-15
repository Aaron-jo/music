
import { actionTypes } from '../action-type/index';
import {call, put, takeEvery} from 'redux-saga/effects';
import palyMusic from '@/commo/palyMusic';

// https://www.jianshu.com/p/6f96bdaaea22 参照网址

function* playSong(action) {
    console.log(action)

}