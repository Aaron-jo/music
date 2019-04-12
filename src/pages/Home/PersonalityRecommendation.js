import React, { Component, Fragment } from 'react';
import { Carousel, Card, Row, Col } from "antd";
import './index.less';

class PersonalityRecommendation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }



    render() {
        return (
            <Fragment>
                <div style={{ width: '100%', textAlign: 'center' }}>
                    <Carousel autoplay>
                        <div style={{ color: 'red' }}><h3>1</h3></div>
                        <div style={{ color: 'red' }}><h3>2</h3></div>
                        <div style={{ color: 'red' }}><h3>3</h3></div>
                        <div style={{ color: 'red' }}><h3>4</h3></div>
                    </Carousel>
                </div>
                <div style={{ marginTop: 20 }}>
                    <Card title="推荐歌单" bordered={false} headStyle={{ padding: 0 }} extra={<a>更多 ></a>} bodyStyle={{ padding: '24px 0 0 0' }}>
                        <Row gutter={20}>
                            <Col span={6}>
                                <Card cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                    bordered={false} bodyStyle={{ padding: '10px 0 0 0' }}
                                    style={{ cursor: 'pointer', position: 'relative' }}
                                    className='songListCard'
                                >
                                    <div className='hangInfo'>
                                        悬挂信息
                                    </div>
                                    一种支持封面、头像、标题和描述信息的卡片。
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                    bordered={false} bodyStyle={{ padding: '10px 0 0 0' }}
                                    style={{ cursor: 'pointer' }}
                                    className='songListCard'
                                >
                                    <div className='hangInfo'>
                                        悬挂信息
                                    </div>
                                    一种支持封面、头像、标题和描述信息的卡片。
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                    bordered={false} bodyStyle={{ padding: '10px 0 0 0' }}
                                    style={{ cursor: 'pointer' }}
                                    className='songListCard'
                                >
                                    <div className='hangInfo'>
                                        悬挂信息
                                    </div>
                                    一种支持封面、头像、标题和描述信息的卡片。
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                    bordered={false} bodyStyle={{ padding: '10px 0 0 0' }}
                                    style={{ cursor: 'pointer' }}
                                    className='songListCard'
                                >
                                    <div className='hangInfo'>
                                        悬挂信息
                                    </div>
                                    一种支持封面、头像、标题和描述信息的卡片。
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                    bordered={false} bodyStyle={{ padding: '10px 0 0 0' }}
                                    style={{ cursor: 'pointer' }}
                                    className='songListCard'
                                >
                                    <div className='hangInfo'>
                                        悬挂信息
                                    </div>
                                    一种支持封面、头像、标题和描述信息的卡片。
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </Fragment>
        );
    }
}

export default PersonalityRecommendation;