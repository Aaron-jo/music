import React, { Component, Fragment } from 'react';
import { getQueryString } from '../../Utils/';
import { Button, Avatar, Icon, Table, Spin, Tabs, Input } from 'antd';
import axios from '../../request/';
import _ from 'lodash';
import moment from 'moment';
import { createHashHistory } from 'history';
import { formatSecond, convertToMillion } from "../../Utils/index";
import './index.less';

class SongListDetail extends Component {

    constructor(props) {
        super(props);
        const history = createHashHistory();
        this.state = {
            id: getQueryString(history.location.search, 'id') || null,
            songList: [],
            songHeaderInfo: null,
            hasSearch: true,
            comments: [],
            hotComments: [],
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
    }

    TabsChange = (activeKey) => {
        if (activeKey === 'comment') {
            this.setState({
                hasSearch: false
            });
            if (this.state.comments.length === 0) {
                axios.get('/comment/playlist', {
                    params: {
                        id: this.state.songHeaderInfo.id
                    }
                }).then((response) => {
                    this.setState({
                        comments: response.data.comments,
                        hotComments: response.data.hotComments
                    })
                })
            }
        } else {
            this.setState({
                hasSearch: true
            })
        }
    }

    nicknameClick = (userId) => {
        console.log(userId)
    }

    render() {
        const { songList, songHeaderInfo, hasSearch, hotComments, comments } = this.state;
        if (!(songHeaderInfo && songList)) return <Spin spinning={true} tip='加载中...' />;
        const ButtonGroup = Button.Group;
        const TabPane = Tabs.TabPane;
        const Search = Input.Search;
        const TextArea = Input.TextArea;
        const operations = hasSearch ? (
            <Search
                placeholder="搜索歌单音乐"
                onSearch={this.tableSearch}
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
                        <Icon type="heart" style={{ color: 'rgb(153,153,153)', marginRight: 10, fontSize: '13px' }} />
                        <Icon type="download" />
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
                render: (value, row) => value.map(item => item.name).join('/')
            }, {
                title: '专辑',
                dataIndex: 'al',
                render: (value, row) => value.name
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
                        <img src={`${songHeaderInfo.coverImgUrl}?param=250y250`} alt='' />
                    </div>
                    <div style={{ flexGrow: 1, paddingRight: 20 }}>
                        <h2>
                            {songHeaderInfo.name}
                            <div style={{ float: 'right', display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontSize: '12px', color: 'rgb(153,153,153)', marginRight: 20 }}>
                                <div>
                                    <div>歌曲数</div>
                                    <div style={{ float: 'right', fontSize: '8px' }}>{songHeaderInfo.trackCount}</div>
                                </div>
                                <div style={{ borderRight: '1px solid rgb(153,153,153)', margin: '0 10px', height: 25 }} />
                                <div>
                                    <div>播放数</div>
                                    <div style={{ float: 'right', fontSize: '8px' }}>{convertToMillion(songHeaderInfo.playCount)}</div>
                                </div>
                            </div>
                        </h2>
                        <div style={{ margin: '10px 0', fontSize: '16px' }}>
                            <span>
                                <Avatar src={songHeaderInfo.creator.avatarUrl} style={{ marginRight: 5 }} />
                                {songHeaderInfo.creator.nickname}
                            </span>
                            <span
                                style={{ marginLeft: 10, color: 'rgb(136,136,136)', fontSize: '14px' }}>{moment(songHeaderInfo.createTime).format('YYYY-MM-DD')}创建</span>
                        </div>
                        <div style={{ margin: '20px 0' }}>
                            <ButtonGroup style={{ marginRight: 10 }}>
                                <Button icon='play-circle' style={{ background: 'rgb(198,47,47)', color: 'white' }}>播放全部</Button>
                                <Button icon='plus' style={{ background: 'rgb(198,47,47)', color: 'white' }} />
                            </ButtonGroup>
                            <Button style={{ marginRight: 10 }} icon='folder-add'>{songHeaderInfo.subscribed ? '已收藏' : '收藏'}({songHeaderInfo.subscribedCount})</Button>
                            <Button style={{ marginRight: 10 }} icon='share-alt'>分享({songHeaderInfo.shareCount})</Button>
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
                <Tabs onChange={this.TabsChange} className='net-ease-Tabs' tabBarStyle={{ paddingLeft: 100, marginBottom: 0 }} tabBarExtraContent={operations}>
                    <TabPane tab='歌曲列表' key='song-list-table'>
                        <Table columns={columns} className='song-list-table' dataSource={songList} pagination={false}
                            rowKey={(record => record.id)} />
                    </TabPane>
                    <TabPane tab={'评论(' + songHeaderInfo.commentCount + ')'} key='comment'>
                        <div style={{ padding: '20px 30px' }}>
                            <div className='comment'>
                                <TextArea rows={3} />
                                <div className='comment-operator'><Button>评论</Button></div>
                            </div>
                            <div className='hotComments'>
                                <div style={{ paddingBottom: 10, width: '100%', borderBottom: '1px solid rgb(232,232,232)' }}>精彩评论</div>
                                {
                                    hotComments.map(item =>
                                        <div className='hotCommentsChunck' key={item.commentId}>
                                            <Avatar src={item.user.avatarUrl} style={{ marginRight: 10 }} />
                                            <div style={{width: '100%'}}>
                                                <p style={{ marginBottom: 5 }}>
                                                    <span style={{ cursor: 'pointer', color: 'rgb(0,122,204)' }} onClick={() => this.nicknameClick(item.user.userId)}>
                                                        {item.user.nickname}
                                                    </span>
                                                    ：{item.content}
                                                </p>
                                                <div>
                                                    <span style={{ color: 'rgb(136,136,136)', fontSize: '14px' }}>{moment(item.time).format('YYYY年MM月DD日 HH:mm:ss')}</span>
                                                    <div style={{ float: 'right', display: 'flex', justifyContent: 'space-around', alignItems: 'center', fontSize: '12px', color: 'rgb(153,153,153)', marginRight: 20 }}>
                                                        <div>
                                                            赞
                                                        </div>
                                                        <div style={{ borderRight: '1px solid rgb(153,153,153)', margin: '0 10px', height: 10 }} />
                                                        <div>
                                                            分享
                                                        </div>
                                                        <div style={{ borderRight: '1px solid rgb(153,153,153)', margin: '0 10px', height: 10 }} />
                                                        <div>
                                                            回复
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <div className='comments'>

                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </Fragment>
        );
    }
}

export default SongListDetail;
