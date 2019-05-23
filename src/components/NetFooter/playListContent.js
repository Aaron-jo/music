import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Table, Icon, Divider, Radio, Dropdown, Menu} from 'antd';
import {formatSecond} from '../../Utils';
import playMusic from '../../commo/playMusic';
import {setCurrentPlayIndex, setCurrentSongLit, setPlayedList} from '../../reduxModal/actions/getCurrentPlayList';
import _ from 'lodash';
import './index.less';

class playListContent extends Component {

    state = {
        playedList: [],
        isPlayed: false,
    };

    componentWillMount() {
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    radioChange(e) {
        switch (e.target.value) {
            case 0:
                this.setState({
                    isPlayed: false,
                });
                break;
            case 1:
                this.setState({
                    isPlayed: true,
                });
                break;
            default:
                break;
        }
    }

    // 双击播放列表歌曲播放
    playListRowDoubleClick(record) {
        if (this.state.isPlayed) {
            const doubleClickIndex = _.findIndex(this.props.list, ['id', record.id]);
            if (doubleClickIndex === -1) { // 在播放列表中没有该歌曲，则插入
                const list = _.cloneDeep(this.props.list);
                list.splice(this.props.currentPlayIndex + 1, 0, record);
                this.props.setCurrentSongLit(list);
                this.props.setCurrentPlayIndex(this.props.currentPlayIndex + 1);
            } else { // 有该歌曲，则播放这首
                this.props.setCurrentPlayIndex(doubleClickIndex)
            }
        } else {
            this.props.setCurrentPlayIndex(_.findIndex(this.props.list, ['id', record.id]));
        }
        playMusic(record.id);
    }

    // 清空播放列表
    clearPlayList() {
        if (this.state.isPlayed) {
            this.props.setPlayedList([]);
            localStorage.removeItem('playedList');
        } else {
            this.props.setCurrentSongLit([]);
            this.props.setCurrentPlayIndex(0);
            localStorage.removeItem('playingList');
            window.audio.src = '';
        }
    }

    render() {
        const { list, currentPlayIndex, isPaused, playedList } = this.props;
        const { isPlayed } = this.state;
        const RadioGroup = Radio.Group;
        const RadioButton = Radio.Button;
        const menu = (
            <Menu>
                <Menu.Item key="1">1st menu item</Menu.Item>
                <Menu.Item key="2">2nd menu item</Menu.Item>
                <Menu.Item key="3">3rd menu item</Menu.Item>
            </Menu>
        );
        const columns = [
            {
                title: '歌名',
                dataIndex: 'name',
                key: 'name',
                render: (value, row) => (
                    <Dropdown overlay={menu} trigger={['contextMenu']}>
                        <div className='play-list-table-icon'>
                            {
                                isPlayed ? '' : (
                                    <span>
                                    {
                                        list[currentPlayIndex].id === row.id ?
                                            <Icon type={isPaused ? 'pause' : 'caret-right'}/> :
                                            <i style={{ width: 14, display: 'inline-block' }}/>
                                    }
                                </span>
                                )
                            }
                            <span title={value}>{value}</span>
                        </div>
                    </Dropdown>
                )
            }, {
                title: '歌手',
                dataIndex: 'ar',
                key: 'artists',
                width: 120,
                render: (value, row) => (
                    <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: 120 }}
                         title={value.map(item => item.name).join('/')}>
                        {value.map((item, index) => {
                            if (index === row.ar.length - 1) {
                                return <span key={item.id ? item.id : item.name + row.id}>{item.name}</span>
                            } else {
                                return <span key={item.id ? item.id : item.name + row.id}>{item.name}/</span>
                            }
                        })}
                    </div>
                ),
            }, {
                title: '链接',
                dataIndex: 'link',
                key: 'link',
                width: 30,
                render: (value, row) => (
                    <Icon type="link"/>
                )
            }, {
                title: '时间',
                dataIndex: 'dt',
                key: 'time',
                width: 70,
                render: (value, row) => <span>{formatSecond(row.dt)}</span>
            }
        ];
        return (
            <div id='play-list-content'>
                <div className='play-list-content-header'>
                    <RadioGroup buttonStyle='solid' size='small' defaultValue={0} onChange={(e) => this.radioChange(e)}>
                        <RadioButton value={0}>播放列表</RadioButton>
                        <RadioButton value={1}>历史记录</RadioButton>
                    </RadioGroup>
                </div>
                <div className='play-list-content-middle'>
                    <div>总{isPlayed ? playedList.length : list.length}首</div>
                    <div className='add-delete'>
                        {
                            isPlayed ? '' : (
                                <Fragment>
                                    <span><Icon type='folder-add' style={{ marginRight: 5 }}/>收藏全部</span>
                                    <Divider type='vertical'/>
                                </Fragment>
                            )
                        }
                        <span style={{ float: 'right' }} onClick={this.clearPlayList.bind(this)}>
                            <Icon type='delete' style={{ marginRight: 5 }}/>清空
                        </span>
                    </div>
                </div>
                <div className='play-list-content-body'>
                    <Table columns={columns} className='play-list-table' dataSource={isPlayed ? playedList : list}
                           showHeader={false}
                           size='middle' bordered={false} rowClassName='play-list-row'
                           pagination={false} rowKey={(record) => record.id}
                           onRow={(record) => {
                               return {
                                   onDoubleClick: (e) => {
                                       this.playListRowDoubleClick(record)
                                   }
                               }
                           }}
                    />
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        ...state.currentPlayList
    }), {
        setCurrentPlayIndex,
        setCurrentSongLit,
        setPlayedList,
    }
)(playListContent);
