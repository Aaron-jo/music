import React, { Component } from 'react';
import { Layout } from "antd";
import NetMenu from "./components/Menu/";
import './App.less';
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
          <div style={{ background: '#c62f2f', width: '100vw', height: 64 }}>

          </div>
        </Header>
        <Layout>
          <Sider className='menuWrapper'>
              <NetMenu />>
          </Sider>
          <Content></Content>
        </Layout>
        <Footer style={{ borderTop: '1px solid #e8e8e8' }}>

        </Footer>
      </Layout>
    );
  }
}

export default App;
