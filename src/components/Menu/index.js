import React, { Component } from 'react';
import { Menu, Icon } from "antd";
import './Menu.less'
const { SubMenu } = Menu;

class NetMenu extends Component {
    render() {
        return (
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}
                mode='inline'
                className='menu'
            >
                <SubMenu key="sub1" title={<span>推荐</span>}>
                    <Menu.Item key="1">
                        <Icon type="customer-service" />
                        发现音乐
                    </Menu.Item><Menu.Item key="2">
                        <Icon type="customer-service" />
                        私人FM
                    </Menu.Item><Menu.Item key="3">
                        <Icon type="customer-service" />
                        视频
                    </Menu.Item><Menu.Item key="4">
                        <Icon type="customer-service" />
                        朋友
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span>我的音乐</span>}>
                    <Menu.Item key="5">
                        <Icon type="customer-service" />
                        本地音乐
                    </Menu.Item><Menu.Item key="6">
                        <Icon type="customer-service" />
                        下载管理
                    </Menu.Item><Menu.Item key="7">
                        <Icon type="customer-service" />
                        我的音乐云盘
                    </Menu.Item><Menu.Item key="8">
                        <Icon type="customer-service" />
                        我的收藏
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title={<span>创建的歌单</span>}>
                    <Menu.Item key="9">
                        <Icon type="customer-service" />
                        我喜欢的音乐
                    </Menu.Item>
                    <Menu.Item key="10">
                        <Icon type="customer-service" />
                        指弹轻音乐
                    </Menu.Item>
                    <Menu.Item key="11">
                        <Icon type="customer-service" />
                        我的音乐云盘
                    </Menu.Item>
                    <Menu.Item key="12">
                        <Icon type="customer-service" />
                        我的收藏
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" title={<span>收藏的歌单</span>}>
                    <Menu.Item key="13">
                        <Icon type="customer-service" />
                        2018欧美精选节奏｜满载而归的音乐盛宴
                    </Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}

export default NetMenu;
