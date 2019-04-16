import React, {Component, Fragment} from 'react';
import {Button, Popover, Icon, Radio, Row, Col, Tag, Pagination, Card} from "antd";
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
            currentPage: 1,
            limit: 6
        }
    }

    componentWillMount () {

    }

    componentDidMount () {
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
                playlist: response.data
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

    handleTagChange (tag, checked) {
        const nextSelectedTags = [];
        checked && nextSelectedTags.push(tag);
        this.setState({
            hotTagChecked: nextSelectedTags
        })
    }

    onPaginationChange(page) {
        this.setState({
            currentPage: page
        });
        axios.get('/top/playlist', { params: { limit: this.state.limit } }).then((response) => {
            this.setState({
                playlist: response.data
            })
        });
    }

    render () {
        const RadioButton = Radio.Button;
        const RadioGroup = Radio.Group;
        const CheckableTag = Tag.CheckableTag;
        const { catlist, hotTag, hotTagChecked, playlist, currentPage } = this.state;

        function getContent () {
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
                <RadioGroup name='categories' buttonStyle='solid'>
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
        }

        return (
            <Fragment>
                <Row>
                    <Popover content={getContent()} title="添加标签" trigger="click" overlayClassName='categoryPop'
                             placement='bottomLeft'>
                        <Button>全部歌单 <Icon type="down"/></Button>
                    </Popover>
                </Row>
                <Row style={{ marginTop: 15 }}>
                    <span>热门标签：</span>
                    {
                        hotTag.map(tag => (
                            <CheckableTag
                                key={tag.id}
                                checked={hotTagChecked.indexOf(tag) > -1}
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
                                        <div style={{ position: 'relative', Height: 231, border: '1px solid #e8e8e8' }}>
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
                <Row style={{ marginTop: 15, textAlign: 'right' }}>
                    <Pagination total={playlist.total && playlist.total} current={currentPage} onChange={this.onPaginationChange.bind(this)}/>
                </Row>
            </Fragment>
        );
    }
}

export default SongList;
