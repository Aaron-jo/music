import React, {Component, lazy, Suspense} from 'react';
import {Layout, Spin} from "antd";
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import NetMenu from "./components/Menu/";
import NetHeader from "./components/NetHeader/";
import NetFooter from './components/NetFooter';
import PlayingSong from './components/NetFooter/playingSong';
import './App.less';

// 路由懒加载--划重点：https://zh-hans.reactjs.org/docs/code-splitting.html

const {Header, Sider, Content, Footer} = Layout;
const Home = lazy(() => import('./pages/Home/index'));
const SongListDetail = lazy(() => import('./pages/DetailList/SongListDetail'));
const ArtisteDetail = lazy(() => import('./pages/DetailList/ArtisteDetail'));

class App extends Component {
    state = {
        data: true,
    };

    componentWillMount() {
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const {data} = this.state;
        return (
            <Layout>
                <Header style={{padding: 0}}>
                    <NetHeader/>
                </Header>
                <Layout>
                    <Sider className='menuWrapper'>
                        <NetMenu/>
                        <PlayingSong/>
                    </Sider>
                    <Content style={{backgroundColor: 'white', overflowY: 'auto', height: 'calc(100vh - 113px)'}}
                             id='mainContent'>
                        <Suspense
                            fallback={<Spin tip='加载中...' spinning={data} className='suspense-loading'/>}>
                            <Router>
                                <Switch>
                                    <Route exact path="/" render={() => (<Redirect to="/Personalize"/>)}/>
                                    <Route path='/Personalize' component={Home}/>
                                    <Route path='/SongListDetail' component={SongListDetail}/>
                                    <Route path='/ArtisteDetail' component={ArtisteDetail}/>
                                </Switch>
                            </Router>
                        </Suspense>
                    </Content>
                </Layout>
                <Footer className='footer' style={{borderTop: '1px solid #e8e8e8'}}>
                    <audio id='audio' autoPlay/>
                    <NetFooter/>
                </Footer>
            </Layout>
        );
    }
}

export default App;
