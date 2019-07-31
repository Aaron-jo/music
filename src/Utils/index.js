import _ from 'lodash';

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

export const getQueryString = (search, name) => {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const r = search.substr(1).match(reg);
    if (r != null) return _.unescape(r[2]);
    return null;
};

export const convertToMillion = (number) => {
    if (typeof number === 'number') {
        return number > 100000 ? _.round(number / 10000) + '万' : number
    } else {
        return 0
    }
};
