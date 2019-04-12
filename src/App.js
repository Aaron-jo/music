import React, { Component, lazy, Suspense } from 'react';
import { Layout, Spin } from "antd";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import NetMenu from "./components/Menu/";
import NetHeader from "./components/NetHeader/";
import './App.less';

// 路由懒加载--划重点：https://zh-hans.reactjs.org/docs/code-splitting.html

const { Header, Sider, Content, Footer } = Layout;
const Home = lazy(() => import('./pages/Home/index'))

class App extends Component {
    state = {
        data: true
    }

    componentWillMount() {
        // window.axios.get('/login/cellphone', {
        //   params: {
        //     phone: '17620410119',
        //     password: 'zly119505'
        //   }
        // }).then((response) => {

        // })
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <Layout>
                <Header style={{ padding: 0 }}>
                    <NetHeader />
                </Header>
                <Layout>
                    <Sider className='menuWrapper'>
                        <NetMenu />
                        <div className='palyingSong'></div>
                    </Sider>
                    <Content style={{backgroundColor: 'white', overflowY: 'auto', height: 'calc(100vh - 113px)'}}>
                        <Suspense fallback={<Spin tip='加载中...' spinning={this.state.data} />}>
                            <Router>
                                <Switch>
                                    <Route path='/' component={Home} exact />
                                </Switch>
                            </Router>
                        </Suspense>
                    </Content>
                </Layout>
                <Footer style={{ borderTop: '1px solid #e8e8e8' }}>

                </Footer>
            </Layout>
        );
    }
}

export default App;
