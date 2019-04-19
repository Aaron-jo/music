import React, {Component, Fragment} from 'react';
import {Radio, Row, Tabs, Col, Icon, Button, Spin} from 'antd';
import axios from '../../request/';

class TopMusic extends Component {
    constructor (props) {
        super(props);
        this.state = {
            spinning: true,
            newSong: [],
        }
    }

    componentWillMount () {

    }

    componentDidMount () {
        axios.get('/top/song', { params: { type: 0 } }).then((response) => {
            this.setState({
                newSong: response.data.data,
                spinning: false
            })
        })
    }

    componentWillUnmount () {

    }

    onTopMusicTabsChange(activeKey) {
        this.setState({
            spinning: true
        });
        axios.get('/top/song', { params: { type: activeKey } }).then((response) => {
            this.setState({
                newSong: response.data.data,
                spinning: false,
            })
        })
    }

    render () {
        const { newSong, spinning } = this.state;
        const RadioGroup = Radio.Group;
        const RadioButton = Radio.Button;
        const TabPane = Tabs.TabPane;
        return (
            <Fragment>
                <Row type='flex' style={{ justifyContent: 'center' }}>
                    <RadioGroup buttonStyle='solid' defaultValue={0}>
                        <RadioButton value={0}>新歌速递</RadioButton>
                        <RadioButton value={1}>新碟上架</RadioButton>
                    </RadioGroup>
                </Row>
                <div style={{ marginTop: 20, padding: '0px 50px' }}>
                    <Spin spinning={spinning} tip='加载中...'>
                        <Row>
                            <Tabs onChange={this.onTopMusicTabsChange.bind(this)}>
                                <TabPane tab="全部" key="0"/>
                                <TabPane tab="华语" key="7"/>
                                <TabPane tab="欧美" key="96"/>
                                <TabPane tab="韩国" key="16"/>
                                <TabPane tab="日本" key="8"/>
                            </Tabs>
                        </Row>
                        <Row type='flex' style={{ border: '1px solid #eee' }}>
                            <Col style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '10px',
                                alignItems: 'center'
                            }} span={24}>
                            <span>
                                <div className='playIcon' style={{ marginRight: '10px', float: 'left' }}>
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
                                                <div className='playIconInImg'>
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
                                            <div className='textOverflow' style={{ width: '20%', cursor: 'pointer' }}>{song.album.name}</div>
                                            <div style={{ width: '8%' }}>
                                                {Math.floor(song.duration / 1000 / 60) < 10 ? `0${Math.floor(song.duration / 1000 / 60)}` : Math.floor(song.duration / 1000 / 60)}:{Math.floor(song.duration / 1000 % 60) < 10 ? `0${Math.floor(song.duration / 1000 % 60)}` : Math.floor(song.duration / 1000 % 60)}
                                            </div>
                                        </Col>
                                    </Fragment>
                                ))
                            }
                        </Row>
                    </Spin>
                </div>
            </Fragment>
        );
    }
}

export default TopMusic;
