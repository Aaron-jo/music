import React, {Component, Fragment, lazy, Suspense} from 'react';
import {Radio, Row, Spin, Tabs} from 'antd';

const NewSongList = lazy(() => import('./Components/NewSongList'));
const NewAlbum = lazy(() => import('./Components/NewAlbum'));

class TopMusic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: '0',
            isAlbum: false,
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    onRadioChange(e) {
        this.setState({
            type: '0',
            isAlbum: e.target.value === 1
        })
    }

    onTopMusicTabsChange(activeKey) {
        this.setState({
            type: activeKey,
        });
    }

    render() {
        const {type, isAlbum} = this.state;
        const RadioGroup = Radio.Group;
        const RadioButton = Radio.Button;
        const TabPane = Tabs.TabPane;
        return (
            <Fragment>
                <Row type='flex' style={{justifyContent: 'center'}}>
                    <RadioGroup buttonStyle='solid' defaultValue={0} onChange={this.onRadioChange.bind(this)}>
                        <RadioButton value={0}>新歌速递</RadioButton>
                        <RadioButton value={1}>新碟上架</RadioButton>
                    </RadioGroup>
                </Row>
                <div style={{marginTop: 20, padding: '0px 50px'}}>
                    {
                        !isAlbum && (
                            <Row>
                                <Tabs activeKey={type} onChange={this.onTopMusicTabsChange.bind(this)}>
                                    <TabPane tab="全部" key="0"/>
                                    <TabPane tab="华语" key="7"/>
                                    <TabPane tab="欧美" key="96"/>
                                    <TabPane tab="韩国" key="16"/>
                                    <TabPane tab="日本" key="8"/>
                                </Tabs>
                            </Row>
                        )
                    }
                    {/*新歌速递、新碟上架*/}
                    <Suspense fallback={<Spin tip='加载中...' spinning={true} className='suspense-loading'/>}>
                        {
                            isAlbum ? <NewAlbum type={type}/> : <NewSongList type={type}/>
                        }
                    </Suspense>
                </div>
            </Fragment>
        );
    }
}

export default TopMusic;
