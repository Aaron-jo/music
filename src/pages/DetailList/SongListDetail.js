import React, {Component, Fragment} from 'react';
import {getQueryString} from '../../Utils/';
import {Button, Avatar, Icon, Table, Spin, Divider} from 'antd';
import axios from '../../request/';
import _ from 'lodash';
import moment from 'moment';
import {createHashHistory} from 'history';

class SongListDetail extends Component {

    constructor(props) {
        super(props);
        const history = createHashHistory();
        this.state = {
            id: getQueryString(history.location.search, 'id') || null,
            songList: [],
            songHeaderInfo: null,
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
        if (!this.state.id) return;
        axios.get('/playlist/detail', { params: { id: this.state.id } }).then(response => {
            this.setState({
                songList: response.data.playlist.tracks,
                songHeaderInfo: _.pickBy(response.data.playlist, (value, key) => key !== 'tracks' && key !== 'trackIds')
            })
        });
    }

    componentWillUnmount() {

    }

    render() {
        const { songList, songHeaderInfo } = this.state;
        if (!(songHeaderInfo && songList)) return <Spin spinning={true} tip='加载中...'/>;
        const ButtonGroup = Button.Group;
        const columns = [
            {
                title: '序号',
                dataIndex: 'order',
                render: (value, row) => 1
            }, {
                title: '操作',
                dataIndex: 'action',
                render: (value, row) => (
                    <Fragment>
                        <Icon type="heart"/>
                        <Icon type="download"/>
                    </Fragment>
                )
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
                render: (value, row) => value
            }
        ];
        return (
            <Fragment>
                <div style={{ padding: '20px 0', display: 'flex' }}>
                    <div style={{ width: 250, height: 250, margin: '0 40px' }}>
                        <img src={`${songHeaderInfo.coverImgUrl}?param=250y250`} alt=''/>
                    </div>
                    <div style={{ flexGrow: 1 }}>
                        <h2>
                            {songHeaderInfo.name}
                            <div style={{float: 'right'}}>
                                <div>歌曲数</div>
                                <Divider type='vertical'/>
                                <div>播放数 <br/> 200</div>
                            </div>
                        </h2>
                        <div style={{margin: '10px 0'}}>
                            <span>
                                <Avatar src={songHeaderInfo.creator.avatarUrl} style={{marginRight: 5}}/>
                                {songHeaderInfo.creator.nickname}
                            </span>
                            <span
                                style={{ marginLeft: 10 }}>{moment(songHeaderInfo.createTime).format('YYYY-MM-DD')}创建</span>
                        </div>
                        <div style={{margin: '20px 0'}}>
                            <ButtonGroup style={{marginRight: 10}}>
                                <Button icon='play-circle'>播放全部</Button>
                                <Button icon='plus' />
                            </ButtonGroup>
                            <Button style={{marginRight: 10}} icon='folder-add'>收藏</Button>
                            <Button style={{marginRight: 10}} icon='share-alt'>分享</Button>
                            <Button style={{marginRight: 10}} icon='download'>下载</Button>
                        </div>
                        <div style={{margin: '10px 0'}}>
                            标签：{songHeaderInfo.tags.join('/')}
                        </div>
                        <div style={{margin: '10px 0'}}>
                            简介：{songHeaderInfo.description}
                        </div>
                    </div>
                </div>
                <Table columns={columns} className='song-list-table' dataSource={songList} pagination={false}
                       rowKey={(record => record.id)}/>
            </Fragment>
        );
    }
}

export default SongListDetail;
