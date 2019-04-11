import React, { Component } from 'react';
import { Layout } from "antd";
import { HashRouter as Router, Route } from "react-router-dom";
import NetMenu from "./components/Menu/";
import NetHeader from "./components/NetHeader/";
import './App.less';

// 路由懒加载--划重点：https://zh-hans.reactjs.org/docs/code-splitting.html

const { Header, Sider, Content, Footer } = Layout;

class App extends Component {
    state = {
        data: null
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
                    <Content>
                        <Router>

                        </Router>
                    </Content>
                </Layout>
                <Footer style={{ borderTop: '1px solid #e8e8e8' }}>

                </Footer>
            </Layout>
        );
    }
}

export default App;
