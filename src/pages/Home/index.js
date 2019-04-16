import React, { Component, lazy, Suspense } from 'react';
import { Tabs, Spin } from "antd";
import './index.less';

const PersonalityRecommendation = lazy(() => import('./PersonalityRecommendation'));
const SongList = lazy(() => import('./SongList'))

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    TabsChange(activeKey) {
        switch (activeKey) {
            case '1':

                break;
            case '2':

                break;
            default:
                break;
        }
    }

    render() {
        return (
            <div style={{ padding: '10px 100px' }} className='HomeTabs'>
                <Tabs onChange={this.TabsChange.bind(this)} tabBarStyle={{ textAlign: 'center' }} defaultActiveKey='2'>
                    <Tabs.TabPane tab="个性推荐" key="1" className='personalized'>
                        <Suspense fallback={<Spin tip='加载中...' spinning={true} />}>
                            <PersonalityRecommendation />
                        </Suspense>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="歌单" key="2" className='songlist'>
                        <Suspense fallback={<Spin tip='加载中...' spinning={true} />}>
                            <SongList />
                        </Suspense>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Home;
