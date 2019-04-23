export const formatSecond = function (sec) {
    sec = parseFloat(sec);
    let minute;
    const minPart = Math.floor(sec / 60);
    const secPart = Math.floor(sec % 60);
    minute = `${minPart < 10 ? '0' + minPart : minPart}:${secPart < 10 ? '0' + secPart : secPart}`;
    return minute;
};
