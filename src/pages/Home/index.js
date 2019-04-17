import React, {Component, lazy, Suspense} from 'react';
import {Tabs, Spin} from "antd";
import {Route} from 'react-router-dom';
import {createHashHistory} from 'history';
import './index.less';

const PersonalityRecommendation = lazy(() => import('./PersonalityRecommendation'));
const SongList = lazy(() => import('./SongList'));
const TopList = lazy(() => import('./TopList'));
const history = createHashHistory();

class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            defaultKey: history.location.pathname,
            activeKey: history.location.pathname,
            unListenLocation: undefined,
        }
    }

    componentWillMount () {
    }

    componentDidMount () {
        this.state.unListenLocation = history.listen((location, action) => {
            this.setState({
                activeKey: location.pathname
            })
        })
    }

    componentWillUnmount () {
        this.state.unListenLocation();
    }

    TabsChange (activeKey) {
        history.push(activeKey);
    }

    render () {
        const { defaultKey, activeKey } = this.state;
        return (
            <div style={{ padding: '10px 100px' }} className='HomeTabs'>
                <Tabs onChange={this.TabsChange.bind(this)} tabBarStyle={{ textAlign: 'center' }} activeKey={activeKey}
                      defaultActiveKey={defaultKey}>
                    <Tabs.TabPane tab="个性推荐" key="/Personalize" className='personalized'>
                        <Suspense fallback={<Spin tip='加载中...' spinning={true}/>}>
                            <Route path='/Personalize' component={PersonalityRecommendation} exact/>
                        </Suspense>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="歌单" key="/Personalize/SongList" className='songlist'>
                        <Suspense fallback={<Spin tip='加载中...' spinning={true}/>}>
                            <Route path='/Personalize/SongList' component={SongList}/>
                        </Suspense>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="排行榜" key="/Personalize/TopList" className='topList'>
                        <Suspense fallback={<Spin tip='加载中...' spinning={true}/>}>
                            <Route path='/Personalize/TopList' component={TopList}/>
                        </Suspense>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
}

export default Home;
