import React, {Component, lazy, Suspense} from 'react';
import {connect} from 'react-redux';
import {Layout, Spin, Icon} from "antd";
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import NetMenu from "./components/Menu/";
import NetHeader from "./components/NetHeader/";
import './App.less';

// 路由懒加载--划重点：https://zh-hans.reactjs.org/docs/code-splitting.html

const {Header, Sider, Content, Footer} = Layout;
const Home = lazy(() => import('./pages/Home/index'));

class App extends Component {
    state = {
        data: true,
        isPaused: true,
    };

    componentWillMount() {
    }

    componentDidMount() {
        window.audio = document.getElementById('audio');
        window.audio.addEventListener('play', () => {
            console.log('play');
            this.setState({
                isPaused: false
            });
        });
        window.audio.addEventListener('timeupdate', () => {
            console.log('当前播放位置:', window.audio.currentTime);
            console.log('缓冲部分的 TimeRanges 对象:', window.audio.buffered);
            console.log('音频的长度:', window.audio.duration)
        });
        window.audio.addEventListener('pause', () => {
            console.log('pause');
            this.setState({
                isPaused: true
            });
        });
        window.audio.addEventListener('progress', () => {
            console.log('progress');
        });
        window.audio.addEventListener('ended', () => {
            console.log('ended')
        });
    }

    componentWillUnmount() {

    }

    playOrPause() {
        if (!this.props.currentPlayList.list.length > 0) return;
        if (this.state.isPaused) {
            window.audio.play()
        }else {
            window.audio.pause();
        }
        this.setState({
            isPaused: !this.state.isPaused
        });
    }

    preSong() {

    }

    nextSong() {

    }

    render() {
        const {data, isPaused} = this.state;
        return (
            <Layout>
                <Header style={{padding: 0}}>
                    <NetHeader/>
                </Header>
                <Layout>
                    <Sider className='menuWrapper'>
                        <NetMenu/>
                        <div className='playingSong'/>
                    </Sider>
                    <Content style={{backgroundColor: 'white', overflowY: 'auto', height: 'calc(100vh - 113px)'}}
                             id='mainContent'>
                        <Suspense
                            fallback={<Spin tip='加载中...' spinning={data} className='suspense-loading'/>}>
                            <Router>
                                <Switch>
                                    <Route exact path="/" render={() => (<Redirect to="/Personalize"/>)}/>
                                    <Route path='/Personalize' component={Home}/>
                                </Switch>
                            </Router>
                        </Suspense>
                    </Content>
                </Layout>
                <Footer className='footer' style={{borderTop: '1px solid #e8e8e8'}}>
                    <audio id='audio' autoPlay/>
                    <div className='audio-control'>
                        <div title='上一首（Ctr + Left）' onClick={this.preSong.bind(this)}><Icon type="step-backward"/>
                        </div>
                        <div title={isPaused ? '播放（Ctr + P）' : '暂停（Ctr + P）'} onClick={this.playOrPause.bind(this)}>
                            {
                                isPaused ? <Icon type="caret-right"/> :
                                    <Icon type="pause"/>
                            }
                        </div>
                        <div title='下一首（Ctr + Right）' onClick={this.nextSong.bind(this)}><Icon type="step-forward"/>
                        </div>
                    </div>
                    <div className='audio-progress'></div>
                </Footer>
            </Layout>
        );
    }
}

export default connect(
    state => ({
        currentPlayList: state.currentPlayList,
    })
)(App);
