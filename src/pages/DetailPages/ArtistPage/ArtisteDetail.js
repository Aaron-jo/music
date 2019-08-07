import React, {useState, useEffect, Fragment, Suspense} from 'react'
import {Button, Spin, Tabs} from 'antd';
import {getQueryString} from '@/Utils/index';
import {createHashHistory} from 'history';
import axios from '@/request/index';
import '../comm/index.less';

function ArtisteDetail() {
    const [artisteInfo, setArtisteInfo] = useState({});
    useEffect(() => {
        const history = createHashHistory();
        const artisteId = getQueryString(history.location.search, 'id');
        axios.get(`/artists`, { params: { id: artisteId } }).then(response => {
            console.log(response);
            setArtisteInfo(response.data.artist)
        });
    }, []);
    const TabsChange = (key) => {
        console.log(key)
    };
    if (Object.keys(artisteInfo).length === 0) {
        return (
            <Spin spinning={true} tip='加载中...'/>
        )
    }
    const TabPane = Tabs.TabPane;
    return (
        <Fragment>
            <div style={{ padding: '20px 0', display: 'flex' }}>
                <div style={{ width: 250, height: 250, margin: '0 40px' }}>
                    <img src={`${artisteInfo.picUrl}?param=250y250`} alt={artisteInfo.name}/>
                </div>
                <div style={{ flexGrow: 1, paddingRight: 20 }}>
                    <h2>
                        {artisteInfo.name}
                        <div style={{
                            float: 'right',
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            fontSize: '12px',
                            color: 'rgb(153,153,153)',
                            marginRight: 20
                        }}>
                            <Button icon='folder-add' size='small'>收藏</Button>
                        </div>
                    </h2>
                    <div style={{ margin: '10px 0', fontSize: '16px' }}>
                         <span>
                             {artisteInfo.alias.join('/')}
                         </span>
                    </div>
                    <div style={{ margin: '5px 0' }}>
                        单曲数：{artisteInfo.musicSize}
                    </div>
                    <div style={{ margin: '5px 0' }}>
                        专辑数：{artisteInfo.albumSize}
                    </div>
                    <div style={{ margin: '5px 0' }}>
                        MV数：{artisteInfo.mvSize}
                    </div>
                </div>
            </div>
            <Tabs onChange={TabsChange} className='net-ease-Tabs'
                  tabBarStyle={{ paddingLeft: 100, marginBottom: 0 }}>
                <TabPane tab='歌曲列表' key='songList'>

                </TabPane>
                <TabPane tab='MV' key='mv'>
                    <Suspense fallback={<Spin tip='加载中...' spinning={true} className='suspense-loading'/>}>

                    </Suspense>
                </TabPane>
                <TabPane tab='歌手详情' key='artistDetail'>
                    <Suspense fallback={<Spin tip='加载中...' spinning={true} className='suspense-loading'/>}>

                    </Suspense>
                </TabPane>
                <TabPane tab='相似歌手' key='simiArtist'>
                    <Suspense fallback={<Spin tip='加载中...' spinning={true} className='suspense-loading'/>}>

                    </Suspense>
                </TabPane>
            </Tabs>
        </Fragment>
    )
}

export default ArtisteDetail;
