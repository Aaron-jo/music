import React, {Component, Fragment} from 'react';
import {Icon, Slider} from "antd";
import {connect} from "react-redux";
import {formatSecond} from '../../Utils';
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
        offsetDrag: 0,
    };

    componentWillMount () {

    }

    componentDidMount () {
        window.audio = document.getElementById('audio');
        window.audio.volume = this.state.volume / 100;
        window.audio.addEventListener('play', () => {
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
        window.audio.ontimeupdate = audioTimeUpdate;
        window.audio.addEventListener('pause', () => {
            console.log('pause');
            this.setState({
                isPaused: true
            });
        });
        window.audio.addEventListener('progress', () => {
            const buffered = (window.audio.buffered.end(window.audio.buffered.length - 1) / window.audio.duration) * 100;
            this.setState({
                buffered
            })
        });
        window.audio.addEventListener('ended', () => {
            console.log('ended')
        });

        const audioProgress = document.getElementById('audio-progress');
        audioProgress.onmousedown = (downEvent) => {
            downEvent.stopPropagation();
            window.audio.ontimeupdate = null;
            const downClientX = downEvent.clientX;
            let preOffset = 0;
            document.onmousemove = (moveEvent) => {
                let moveClientX = moveEvent.clientX;
                const offsetDrag = ((moveClientX - downClientX - preOffset) / audioProgress.getBoundingClientRect().width) * 100;
                const played = this.state.played + offsetDrag;

                this.setState({
                    offsetDrag,
                    played,
                });

                preOffset = moveClientX - downClientX;
            };
            document.onmouseup = (upEvent) => {
                document.onmousemove = null;
                const currentTime = (this.state.played / 100) * window.audio.duration;
                window.audio.currentTime = currentTime;
                window.audio.ontimeupdate = audioTimeUpdate;
                document.onmouseup = null;
            }
        }
    }

    componentWillUnmount () {

    }

    playOrPause () {
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

    preSong () {

    }

    nextSong () {

    }

    handleSoundChange (value) {
        window.audio.volume = value / 100;
        this.setState({
            volume: value
        })
    }

    render () {
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
                        <div id='anchor-point' style={{ left: `${played}%` }}/>
                    </div>
                    <div>{duration}</div>
                    <div id='sound'>
                        <IconFont type="iconsound"/>
                        <Slider min={0} max={100} value={volume} onChange={this.handleSoundChange.bind(this)}/>
                    </div>
                    <div id='play-way'>
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
                        <span>100</span>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        currentPlayList: state.currentPlayList,
    })
)(NetFooter);
