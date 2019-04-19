import React, {Component, Fragment} from 'react';
import axios from '../../request/';
import {Card, Col, Icon, Row, Spin} from "antd";
import './index.less';

class TopList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            officialTopList: null,
            globalTopList: null,
        }
    }

    componentWillMount () {
        axios.get('/toplist/detail').then((response) => {
            const officialTopList = [], globalTopList = [];
            response.data.list.forEach(item => {
                if (item.tracks.length > 0) {
                    officialTopList.push(item)
                } else {
                    globalTopList.push(item)
                }
            });
            this.setState({
                officialTopList,
                globalTopList
            })
        });
    }

    componentDidMount () {

    }

    componentWillUnmount () {

    }

    render () {
        const { officialTopList, globalTopList } = this.state;
        if (!officialTopList) return <Spin spinning={true} tip='加载中...'/>;
        return (
            <Fragment>
                <Card title="官方榜" bordered={false} headStyle={{ padding: 0 }}
                      bodyStyle={{ padding: '10px 0 20px 0' }}>
                    <Row gutter={20}>
                        {
                            officialTopList.map((item, index) => (
                                <Col key={item.name} span={8}>
                                    <Card cover={
                                        <div style={{ position: 'relative' }}>
                                            <img alt={item.name} src={`${item.coverImgUrl}?param=476y200`}/>
                                            <div style={{
                                                position: 'absolute',
                                                borderRadius: '50%',
                                                border: '1px solid white',
                                                background: 'rgba(0,0,0,0.5)',
                                                top: '5px',
                                                left: '5px',
                                                width: '30px',
                                                height: '30px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <Icon type="video-camera" style={{ color: 'white' }}/>
                                            </div>
                                        </div>
                                    }
                                          bordered={false} bodyStyle={{ padding: '0 0 20px 0' }}
                                          style={{ cursor: 'pointer', position: 'relative' }}
                                          className='songListCard'
                                    >
                                        <div style={{border: '1px solid #f7f7f7'}}>
                                            {
                                                item.tracks.map((track, index) => (
                                                    <div key={track.first} className='officialTrack'>
                                                        <span style={{marginRight: '10px', color: '#c62f2f'}}>0{index + 1}</span>
                                                        <span>{track.first}</span>
                                                        <span style={{float: 'right', color: '#b7b9bb'}}>{track.second}</span>
                                                    </div>
                                                ))
                                            }
                                            <div className='officialTrack' style={{textAlign: 'right', color: '#b7b9bb'}}>查看全部 ></div>
                                        </div>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </Card>
                <Card title="全球榜" bordered={false} headStyle={{ padding: 0 }}
                      bodyStyle={{ padding: '10px 0 20px 0' }}>
                    <Row type='flex' style={{ marginTop: 15 }} gutter={16}>
                        {
                            globalTopList.map((item, index) => (
                                <Col span={4} key={index}>
                                    <Card
                                        cover={
                                            <div style={{
                                                position: 'relative',
                                                Height: 231,
                                                border: '1px solid #e8e8e8'
                                            }}>
                                                <img alt={item.name} src={`${item.coverImgUrl}?param=230y244`}/>
                                                <div className='cameraIconCotainer'>
                                                    <Icon type="customer-service"/>
                                                    {item.playCount > 10000 ? Math.ceil(item.playCount / 1000) + '万' : item.playCount}
                                                </div>
                                            </div>
                                        }
                                        bordered={false} bodyStyle={{ padding: '10px 0 10px 0' }}
                                        style={{ cursor: 'pointer', position: 'relative' }}
                                        className='songListCard'
                                    >
                                        {item.name}
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </Card>
            </Fragment>
        );
    }
}

export default TopList;
