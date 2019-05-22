import React, { Component, Fragment } from 'react';
import { Row, Col, Input, Avatar, Icon, Popover, Button, Divider } from "antd";
import logo from '@/static/image/网易云音乐.png'
import './index.less';

class Header extends Component {

    state = {
        data: null
    }

    componentWillMount() {
        
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }


    getPopoverContent() {
        const elem = (
            <Fragment>
                <div style={{ width: 270, borderBottom: '1px solid #e8e8e8' }}>
                    <div style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', justifyItems: 'center' }}>
                            <span>
                                <Avatar icon="user" size={40} />
                                <span style={{ margin: '0 10px' }}>Mr-Z提线木偶</span>
                            </span>
                            <Button className='punchIn' icon="smile">签到</Button>
                        </div>
                        <div className='userInfo'>
                            <div>
                                <div className='number'>1</div>
                                <div>动态</div>
                            </div>
                            <Divider type='vertical' className='divider' />
                            <div>
                                <div className='number'>8</div>
                                <div>关注</div>
                            </div>
                            <Divider type='vertical' className='divider' />
                            <div>
                                <div className='number'>1</div>
                                <div>粉丝</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{borderBottom: '1px solid #e8e8e8'}}>
                    <div className='userinfoMenu'>
                        <span><Icon type="customer-service" />会员中心</span>
                        <Icon type="right" className='righIcon' />
                    </div>
                    <div className='userinfoMenu'>
                        <span><Icon type="crown" />等级</span>
                        <Icon type="right" className='righIcon' />
                    </div>
                    <div className='userinfoMenu'>
                        <span><Icon type="shopping-cart" />商城</span>
                        <Icon type="right" className='righIcon' />
                    </div>
                </div>
                <div style={{borderBottom: '1px solid #e8e8e8'}}>
                    <div className='userinfoMenu'>
                        <span><Icon type="setting" />个人信息设置</span>
                        <Icon type="right" className='righIcon' />
                    </div>
                    <div className='userinfoMenu'>
                        <span><Icon type="mobile" />绑定社交账号</span>
                        <Icon type="right" className='righIcon' />
                    </div>
                </div>
                <div>
                    <div className='userinfoMenu'>
                        <span><Icon type="poweroff" />退出登录</span>
                    </div>
                </div>
            </Fragment>
        )
        return elem;
    }

    render() {
        const Search = Input.Search;
        return (
            <Fragment>
                <Row style={{ background: '#c62f2f', width: '100vw', height: 64 }}>
                        <Col span={3} style={{fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 'bold', fontSize: 20, color: 'white', textAlign: 'center'}}>
                            <img src={logo} alt='' style={{width: 40, height: 40, marginRight: 10}} />网易云音乐
                        </Col>
                        <Col span={21} className='headerRightCol'>
                            <div>
                                <Search
                                    placeholder="搜索音乐，视频，歌词，电台"
                                    onSearch={value => console.log(value)}
                                    className='search'
                                />
                            </div>
                            <div className='rightdiv'>
                                <Avatar icon="user" className='avatar' />
                                <Popover
                                    overlayClassName='userinfoPop'
                                    trigger='click'
                                    content={this.getPopoverContent()}
                                >
                                    <span className='nickName'>Mr-Z提线木偶 <Icon type="caret-down" /></span>
                                </Popover>
                                <span><Icon type="skin" /></span>
                                <span><Icon type="mail" /></span>
                                <span><Icon type="setting" /></span>
                            </div>
                        </Col>
                    </Row>
            </Fragment>
        );
    }
}

export default Header;