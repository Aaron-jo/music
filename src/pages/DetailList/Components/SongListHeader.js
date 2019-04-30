import React, {Component, Fragment} from 'react';
import {Row, Col, Button} from 'antd';

class SongListHeader extends Component {

    state = {
        info: null
    };

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            info: nextProps.songHeaderInfo || null,
        })
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <Fragment>
                <Row gutter={20}>
                    <Col span={6}>
                        <img src='' alt=''/>
                    </Col>
                    <Col span={18}>
                        <div>
                            情绪调节剂：生活是一曲小调
                        </div>
                        <div>
                            周云 2018-4-30创建
                        </div>
                        <div>
                            <Button>播放全部</Button>
                            <Button>收藏</Button>
                            <Button>分享</Button>
                            <Button>下载</Button>
                        </div>
                        <div>
                            标签：欧美/流行
                        </div>
                        <div>
                            简介：我理想的生活状态...
                        </div>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default SongListHeader;
