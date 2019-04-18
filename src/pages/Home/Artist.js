import React, {Component, Fragment} from 'react';
import {Icon, Row, Col, Tag, Spin, Card, Pagination} from "antd";
import axios from '../../request/index';
import InfiniteScroll from 'react-infinite-scroller';

class Artist extends Component {
    constructor (props) {
        super(props);
        this.state = {
            spinning: false,
            artists: [],
            categoryChecked: 5001,
            filterTagChecked: '',
            hasMore: true,
        }
    }

    componentWillMount () {
    }

    componentDidMount () {
        console.log(document.querySelector('#mainContent'));
        this.setState({
            spinning: true
        });
        axios.get('artist/list', { params: { cat: this.state.categoryChecked } }).then(response => {
            this.setState({
                artists: response.data.artists,
                spinning: false
            })
        })
    }

    componentWillUnmount () {

    }

    handleCategoryTagChange (tag, checked) {
        this.setState({
            spinning: true,
            categoryChecked: tag.code,
            filterTagChecked: tag.code === 5001 ? undefined : this.state.filterTagChecked
        });
        axios.get('artist/list', { params: { cat: tag.code, initial: this.state.filterTagChecked } }).then(response => {
            this.setState({
                artists: response.data.artists,
                spinning: false
            })
        })
    }

    handleFilterTagChange (tag, checked) {
        const filte = checked ? tag : undefined;
        this.setState({
            spinning: true,
            filterTagChecked: filte
        });

        axios.get('artist/list', { params: { cat: this.state.categoryChecked, initial: filte } }).then(response => {
            this.setState({
                artists: response.data.artists,
                spinning: false
            })
        })
    }

    accountClick (accountId) {
        console.log(accountId)
    }

    loadMore (page) {
        console.log(page);
        this.setState({
            spinning: true,
        });
        let data = this.state.artists;
        axios.get('artist/list', {
            params: {
                cat: this.state.categoryChecked,
                initial: this.state.filterTagChecked,
                offset: (page - 1) * 30
            }
        }).then(response => {
            this.setState({
                artists: data.concat(response.data.artists),
                spinning: false
            })
        })
    }

    render () {
        const CheckableTag = Tag.CheckableTag;
        const { spinning, categoryChecked, filterTagChecked, artists, hasMore } = this.state;
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
                            <div style={{
                                position: 'relative',
                                minHeight: 231,
                                border: '1px solid #e8e8e8'
                            }}>
                                <img alt={item.name} src={`${item.picUrl}?param=230y244`}/>
                            </div>
                        }
                        bordered={false} bodyStyle={{ padding: '10px 0 10px 0' }}
                        style={{ cursor: 'pointer', position: 'relative', marginBottom: '10px' }}
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
                <Row style={{ marginTop: 8 }}>
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
                        <Row style={{ marginTop: 8 }}>
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
                    <Row type='flex' style={{ marginTop: 15 }} gutter={16}>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.loadMore}
                            hasMore={!spinning && hasMore}
                            initialLoad={false}
                            getScrollParent={() => document.querySelector('#mainContent')}
                        >
                            {
                                getArtists()
                            }
                        </InfiniteScroll>
                    </Row>
                </Spin>
            </Fragment>
        );
    }
}

export default Artist;
