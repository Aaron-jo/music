import React, {Component, Fragment} from 'react';
import {Icon, Row, Col, Tag, Spin, Card} from "antd";
import axios from '@/request/index';
import {createHashHistory} from 'history';

class Artist extends Component {
    constructor(props) {
        super(props);
        this.limit = 30;
        this.mainContent = document.querySelector('#mainContent');
    }

    state = {
        spinning: false,
        artists: [],
        categoryChecked: 5001,
        filterTagChecked: '',
        pageNum: 0,
        scrollHasMore: true,
    };

    componentWillMount() {
    }

    loadMore = () => {
        if (!this.state.scrollHasMore) return;
        let scrollTop = this.mainContent.scrollTop;
        if (this.mainContent.scrollHeight === this.mainContent.clientHeight + scrollTop) {
            this.setState((perState, props) => ({pageNum: perState.pageNum + 1, spinning: true}), () => {
                axios.get('artist/list', {
                    params: {
                        limit: this.limit,
                        cat: this.state.categoryChecked,
                        initial: this.state.filterTagChecked,
                        offset: this.state.pageNum * 30
                    }
                }).then(response => {
                    this.setState({
                        artists: this.state.artists.concat(response.data.artists),
                        scrollHasMore: response.data.more,
                        spinning: false
                    })
                })
            })
        }
    };

    componentDidMount() {
        this.mainContent.addEventListener('scroll', this.loadMore);
        this.setState({
            spinning: true
        });
        axios.get('artist/list', {params: {limit: this.limit, cat: this.state.categoryChecked}}).then(response => {
            this.setState({
                artists: response.data.artists,
                spinning: false,
                scrollHasMore: response.data.more,
            })
        })
    }

    componentWillUnmount() {
        this.mainContent.removeEventListener('scroll', this.loadMore)
    }

    handleCategoryTagChange(tag, checked) {
        this.setState({
            spinning: true,
            pageNum: 0,
            categoryChecked: tag.code,
            filterTagChecked: tag.code === 5001 ? undefined : this.state.filterTagChecked
        });
        axios.get('artist/list', {
            params: {
                limit: this.limit,
                cat: tag.code,
                initial: this.state.filterTagChecked
            }
        }).then(response => {
            this.setState({
                artists: response.data.artists,
                scrollHasMore: response.data.more,
                spinning: false
            })
        })
    }

    handleFilterTagChange(tag, checked) {
        const filter = checked ? tag : undefined;
        this.setState({
            spinning: true,
            pageNum: 0,
            filterTagChecked: filter
        });

        axios.get('artist/list', {
            params: {
                limit: this.limit,
                cat: this.state.categoryChecked,
                initial: filter
            }
        }).then(response => {
            this.setState({
                artists: response.data.artists,
                scrollHasMore: response.data.more,
                spinning: false
            })
        })
    }

    accountClick(accountId) {
        console.log(accountId)
    }

    getArtistDetail(id) {
        const history = createHashHistory();
        history.push(`/ArtisteDetail?id=${id}`)
    }

    render() {
        const CheckableTag = Tag.CheckableTag;
        const {spinning, categoryChecked, filterTagChecked, artists, scrollHasMore} = this.state;
        const category = [
            {
                code: 5001,
                value: '入驻歌手',
                divider: true
            }, {
                code: 1001,
                value: '华语男歌手'
            }, {
                code: 1002,
                value: '华语女歌手'
            }, {
                code: 1003,
                value: '华语组合/乐队',
                divider: true
            }, {
                code: 2001,
                value: '欧美男歌手'
            }, {
                code: 2002,
                value: '欧美女歌手'
            }, {
                code: 2003,
                value: '欧美组合/乐队',
                divider: true
            }, {
                code: 6001,
                value: '日本男歌手'
            }, {
                code: 6002,
                value: '日本女歌手'
            }, {
                code: 6003,
                value: '日本组合/乐队',
                divider: true
            }, {
                code: 7001,
                value: '韩国男歌手'
            }, {
                code: 7002,
                value: '韩国女歌手'
            }, {
                code: 7003,
                value: '韩国组合/乐队',
                divider: true
            }, {
                code: 4001,
                value: '其他男歌手'
            }, {
                code: 4002,
                value: '其他女歌手'
            }, {
                code: 4003,
                value: '其他组合/乐队'
            }
        ];
        const filter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        const getArtists = () => {
            return artists && artists.map((item, index) => (
                <Col span={4} key={item.id}>
                    <Card
                        cover={
                            <div
                                style={{
                                    position: 'relative',
                                    minHeight: 231,
                                    border: '1px solid #e8e8e8'
                                }}
                                onClick={(e) => this.getArtistDetail(item.id)}
                            >
                                <img alt={item.name} src={`${item.picUrl}?param=230y244`}/>
                            </div>
                        }
                        bordered={false} bodyStyle={{padding: '10px 0 10px 0'}}
                        style={{cursor: 'pointer', position: 'relative', marginBottom: '10px'}}
                        className='songListCard'
                    >
                        <span>{item.name}</span>
                        {
                            item.accountId ? (
                                <div
                                    style={{
                                        float: 'right',
                                        borderRadius: '50%',
                                        width: 20,
                                        height: 20,
                                        border: '1px solid #c62f2f',
                                        color: '#c62f2f',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    onClick={(e) => this.accountClick(item.accountId)}
                                >
                                    <Icon type="user"/>
                                </div>
                            ) : ''
                        }
                    </Card>
                </Col>
            ))
        };
        return (
            <Fragment>
                <Row style={{marginTop: 8}}>
                    <span>分类：</span>
                    {
                        category.map(item => (
                            <Fragment key={item.code}>
                                <CheckableTag
                                    checked={categoryChecked === item.code}
                                    onChange={checked => this.handleCategoryTagChange(item, checked)}
                                >
                                    {item.value}
                                </CheckableTag>
                            </Fragment>
                        ))
                    }
                </Row>
                {
                    categoryChecked !== 5001 ? (
                        <Row style={{marginTop: 8}}>
                            <span>筛选：</span>
                            {
                                filter.map(item => (
                                    <CheckableTag
                                        key={item}
                                        checked={filterTagChecked === item}
                                        onChange={checked => this.handleFilterTagChange(item, checked)}
                                    >
                                        {item}
                                    </CheckableTag>
                                ))
                            }
                        </Row>
                    ) : ''
                }
                <Spin spinning={spinning}>
                    <Row type='flex' style={{marginTop: 15}} gutter={16}>
                        {
                            getArtists()
                        }
                    </Row>
                </Spin>
                {
                    !scrollHasMore && (
                        <Row type='flex' style={{justifyContent: 'center'}}>
                            <span>没有更多了</span>
                        </Row>
                    )
                }
            </Fragment>
        );
    }
}

export default Artist;
