import _ from 'lodash';
import {createHashHistory} from 'history';
const history = createHashHistory();

export const formatSecond = function (time) {
    if (time < 1000) {
        time = parseFloat(time);
    } else {
        time = parseFloat(time / 1000);
    }
    let minute;
    const minPart = Math.floor(time / 60);
    const secPart = Math.floor(time % 60);
    minute = `${minPart < 10 ? '0' + minPart : minPart}:${secPart < 10 ? '0' + secPart : secPart}`;
    return minute;
};

export const getQueryString = (name) => {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const r = history.location.search.substr(1).match(reg);
    if (r != null) return _.unescape(r[2]);
    return null;
};
