import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table} from 'antd';
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
        const {list, currentPlayIndex, randomPlayIndex} = this.props;
        const columns = [
            {
                title: '歌名',
                dataIndex: 'name',
                key: 'name'
            }, {
                title: '歌手',
                dataIndex: 'ar',
                key: 'artists',
                render: (value, row) => row.ar.map(item => item.name).join('/')

            }, {
                title: '链接',
                dataIndex: 'link',
                key: 'link',
                render: () => '链接'
            }, {
                title: '时间',
                dataIndex: 'dt',
                key: 'time',
                render: () => '时间'
            }
        ];
        return (
            <div id='play-list-content'>
                <div>头部</div>
                <div>中间部分</div>
                <div className='table-content'>
                    <Table columns={columns} className='play-list-table' dataSource={list} showHeader={false}
                           size='middle' bordered={false}
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
