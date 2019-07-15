import {message} from "antd";
import axios from "../request";

const playMusic = (id) => {
    document.getElementById('anchor-point').style.animationName = 'play-loading';
    axios.get('/check/music', { params: { id: id } }).then(checked => {
        if (checked.data.success) {
            window.audio.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
        } else {
            message.info(checked.data.message);
        }
    }).catch(error => {
        console.error(error)
    });
}

export default playMusic;