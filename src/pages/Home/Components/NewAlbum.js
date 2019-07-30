import React, {Component, Fragment} from 'react';
import {Row, Col, Spin, Card, Pagination, Icon} from "antd";
import axios from '@/request/';
import {connect} from 'react-redux';
import {setCurrentSongLit, setCurrentPlayIndex} from '@/reduxModal/actions/getCurrentPlayList';
import playMusic from '@/commo/playMusic';

class NewAlbum extends Component {
    state = {
        albums: [],
        total: 0,
        currentPage: 1,
        spinning: true
    };

    componentWillMount () {
    }

    componentDidMount () {
        this.getData()
    }

    componentWillUnmount () {

    }

    getData (page = 1) {
        this.setState({
            spinning: true
        });
        axios.get('/top/album', {
            params: { limit: 30, offset: (page - 1) * 30 }
        }).then((response) => {
            this.setState({
                albums: response.data.albums,
                total: response.data.total,
                spinning: false
            })
        }).catch((error) => {
            console.log(error);
            this.setState({
                spinning: false
            })
        })
    }

    onPaginationChange (page) {
        this.setState({
            currentPage: page,
        });
        this.getData(page)
    }

    play (id) {
        axios.get('/album', { params: { id: id } }).then((response) => {
            this.props.setCurrentPlayIndex(0);
            this.props.setCurrentSongLit(response.data.songs);
            playMusic(response.data.songs[0].id)
        })
    }

    render () {
        const { albums, spinning, total, currentPage } = this.state;
        return (
            <Fragment>
                <Spin spinning={spinning} tip='加载中...'>
                    <Row type='flex' gutter={20}>
                        {
                            albums.map((item, index) => (
                                <Col span={4} key={item.id}>
                                    <Card
                                        cover={
                                            <div className='cover-container' style={{
                                                position: 'relative',
                                                minHeight: 215,
                                                border: '1px solid #e8e8e8'
                                            }}>
                                                <img alt={item.name} src={`${item.picUrl}?param=210y215`}/>
                                                <div className='playIconInImg' onClick={this.play.bind(this, item.id)}>
                                                    <Icon type="caret-right"/>
                                                </div>
                                            </div>
                                        }
                                        bordered={false} bodyStyle={{ padding: '10px 0 10px 0' }}
                                        style={{ cursor: 'pointer', position: 'relative', marginBottom: '10px' }}
                                        className='songListCard'
                                    >
                                        <div>{item.name}</div>
                                        <div style={{
                                            fontSize: '12px',
                                            color: '#b7b9bb'
                                        }}>{item.artists.map(item => item.name).join('/')}</div>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                    <Row style={{ marginTop: 15, textAlign: 'center' }}>
                        <Pagination total={total} current={currentPage}
                                    onChange={this.onPaginationChange.bind(this)}/>
                    </Row>
                </Spin>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        currentSongList: state.currentPlayList,
    }), {
        setCurrentSongLit,
        setCurrentPlayIndex
    }
)(NewAlbum);
