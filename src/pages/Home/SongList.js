import React, {Component, Fragment} from 'react';
import {Button, Popover, Icon, Radio, Row, Col, Tag, Spin, Card} from "antd";
import axios from '../../request/index';
import './index.less';

class SongList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            catlist: null,
            hotTag: [],
            hotTagChecked: [],
            playlist: {},
            limit: 18,
            spinning: false,
            loadingMore: false,
            loadTimes: 1,
            category: '',
            radioCurrentValue: '',
            popoverVisible: false,
        }
    }

    componentWillMount () {

    }

    componentDidMount () {
        this.setState({
            spinning: true
        });
        axios.get('/playlist/catlist').then((response) => {
            this.setState({
                catlist: response.data,
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

    // componentWillReceiveProps(nextProps) {
    //
    // }

    // shouldComponentUpdate(nextProps, nextState) {

    // }

    // componentWillUpdate(nextProps, nextState) {
    //
    // }
    //
    // componentDidUpdate(prevProps, prevState) {
    //
    // }

    componentWillUnmount () {

    }

    handleTagChange (tag, checked) {
        const checkedTag = checked ? tag.name : undefined;
        const nextSelectedTags = [];
        checked && nextSelectedTags.push(checkedTag);
        this.setState({
            hotTagChecked: nextSelectedTags,
            spinning: true,
            category: checkedTag,
            radioCurrentValue: checkedTag
        });
        axios.get('/top/playlist', { params: { limit: this.state.limit, cat: checkedTag } }).then((response) => {
            this.setState({
                playlist: response.data,
                spinning: false
            })
        });
    }

    onRadioChange (e) {
        this.setState({ radioCurrentValue: e.target.value, popoverVisible: false });
        axios.get('/top/playlist', { params: { limit: this.state.limit, cat: e.target.value } }).then((response) => {
            this.setState({
                playlist: response.data,
                spinning: false,
                hotTagChecked: [e.target.value],
            })
        });
    }

    onPaginationChange () {
        this.setState({
            loadingMore: true,
        });
        this.state.loadTimes += 1;
        axios.get('/top/playlist', {
            params: {
                limit: this.state.limit * this.state.loadTimes,
                cat: this.state.category
            }
        }).then((response) => {
            this.setState({
                playlist: response.data,
                loadingMore: false
            });
        });
    }

    render () {
        const RadioButton = Radio.Button;
        const RadioGroup = Radio.Group;
        const CheckableTag = Tag.CheckableTag;
        const { catlist, hotTag, hotTagChecked, playlist, spinning, loadingMore, radioCurrentValue, popoverVisible } = this.state;

        const getContent = () => {
            if (!catlist) return <div>全部歌单</div>;
            const allElem = (<RadioButton key='全部歌单' style={{
                borderRadius: 0,
                width: '100%',
                textAlign: 'center'
            }}>全部歌单</RadioButton>);
            let categories = [];
            for (let cate in catlist.categories) {
                categories.push(catlist.categories[cate])
            }
            return (
                <RadioGroup name='categories' buttonStyle='solid' value={radioCurrentValue}
                            onChange={this.onRadioChange.bind(this)}>
                    {allElem}
                    {
                        categories.map((category, categoryIndex) => {
                            return (
                                <Row key={category} style={{ width: 550, marginTop: 15 }}>
                                    <Col span={4}>{category}</Col>
                                    <Col span={20}>
                                        {
                                            catlist.sub.map((item, index) => (
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
                    <Row>
                        <Popover content={getContent()} title="添加标签" trigger="click" overlayClassName='categoryPop'
                                 placement='bottomLeft' visible={popoverVisible}>
                            <Button onClick={() => {
                                this.setState({
                                    popoverVisible: !this.state.popoverVisible
                                })
                            }}>{radioCurrentValue || '全部歌单'} <Icon type="down"/></Button>
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
                    <Row style={{ marginTop: 15, textAlign: 'center' }}>
                        {
                            loadingMore ? <Icon type="loading" style={{ fontSize: '30px', color: '#c62f2f' }}/> :
                                <Icon id='loadMore' type="cloud-download" style={{ fontSize: '30px', color: '#c62f2f' }}
                                      title='加载更多' onClick={this.onPaginationChange.bind(this)}/>
                        }
                    </Row>
                </Spin>
            </Fragment>
        );
    }
}

export default SongList;
