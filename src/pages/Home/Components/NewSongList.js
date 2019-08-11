import React, {Component, Fragment} from 'react';
import {Button, Col, Icon, Row, Spin} from "antd";
import axios from "../../../request";
import {connect} from 'react-redux';
import {setCurrentPlayIndex, setCurrentSongList} from "@/reduxModal/actions/getCurrentPlayList";
import _ from "lodash";
import playMusic from "@/commo/playMusic";

class NewSongList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newSong: [],
            spinning: true,
            preType: null,
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.getData();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.getData(nextProps.type)
    }

    componentWillUnmount() {

    }

    getData(type = this.props.type) {
        if (this.state.preType === type) return;
        this.setState({
            spinning: true,
            preType: type
        });
        axios.get('/top/song', { params: { type: type } }).then((response) => {
            this.setState({
                newSong: response.data.data,
                spinning: false
            })
        })
    }

    play(song) {
        axios.get('/song/detail', { params: { ids: song.id } }).then(response => {
            const song = response.data.songs[0];
            const doubleClickIndex = _.findIndex(this.props.list, ['id', song.id]);
            if (doubleClickIndex === -1) { // 在播放列表中没有该歌曲，则插入
                if (this.props.list.length !== 0) {
                    const list = _.cloneDeep(this.props.list);
                    list.splice(this.props.currentPlayIndex + 1, 0, song);
                    this.props.setCurrentSongList(list);
                    this.props.setCurrentPlayIndex(this.props.currentPlayIndex + 1);
                }else {
                    this.props.setCurrentSongList([song]);
                }
            } else { // 有该歌曲，则播放这首
                this.props.setCurrentPlayIndex(doubleClickIndex)
            }
            playMusic(song.id);
        });
    }

    playAll() {
        axios.get('/song/detail', { params: { ids: this.state.newSong.map(item => item.id).join(',') } }).then(response => {
            this.props.setCurrentSongList(response.data.songs);
            this.props.setCurrentPlayIndex(0);
            playMusic(response.data.songs[0].id);
        })
    }

    render() {
        const { newSong, spinning } = this.state;
        return (
            <Fragment>
                <Spin spinning={spinning} tip='加载中...'>
                    <Row type='flex' style={{ border: '1px solid #eee' }}>
                        <Col style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '10px',
                            alignItems: 'center'
                        }} span={24}>
                            <span>
                                <div className='playIcon' style={{ marginRight: '10px', float: 'left' }}
                                     onClick={this.playAll.bind(this)}>
                                    <Icon type="caret-right"/>
                                </div>
                                播放全部
                            </span>
                            <span><Button icon='folder-add'>收藏全部</Button></span>
                        </Col>
                        {
                            newSong.map((song, index) => (
                                <Fragment key={song.id}>
                                    <Col className='songCol' span={24}>
                                        <div className='top-song-index'
                                             style={{
                                                 margin: 'auto 0px',
                                                 width: 20
                                             }}>{index < 9 ? `0${index + 1}` : index + 1}
                                        </div>
                                        <div className='textOverflow' style={{ width: '50%' }}>
                                            <span style={{ position: 'relative', marginRight: 15 }}>
                                                <img style={{ width: 48, height: 48 }} alt='图片'
                                                     src={`${song.album.picUrl}?param=48y48&quality=100`}/>
                                                <div className='playIconInImg' style={{ top: 0 }}
                                                     onClick={this.play.bind(this, song)}>
                                                    <Icon type="caret-right"/>
                                                </div>
                                            </span>
                                            <span>{song.name}{song.alias.length > 0 ? `（${song.alias.join('/')}）` : ''}</span>
                                        </div>
                                        <div className='textOverflow' style={{ width: '20%' }}>
                                            {
                                                song.artists.map((item, index) => {
                                                    if (index < song.artists.length - 1) {
                                                        return <span key={item.id}
                                                                     style={{ cursor: 'pointer' }}>{item.name}/</span>
                                                    } else {
                                                        return <span key={item.id}
                                                                     style={{ cursor: 'pointer' }}>{item.name}</span>
                                                    }
                                                })
                                            }
                                        </div>
                                        <div className='textOverflow'
                                             style={{ width: '20%', cursor: 'pointer' }}>{song.album.name}</div>
                                        <div style={{ width: '8%' }}>
                                            {Math.floor(song.duration / 1000 / 60) < 10 ? `0${Math.floor(song.duration / 1000 / 60)}` : Math.floor(song.duration / 1000 / 60)}:{Math.floor(song.duration / 1000 % 60) < 10 ? `0${Math.floor(song.duration / 1000 % 60)}` : Math.floor(song.duration / 1000 % 60)}
                                        </div>
                                    </Col>
                                </Fragment>
                            ))
                        }
                    </Row>
                </Spin>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        ...state.currentPlayList
    }), {
        setCurrentPlayIndex,
        setCurrentSongList,
    }
)(NewSongList);
