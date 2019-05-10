import React, {Component, Fragment} from 'react';
import {Row, Col, Button, Avatar} from 'antd';
import moment from 'moment';

class SongListHeader extends Component {

    state = {
        info: this.props.songHeaderInfo || null
    };

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            info: nextProps.songHeaderInfo || null,
        });
    }

    componentWillUnmount() {

    }

    render() {
        const { info } = this.state;
        if (!info) return <div/>;
        return (
            <Fragment>
                <Row gutter={20}>
                    <Col span={6}>
                        <img src={`${info.coverImgUrl}?param=200y200`} alt=''/>
                    </Col>
                    <Col span={18}>
                        <div>
                            {info.name}
                        </div>
                        <div>
                            <Avatar src={info.creator.avatarUrl}/>
                            <span>{info.creator.nickname}</span>
                            <span>{moment(info.createTime).format('YYYY-MM-DD')}</span>
                        </div>
                        <div>
                            <Button>播放全部</Button>
                            <Button>收藏</Button>
                            <Button>分享</Button>
                            <Button>下载</Button>
                        </div>
                        <div>
                            标签：{info.tags.join('/')}
                        </div>
                        <div>
                            简介：{info.description}
                        </div>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default SongListHeader;
