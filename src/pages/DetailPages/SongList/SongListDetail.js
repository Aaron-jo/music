import React, {Component, Fragment, lazy, Suspense} from 'react';
import {getQueryString} from '@/Utils/index';
import {Button, Avatar, Icon, Table, Spin, Tabs, Input} from 'antd';
import axios from '@/request/index';
import _ from 'lodash';
import moment from 'moment';
import {createHashHistory} from 'history';
import {formatSecond, convertToMillion} from "@/Utils/index";
import playMusic from '@/commo/playMusic';
import '../comm/index.less';
import {connect} from "react-redux";
import {setCurrentPlayIndex, setCurrentSongList} from "@/reduxModal/actions/getCurrentPlayList";

const SongListComments = lazy(() => import('./Components/SongListComments'));
const SongListCollectors = lazy(() => import('./Components/SongListCollectors'));

class SongListDetail extends Component {

    constructor(props) {
        super(props);
        this.songListCopy = undefined;
        // 写在这里面是防止获得的id是上次的
        const history = createHashHistory();
        this.state = {
            id: getQueryString(history.location.search, 'id') || null,
            songList: [],
            songHeaderInfo: null,
            hasSearch: true,
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
        if (!this.state.id) return;
        axios.get('/playlist/detail', { params: { id: this.state.id } }).then(response => {
            this.setState({
                songList: response.data.playlist.tracks.map((item, index) => {
                    item.order = ++index;
                    return item;
                }),
                songHeaderInfo: _.pickBy(response.data.playlist, (value, key) => key !== 'tracks' && key !== 'trackIds')
            }, () => {
                this.songListCopy = _.cloneDeep(this.state.songList)
            })
        });
    }

    componentWillUnmount() {

    }

    // 表格搜索歌曲，搜索字段包括歌名, 专辑， 歌手名
    tableSearch = (value) => {
        if (value !== '') {
            const filterList = _.filter(this.songListCopy, (item) =>
                (item.name.indexOf(value) > -1 || item.ar.map(item => item.name).join('/').indexOf(value) > -1 || item.al.name.indexOf(value) > -1)
            );
            this.setState({
                songList: filterList
            })
        } else {
            this.setState({
                songList: this.songListCopy
            })
        }
    };

    TabsChange = (activeKey) => {
        if (activeKey === 'song-list-table') {
            this.setState({
                hasSearch: true
            });
        } else {
            this.setState({
                hasSearch: false
            })
        }
    };

    nicknameClick = (userId) => {
        console.log(userId)
    };

    // 专辑点击
    alClick = (id) => {
        console.log(id)
    };

    onTableRowDoubleClick = (record) => {
        const playList = _.cloneDeep(this.props.list);
        if (playList.length > 0) {
            let isInPlayList = false, inPlayListIndex = 0;
            playList.forEach((value, index) => {
                if (value.id === record.id) {
                    isInPlayList = true;
                    inPlayListIndex = index;
                }
            });
            if (isInPlayList) {
                this.props.setCurrentPlayIndex(inPlayListIndex)
            } else {
                playList.splice(this.props.currentPlayIndex + 1, 0, record);
                this.props.setCurrentSongList(playList);
                this.props.setCurrentPlayIndex(this.props.currentPlayIndex + 1);
            }
        } else {
            playList.push(record);
            this.props.setCurrentSongList(playList);
            this.props.setCurrentPlayIndex(0);
        }
        playMusic(record.id)
    };

    playAll = () => {
        // console.log(this.songListCopy);
        this.props.setCurrentSongList(this.songListCopy);
        this.props.setCurrentPlayIndex(0);
        playMusic(this.songListCopy[0].id)
    };

    addToPlayList = () => {
        if (this.props.list.length > 0) {
            let playListLeft = this.props.list.slice(0, this.props.currentPlayIndex + 1) || [];
            let playListRight = this.props.list.slice(this.props.currentPlayIndex) || [];
            const uniqList = _.uniqBy([...playListLeft, ...this.songListCopy, ...playListRight], 'id');
            this.props.setCurrentSongList(uniqList)
        } else {
            this.props.setCurrentSongList(this.songListCopy)
        }
    };

    render() {
        const { id, songList, songHeaderInfo, hasSearch } = this.state;
        if (!(songHeaderInfo && songList)) return <Spin spinning={true} tip='加载中...'/>;
        const ButtonGroup = Button.Group;
        const TabPane = Tabs.TabPane;
        const Search = Input.Search;
        const operations = hasSearch ? (
            <Search
                placeholder="搜索歌单音乐"
                onChange={(e) => _.debounce(this.tableSearch, 500)(e.target.value)}
                className='song-list-table-search'
            />
        ) : '';
        const columns = [
            {
                title: '序号',
                dataIndex: 'order',
                render: (value, row) => value < 10 ? '0' + value : value,
                width: 60
            }, {
                title: '操作',
                dataIndex: 'action',
                render: (value, row) => (
                    <Fragment>
                        <Icon type="heart" style={{ color: 'rgb(153,153,153)', marginRight: 10, fontSize: '13px' }}/>
                        <Icon type="download"/>
                    </Fragment>
                ),
                width: 80
            }, {
                title: '音乐标题',
                dataIndex: 'name',
                render: (value, row) => value
            }, {
                title: '歌手',
                dataIndex: 'ar',
                render: (value) => value.map((item, index) => {
                    return <span className='cursorPoint' key={item.id}
                                 onClick={() => this.nicknameClick(item.id)}>{item.name}{index === value.length - 1 ? '' : '/'}</span>
                })
            }, {
                title: '专辑',
                dataIndex: 'al',
                render: (value) => <span className='cursorPoint'
                                         onClick={() => this.alClick(value.id)}>{value.name}</span>
            }, {
                title: '时长',
                dataIndex: 'dt',
                render: (value, row) => formatSecond(value)
            }
        ];
        return (
            <Fragment>
                <div style={{ padding: '20px 0', display: 'flex' }}>
                    <div style={{ width: 250, height: 250, margin: '0 40px' }}>
                        <img src={`${songHeaderInfo.coverImgUrl}?param=250y250`} alt=''/>
                    </div>
                    <div style={{ flexGrow: 1, paddingRight: 20 }}>
                        <h2>
                            {songHeaderInfo.name}
                            <div style={{
                                float: 'right',
                                display: 'flex',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                fontSize: '12px',
                                color: 'rgb(153,153,153)',
                                marginRight: 20
                            }}>
                                <div>
                                    <div>歌曲数</div>
                                    <div style={{ float: 'right', fontSize: '8px' }}>{songHeaderInfo.trackCount}</div>
                                </div>
                                <div style={{
                                    borderRight: '1px solid rgb(153,153,153)',
                                    margin: '0 10px',
                                    height: 25
                                }}/>
                                <div>
                                    <div>播放数</div>
                                    <div style={{
                                        float: 'right',
                                        fontSize: '8px'
                                    }}>{convertToMillion(songHeaderInfo.playCount)}</div>
                                </div>
                            </div>
                        </h2>
                        <div style={{ margin: '10px 0', fontSize: '16px' }}>
                            <span>
                                <Avatar src={songHeaderInfo.creator.avatarUrl} style={{ marginRight: 5 }}/>
                                {songHeaderInfo.creator.nickname}
                            </span>
                            <span
                                style={{
                                    marginLeft: 10,
                                    color: 'rgb(136,136,136)',
                                    fontSize: '14px'
                                }}>{moment(songHeaderInfo.createTime).format('YYYY-MM-DD')}创建</span>
                        </div>
                        <div style={{ margin: '20px 0' }}>
                            <ButtonGroup style={{ marginRight: 10 }}>
                                <Button icon='play-circle'
                                        onClick={() => this.playAll()}
                                        style={{ background: 'rgb(198,47,47)', color: 'white' }}>播放全部</Button>
                                <Button onClick={() => this.addToPlayList()} icon='plus'
                                        style={{ background: 'rgb(198,47,47)', color: 'white' }}/>
                            </ButtonGroup>
                            <Button style={{ marginRight: 10 }}
                                    icon='folder-add'>{songHeaderInfo.subscribed ? '已收藏' : '收藏'}({songHeaderInfo.subscribedCount})</Button>
                            <Button style={{ marginRight: 10 }}
                                    icon='share-alt'>分享({songHeaderInfo.shareCount})</Button>
                            <Button style={{ marginRight: 10 }} icon='download'>下载</Button>
                        </div>
                        <div style={{ margin: '10px 0' }}>
                            标签：{songHeaderInfo.tags.join('/')}
                        </div>
                        <div style={{ margin: '10px 0' }}>
                            简介：{songHeaderInfo.description}
                        </div>
                    </div>
                </div>
                <Tabs onChange={this.TabsChange} className='net-ease-Tabs'
                      tabBarStyle={{ paddingLeft: 100, marginBottom: 0 }} tabBarExtraContent={operations}>
                    <TabPane tab='歌曲列表' key='song-list-table'>
                        <Table columns={columns} className='song-list-table' dataSource={songList} pagination={false}
                               rowKey={(record => record.id)}
                               onRow={record => {
                                   return {
                                       onDoubleClick: () => {
                                           this.onTableRowDoubleClick(record)
                                       },
                                   };
                               }}
                        />
                    </TabPane>
                    <TabPane tab={'评论(' + songHeaderInfo.commentCount + ')'} key='comment'>
                        <Suspense fallback={<Spin tip='加载中...' spinning={true} className='suspense-loading'/>}>
                            <SongListComments id={id}/>
                        </Suspense>
                    </TabPane>
                    <TabPane tab='收藏者' key='collectors'>
                        <Suspense fallback={<Spin tip='加载中...' spinning={true} className='suspense-loading'/>}>
                            <SongListCollectors id={id}/>
                        </Suspense>
                    </TabPane>
                </Tabs>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        ...state.currentPlayList
    }), {
        setCurrentSongList,
        setCurrentPlayIndex
    }
)(SongListDetail);
