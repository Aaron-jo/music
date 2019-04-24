import React, {Component, Fragment} from 'react';
import {Icon, Slider} from "antd";
import {connect} from "react-redux";
import {formatSecond} from '../../Utils';
import playMusic from '../../commo/playMusic';
import {sequentialPlay} from '../../reduxModal/actions/getCurrentPlayList';
import '../../App.less';

class NetFooter extends Component {

    state = {
        isPaused: true,
        played: 0,
        buffered: 0,
        duration: '00:00',
        currentTime: '00:00',
        playWay: 0,
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
            document.getElementById('anchor-point').style.animationName = '';
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
            document.getElementById('anchor-point').style.animationName = '';
            console.log('pause');
            this.setState({
                isPaused: true
            });
        });
        // 浏览器正在获取媒介数据时运行的脚本
        window.audio.addEventListener('progress', () => {
            const buffered = (window.audio.buffered.end(window.audio.buffered.length - 1) / window.audio.duration) * 100;
            this.setState({
                buffered
            })
        });
        // 当媒介已到达结尾时运行的脚本
        window.audio.addEventListener('ended', () => {
            switch (this.state.playWay) {
                case 0: //顺序播放
                    let currentPlayIndex0 = this.props.currentPlayList.currentPlayIndex;
                    currentPlayIndex0 += 1;
                    if (currentPlayIndex0 < this.props.currentPlayList.list.length) {
                        this.props.sequentialPlay(currentPlayIndex0);
                        playMusic(this.props.currentPlayList.list[currentPlayIndex0].id);
                    }
                    break;
                case 1: //列表循环
                    let currentPlayIndex1 = this.props.currentPlayList.currentPlayIndex;
                    currentPlayIndex1 += 1;
                    if (currentPlayIndex1 < this.props.currentPlayList.list.length) {
                        this.props.sequentialPlay(currentPlayIndex1);
                        playMusic(this.props.currentPlayList.list[currentPlayIndex1].id);
                    }else {
                        this.props.sequentialPlay(0);
                        playMusic(this.props.currentPlayList.list[currentPlayIndex1].id);
                    }
                    break;
                case 3: //随机播放
                    let currentPlayIndex3 = this.props.currentPlayList.currentPlayIndex;
                    currentPlayIndex3 += 1;
                    if (currentPlayIndex3 < this.props.currentPlayList.list.length) {
                        this.props.sequentialPlay(currentPlayIndex3);
                        playMusic(this.props.currentPlayList.list[currentPlayIndex3].id);
                    }else {
                        this.props.sequentialPlay(0);
                        playMusic(this.props.currentPlayList.list[currentPlayIndex3].id);
                    }
                    break;
                default:
            }
        });

        // control的拖拽与点击事件
        const audioProgress = document.getElementById('audio-progress');
        audioProgress.onmousedown = (downEvent) => {
            downEvent.stopPropagation();
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
            window.audio.play()
        } else {
            window.audio.pause();
        }
        this.setState({
            isPaused: !this.state.isPaused
        });
    }

    preSong() {

    }

    nextSong() {

    }

    handleSoundChange(value) {
        window.audio.volume = value / 100;
        this.setState({
            volume: value
        })
    }

    onChangePlayWay() {
        let playWay = this.state.playWay + 1;
        if (playWay > 3) {
            playWay = 0;
            this.setState({
                playWay
            })
        } else {
            this.setState({
                playWay
            })
        }

        window.audio.loop = playWay === 2;
    }

    render() {
        const { isPaused, played, duration, currentTime, buffered, playWay, volume } = this.state;
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
                            animationIterationCount: 15
                        }}/>
                    </div>
                    <div>{duration}</div>
                    <div id='sound'>
                        <IconFont type="iconsound"/>
                        <Slider min={0} max={100} value={volume} onChange={this.handleSoundChange.bind(this)}/>
                    </div>
                    <div id='play-way' onClick={this.onChangePlayWay.bind(this)}>
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
                    <div id='play-list'>
                        <IconFont type='iconplist'/>
                        <span
                            style={{ marginLeft: 5 }}>{this.props.currentPlayList.list ? this.props.currentPlayList.list.length : 0}</span>
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
        sequentialPlay
    }
)(NetFooter);
