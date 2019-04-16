import React, {Component, Fragment} from 'react';
import {Carousel, Card, Row, Col, List, Icon} from "antd";
import axios from '../../request/index';
import './index.less';

class PersonalityRecommendation extends Component {
    constructor (props) {
        super(props);
        this.state = {
            banners: [],
            personalized: [],
            privatecontent: [], // 独家放送
            newsong: [], //最新音乐
            mv: [], // 推荐MV
            djprogram: [], //推荐电台
        }
    }

    componentWillMount () {
    }

    componentDidMount () {
        axios.get('/banner').then((response) => {
            this.setState({
                banners: response.data.banners
            })
        });
        axios.get('/personalized').then((response) => {
            this.setState({
                personalized: response.data.result
            })
        });
        axios.get('/personalized/privatecontent').then((response) => {
            this.setState({
                privatecontent: response.data.result
            })
        });
        axios.get('/personalized/newsong').then((response) => {
            this.setState({
                newsong: response.data.result
            })
        });
        axios.get('/personalized/mv').then((response) => {
            this.setState({
                mv: response.data.result
            })
        });
        axios.get('/personalized/djprogram').then((response) => {
            this.setState({
                djprogram: response.data.result
            })
        });
    }

    componentWillReceiveProps (nextProps) {

    }

    // shouldComponentUpdate(nextProps, nextState) {

    // }

    componentWillUpdate (nextProps, nextState) {

    }

    componentDidUpdate (prevProps, prevState) {

    }

    componentWillUnmount () {

    }


    render () {
        const { banners, personalized, privatecontent, newsong, mv, djprogram } = this.state;
        return (
            <Fragment>
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <Carousel autoplay>
                        {
                            banners.map((banner, index) => (
                                <div key={banner.imageUrl}><img src={banner.imageUrl} alt={banner.typeTitle}/></div>
                            ))
                        }
                    </Carousel>
                </div>
                <div style={{ marginTop: 20 }}>
                    <Card title="推荐歌单" bordered={false} headStyle={{ padding: 0 }} extra={<a href='/#'>更多 ></a>}
                          bodyStyle={{ padding: '10px 0 20px 0' }}>
                        <Row gutter={20}>
                            <Col span={4}>
                                <Card cover={<div>15</div>}
                                      bordered={false} bodyStyle={{ padding: '10px 0 0 0' }}
                                      style={{ cursor: 'pointer', position: 'relative' }}
                                      className='songListCard'
                                >
                                    <div className='hangInfo'>
                                        根据您的音乐口味生成每日更新
                                    </div>
                                    每日歌曲推荐
                                </Card>
                            </Col>
                            {
                                personalized.map((item, index) => (
                                    index < 5 && (
                                        <Col span={4} key={item.name}>
                                            <Card cover={
                                                <div style={{ position: 'relative', minHeight: 228 }}>
                                                    <img alt={item.name} src={`${item.picUrl}?param=228y225`}/>
                                                    <div className='cameraIconCotainer'>
                                                        <Icon type="customer-service"/>
                                                        {item.playCount > 10000 ? Math.ceil(item.playCount / 1000) + '万' : item.playCount}
                                                    </div>
                                                </div>
                                            }
                                                  bordered={false} bodyStyle={{ padding: '10px 0 0 0' }}
                                                  style={{ cursor: 'pointer', position: 'relative' }}
                                                  className='songListCard'
                                            >
                                                <div className='hangInfo'>
                                                    {item.copywriter}
                                                </div>
                                                {item.name}
                                            </Card>
                                        </Col>
                                    )
                                ))
                            }
                        </Row>
                        <Row gutter={20}>
                            {
                                personalized.map((item, index) => (
                                    index >= 5 && index < 11 && (
                                        <Col span={4} key={item.name}>
                                            <Card cover={
                                                <div style={{ position: 'relative', minHeight: 228 }}>
                                                    <img alt={item.name} src={`${item.picUrl}?param=228y225`}/>
                                                    <div className='cameraIconCotainer'>
                                                        <Icon type="customer-service"/>
                                                        {item.playCount > 10000 ? Math.ceil(item.playCount / 1000) + '万' : item.playCount}
                                                    </div>
                                                </div>
                                            }
                                                  bordered={false} bodyStyle={{ padding: '10px 0 0 0' }}
                                                  style={{ cursor: 'pointer', position: 'relative' }}
                                                  className='songListCard'
                                            >
                                                <div className='hangInfo'>
                                                    {item.copywriter}
                                                </div>
                                                {item.name}
                                            </Card>
                                        </Col>
                                    )
                                ))
                            }
                        </Row>
                    </Card>
                    <Card title="独家放送" bordered={false} headStyle={{ padding: 0 }} extra={<a href='/#'>更多 ></a>}
                          bodyStyle={{ padding: '10px 0 20px 0' }}>
                        <Row gutter={20}>
                            {
                                privatecontent.map((item, index) => (
                                    <Col key={item.id} span={8}>
                                        <Card cover={
                                            <div style={{ position: 'relative' }}>
                                                <img alt={item.name} src={`${item.sPicUrl}?param=471y265`}/>
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
                                              bordered={false} bodyStyle={{ padding: '10px 0 0 0' }}
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
                    <Card title="最新音乐" bordered={false} headStyle={{ padding: 0 }} extra={<a href='/#'>更多 ></a>}
                          bodyStyle={{ padding: '10px 0 20px 0' }}>
                        <Row style={{ border: '1px solid #e8e8e8' }}>
                            {
                                newsong.length > 0 ? (
                                    <Fragment>
                                        <Col span={12}>
                                            <List
                                                itemLayout="horizontal"
                                                dataSource={newsong}
                                                renderItem={(item, index) => (
                                                    index < 5 ? (
                                                        <List.Item style={{ borderRight: '1px solid #e8e8e8' }}>
                                                            <List.Item.Meta
                                                                avatar={<div
                                                                    style={{ paddingLeft: '10px', fontSize: '12px' }}>
                                                                    <span style={{
                                                                        width: 32,
                                                                        height: 32,
                                                                        lineHeight: '32px',
                                                                        color: '#b7b9bb',
                                                                        marginRight: 10
                                                                    }}>0{index + 1}</span>
                                                                    <span style={{ position: 'relative' }}><img
                                                                        style={{ width: 48, height: 48 }} alt='图片'
                                                                        src={`${item.song.album.picUrl}?param=48y48&quality=100`}/><Icon
                                                                        type="play-circle" style={{
                                                                        position: 'absolute',
                                                                        top: '0px',
                                                                        right: '13px',
                                                                        fontSize: '20px',
                                                                        color: 'white',
                                                                        cursor: 'pointer'
                                                                    }}/></span>
                                                                </div>}
                                                                title={<div><span>{item.song.name}</span><span style={{
                                                                    color: '#b7b9bb',
                                                                    fontSize: '12px'
                                                                }}>{item.song.alias.length > 0 && `（${item.song.alias.join('')}）`}</span>
                                                                </div>}
                                                                description={<div><span style={{
                                                                    cursor: 'pointer',
                                                                    verticalAlign: 'center'
                                                                }}>{item.song.mvid ? <Icon type="youtube" style={{
                                                                    color: '#903030',
                                                                    marginRight: 10,
                                                                    fontSize: '18px',
                                                                    lineHeight: '18px'
                                                                }}/> : ''}</span>{item.song.artists.map(item => item.name).join('/')}
                                                                </div>}
                                                            />
                                                        </List.Item>
                                                    ) : (
                                                        <List.Item.Meta></List.Item.Meta>
                                                    )
                                                )}
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <List
                                                itemLayout="horizontal"
                                                dataSource={newsong}
                                                renderItem={(item, index) => (
                                                    index >= 5 ? (
                                                        <List.Item style={{ borderRight: '1px solid #e8e8e8' }}>
                                                            <List.Item.Meta
                                                                avatar={<div
                                                                    style={{ paddingLeft: '10px', fontSize: '12px' }}>
                                                                    <span style={{
                                                                        width: 32,
                                                                        height: 32,
                                                                        lineHeight: '32px',
                                                                        color: '#b7b9bb',
                                                                        marginRight: 10
                                                                    }}>{index >= 9 ? index + 1 : `0${index + 1}`}</span>
                                                                    <span style={{ position: 'relative' }}><img
                                                                        style={{ width: 48, height: 48 }} alt='图片'
                                                                        src={`${item.song.album.picUrl}?param=48y48&quality=100`}/><Icon
                                                                        type="play-circle" style={{
                                                                        position: 'absolute',
                                                                        top: '0px',
                                                                        right: '13px',
                                                                        fontSize: '20px',
                                                                        color: 'white',
                                                                        cursor: 'pointer'
                                                                    }}/></span>
                                                                </div>}
                                                                title={<div><span>{item.song.name}</span><span style={{
                                                                    color: '#b7b9bb',
                                                                    fontSize: '12px'
                                                                }}>{item.song.alias.length > 0 && `（${item.song.alias.join('')}）`}</span>
                                                                </div>}
                                                                description={<div><span style={{
                                                                    cursor: 'pointer',
                                                                    verticalAlign: 'center'
                                                                }}>{item.song.mvid && <Icon type="youtube" style={{
                                                                    color: '#903030',
                                                                    marginRight: 10,
                                                                    fontSize: '18px',
                                                                    lineHeight: '18px'
                                                                }}/>}</span>{item.song.artists.map(item => item.name).join('/')}
                                                                </div>}
                                                            />
                                                        </List.Item>
                                                    ) : (
                                                        <List.Item.Meta></List.Item.Meta>
                                                    )
                                                )}
                                            />
                                        </Col>
                                    </Fragment>
                                ) : ''
                            }
                        </Row>
                    </Card>
                    <Card title="推荐MV" bordered={false} headStyle={{ padding: 0 }} extra={<a href='/#'>更多 ></a>}
                          bodyStyle={{ padding: '10px 0 20px 0' }}>
                        <Row gutter={20}>
                            {
                                mv.map((item, index) => (
                                    <Col span={6} key={item.id}>
                                        <Card cover={<div style={{ position: 'relative', minHeight: 212 }}>
                                            <img alt={item.name} src={`${item.picUrl}?param=352y212`}/>
                                            <div className='cameraIconCotainer'>
                                                <Icon type="video-camera"/>
                                                {item.playCount}
                                            </div>
                                        </div>}
                                              bordered={false} bodyStyle={{ padding: '10px 0 0 0' }}
                                              style={{ cursor: 'pointer', position: 'relative' }}
                                              className='songListCard'
                                        >
                                            <div className='hangInfo'>
                                                {item.copywriter}
                                            </div>
                                            <div>{item.name}</div>
                                            <div
                                                style={{ color: '#b7b9bb' }}>{item.artists.map(item => item.name).join('/')}</div>
                                        </Card>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Card>
                    <Card title="主播电台" bordered={false} headStyle={{ padding: 0 }} extra={<a href='/#'>更多 ></a>}
                          bodyStyle={{ padding: '10px 0 20px 0' }}>
                        <Row gutter={20}>
                            {
                                djprogram.map((item, index) => (
                                    index < 6 && (
                                        <Col span={4} key={item.id}>
                                            <Card cover={<img alt={item.name} src={`${item.picUrl}?param=226y137`}/>}
                                                  bordered={false} bodyStyle={{ padding: '10px 0 0 0' }}
                                                  style={{ cursor: 'pointer', position: 'relative' }}
                                                  className='songListCard'
                                            >
                                                {item.copywriter}
                                            </Card>
                                        </Col>
                                    )
                                ))
                            }
                        </Row>
                    </Card>
                </div>
            </Fragment>
        );
    }
}

export default PersonalityRecommendation;
