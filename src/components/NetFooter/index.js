import React, {Component, Fragment} from 'react';
import {Icon, Slider, message, Popover} from "antd";
import {connect} from "react-redux";
import {formatSecond} from '@/Utils';
import playMusic from '@/commo/playMusic';
import PlayListContent from './playListContent';
import {
    setCurrentPlayIndex,
    setRandomPlayedIndex,
    setPlayWay,
    setIsPaused,
    setPlayedList,
} from '@/reduxModal/actions/getCurrentPlayList';
import _ from 'lodash';
import '@/App.less';

class NetFooter extends Component {

    constructor(props) {
        super(props);
        this.randomPlayed = [];
        this.randomPlayedIndex = 0;
    }

    state = {
        isPaused: true,
        played: 0,
        buffered: 0,
        duration: '00:00',
        currentTime: '00:00',
        volume: 50,
    };

    componentWillMount() {

    }

    componentDidMount() {
        window.audio = document.getElementById('audio');
        window.audio.volume = this.state.volume / 100;
        // 在文件开始加载且未实际加载任何数据前运行的脚本
        window.audio.addEventListener('loadstart', () => {
            this.setState({
                played: 0,
                buffered: 0
            })
        });
        // 播放事件
        window.audio.addEventListener('play', () => {
            this.props.setIsPaused(false);
            if (document.getElementById('anchor-point')) document.getElementById('anchor-point').style.animationName = '';
            let played = JSON.parse(localStorage.getItem('playedList')) || [];
            played.unshift(this.props.currentPlayList.list[this.props.currentPlayList.currentPlayIndex]);
            played = _.uniqBy(played, 'id');
            if (played.length > 100) {
                played = _.dropRight(played)
            }
            this.props.setPlayedList(played);
            console.log('play');
            this.setState({
                isPaused: false,
                duration: formatSecond(window.audio.duration),
            });
        });
        const audioTimeUpdate = () => {
            const played = (window.audio.currentTime / window.audio.duration) * 100;
            this.setState({
                currentTime: formatSecond(window.audio.currentTime),
                played: played
            });
        };
        // 播放位置改变时
        window.audio.ontimeupdate = audioTimeUpdate;
        // 暂停播放
        window.audio.addEventListener('pause', () => {
            this.props.setIsPaused(true);
            if (document.getElementById('anchor-point')) document.getElementById('anchor-point').style.animationName = '';
            console.log('pause');
            this.setState({
                isPaused: true
            });
        });
        // 当媒介已停止播放但打算继续播放时运行脚本
        window.audio.addEventListener('waiting', () => {
            document.getElementById('anchor-point').style.animationName = 'play-loading';
            console.log('waiting')
        });
        window.audio.addEventListener('canplay', () => {
            if (document.getElementById('anchor-point')) document.getElementById('anchor-point').style.animationName = '';
            console.log('canplay')
        });
        // 浏览器正在获取媒介数据时运行的脚本
        window.audio.addEventListener('progress', () => {
            const buffered = window.audio.buffered.length && (window.audio.buffered.end(window.audio.buffered.length - 1) / window.audio.duration) * 100;
            this.setState({
                buffered
            })
        });
        // 当媒介已到达结尾时运行的脚本
        window.audio.addEventListener('ended', () => {
            switch (this.props.currentPlayList.playWay) {
                case 0: //顺序播放
                    let currentPlayIndex0 = this.props.currentPlayList.currentPlayIndex;
                    currentPlayIndex0 += 1;
                    if (currentPlayIndex0 < this.props.currentPlayList.list.length) {
                        this.props.setCurrentPlayIndex(currentPlayIndex0);
                        playMusic(this.props.currentPlayList.list[currentPlayIndex0].id);
                    }
                    break;
                case 1: //列表循环
                    let currentPlayIndex1 = this.props.currentPlayList.currentPlayIndex;
                    currentPlayIndex1 += 1;
                    if (currentPlayIndex1 < this.props.currentPlayList.list.length) {
                        this.props.setCurrentPlayIndex(currentPlayIndex1);
                        playMusic(this.props.currentPlayList.list[currentPlayIndex1].id);
                    } else {
                        this.props.setCurrentPlayIndex(0);
                        playMusic(this.props.currentPlayList.list[0].id);
                    }
                    break;
                case 3: //随机播放
                    // let currentPlayIndex3 = this.props.currentPlayList.currentPlayIndex;
                    let currentPlayIndex3 = _.random(this.props.currentPlayList.list.length - 1);
                    this.props.setCurrentPlayIndex(currentPlayIndex3);
                    playMusic(this.props.currentPlayList.list[currentPlayIndex3].id);
                    this.randomPlayed.push(currentPlayIndex3);
                    break;
                default:
            }
        });

        // control的拖拽与点击事件
        const audioProgress = document.getElementById('audio-progress');
        audioProgress.onmousedown = (downEvent) => {
            // downEvent.stopPropagation();
            if (window.audio.readyState === 4) {
                window.audio.ontimeupdate = null;
                const downClientX = downEvent.clientX;
                let preOffset = 0;

                const anchorPoint = document.getElementById('anchor-point');
                const offsetPercentClick = ((downClientX - anchorPoint.getBoundingClientRect().x) / audioProgress.getBoundingClientRect().width) * 100;
                this.setState({
                    played: this.state.played + offsetPercentClick
                });

                document.onmousemove = (moveEvent) => {
                    console.log('moveEvent');
                    let moveClientX = moveEvent.clientX;
                    const offsetDrag = ((moveClientX - downClientX - preOffset) / audioProgress.getBoundingClientRect().width) * 100;
                    const played = this.state.played + offsetDrag;
                    this.setState({
                        played,
                    });
                    preOffset = moveClientX - downClientX;
                };

                document.onmouseup = () => {
                    document.onmousemove = null;
                    window.audio.currentTime = (this.state.played / 100) * window.audio.duration;
                    window.audio.ontimeupdate = audioTimeUpdate;
                    document.onmouseup = null;
                }
            }
        };
    }

    componentWillUnmount() {

    }

    playOrPause() {
        if (!this.props.currentPlayList.list.length > 0) return;
        if (this.state.isPaused) {
            if (!window.audio.src) {
                playMusic(this.props.currentPlayList.list[this.props.currentPlayList.currentPlayIndex].id)
            }else {
                window.audio.play()
            }
        } else {
            window.audio.pause();
        }
        this.setState({
            isPaused: !this.state.isPaused
        });
    }

    preSong() {
        if (!this.props.currentPlayList.currentPlayIndex) return message.warning('没有上一首了');
        let playWay = this.props.currentPlayList.playWay;
        if (playWay === 3) { // 随机播放
            if (this.randomPlayedIndex) {
                playMusic(this.props.currentPlayList.list[this.randomPlayed[this.randomPlayedIndex - 1]].id);
                this.randomPlayedIndex = this.randomPlayedIndex - 1;
                this.props.setCurrentPlayIndex(this.randomPlayed[this.randomPlayedIndex]);
            } else { // 当随机播放没了的时候
                playMusic(this.props.currentPlayList.list[this.props.currentPlayList.currentPlayIndex - 1].id);
                this.props.setCurrentPlayIndex(this.props.currentPlayList.currentPlayIndex - 1)
            }
        } else {
            playMusic(this.props.currentPlayList.list[this.props.currentPlayList.currentPlayIndex - 1].id);
            this.props.setCurrentPlayIndex(this.props.currentPlayList.currentPlayIndex - 1)
        }
    }

    nextSong() {
        if (this.props.currentPlayList.currentPlayIndex === this.props.currentPlayList.list.length - 1) return message.warning('没有下一首了');
        let playWay = this.props.currentPlayList.playWay;
        if (playWay === 3) { // 随机播放
            let currentPlayIndex = _.random(this.props.currentPlayList.list.length - 1);
            this.props.setCurrentPlayIndex(currentPlayIndex);
            playMusic(this.props.currentPlayList.list[currentPlayIndex].id);
            this.randomPlayed.push(currentPlayIndex);
        } else {
            playMusic(this.props.currentPlayList.list[this.props.currentPlayList.currentPlayIndex + 1].id);
            this.props.setCurrentPlayIndex(this.props.currentPlayList.currentPlayIndex + 1)
        }
        // console.log(this.props.currentPlayList.currentPlayIndex)
    }

    handleSoundChange(value) {
        window.audio.volume = value / 100;
        this.setState({
            volume: value
        })
    }

    onChangePlayWay() {
        let playWay = this.props.currentPlayList.playWay;
        ++playWay;
        if (playWay > 3) {
            playWay = 0;
            this.props.setPlayWay(playWay)
        } else {
            this.props.setPlayWay(playWay)
        }
        localStorage.setItem('PLAY_WAY', playWay);
        window.audio.loop = playWay === 2;
    }

    render() {
        const { isPaused, played, duration, currentTime, buffered, volume, playListVisible } = this.state;
        const playWay = this.props.currentPlayList.playWay;
        const IconFont = Icon.createFromIconfontCN({
            scriptUrl: '//at.alicdn.com/t/font_1157727_280juyortfd.js',
        });
        return (
            <Fragment>
                <div className='audio-control'>
                    <div title='上一首（Ctr + Left）' onClick={this.preSong.bind(this)}>
                        <Icon type="step-backward"/>
                    </div>
                    <div title={isPaused ? '播放（Ctr + P）' : '暂停（Ctr + P）'} onClick={this.playOrPause.bind(this)}>
                        {
                            isPaused ? <Icon type="caret-right"/> :
                                <Icon type="pause"/>
                        }
                    </div>
                    <div title='下一首（Ctr + Right）' onClick={this.nextSong.bind(this)}>
                        <Icon type="step-forward"/>
                    </div>
                </div>
                <div className='audio-progress-container'>
                    <div>{currentTime}</div>
                    <div id='audio-progress'>
                        <div className='buffered' style={{ width: `${buffered}%` }}/>
                        <div className='played' style={{ width: `${played}%` }}/>
                        <div id='anchor-point' style={{
                            left: `${played}%`,
                            animationDuration: '1s',
                            animationIterationCount: 150
                        }}/>
                    </div>
                    <div>{duration}</div>
                    <div id='sound'>
                        <IconFont type="iconsound"/>
                        <Slider min={0} max={100} value={volume} onChange={this.handleSoundChange.bind(this)}/>
                    </div>
                    <div id='play-way' onMouseUp={this.onChangePlayWay.bind(this)}>
                        {
                            playWay === 0 ? <IconFont type='iconshunxubofang' title='顺序播放'/> : (
                                playWay === 1 ? <IconFont type='iconxunhuanbofang' title='列表循环'/> : (
                                    playWay === 2 ? <IconFont type='icondanquxunhuan' title='单曲循环'/> :
                                        <IconFont type='iconsuijibofang' title='随机播放'/>
                                )
                            )
                        }
                    </div>
                    {/*<div>歌词</div>*/}
                    <div id='play-list' onClick={() => {
                        this.setState({ playListVisible: !playListVisible })
                    }}>
                        <Popover content={<PlayListContent/>}
                                 overlayClassName='play-list-popover'
                                 getPopupContainer={() => document.getElementById('play-list')} trigger='click'
                        >
                            <IconFont type='iconplist'/>
                            <span
                                style={{ marginLeft: 5 }}>{this.props.currentPlayList.list ? this.props.currentPlayList.list.length : 0}</span>
                        </Popover>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        currentPlayList: state.currentPlayList,
    }), {
        setCurrentPlayIndex,
        setRandomPlayedIndex,
        setPlayWay,
        setIsPaused,
        setPlayedList
    }
)(NetFooter);
