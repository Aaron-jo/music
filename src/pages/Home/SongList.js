import React, {Component, Fragment} from 'react';
import {Button, Popover, Icon, Radio, Row, Col, Tag, Spin, Card, Pagination} from "antd";
import {connect} from 'react-redux';
import axios from '../../request/index';
import _ from 'lodash';
import './index.less';
import {setCurrentPlayIndex, setCurrentSongList} from "../../reduxModal/actions/getCurrentPlayList";
import playMusic from '@/commo/playMusic';
import {createHashHistory} from 'history';

const history = createHashHistory();

class SongList extends Component {
    state = {
        catList: null,
        hotTag: [],
        hotTagChecked: [],
        playlist: {},
        limit: 48,
        currentPage: 1,
        spinning: false,
        loadingMore: false,
        loadTimes: 1,
        category: undefined,
        radioCurrentValue: '',
        popoverVisible: false,
    };

    componentWillMount() {

    }

    componentDidMount() {
        this.setState({
            spinning: true
        });
        axios.get('/playlist/catlist').then((response) => {
            this.setState({
                catList: response.data,
            })
        });
        axios.get('/playlist/hot').then((response) => {
            this.setState({
                hotTag: response.data.tags
            })
        });
        axios.get('/top/playlist', { params: { limit: this.state.limit } }).then((response) => {
            this.setState({
                playlist: response.data,
                spinning: false
            })
        });
    }

    componentWillUnmount() {

    }

    handleTagChange(tag, checked) {
        const checkedTag = checked ? tag.name : undefined;
        const nextSelectedTags = [];
        checked && nextSelectedTags.push(checkedTag);
        this.setState({
            hotTagChecked: nextSelectedTags,
            spinning: true,
            category: checkedTag,
            radioCurrentValue: checkedTag,
            currentPage: 1,
        });
        axios.get('/top/playlist', { params: { limit: this.state.limit, cat: checkedTag } }).then((response) => {
            this.setState({
                playlist: response.data,
                spinning: false
            })
        });
    }

    onRadioChange(e) {
        console.log(e.target);
        this.setState({
            radioCurrentValue: e.target.value,
            category: e.target.value,
            popoverVisible: false,
            currentPage: 1
        });
        axios.get('/top/playlist', { params: { limit: this.state.limit, cat: e.target.value } }).then((response) => {
            this.setState({
                playlist: response.data,
                spinning: false,
                hotTagChecked: [e.target.value],
            })
        });
    }

    onPaginationChange(page) {
        document.querySelector('#categoryRow').scrollIntoView(false);
        this.setState({
            currentPage: page,
            spinning: true,
        });
        axios.get('/top/playlist', {
            params: {
                limit: this.state.limit,
                offset: (page - 1) * this.state.limit,
                cat: this.state.category
            }
        }).then((response) => {
            this.setState({
                playlist: response.data,
                spinning: false,
            });
        });
    }

    play(e, payLoad) {
        e.stopPropagation();
        axios.get('/playlist/detail', { params: { id: payLoad.id } }).then(response => {
            const tracks = response.data.playlist.tracks;
            this.props.setCurrentSongList(tracks);
            this.props.setCurrentPlayIndex(0);
            playMusic(tracks[0].id)
        });
    }

    // 点击进入歌单详情
    gotoSongListDetail(id) {
        history.push(`/SongListDetail?id=${id}`)
    }

    render() {
        const RadioButton = Radio.Button;
        const RadioGroup = Radio.Group;
        const CheckableTag = Tag.CheckableTag;
        const { catList, hotTag, hotTagChecked, playlist, spinning, currentPage, radioCurrentValue, popoverVisible } = this.state;

        const getContent = () => {
            if (!catList) return <div>全部歌单</div>;
            let categories = [];
            for (let cate in catList.categories) {
                categories.push(catList.categories[cate])
            }
            return (
                <RadioGroup name='categories' buttonStyle='solid' value={radioCurrentValue} defaultValue=''
                            onChange={this.onRadioChange.bind(this)}>
                    <RadioButton value=''
                                 style={{
                                     borderRadius: 0,
                                     width: '100%',
                                     textAlign: 'center'
                                 }}>
                        全部歌单
                    </RadioButton>
                    {
                        categories.map((category, categoryIndex) => {
                            return (
                                <Row key={category} style={{ width: 550, marginTop: 15 }}>
                                    <Col span={4}>{category}</Col>
                                    <Col span={20}>
                                        {
                                            catList.sub.map((item, index) => (
                                                item.category === categoryIndex ?
                                                    (<RadioButton key={item.name} className='categoryRadio'
                                                                  value={item.name}>
                                                        {item.name}
                                                    </RadioButton>) : ''
                                            ))
                                        }
                                    </Col>
                                </Row>
                            );
                        })
                    }
                </RadioGroup>
            )
        };

        return (
            <Fragment>
                <Spin spinning={spinning} tip='加载中...'>
                    <Row id='categoryRow'>
                        <Popover content={getContent()} title="添加标签" trigger="click" overlayClassName='categoryPop'
                                 placement='bottomLeft' visible={popoverVisible}>
                            <Button
                                onClick={() => {
                                    this.setState({
                                        popoverVisible: !this.state.popoverVisible
                                    })
                                }}
                                onBlur={() => {
                                    setTimeout(() => {
                                        this.setState({
                                            popoverVisible: false
                                        })
                                    }, 200)
                                }}
                            >
                                {radioCurrentValue || '全部歌单'} <Icon type="down"/>
                            </Button>
                        </Popover>
                    </Row>
                    <Row style={{ marginTop: 15 }}>
                        <span>热门标签：</span>
                        {
                            hotTag.map(tag => (
                                <CheckableTag
                                    key={tag.id}
                                    checked={hotTagChecked.indexOf(tag.name) > -1}
                                    onChange={checked => this.handleTagChange(tag, checked)}
                                >
                                    {tag.name}
                                </CheckableTag>
                            ))
                        }
                    </Row>
                    <Row type='flex' style={{ marginTop: 15 }} gutter={16}>
                        {
                            playlist.playlists && playlist.playlists.map((item, index) => (
                                <Col span={4} key={index}>
                                    <Card
                                        cover={
                                            <div className='cover-container' style={{
                                                position: 'relative',
                                                minHeight: 231,
                                                border: '1px solid #e8e8e8'
                                            }}>
                                                <img alt={item.name} src={`${item.coverImgUrl}?param=230y244`}/>
                                                <div className='cameraIconCotainer'>
                                                    <Icon type="customer-service"/>
                                                    {item.playCount > 100000 ? _.round(item.playCount / 10000) + '万' : item.playCount}
                                                </div>
                                                <div className='playIconInImg' style={{ bottom: 15 }}
                                                     onClick={(e) => this.play(e, item)}>
                                                    <Icon type="caret-right"/>
                                                </div>
                                            </div>
                                        }
                                        bordered={false} bodyStyle={{ padding: '10px 0 10px 0' }}
                                        style={{ cursor: 'pointer', position: 'relative' }}
                                        className='songListCard'
                                        onClick={this.gotoSongListDetail.bind(this, item.id)}
                                    >
                                        {item.name}
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                    <Row style={{ marginTop: 15, textAlign: 'center' }}>
                        <Pagination total={playlist.total} current={currentPage}
                                    onChange={this.onPaginationChange.bind(this)}/>
                    </Row>
                </Spin>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        ...state.currentPlayList
    }), {
        setCurrentPlayIndex,
        setCurrentSongList,
    }
)(SongList);
