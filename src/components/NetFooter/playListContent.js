import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, Icon, Divider, Radio} from 'antd';
import {formatSecond} from '../../Utils';
import './index.less';

class playListContent extends Component {

    state = {};

    componentWillMount() {
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        const { list, currentPlayIndex, isPaused } = this.props;
        const RadioGroup = Radio.Group;
        const RadioButton = Radio.Button;
        const columns = [
            {
                title: '歌名',
                dataIndex: 'name',
                key: 'name',
                render: (value, row) => (
                    <div className='play-list-table-icon'>
                        <span>
                            {
                                list[currentPlayIndex].id === row.id ?
                                    <Icon type={isPaused ? 'pause' : 'caret-right'}/> : <i style={{width: 14, display: 'inline-block'}} />
                            }
                        </span>
                        <span>{value}</span>
                    </div>
                )
            }, {
                title: '歌手',
                dataIndex: 'ar',
                key: 'artists',
                width: 120,
                render: (value, row) => (
                    <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: 120 }}>
                        {row.ar.map((item, index) => {
                            if (index === row.ar.length - 1) {
                                return <span key={item.id}>{item.name}</span>
                            } else {
                                return <span key={item.id}>{item.name}/</span>
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
                    <RadioGroup buttonStyle='solid' size='small' defaultValue={0}>
                        <RadioButton value={0}>播放列表</RadioButton>
                        <RadioButton value={1}>历史记录</RadioButton>
                    </RadioGroup>
                </div>
                <div className='play-list-content-middle'>
                    <div>总{list.length}首</div>
                    <div className='add-delete'>
                        <span><Icon type='folder-add' style={{ marginRight: 5 }}/>收藏全部</span>
                        <Divider type='vertical'/>
                        <span style={{ float: 'right' }}><Icon type='delete' style={{ marginRight: 5 }}/>清空</span>
                    </div>
                </div>
                <div className='play-list-content-body'>
                    <Table columns={columns} className='play-list-table' dataSource={list} showHeader={false}
                           size='middle' bordered={false} rowClassName='play-list-row'
                           pagination={false} rowKey={(record) => record.id}/>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        ...state.currentPlayList
    })
)(playListContent);
